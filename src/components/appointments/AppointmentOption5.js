import React, { useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'

// OPTION 5: Compact Table View
const AppointmentOption5 = ({ translations }) => {
  const { language } = useLanguage()
  const t = (key) => translations[language][key] || key

  const [selectedWeek, setSelectedWeek] = useState(0)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [formData, setFormData] = useState({
    type: 'online-consultation',
    name: '',
    email: '',
    phone: '',
    details: ''
  })
  const [message, setMessage] = useState({ type: '', text: '' })

  const timeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']

  const getWeekDays = (weekOffset) => {
    const days = []
    const today = new Date()
    const startDate = new Date(today)
    startDate.setDate(today.getDate() + (weekOffset * 5))

    let daysAdded = 0
    let currentDate = new Date(startDate)

    while (daysAdded < 5) {
      const dayOfWeek = currentDate.getDay()
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        days.push(new Date(currentDate))
        daysAdded++
      }
      currentDate.setDate(currentDate.getDate() + 1)
    }
    return days
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!selectedSlot) {
      setMessage({ type: 'error', text: t('selectTimeSlot') })
      return
    }
    const isConsultation = formData.type.includes('consultation')
    if (isConsultation && !formData.details.trim()) {
      setMessage({ type: 'error', text: t('errorMessage') })
      return
    }
    console.log('Appointment:', { ...formData, ...selectedSlot })
    setMessage({ type: 'success', text: t('successMessage') })
    setTimeout(() => {
      setSelectedSlot(null)
      setFormData({ type: 'online-consultation', name: '', email: '', phone: '', details: '' })
      setMessage({ type: '', text: '' })
    }, 3000)
  }

  const weekDays = getWeekDays(selectedWeek)

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#2c3e50', textAlign: 'center' }}>
        {t('pageTitle')}
      </h2>

      {/* Week Navigation */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <button
          onClick={() => setSelectedWeek(Math.max(0, selectedWeek - 1))}
          disabled={selectedWeek === 0}
          style={{
            padding: '0.5rem 1.5rem',
            backgroundColor: selectedWeek === 0 ? '#ccc' : '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: selectedWeek === 0 ? 'not-allowed' : 'pointer'
          }}
        >
          ← {language === 'en' ? 'Previous Week' : 'Java e Kaluar'}
        </button>
        <button
          onClick={() => setSelectedWeek(selectedWeek + 1)}
          style={{
            padding: '0.5rem 1.5rem',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {language === 'en' ? 'Next Week' : 'Java Tjetër'} →
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '2rem' }}>
        {/* Table View */}
        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
          overflowX: 'auto'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{
                  padding: '0.8rem',
                  textAlign: 'left',
                  borderBottom: '2px solid #e0e0e0',
                  color: '#2c3e50',
                  fontSize: '0.9rem'
                }}>
                  {language === 'en' ? 'Time' : 'Ora'}
                </th>
                {weekDays.map((day, idx) => (
                  <th key={idx} style={{
                    padding: '0.8rem',
                    textAlign: 'center',
                    borderBottom: '2px solid #e0e0e0',
                    color: '#2c3e50',
                    fontSize: '0.85rem'
                  }}>
                    {day.toLocaleDateString(language === 'en' ? 'en-US' : 'sq-AL', {
                      weekday: 'short',
                      month: 'numeric',
                      day: 'numeric'
                    })}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map(time => (
                <tr key={time}>
                  <td style={{
                    padding: '0.5rem 0.8rem',
                    borderBottom: '1px solid #f0f0f0',
                    fontWeight: '600',
                    color: '#555',
                    fontSize: '0.9rem'
                  }}>
                    {time}
                  </td>
                  {weekDays.map((day, idx) => {
                    const dateStr = day.toISOString().split('T')[0]
                    const isSelected = selectedSlot?.date === dateStr && selectedSlot?.time === time
                    return (
                      <td key={idx} style={{
                        padding: '0.5rem',
                        borderBottom: '1px solid #f0f0f0',
                        textAlign: 'center'
                      }}>
                        <button
                          onClick={() => setSelectedSlot({ date: dateStr, time })}
                          style={{
                            width: '100%',
                            padding: '0.5rem',
                            border: isSelected ? '2px solid #27ae60' : '1px solid #e0e0e0',
                            borderRadius: '4px',
                            backgroundColor: isSelected ? '#27ae60' : '#f9f9f9',
                            color: isSelected ? 'white' : '#333',
                            cursor: 'pointer',
                            fontSize: '0.75rem',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            if (!isSelected) {
                              e.target.style.backgroundColor = '#e8f5e9'
                              e.target.style.borderColor = '#27ae60'
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isSelected) {
                              e.target.style.backgroundColor = '#f9f9f9'
                              e.target.style.borderColor = '#e0e0e0'
                            }
                          }}
                        >
                          ✓
                        </button>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Form */}
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
          height: 'fit-content',
          position: 'sticky',
          top: '100px'
        }}>
          {selectedSlot && (
            <div style={{
              padding: '1rem',
              backgroundColor: '#e8f5e9',
              borderRadius: '4px',
              marginBottom: '1.5rem',
              fontSize: '0.9rem'
            }}>
              <strong>✓ {language === 'en' ? 'Selected:' : 'Zgjedhur:'}</strong><br />
              {selectedSlot.date}<br />
              {selectedSlot.time}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              style={{
                width: '100%',
                padding: '0.8rem',
                marginBottom: '1rem',
                fontSize: '0.95rem',
                border: '2px solid #e0e0e0',
                borderRadius: '4px'
              }}
            >
              <option value="in-person-consultation">{t('inPersonConsultation')}</option>
              <option value="online-consultation">{t('onlineConsultation')}</option>
              <option value="mentoring-meeting">{t('mentoringMeeting')}</option>
            </select>

            <input
              type="text"
              placeholder={t('yourName')}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '0.8rem',
                marginBottom: '1rem',
                fontSize: '0.95rem',
                border: '2px solid #e0e0e0',
                borderRadius: '4px'
              }}
            />

            <input
              type="email"
              placeholder={t('yourEmail')}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '0.8rem',
                marginBottom: '1rem',
                fontSize: '0.95rem',
                border: '2px solid #e0e0e0',
                borderRadius: '4px'
              }}
            />

            <input
              type="tel"
              placeholder={t('yourPhone')}
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '0.8rem',
                marginBottom: '1rem',
                fontSize: '0.95rem',
                border: '2px solid #e0e0e0',
                borderRadius: '4px'
              }}
            />

            <textarea
              placeholder={t('details')}
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              required={formData.type.includes('consultation')}
              rows="3"
              style={{
                width: '100%',
                padding: '0.8rem',
                marginBottom: '0.5rem',
                fontSize: '0.95rem',
                border: '2px solid #e0e0e0',
                borderRadius: '4px',
                fontFamily: 'Arial, sans-serif'
              }}
            />
            {formData.type.includes('consultation') && (
              <small style={{ color: '#e74c3c', display: 'block', marginBottom: '1rem', fontSize: '0.85rem' }}>
                {t('detailsRequired')}
              </small>
            )}

            {message.text && (
              <div style={{
                padding: '0.8rem',
                marginBottom: '1rem',
                backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da',
                color: message.type === 'success' ? '#155724' : '#721c24',
                borderRadius: '4px',
                fontSize: '0.85rem'
              }}>
                {message.text}
              </div>
            )}

            <button
              type="submit"
              disabled={!selectedSlot}
              style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: selectedSlot ? '#27ae60' : '#ccc',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: selectedSlot ? 'pointer' : 'not-allowed',
                fontSize: '1rem',
                fontWeight: 'bold'
              }}
            >
              {t('bookAppointment')}
            </button>
          </form>
        </div>
      </div>

      <p style={{ textAlign: 'center', marginTop: '2rem', color: '#7f8c8d', fontSize: '0.9rem' }}>
        Option 5: Compact Table View
      </p>
    </div>
  )
}

export default AppointmentOption5
