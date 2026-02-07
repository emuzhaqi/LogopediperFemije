import React, { useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'

// OPTION 3: List with Time Slots Side-by-Side
const AppointmentOption3 = ({ translations }) => {
  const { language } = useLanguage()
  const t = (key) => translations[language][key] || key

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

  const getAvailableDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 0; i < 10; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      const dayOfWeek = date.getDay()
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        dates.push(date)
      }
    }
    return dates
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

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#2c3e50', textAlign: 'center' }}>
        {t('pageTitle')}
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        {/* Left: Available Slots */}
        <div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#2c3e50' }}>
            {t('availableSlots')}
          </h3>
          <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
            {getAvailableDates().map((date, idx) => {
              const dateStr = date.toISOString().split('T')[0]
              const formatted = date.toLocaleDateString(language === 'en' ? 'en-US' : 'sq-AL', {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
              })

              return (
                <div key={idx} style={{
                  marginBottom: '1.5rem',
                  padding: '1rem',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                }}>
                  <div style={{
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    marginBottom: '0.8rem',
                    color: '#2c3e50'
                  }}>
                    {formatted}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {timeSlots.map(time => {
                      const isSelected = selectedSlot?.date === dateStr && selectedSlot?.time === time
                      return (
                        <button
                          key={time}
                          onClick={() => setSelectedSlot({ date: dateStr, time })}
                          style={{
                            padding: '0.5rem 1rem',
                            border: isSelected ? '2px solid #3498db' : '1px solid #e0e0e0',
                            borderRadius: '4px',
                            backgroundColor: isSelected ? '#3498db' : 'white',
                            color: isSelected ? 'white' : '#333',
                            cursor: 'pointer',
                            fontSize: '0.9rem'
                          }}
                        >
                          {time}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right: Form */}
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          position: 'sticky',
          top: '100px',
          height: 'fit-content'
        }}>
          {selectedSlot && (
            <div style={{
              padding: '1rem',
              backgroundColor: '#e3f2fd',
              borderRadius: '4px',
              marginBottom: '1.5rem',
              fontSize: '0.9rem'
            }}>
              <strong>{language === 'en' ? 'Selected:' : 'Zgjedhur:'}</strong><br />
              {selectedSlot.date} at {selectedSlot.time}
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
                fontSize: '1rem',
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
                fontSize: '1rem',
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
                fontSize: '1rem',
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
                fontSize: '1rem',
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
                fontSize: '1rem',
                border: '2px solid #e0e0e0',
                borderRadius: '4px',
                fontFamily: 'Arial, sans-serif'
              }}
            />
            {formData.type.includes('consultation') && (
              <small style={{ color: '#e74c3c', display: 'block', marginBottom: '1rem' }}>
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
                fontSize: '0.9rem'
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
                backgroundColor: selectedSlot ? '#3498db' : '#ccc',
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
        Option 3: List with Time Slots
      </p>
    </div>
  )
}

export default AppointmentOption3
