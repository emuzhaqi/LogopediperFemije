// Setup type definitions for built-in Supabase Runtime APIs
import "@supabase/functions-js/edge-runtime.d.ts"
import * as jose from "npm:jose@5.2.0"

const ADMIN_PASSWORD = Deno.env.get('ADMIN_PASSWORD')
const ADMIN_JWT_SECRET = Deno.env.get('ADMIN_JWT_SECRET')

interface AuthRequest {
  password: string
}

Deno.serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    })
  }

  try {
    // Check environment variables
    if (!ADMIN_PASSWORD) {
      console.error('ADMIN_PASSWORD not set')
      return new Response(JSON.stringify({ error: 'Server configuration error: ADMIN_PASSWORD not set' }), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        status: 500
      })
    }

    if (!ADMIN_JWT_SECRET) {
      console.error('ADMIN_JWT_SECRET not set')
      return new Response(JSON.stringify({ error: 'Server configuration error: ADMIN_JWT_SECRET not set' }), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        status: 500
      })
    }

    const { password }: AuthRequest = await req.json()

    if (!password) {
      return new Response(JSON.stringify({ error: 'Password is required' }), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        status: 400
      })
    }

    // Validate password
    if (password !== ADMIN_PASSWORD) {
      console.log('Invalid password attempt')
      return new Response(JSON.stringify({ error: 'Invalid password' }), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        status: 401
      })
    }

    // Generate JWT token with 4-hour expiry
    const secret = new TextEncoder().encode(ADMIN_JWT_SECRET)
    const token = await new jose.SignJWT({
      role: 'admin',
      iss: 'logopediperfemije-admin',
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('4h')
      .sign(secret)

    return new Response(JSON.stringify({
      token,
      expiresIn: 14400 // 4 hours in seconds
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      status: 200
    })
  } catch (error) {
    console.error('Error:', error)
    return new Response(JSON.stringify({
      error: error.message,
      details: 'Check Supabase logs for more information'
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      status: 500
    })
  }
})
