import React, { useState } from 'react'
import { generateStandalonePaymentLink } from '../../utils/paypalService'

const APPOINTMENT_TYPES = [
  { value: 'in-person-consultation', label: 'In-Person Consultation' },
  { value: 'online-consultation', label: 'Online Consultation' },
  { value: 'mentoring-meeting', label: 'Mentoring Meeting' },
]

const PaymentLinkGenerator = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [appointmentType, setAppointmentType] = useState('in-person-consultation')
  const [amount, setAmount] = useState(35)
  const [generating, setGenerating] = useState(false)
  const [generatedLink, setGeneratedLink] = useState(null)
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(false)

  const handleGenerate = async () => {
    setError(null)
    setGeneratedLink(null)
    setGenerating(true)

    try {
      const { paymentLink } = await generateStandalonePaymentLink({
        appointmentType,
        amount,
        currency: 'EUR',
      })
      setGeneratedLink(paymentLink)
    } catch (err) {
      setError(err.message || 'Failed to generate link')
    } finally {
      setGenerating(false)
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const el = document.createElement('textarea')
      el.value = generatedLink
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const inputStyle = {
    width: '100%',
    padding: 'clamp(0.5rem, 2vw, 0.625rem)',
    fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  }

  const labelStyle = {
    display: 'block',
    fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
    fontWeight: '500',
    color: '#374151',
    marginBottom: 'clamp(0.25rem, 1vw, 0.5rem)',
  }

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      marginBottom: 'clamp(1rem, 3vw, 2rem)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }}>
      {/* Header / toggle */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 'clamp(1rem, 3vw, 1.5rem)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <h2 style={{
          fontSize: 'clamp(1rem, 3vw, 1.25rem)',
          fontWeight: '600',
          color: '#1a1a1a',
          margin: 0,
        }}>
          Generate Payment Link
        </h2>
        <span style={{ fontSize: '1.25rem', color: '#6b7280' }}>
          {isOpen ? '▲' : '▼'}
        </span>
      </button>

      {isOpen && (
        <div style={{ padding: '0 clamp(1rem, 3vw, 1.5rem) clamp(1rem, 3vw, 1.5rem)' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'clamp(0.75rem, 2vw, 1rem)',
            marginBottom: 'clamp(0.75rem, 2vw, 1rem)',
          }}>
            {/* Appointment type */}
            <div>
              <label htmlFor="gen-type" style={labelStyle}>Appointment Type</label>
              <select
                id="gen-type"
                value={appointmentType}
                onChange={(e) => setAppointmentType(e.target.value)}
                disabled={generating}
                style={{ ...inputStyle, cursor: generating ? 'not-allowed' : 'pointer' }}
              >
                {APPOINTMENT_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>

            {/* Amount */}
            <div>
              <label htmlFor="gen-amount" style={labelStyle}>Amount</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="number"
                  id="gen-amount"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  disabled={generating}
                  min="1"
                  step="1"
                  style={{ ...inputStyle, width: '100px' }}
                />
                <span style={{ fontSize: 'clamp(0.75rem, 2vw, 0.875rem)', color: '#374151', fontWeight: '500' }}>
                  EUR
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={generating}
            style={{
              padding: 'clamp(0.5rem, 2vw, 0.625rem) clamp(1rem, 3vw, 1.25rem)',
              fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
              fontWeight: '500',
              backgroundColor: generating ? '#9ca3af' : '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: generating ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s',
              marginBottom: 'clamp(0.75rem, 2vw, 1rem)',
            }}
            onMouseEnter={(e) => { if (!generating) e.target.style.backgroundColor = '#2563eb' }}
            onMouseLeave={(e) => { if (!generating) e.target.style.backgroundColor = '#3b82f6' }}
          >
            {generating ? 'Generating…' : 'Generate Link'}
          </button>

          {error && (
            <div style={{
              backgroundColor: '#fee2e2',
              border: '1px solid #fecaca',
              color: '#dc2626',
              padding: '0.75rem',
              borderRadius: '4px',
              fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
              marginBottom: '0.75rem',
            }}>
              {error}
            </div>
          )}

          {generatedLink && (
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'center',
              backgroundColor: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '4px',
              padding: '0.75rem',
            }}>
              <input
                type="text"
                readOnly
                value={generatedLink}
                style={{
                  flex: 1,
                  fontSize: 'clamp(0.7rem, 2vw, 0.8rem)',
                  border: 'none',
                  outline: 'none',
                  backgroundColor: 'transparent',
                  color: '#1e40af',
                  minWidth: 0,
                }}
              />
              <button
                onClick={handleCopy}
                style={{
                  padding: '0.375rem 0.75rem',
                  fontSize: 'clamp(0.7rem, 2vw, 0.8rem)',
                  fontWeight: '500',
                  backgroundColor: copied ? '#10b981' : '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'background-color 0.2s',
                }}
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default PaymentLinkGenerator
