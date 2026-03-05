import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

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

function decodeJwtPayload(token) {
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    let payload = parts[1];
    payload = payload.replace(/-/g, '+').replace(/_/g, '/');
    while (payload.length % 4) payload += '=';
    const json = Buffer.from(payload, 'base64').toString('utf8');
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
}

function deriveSupabaseUrlFromAnon(anon) {
  const payload = decodeJwtPayload(anon);
  if (!payload) return null;
  const ref = payload.ref || payload.project_ref || payload.aud || payload.client_id;
  if (!ref) return null;
  // prefer plain ref (looks like abcdefghijklmnopq). Build standard supabase URL
  return `https://${ref}.supabase.co`;
}

async function main() {
  const root = path.resolve(process.cwd());
  const dotenvPath = path.join(root, '.env');
  if (!fs.existsSync(dotenvPath)) {
    console.error('.env not found at', dotenvPath);
    process.exit(2);
  }

  const env = parseDotenv(fs.readFileSync(dotenvPath, 'utf8'));

  const anonKey = env.VITE_SUPABASE_ANON_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY || env.SUPABASE_ANON_KEY;
  let supabaseUrl = env.VITE_SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL || env.SUPABASE_URL;

  if (!anonKey) {
    console.error('No anon key found in .env (VITE_SUPABASE_ANON_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY)');
    process.exit(2);
  }

  if (!supabaseUrl) {
    const derived = deriveSupabaseUrlFromAnon(anonKey);
    if (derived) {
      supabaseUrl = derived;
      console.log('Derived Supabase URL from anon key:', supabaseUrl);
    }
  }

  if (!supabaseUrl) {
    console.error('No Supabase URL found. Please set VITE_SUPABASE_URL in your .env');
    process.exit(2);
  }

  console.log('Creating Supabase client with URL (masked):', supabaseUrl.replace(/:\/\/.+@/, '://<redacted>@'));
  const supabase = createClient(supabaseUrl, anonKey);

  try {
    // Try listing storage buckets (simple, often allowed for public projects)
    if (supabase && supabase.storage && typeof supabase.storage.listBuckets === 'function') {
      const { data, error } = await supabase.storage.listBuckets();
      if (error) {
        console.error('Supabase client connected but listing buckets failed:', error.message || error);
        process.exit(1);
      }
      console.log('Buckets:', Array.isArray(data) ? data.map(b => b.name) : data);
      console.log('Supabase JS connection successful');
      process.exit(0);
    }

    // Fallback: make a simple request to the REST endpoint root
    const res = await fetch(`${supabaseUrl}/rest/v1/?select=1`, { headers: { apikey: anonKey } });
    console.log('REST endpoint status:', res.status);
    console.log('Supabase JS connection assumed successful');
    process.exit(0);
  } catch (err) {
    console.error('Error while testing Supabase client:', err.message || err);
    process.exit(1);
  }
}

main();
