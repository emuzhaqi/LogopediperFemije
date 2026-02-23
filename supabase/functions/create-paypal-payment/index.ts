// Setup type definitions for built-in Supabase Runtime APIs
import "@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "@supabase/supabase-js"

const PAYPAL_CLIENT_ID = Deno.env.get('PAYPAL_CLIENT_ID')!
const PAYPAL_CLIENT_SECRET = Deno.env.get('PAYPAL_CLIENT_SECRET')!
const PAYPAL_MODE = Deno.env.get('PAYPAL_MODE') || 'live'
const PAYPAL_BASE = PAYPAL_MODE === 'sandbox'
  ? 'https://api-m.sandbox.paypal.com'
  : 'https://api-m.paypal.com'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

async function getPayPalAccessToken(): Promise<string> {
  const credentials = btoa(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`)
  const res = await fetch(`${PAYPAL_BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`PayPal OAuth failed: ${err}`)
  }
  const data = await res.json()
  return data.access_token
}

const SITE_URL = 'https://emuzhaqi.github.io/LogopediperFemije'

async function createPayPalOrder(
  accessToken: string,
  amount: number,
  currency: string
): Promise<{ orderId: string; approveLink: string }> {
  const res = await fetch(`${PAYPAL_BASE}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: currency,
            value: amount.toFixed(2),
          },
          payee: {
            email_address: 'elvis.muzhaqi@gmail.com',
          },
        },
      ],
      application_context: {
        landing_page: 'BILLING',
        user_action: 'PAY_NOW',
        return_url: SITE_URL,
        cancel_url: SITE_URL,
      },
    }),
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`PayPal create order failed: ${err}`)
  }
  const order = await res.json()
  const approveLink = order.links.find((l: any) => l.rel === 'approve')?.href
  if (!approveLink) throw new Error('No approve link in PayPal response')
  return { orderId: order.id, approveLink }
}

Deno.serve(async (req) => {
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
    const body = await req.json()
    const { mode, amount, currency = 'EUR' } = body

    if (!mode || !amount) {
      return new Response(JSON.stringify({ error: 'mode and amount are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      })
    }

    const accessToken = await getPayPalAccessToken()
    const { orderId, approveLink } = await createPayPalOrder(accessToken, amount, currency)

    if (mode === 'appointment') {
      const { appointment_id } = body
      if (!appointment_id) {
        return new Response(JSON.stringify({ error: 'appointment_id is required for appointment mode' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        })
      }

      const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
      const { error: updateError } = await supabase
        .from('appointments')
        .update({
          payment_link: approveLink,
          payment_amount: amount,
          paypal_order_id: orderId,
        })
        .eq('id', appointment_id)

      if (updateError) throw new Error(`DB update failed: ${updateError.message}`)

      return new Response(JSON.stringify({ paymentLink: approveLink }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      })
    }

    if (mode === 'standalone') {
      return new Response(JSON.stringify({ paymentLink: approveLink }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      })
    }

    return new Response(JSON.stringify({ error: 'mode must be "appointment" or "standalone"' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    })
  } catch (error) {
    console.error('Error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    })
  }
})
