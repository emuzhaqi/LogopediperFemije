import { supabase } from './supabase'

export const generateAppointmentPaymentLink = async ({ appointmentId, amount, currency = 'EUR' }) => {
  const { data, error } = await supabase.functions.invoke('create-paypal-payment', {
    body: {
      mode: 'appointment',
      appointment_id: appointmentId,
      amount,
      currency,
    },
  })

  if (error) throw new Error(error.message || 'Failed to generate payment link')
  if (data?.error) throw new Error(data.error)

  return { paymentLink: data.paymentLink }
}

export const generateStandalonePaymentLink = async ({ appointmentType, amount, currency = 'EUR' }) => {
  const { data, error } = await supabase.functions.invoke('create-paypal-payment', {
    body: {
      mode: 'standalone',
      appointment_type: appointmentType,
      amount,
      currency,
    },
  })

  if (error) throw new Error(error.message || 'Failed to generate payment link')
  if (data?.error) throw new Error(data.error)

  return { paymentLink: data.paymentLink }
}
