import React, { useState } from 'react'
import { supabase } from '../../utils/supabase'
import { sendConfirmationEmail } from '../../utils/adminEmailService'

const ConfirmationModal = ({ appointment, onClose, onSuccess }) => {
  const [paymentLink, setPaymentLink] = useState('https://paypal.me/')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(null)

  const formatDate = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00')
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatAppointmentType = (type) => {
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

  const validatePaymentLink = (url) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const handleConfirm = async () => {
    setError(null)

    // Validate payment link
    if (!validatePaymentLink(paymentLink)) {
      setError('Please enter a valid payment link')
      return
    }

    setSending(true)

    try {
      // Send confirmation email
      const emailResult = await sendConfirmationEmail(appointment, paymentLink)

      if (!emailResult.success) {
        throw new Error(emailResult.error || 'Failed to send email')
      }

      // Update appointment status to confirmed
      const { error: updateError } = await supabase
        .from('appointments')
        .update({ status: 'confirmed' })
        .eq('id', appointment.id)

      if (updateError) throw updateError

      // Success
      if (onSuccess) onSuccess()
      onClose()
    } catch (err) {
      console.error('Error confirming appointment:', err)
      setError(err.message || 'Failed to send confirmation email')
    } finally {
      setSending(false)
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: 'clamp(1rem, 3vw, 2rem)'
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: 'clamp(1.5rem, 4vw, 2rem)',
          maxWidth: '500px',
          width: '100%',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{
          fontSize: 'clamp(1.25rem, 4vw, 1.5rem)',
          fontWeight: '600',
          color: '#1a1a1a',
          marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
          marginTop: 0
        }}>
          Confirm Appointment
        </h2>

        {/* Appointment Summary */}
        <div style={{
          backgroundColor: '#f9fafb',
          padding: 'clamp(1rem, 3vw, 1.25rem)',
          borderRadius: '6px',
          marginBottom: 'clamp(1rem, 3vw, 1.5rem)'
        }}>
          <div style={{
            marginBottom: '0.75rem',
            fontSize: 'clamp(0.875rem, 2vw, 1rem)',
            color: '#374151'
          }}>
            <strong>Date:</strong> {formatDate(appointment.appointment_date)}
          </div>
          <div style={{
            marginBottom: '0.75rem',
            fontSize: 'clamp(0.875rem, 2vw, 1rem)',
            color: '#374151'
          }}>
            <strong>Time:</strong> {appointment.appointment_time}
          </div>
          <div style={{
            marginBottom: '0.75rem',
            fontSize: 'clamp(0.875rem, 2vw, 1rem)',
            color: '#374151'
          }}>
            <strong>Type:</strong> {formatAppointmentType(appointment.appointment_type)}
          </div>
          <div style={{
            marginBottom: '0.75rem',
            fontSize: 'clamp(0.875rem, 2vw, 1rem)',
            color: '#374151'
          }}>
            <strong>Client:</strong> {appointment.client_name}
          </div>
          <div style={{
            marginBottom: 0,
            fontSize: 'clamp(0.875rem, 2vw, 1rem)',
            color: '#374151'
          }}>
            <strong>Email:</strong> {appointment.client_email}
          </div>
        </div>

        {/* Payment Link Input */}
        <div style={{ marginBottom: 'clamp(1rem, 3vw, 1.5rem)' }}>
          <label
            htmlFor="payment-link"
            style={{
              display: 'block',
              fontSize: 'clamp(0.875rem, 2vw, 1rem)',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '0.5rem'
            }}
          >
            Payment Link
          </label>
          <input
            type="text"
            id="payment-link"
            value={paymentLink}
            onChange={(e) => setPaymentLink(e.target.value)}
            disabled={sending}
            placeholder="https://paypal.me/username/35EUR"
            style={{
              width: '100%',
              padding: 'clamp(0.625rem, 2vw, 0.75rem)',
              fontSize: 'clamp(0.875rem, 2vw, 1rem)',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            backgroundColor: '#fee2e2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            padding: 'clamp(0.625rem, 2vw, 0.75rem)',
            borderRadius: '4px',
            fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
            marginBottom: 'clamp(1rem, 3vw, 1.5rem)'
          }}>
            {error}
          </div>
        )}

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: 'clamp(0.5rem, 2vw, 0.75rem)',
          justifyContent: 'flex-end'
        }}>
          <button
            onClick={onClose}
            disabled={sending}
            style={{
              padding: 'clamp(0.625rem, 2vw, 0.75rem) clamp(1rem, 3vw, 1.25rem)',
              fontSize: 'clamp(0.875rem, 2vw, 1rem)',
              fontWeight: '500',
              backgroundColor: '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: sending ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => {
              if (!sending) e.target.style.backgroundColor = '#4b5563'
            }}
            onMouseLeave={(e) => {
              if (!sending) e.target.style.backgroundColor = '#6b7280'
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={sending}
            style={{
              padding: 'clamp(0.625rem, 2vw, 0.75rem) clamp(1rem, 3vw, 1.25rem)',
              fontSize: 'clamp(0.875rem, 2vw, 1rem)',
              fontWeight: '500',
              backgroundColor: sending ? '#9ca3af' : '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: sending ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => {
              if (!sending) e.target.style.backgroundColor = '#059669'
            }}
            onMouseLeave={(e) => {
              if (!sending) e.target.style.backgroundColor = '#10b981'
            }}
          >
            {sending ? 'Sending Email...' : 'Send Confirmation Email'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal
