/**
 * fix-rls-policies.mjs
 *
 * Fixes infinite recursion in Supabase RLS policies.
 *
 * ROOT CAUSE: The "Admins can manage all profiles" policy on the `profiles`
 * table does:  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
 * That sub-select triggers profiles RLS → same policy runs → infinite recursion.
 *
 * FIX: Create a SECURITY DEFINER helper function `public.is_admin()` that
 * bypasses RLS when checking admin status, then replace every policy that
 * referenced the old inline sub-select with the new function call.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';

const { Client } = pg;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

function parseDotenv(content) {
  const env = {};
  for (const line of content.split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const idx = t.indexOf('=');
    if (idx === -1) continue;
    env[t.slice(0, idx).trim()] = t.slice(idx + 1).trim().replace(/^"|"$/g, '');
  }
  return env;
}

// Each entry is run as a single pg.query() call to avoid splitting issues
const STATEMENTS = [
  // 1. SECURITY DEFINER helper — must be one string, dollar-quotes intact
  `CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
  );
$$`,

  // 2. profiles
  `DROP POLICY IF EXISTS "Admins can manage all profiles" ON public.profiles`,
  `CREATE POLICY "Admins can manage all profiles" ON public.profiles FOR ALL USING (public.is_admin())`,

  // 3. gallery_categories
  `DROP POLICY IF EXISTS "Admins can manage categories" ON public.gallery_categories`,
  `CREATE POLICY "Admins can manage categories" ON public.gallery_categories FOR ALL USING (public.is_admin())`,

  // 4. gallery_items
  `DROP POLICY IF EXISTS "Users can update own uploads" ON public.gallery_items`,
  `CREATE POLICY "Users can update own uploads" ON public.gallery_items FOR UPDATE USING (uploaded_by = auth.uid() OR public.is_admin())`,

  `DROP POLICY IF EXISTS "Admins can delete any gallery item" ON public.gallery_items`,
  `CREATE POLICY "Admins can delete any gallery item" ON public.gallery_items FOR DELETE USING (uploaded_by = auth.uid() OR public.is_admin())`,

  // 5. testimonials
  `DROP POLICY IF EXISTS "Admins can manage testimonials" ON public.testimonials`,
  `CREATE POLICY "Admins can manage testimonials" ON public.testimonials FOR ALL USING (public.is_admin())`,

  // 6. inquiries
  `DROP POLICY IF EXISTS "Admins can manage inquiries" ON public.inquiries`,
  `CREATE POLICY "Admins can manage inquiries" ON public.inquiries FOR UPDATE USING (public.is_admin())`,

  `DROP POLICY IF EXISTS "Admins can delete inquiries" ON public.inquiries`,
  `CREATE POLICY "Admins can delete inquiries" ON public.inquiries FOR DELETE USING (public.is_admin())`,

  // 7. event_types
  `DROP POLICY IF EXISTS "Admins can manage event types" ON public.event_types`,
  `CREATE POLICY "Admins can manage event types" ON public.event_types FOR ALL USING (public.is_admin())`,

  // 8. site_content
  `DROP POLICY IF EXISTS "Admins can manage site content" ON public.site_content`,
  `CREATE POLICY "Admins can manage site content" ON public.site_content FOR ALL USING (public.is_admin())`,
];

async function main() {
  const root = path.resolve(__dirname, '..');
  const env = parseDotenv(fs.readFileSync(path.join(root, '.env'), 'utf8'));

  const pgConn = env.NEXT_PUBLIC_SUPABASE_URL_ || env.DATABASE_URL || env.SUPABASE_DB_URL || '';
  if (!pgConn) {
    console.error('❌  No Postgres connection string found in .env');
    process.exit(2);
  }

  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  const client = new Client({ connectionString: pgConn, ssl: { rejectUnauthorized: false } });

  try {
    await client.connect();
    console.log('✅  Postgres connected');
  } catch (err) {
    console.error('❌  Connection failed:', err.message);
    process.exit(1);
  }

  let ok = 0, failed = 0;
  for (const stmt of STATEMENTS) {
    const preview = stmt.slice(0, 80).replace(/\n/g, ' ');
    try {
      await client.query(stmt);
      ok++;
      console.log(`  ✅  ${preview}…`);
    } catch (err) {
      failed++;
      console.error(`  ❌  FAIL: ${preview}…`);
      console.error(`       ${err.message}`);
    }
  }

  await client.end();

  console.log(`\n─── Summary: ${ok} ok, ${failed} failed ───`);

  if (failed === 0) {
    console.log('\n🎉  RLS policies fixed! Verifying event_types query…\n');

    // Quick smoke test via REST
    const anonKey = env.VITE_SUPABASE_ANON_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const url = 'https://yreumjisnozjwshtpbzc.supabase.co';
    const res = await fetch(`${url}/rest/v1/event_types?is_active=eq.true&order=sort_order`, {
      headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` }
    });
    const rows = await res.json();
    if (Array.isArray(rows)) {
      console.log(`event_types returned ${rows.length} rows:`);
      rows.forEach(r => console.log(`  - ${r.title}`));
    } else {
      console.error('Unexpected response:', rows);
    }

    process.exit(0);
  }

  process.exit(1);
}

main();
