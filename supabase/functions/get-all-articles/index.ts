// Setup type definitions for built-in Supabase Runtime APIs
import "@supabase/functions-js/edge-runtime.d.ts"
import * as jose from "jose"
import { createClient } from "@supabase/supabase-js"

const ADMIN_JWT_SECRET = Deno.env.get('ADMIN_JWT_SECRET')
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  })
}

async function verifyAdminToken(req: Request): Promise<boolean> {
  if (!ADMIN_JWT_SECRET) return false
  const authHeader = req.headers.get('Authorization')
  if (!authHeader?.startsWith('Bearer ')) return false
  const token = authHeader.slice(7)
  try {
    const secret = new TextEncoder().encode(ADMIN_JWT_SECRET)
    const { payload } = await jose.jwtVerify(token, secret)
    return payload.role === 'admin' && payload.iss === 'logopediperfemije-admin'
  } catch {
    return false
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS_HEADERS })
  }

  const isAuthorized = await verifyAdminToken(req)
  if (!isAuthorized) {
    return json({ error: 'Unauthorized' }, 401)
  }

  try {
    // Service role bypasses RLS — returns all articles including hidden ones
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

    const { data: articles, error } = await supabase
      .from('articles')
      .select('id, title, slug, is_hidden, created_at, article_categories(categories(name))')
      .order('created_at', { ascending: false })

    if (error) throw new Error(error.message)

    return json({ articles })
  } catch (error) {
    console.error('Error:', error)
    return json({ error: error.message }, 500)
  }
})
