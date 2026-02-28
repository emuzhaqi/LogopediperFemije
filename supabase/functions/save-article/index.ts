// Setup type definitions for built-in Supabase Runtime APIs
import "@supabase/functions-js/edge-runtime.d.ts"
import * as jose from "jose"
import { createClient } from "@supabase/supabase-js"

const ADMIN_JWT_SECRET = Deno.env.get('ADMIN_JWT_SECRET')
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  })
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/ë/g, 'e')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
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
    const { title, content, categories } = await req.json()

    if (!title || !content) {
      return json({ error: 'title and content are required' }, 400)
    }

    const slug = slugify(title)
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

    // Insert article
    const { data: article, error: articleError } = await supabase
      .from('articles')
      .insert({ title, slug, content })
      .select()
      .single()

    if (articleError) {
      throw new Error(`Failed to insert article: ${articleError.message}`)
    }

    // Process categories
    if (categories && categories.trim()) {
      const keywords: string[] = categories
        .split(/[,;]/)
        .map((k: string) => k.trim().toLowerCase())
        .filter((k: string) => k.length > 0)

      for (const name of keywords) {
        // Upsert category (insert if not exists)
        await supabase
          .from('categories')
          .upsert({ name }, { onConflict: 'name', ignoreDuplicates: true })

        // Fetch the category id
        const { data: category } = await supabase
          .from('categories')
          .select('id')
          .eq('name', name)
          .single()

        if (category) {
          await supabase
            .from('article_categories')
            .insert({ article_id: article.id, category_id: category.id })
        }
      }
    }

    return json({ article }, 201)
  } catch (error) {
    console.error('Error:', error)
    return json({ error: error.message }, 500)
  }
})
