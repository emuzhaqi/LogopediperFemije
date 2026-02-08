import React, { useState } from 'react'
import { supabase } from '../../utils/supabase'
import ConfirmationModal from './ConfirmationModal'

const AppointmentRow = ({ appointment, onUpdate, showNotification }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedDate, setEditedDate] = useState(appointment.appointment_date)
  const [editedTime, setEditedTime] = useState(appointment.appointment_time)
  const [saving, setSaving] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const timeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00']

  const handleSave = async () => {
    // Validate date
    const selectedDate = new Date(editedDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const dayOfWeek = selectedDate.getDay()

    if (selectedDate < today) {
      if (showNotification) {
        showNotification('Cannot select a past date', 'error')
      } else {
        alert('Cannot select a past date')
      }
      return
    }

    if (dayOfWeek === 0 || dayOfWeek === 6) {
      if (showNotification) {
        showNotification('Cannot select weekends', 'error')
      } else {
        alert('Cannot select weekends')
      }
      return
    }

    setSaving(true)

    try {
      const { error } = await supabase
        .from('appointments')
        .update({
          appointment_date: editedDate,
          appointment_time: editedTime
        })
        .eq('id', appointment.id)

      if (error) throw error

      setIsEditing(false)
      if (showNotification) {
        showNotification('Appointment updated successfully', 'success')
      }
      if (onUpdate) onUpdate()
    } catch (err) {
      console.error('Error updating appointment:', err)
      if (showNotification) {
        showNotification('Failed to save changes', 'error')
      } else {
        alert('Failed to save changes')
      }
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setEditedDate(appointment.appointment_date)
    setEditedTime(appointment.appointment_time)
    setIsEditing(false)
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

  const formatDate = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00')
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <>
      <tr style={{
        borderBottom: '1px solid #e5e7eb',
        transition: 'background-color 0.2s'
      }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
      >
        {/* Date */}
        <td style={{
          padding: 'clamp(0.75rem, 2vw, 1rem)',
          color: '#374151',
          whiteSpace: 'nowrap'
        }}>
          {isEditing ? (
            <input
              type="date"
              value={editedDate}
              onChange={(e) => setEditedDate(e.target.value)}
              style={{
                padding: '0.375rem',
                fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                outline: 'none'
              }}
            />
          ) : (
            formatDate(appointment.appointment_date)
          )}
        </td>

        {/* Time */}
        <td style={{
          padding: 'clamp(0.75rem, 2vw, 1rem)',
          color: '#374151',
          whiteSpace: 'nowrap'
        }}>
          {isEditing ? (
            <select
              value={editedTime}
              onChange={(e) => setEditedTime(e.target.value)}
              style={{
                padding: '0.375rem',
                fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          ) : (
            appointment.appointment_time
          )}
        </td>

        {/* Type */}
        <td style={{
          padding: 'clamp(0.75rem, 2vw, 1rem)',
          color: '#374151',
          whiteSpace: 'nowrap'
        }}>
          {formatAppointmentType(appointment.appointment_type)}
        </td>

        {/* Client Name */}
        <td style={{
          padding: 'clamp(0.75rem, 2vw, 1rem)',
          color: '#374151',
          whiteSpace: 'nowrap'
        }}>
          {appointment.client_name}
        </td>

        {/* Email */}
        <td style={{
          padding: 'clamp(0.75rem, 2vw, 1rem)',
          color: '#374151',
          whiteSpace: 'nowrap'
        }}>
          {appointment.client_email}
        </td>

        {/* Phone */}
        <td style={{
          padding: 'clamp(0.75rem, 2vw, 1rem)',
          color: '#374151',
          whiteSpace: 'nowrap'
        }}>
          {appointment.client_phone}
        </td>

        {/* Status */}
        <td style={{
          padding: 'clamp(0.75rem, 2vw, 1rem)',
          whiteSpace: 'nowrap'
        }}>
          <span style={{
            display: 'inline-block',
            padding: '0.25rem 0.5rem',
            fontSize: 'clamp(0.625rem, 2vw, 0.75rem)',
            fontWeight: '500',
            borderRadius: '9999px',
            backgroundColor: appointment.status === 'confirmed' ? '#d1fae5' : '#fef3c7',
            color: appointment.status === 'confirmed' ? '#065f46' : '#92400e'
          }}>
            {appointment.status === 'confirmed' ? 'Confirmed' : 'Pending'}
          </span>
        </td>

        {/* Actions */}
        <td style={{
          padding: 'clamp(0.75rem, 2vw, 1rem)',
          whiteSpace: 'nowrap'
        }}>
          {isEditing ? (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={handleSave}
                disabled={saving}
                style={{
                  padding: '0.375rem 0.75rem',
                  fontSize: 'clamp(0.625rem, 2vw, 0.75rem)',
                  fontWeight: '500',
                  backgroundColor: saving ? '#9ca3af' : '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: saving ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (!saving) e.target.style.backgroundColor = '#059669'
                }}
                onMouseLeave={(e) => {
                  if (!saving) e.target.style.backgroundColor = '#10b981'
                }}
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={handleCancel}
                disabled={saving}
                style={{
                  padding: '0.375rem 0.75rem',
                  fontSize: 'clamp(0.625rem, 2vw, 0.75rem)',
                  fontWeight: '500',
                  backgroundColor: '#6b7280',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: saving ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (!saving) e.target.style.backgroundColor = '#4b5563'
                }}
                onMouseLeave={(e) => {
                  if (!saving) e.target.style.backgroundColor = '#6b7280'
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => setIsEditing(true)}
                style={{
                  padding: '0.375rem 0.75rem',
                  fontSize: 'clamp(0.625rem, 2vw, 0.75rem)',
                  fontWeight: '500',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}
              >
                Edit
              </button>
              {appointment.status === 'pending' && (
                <button
                  onClick={() => setShowModal(true)}
                  style={{
                    padding: '0.375rem 0.75rem',
                    fontSize: 'clamp(0.625rem, 2vw, 0.75rem)',
                    fontWeight: '500',
                    backgroundColor: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#10b981'}
                >
                  Confirm
                </button>
              )}
            </div>
          )}
        </td>
      </tr>

      {showModal && (
        <ConfirmationModal
          appointment={appointment}
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            if (showNotification) {
              showNotification('Confirmation email sent successfully!', 'success')
            }
            if (onUpdate) onUpdate()
          }}
        />
      )}
    </>
  )
}

export default AppointmentRow
