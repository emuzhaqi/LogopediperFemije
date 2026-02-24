import React, { useState, useEffect } from 'react'
import { supabase } from '../../utils/supabase'

const BlockedDates = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDates, setSelectedDates] = useState([]) // array of 'YYYY-MM-DD' strings
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  useEffect(() => {
    const fetchBlockedDates = async () => {
      try {
        const { data, error } = await supabase
          .from('blocked_dates')
          .select('blocked_date')
        if (error) throw error
        setSelectedDates(data.map(row => row.blocked_date))
      } catch (error) {
        console.error('Error fetching blocked dates:', error)
      }
    }
    fetchBlockedDates()
  }, [])

  const toDateStr = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const isDateDisabled = (date) => {
    if (!date) return true
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const maxDate = new Date(today)
    maxDate.setDate(today.getDate() + 31)
    const dayOfWeek = date.getDay()
    if (date < today) return true
    if (date > maxDate) return true
    if (dayOfWeek === 0 || dayOfWeek === 6) return true
    return false
  }

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }
    return days
  }

  const handleDateClick = (date) => {
    if (!date || isDateDisabled(date)) return
    const dateStr = toDateStr(date)
    setSelectedDates(prev =>
      prev.includes(dateStr)
        ? prev.filter(d => d !== dateStr)
        : [...prev, dateStr]
    )
  }

  const handleRemoveDate = (dateStr) => {
    setSelectedDates(prev => prev.filter(d => d !== dateStr))
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage({ type: '', text: '' })
    try {
      // Delete all existing blocked dates then insert current selection
      const { error: deleteError } = await supabase
        .from('blocked_dates')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000') // delete all rows

      if (deleteError) throw deleteError

      if (selectedDates.length > 0) {
        const rows = selectedDates.map(d => ({ blocked_date: d }))
        const { error: insertError } = await supabase
          .from('blocked_dates')
          .insert(rows)
        if (insertError) throw insertError
      }

      setMessage({ type: 'success', text: 'Blocked dates saved successfully.' })
    } catch (error) {
      console.error('Error saving blocked dates:', error)
      setMessage({ type: 'error', text: 'Failed to save blocked dates. Please try again.' })
    } finally {
      setSaving(false)
    }
  }

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December']
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const sortedSelected = [...selectedDates].sort()

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      marginBottom: 'clamp(1rem, 3vw, 2rem)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header / toggle */}
      <button
        onClick={() => setIsOpen(v => !v)}
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
          Blocked Dates
        </h2>
        <span style={{ fontSize: '1.25rem', color: '#6b7280' }}>
          {isOpen ? '▲' : '▼'}
        </span>
      </button>

      {isOpen && (
      <div style={{ padding: '0 clamp(1rem, 3vw, 1.5rem) clamp(1rem, 3vw, 1.5rem)' }}>

      {/* Month Navigation */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem'
      }}>
        <button
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
          style={{
            padding: '0.4rem 0.75rem',
            backgroundColor: 'transparent',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem',
            color: '#6b7280'
          }}
        >
          ‹
        </button>
        <span style={{ fontWeight: '600', fontSize: '1rem', color: '#1a1a1a' }}>
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </span>
        <button
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
          style={{
            padding: '0.4rem 0.75rem',
            backgroundColor: 'transparent',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem',
            color: '#6b7280'
          }}
        >
          ›
        </button>
      </div>

      {/* Calendar Grid */}
      <div style={{ maxWidth: '340px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '4px',
          marginBottom: '4px'
        }}>
          {dayNames.map(d => (
            <div key={d} style={{
              textAlign: 'center',
              fontSize: '0.75rem',
              fontWeight: '600',
              color: '#9ca3af',
              padding: '0.4rem 0'
            }}>
              {d}
            </div>
          ))}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '4px'
        }}>
          {getDaysInMonth(currentMonth).map((date, idx) => {
            const disabled = !date || isDateDisabled(date)
            const dateStr = date ? toDateStr(date) : null
            const isBlocked = dateStr && selectedDates.includes(dateStr)

            return (
              <button
                key={idx}
                onClick={() => handleDateClick(date)}
                disabled={disabled}
                style={{
                  padding: '0.5rem',
                  border: isBlocked ? '2px solid #dc2626' : '1px solid transparent',
                  borderRadius: '4px',
                  backgroundColor: isBlocked ? '#dc2626' : (!disabled ? 'white' : 'transparent'),
                  color: isBlocked ? 'white' : (!disabled ? '#1a1a1a' : '#d1d5db'),
                  cursor: disabled ? (date ? 'not-allowed' : 'default') : 'pointer',
                  fontSize: '0.85rem',
                  fontWeight: isBlocked ? '600' : 'normal',
                  transition: 'all 0.15s'
                }}
                onMouseEnter={(e) => {
                  if (!disabled && !isBlocked) e.target.style.backgroundColor = '#fee2e2'
                }}
                onMouseLeave={(e) => {
                  if (!disabled && !isBlocked) e.target.style.backgroundColor = 'white'
                }}
              >
                {date ? date.getDate() : ''}
              </button>
            )
          })}
        </div>
      </div>

      {/* Blocked dates list */}
      {sortedSelected.length > 0 && (
        <div style={{ marginTop: '1.5rem' }}>
          <h3 style={{
            fontSize: '0.9rem',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '0.75rem'
          }}>
            Currently blocked ({sortedSelected.length})
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {sortedSelected.map(dateStr => (
              <span
                key={dateStr}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.3rem 0.75rem',
                  backgroundColor: '#fee2e2',
                  color: '#991b1b',
                  borderRadius: '9999px',
                  fontSize: '0.85rem',
                  fontWeight: '500'
                }}
              >
                {dateStr}
                <button
                  onClick={() => handleRemoveDate(dateStr)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#991b1b',
                    fontWeight: '700',
                    fontSize: '1rem',
                    lineHeight: 1,
                    padding: 0
                  }}
                  title="Remove"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Message */}
      {message.text && (
        <div style={{
          marginTop: '1rem',
          padding: '0.75rem',
          backgroundColor: message.type === 'success' ? '#d1fae5' : '#fee2e2',
          color: message.type === 'success' ? '#065f46' : '#991b1b',
          borderRadius: '6px',
          fontSize: '0.875rem'
        }}>
          {message.text}
        </div>
      )}

      {/* Save button */}
      <button
        onClick={handleSave}
        disabled={saving}
        style={{
          marginTop: '1.25rem',
          padding: '0.625rem 1.5rem',
          backgroundColor: saving ? '#9ca3af' : '#1a1a1a',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: saving ? 'not-allowed' : 'pointer',
          fontSize: '0.875rem',
          fontWeight: '600',
          transition: 'background-color 0.2s'
        }}
        onMouseEnter={(e) => { if (!saving) e.target.style.backgroundColor = '#374151' }}
        onMouseLeave={(e) => { if (!saving) e.target.style.backgroundColor = '#1a1a1a' }}
      >
        {saving ? 'Saving...' : 'Save blocked dates'}
      </button>
      </div>
      )}
    </div>
  )
}

export default BlockedDates
