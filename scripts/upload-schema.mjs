/**
 * upload-schema.mjs
 * 1. Verifies Supabase JS connection (lists storage buckets)
 * 2. Runs supabase/schema.sql against the DB using pg (via pooler connection string)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import pg from 'pg';

const { Client } = pg;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── helpers ──────────────────────────────────────────────────────────────────

function parseDotenv(content) {
  const env = {};
  for (const line of content.split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const idx = t.indexOf('=');
    if (idx === -1) continue;
    const key = t.slice(0, idx).trim();
    const val = t.slice(idx + 1).trim().replace(/^"|"$/g, '');
    env[key] = val;
  }
  return env;
}

function decodeJwtRef(token) {
  try {
    let payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    while (payload.length % 4) payload += '=';
    const json = JSON.parse(Buffer.from(payload, 'base64').toString('utf8'));
    return json.ref || json.project_ref || null;
  } catch { return null; }
}

/** Split SQL into runnable statements, ignoring statement-terminating semicolons inside function bodies */
function splitSql(sql) {
  const statements = [];
  let current = '';
  let inDollarQuote = false;
  let dollarTag = '';

  const lines = sql.split('\n');
  for (const line of lines) {
    // detect $$ or $tag$ dollar-quoting
    const dollarMatches = line.match(/\$[^$]*\$/g) || [];
    for (const tag of dollarMatches) {
      if (!inDollarQuote) {
        inDollarQuote = true;
        dollarTag = tag;
      } else if (tag === dollarTag) {
        inDollarQuote = false;
        dollarTag = '';
      }
    }

    current += line + '\n';

    if (!inDollarQuote && line.trimEnd().endsWith(';')) {
      const stmt = current.trim();
      if (stmt && stmt !== ';') statements.push(stmt);
      current = '';
    }
  }
  if (current.trim()) statements.push(current.trim());
  return statements.filter(Boolean);
}

// ── main ─────────────────────────────────────────────────────────────────────

async function main() {
  const root = path.resolve(__dirname, '..');
  const dotenvPath = path.join(root, '.env');

  if (!fs.existsSync(dotenvPath)) {
    console.error('❌  .env not found at', dotenvPath);
    return 2;
  }

  const env = parseDotenv(fs.readFileSync(dotenvPath, 'utf8'));

  // --- Resolve Supabase URL ---
  let supabaseUrl = env.VITE_SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL || env.SUPABASE_URL || '';
  const anonKey  = env.VITE_SUPABASE_ANON_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY || env.SUPABASE_ANON_KEY || '';

  if (!supabaseUrl && anonKey) {
    const ref = decodeJwtRef(anonKey);
    if (ref) supabaseUrl = `https://${ref}.supabase.co`;
  }

  if (!supabaseUrl || !anonKey) {
    console.error('❌  Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env');
    return 2;
  }

  // --- Resolve Postgres connection string ---
  const pgConn =
    env.NEXT_PUBLIC_SUPABASE_URL_ || // raw postgres URL (with trailing underscore key name)
    env.DATABASE_URL               ||
    env.SUPABASE_DB_URL            ||
    '';

  // ── STEP 1: Test @supabase/supabase-js connection ────────────────────────

  console.log('\n─── Step 1: Test @supabase/supabase-js connection ───');
  console.log('URL  :', supabaseUrl);

  const supabase = createClient(supabaseUrl, anonKey);
  const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();

  if (bucketsError) {
    console.error('❌  Supabase JS error:', bucketsError.message);
    console.log('    (Connection may still be valid — continuing…)');
  } else {
    console.log('✅  Supabase JS connected.');
    if (buckets.length === 0) {
      console.log('    Storage: no buckets yet (expected for a fresh project).');
    } else {
      console.log('    Storage buckets:', buckets.map(b => b.name).join(', '));
    }
  }

  // ── STEP 2: Upload schema via pg ─────────────────────────────────────────

  console.log('\n─── Step 2: Upload schema via pg ───');

  if (!pgConn) {
    console.error('❌  No Postgres connection string found in .env.');
    console.log('    Expected key: NEXT_PUBLIC_SUPABASE_URL_ or DATABASE_URL');
    return 2;
  }

  const schemaPath = path.join(root, 'supabase', 'schema.sql');
  if (!fs.existsSync(schemaPath)) {
    console.error('❌  Schema file not found:', schemaPath);
    return 2;
  }

  const schemaSql = fs.readFileSync(schemaPath, 'utf8');
  const statements = splitSql(schemaSql);
  console.log(`    Found ${statements.length} SQL statements to execute.`);

  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  const client = new Client({ connectionString: pgConn, ssl: { rejectUnauthorized: false } });

  try {
    await client.connect();
    console.log('✅  Postgres connected.\n');
  } catch (err) {
    console.error('❌  Postgres connection failed:', err.message);
    return 1;
  }

  let ok = 0, skipped = 0, failed = 0;

  for (const stmt of statements) {
    const preview = stmt.slice(0, 80).replace(/\n/g, ' ');
    try {
      await client.query(stmt);
      ok++;
      process.stdout.write(`  ✅  ${preview}…\n`);
    } catch (err) {
      const msg = err.message || '';
      // Treat "already exists" errors as skips, not failures
      if (
        msg.includes('already exists') ||
        msg.includes('duplicate key') ||
        msg.includes('relation') && msg.includes('already exists')
      ) {
        skipped++;
        process.stdout.write(`  ⏭   SKIP (already exists): ${preview}…\n`);
      } else {
        failed++;
        process.stdout.write(`  ❌  FAIL: ${preview}…\n`);
        console.error(`       Error: ${msg}`);
      }
    }
  }

  await client.end();

  console.log(`\n─── Summary ───`);
  console.log(`  ✅  Executed : ${ok}`);
  console.log(`  ⏭   Skipped  : ${skipped}  (already existed)`);
  console.log(`  ❌  Failed   : ${failed}`);

  if (failed === 0) {
    console.log('\n🎉  Schema upload complete!');
    return 0;
  } else {
    console.log('\n⚠️   Schema upload finished with some failures (see above).');
    return 1;
  }
}

main().then(code => {
  setTimeout(() => process.exit(code), 100);
});
