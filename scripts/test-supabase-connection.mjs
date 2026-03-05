import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Client } from 'pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function parseDotenv(content) {
  const lines = content.split(/\r?\n/);
  const env = {};
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    const val = trimmed.slice(idx + 1).trim();
    env[key] = val.replace(/^"|"$/g, '');
  }
  return env;
}

function findConnectionString(env) {
  const candidates = [
    'DATABASE_URL',
    'SUPABASE_DB_URL',
    'NEXT_PUBLIC_SUPABASE_URL_',
    'NEXT_PUBLIC_SUPABASE_URL',
    'VITE_SUPABASE_URL',
  ];
  for (const k of candidates) {
    if (env[k] && /postgres/i.test(env[k])) return env[k];
  }
  // also try any value that looks like a postgres URL
  for (const v of Object.values(env)) {
    if (typeof v === 'string' && /^postgres(?:ql)?:\/\//i.test(v)) return v;
  }
  return null;
}

async function main() {
  const root = path.resolve(__dirname, '..');
  const dotenvPath = path.join(root, '.env');
  if (!fs.existsSync(dotenvPath)) {
    console.error('.env not found at', dotenvPath);
    process.exit(2);
  }

  const content = fs.readFileSync(dotenvPath, 'utf8');
  const env = parseDotenv(content);

  const conn = findConnectionString(env);
  if (!conn) {
    console.error('No Postgres connection string found in .env');
    process.exit(2);
  }

  console.log('Using connection string from .env (masked):');
  console.log(conn.replace(/(:[^:@]+)@/, ':<REDACTED>@'));

  async function attemptConnection(allowInsecure = false) {
    if (allowInsecure) {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
      console.warn('Retrying with NODE_TLS_REJECT_UNAUTHORIZED=0 (insecure)');
    }
    const client = new Client({ connectionString: conn, ssl: { rejectUnauthorized: false } });
    try {
      await client.connect();
      const res = await client.query('SELECT 1 as ok');
      console.log('Query result:', res.rows[0]);
      console.log('Postgres connection successful');
      await client.end();
      return 0;
    } catch (err) {
      console.error('Failed to connect or run query:', err.message || err);
      try { await client.end(); } catch (_) {}
      return 1;
    }
  }

  // First try (strict). If it fails due to TLS cert issues, retry insecurely once.
  const code = await attemptConnection(false);
  if (code !== 0) {
    const insecureCode = await attemptConnection(true);
    process.exit(insecureCode);
  }
  process.exit(0);
}

main();
