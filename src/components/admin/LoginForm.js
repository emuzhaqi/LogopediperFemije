import React, { useState } from 'react'
import { useAdminAuth } from '../../context/AdminAuthContext'

const LoginForm = () => {
  const [password, setPassword] = useState('')
  const [localError, setLocalError] = useState(null)
  const { login, loading } = useAdminAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLocalError(null)

    if (!password) {
      setLocalError('Password is required')
      return
    }

    const result = await login(password)

    if (!result.success) {
      setLocalError(result.error || 'Invalid password')
      setPassword('')
    }
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      padding: 'clamp(1rem, 3vw, 2rem)'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: 'clamp(2rem, 5vw, 3rem)',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h1 style={{
          fontSize: 'clamp(1.5rem, 4vw, 2rem)',
          fontWeight: '600',
          color: '#1a1a1a',
          marginBottom: 'clamp(0.5rem, 2vw, 1rem)',
          textAlign: 'center',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
          Admin Panel
        </h1>

        <p style={{
          fontSize: 'clamp(0.875rem, 2vw, 1rem)',
          color: '#6b7280',
          marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
          textAlign: 'center'
        }}>
          Enter password to continue
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 'clamp(1rem, 2vw, 1.5rem)' }}>
            <label
              htmlFor="password"
              style={{
                display: 'block',
                fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                fontWeight: '500',
                color: '#374151',
                marginBottom: 'clamp(0.25rem, 1vw, 0.5rem)'
              }}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              placeholder="Enter admin password"
              style={{
                width: '100%',
                padding: 'clamp(0.625rem, 2vw, 0.75rem)',
                fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                outline: 'none',
                transition: 'border-color 0.2s',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
          </div>

          {localError && (
            <div style={{
              backgroundColor: '#fee2e2',
              border: '1px solid #fecaca',
              color: '#dc2626',
              padding: 'clamp(0.625rem, 2vw, 0.75rem)',
              borderRadius: '4px',
              fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
              marginBottom: 'clamp(1rem, 2vw, 1.5rem)'
            }}>
              {localError}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              backgroundColor: loading ? '#9ca3af' : '#3b82f6',
              color: 'white',
              padding: 'clamp(0.625rem, 2vw, 0.75rem)',
              fontSize: 'clamp(0.875rem, 2vw, 1rem)',
              fontWeight: '500',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}
            onMouseEnter={(e) => {
              if (!loading) e.target.style.backgroundColor = '#2563eb'
            }}
            onMouseLeave={(e) => {
              if (!loading) e.target.style.backgroundColor = '#3b82f6'
            }}
          >
            {loading ? 'Authenticating...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
