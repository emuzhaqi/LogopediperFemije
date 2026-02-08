import { supabase } from './supabase'

export const sendConfirmationEmail = async (appointment, paymentLink) => {
  try {
    const { data, error } = await supabase.functions.invoke('send-appointment-email', {
      body: {
        type: 'confirmation',
        appointment: appointment,
        paymentLink: paymentLink
      }
    })

    if (error) {
      console.error('Email service error:', error)
      return {
        success: false,
        error: error.message || 'Failed to send email'
      }
    }

    if (data && data.error) {
      console.error('Email API error:', data.error)
      return {
        success: false,
        error: data.error
      }
    }

    return {
      success: true,
      data: data
    }
  } catch (err) {
    console.error('Unexpected error sending email:', err)
    return {
      success: false,
      error: err.message || 'Unexpected error sending email'
    }
  }
}
