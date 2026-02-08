// Setup type definitions for built-in Supabase Runtime APIs
import "@supabase/functions-js/edge-runtime.d.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

interface EmailRequest {
  type: 'new_appointment' | 'confirmation'
  appointment: any
  paymentLink?: string
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
    const body = await req.json()
    console.log('Received request:', body)

    // Determine request type
    let emailType: 'new_appointment' | 'confirmation'
    let appointmentData: any
    let paymentLink: string | undefined

    // Check if it's the old format (webhook) or new format (direct call)
    if (body.record) {
      // Old format - webhook for new appointments
      emailType = 'new_appointment'
      appointmentData = body.record
    } else if (body.type && body.appointment) {
      // New format - direct call with type
      emailType = body.type
      appointmentData = body.appointment
      paymentLink = body.paymentLink
    } else {
      throw new Error('Invalid request format')
    }

    let emailTo: string
    let emailSubject: string
    let emailHtml: string

    if (emailType === 'new_appointment') {
      // Send to admin
      emailTo = 'logopediperfemije@gmail.com'
      emailSubject = `New Appointment: ${appointmentData.appointment_date} at ${appointmentData.appointment_time}`
      emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a1a;">New Appointment Booked!</h2>
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Date:</strong> ${appointmentData.appointment_date}</p>
            <p><strong>Time:</strong> ${appointmentData.appointment_time}</p>
            <p><strong>Type:</strong> ${appointmentData.appointment_type}</p>
          </div>
          <h3 style="color: #1a1a1a;">Client Details:</h3>
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${appointmentData.client_name}</p>
            <p><strong>Email:</strong> ${appointmentData.client_email}</p>
            <p><strong>Phone:</strong> ${appointmentData.client_phone}</p>
            <p><strong>Details:</strong> ${appointmentData.details || 'N/A'}</p>
          </div>
        </div>
      `
    } else {
      // Send confirmation to client
      emailTo = appointmentData.client_email
      emailSubject = 'Appointment Confirmed - LogopediperFemije'

      const formatDate = (dateStr: string) => {
        const date = new Date(dateStr + 'T00:00:00')
        return date.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        })
      }

      const formatType = (type: string) => {
        switch (type) {
          case 'in-person-consultation':
            return 'In-Person Consultation'
          case 'online-consultation':
            return 'Online Consultation'
          case 'mentoring-meeting':
            return 'Mentoring Meeting'
          default:
            return type
        }
      }

      emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #10b981;">Your Appointment is Confirmed!</h2>
          <p style="color: #374151; font-size: 16px;">Dear ${appointmentData.client_name},</p>
          <p style="color: #374151; font-size: 16px;">Your appointment with LogopediperFemije has been confirmed.</p>

          <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
            <h3 style="color: #1a1a1a; margin-top: 0;">Appointment Details</h3>
            <p style="margin: 10px 0;"><strong>Date:</strong> ${formatDate(appointmentData.appointment_date)}</p>
            <p style="margin: 10px 0;"><strong>Time:</strong> ${appointmentData.appointment_time}</p>
            <p style="margin: 10px 0;"><strong>Type:</strong> ${formatType(appointmentData.appointment_type)}</p>
          </div>

          ${paymentLink ? `
            <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1a1a1a; margin-top: 0;">Payment Information</h3>
              <p style="color: #374151; margin-bottom: 15px;">Please complete your payment using the link below:</p>
              <a href="${paymentLink}"
                 style="display: inline-block; background-color: #3b82f6; color: white; padding: 12px 24px;
                        text-decoration: none; border-radius: 6px; font-weight: 500;">
                Pay Now
              </a>
            </div>
          ` : ''}

          <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
            If you have any questions or need to reschedule, please contact us.
          </p>

          <p style="color: #374151; font-size: 16px; margin-top: 20px;">
            Thank you for trusting LogopediperFemije!
          </p>
        </div>
      `
    }

    // Send email using Resend
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: emailTo,
        subject: emailSubject,
        html: emailHtml
      })
    })

    const data = await res.json()
    console.log('Email sent:', data)

    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      status: 200
    })
  } catch (error) {
    console.error('Error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      status: 500
    })
  }
})
