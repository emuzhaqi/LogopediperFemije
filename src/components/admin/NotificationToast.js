import React, { useEffect } from 'react'

const NotificationToast = ({ message, type = 'success', duration = 3000, onClose }) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        if (onClose) onClose()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [duration, onClose])

  const styles = {
    success: {
      backgroundColor: '#d1fae5',
      borderColor: '#6ee7b7',
      color: '#065f46'
    },
    error: {
      backgroundColor: '#fee2e2',
      borderColor: '#fca5a5',
      color: '#991b1b'
    },
    info: {
      backgroundColor: '#dbeafe',
      borderColor: '#93c5fd',
      color: '#1e40af'
    }
  }

  const currentStyle = styles[type] || styles.info

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 9999,
      minWidth: '300px',
      maxWidth: '500px',
      backgroundColor: currentStyle.backgroundColor,
      border: `2px solid ${currentStyle.borderColor}`,
      borderRadius: '8px',
      padding: 'clamp(0.75rem, 2vw, 1rem)',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
      animation: 'slideIn 0.3s ease-out',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
      `}</style>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <div style={{
          fontSize: 'clamp(0.875rem, 2vw, 1rem)',
          fontWeight: '500',
          color: currentStyle.color,
          flex: 1
        }}>
          {message}
        </div>

        {onClose && (
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: currentStyle.color,
              cursor: 'pointer',
              fontSize: '1.25rem',
              fontWeight: 'bold',
              padding: '0',
              lineHeight: '1',
              opacity: 0.7,
              transition: 'opacity 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.opacity = '1'}
            onMouseLeave={(e) => e.target.style.opacity = '0.7'}
            aria-label="Close"
          >
            ×
          </button>
        )}
      </div>
    </div>
  )
}

export default NotificationToast
