import React, { useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'

// OPTION 4: Card-Based Slot Selection
const AppointmentOption4 = ({ translations }) => {
  const { language } = useLanguage()
  const t = (key) => translations[language][key] || key

  const [formData, setFormData] = useState({
    type: 'online-consultation',
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    details: ''
  })
  const [showForm, setShowForm] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const timeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']

  const getAvailableDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 0; i < 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      const dayOfWeek = date.getDay()
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        dates.push(date)
      }
    }
    return dates
  }

  const handleSlotSelect = (date, time) => {
    setFormData({ ...formData, date, time })
    setShowForm(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isConsultation = formData.type.includes('consultation')
    if (isConsultation && !formData.details.trim()) {
      setMessage({ type: 'error', text: t('errorMessage') })
      return
    }
    console.log('Appointment:', formData)
    setMessage({ type: 'success', text: t('successMessage') })
    setTimeout(() => {
      setShowForm(false)
      setFormData({ type: 'online-consultation', date: '', time: '', name: '', email: '', phone: '', details: '' })
      setMessage({ type: '', text: '' })
    }, 3000)
  }

  if (showForm) {
    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
        <button
          onClick={() => setShowForm(false)}
          style={{
            padding: '0.5rem 1rem',
            marginBottom: '1rem',
            backgroundColor: 'transparent',
            color: '#3498db',
            border: '1px solid #3498db',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          ← {language === 'en' ? 'Back to slots' : 'Kthehu te oraret'}
        </button>

        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#2c3e50' }}>
            {language === 'en' ? 'Complete Your Booking' : 'Plotëso Rezervimin'}
          </h2>

          <div style={{
            padding: '1rem',
            backgroundColor: '#e8f5e9',
            borderRadius: '4px',
            marginBottom: '1.5rem'
          }}>
            <strong>{language === 'en' ? 'Selected Time:' : 'Koha e Zgjedhur:'}</strong><br />
            {formData.date} at {formData.time}
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  fontSize: '1rem',
                  border: '2px solid #e0e0e0',
                  borderRadius: '4px'
                }}
              >
                <option value="in-person-consultation">{t('inPersonConsultation')}</option>
                <option value="online-consultation">{t('onlineConsultation')}</option>
                <option value="mentoring-meeting">{t('mentoringMeeting')}</option>
              </select>
            </div>

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
              rows="4"
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
                padding: '1rem',
                marginBottom: '1rem',
                backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da',
                color: message.type === 'success' ? '#155724' : '#721c24',
                borderRadius: '4px'
              }}>
                {message.text}
              </div>
            )}

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: '#27ae60',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 'bold'
              }}
            >
              {t('bookAppointment')}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: '1rem', color: '#7f8c8d', fontSize: '0.9rem' }}>
          Option 4: Card-Based Selection
        </p>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#2c3e50', textAlign: 'center' }}>
        {t('pageTitle')}
      </h2>
      <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#7f8c8d' }}>
        {language === 'en' ? 'Select a time slot to book your appointment' : 'Zgjidhni një orar për të rezervuar takimin tuaj'}
      </p>

      {getAvailableDates().map((date, idx) => {
        const dateStr = date.toISOString().split('T')[0]
        const formatted = date.toLocaleDateString(language === 'en' ? 'en-US' : 'sq-AL', {
          weekday: 'long',
          month: 'long',
          day: 'numeric'
        })

        return (
          <div key={idx} style={{
            marginBottom: '2rem',
            padding: '1.5rem',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
          }}>
            <h3 style={{
              fontSize: '1.2rem',
              marginBottom: '1rem',
              color: '#2c3e50',
              borderBottom: '2px solid #3498db',
              paddingBottom: '0.5rem'
            }}>
              📅 {formatted}
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
              gap: '0.8rem'
            }}>
              {timeSlots.map(time => (
                <button
                  key={time}
                  onClick={() => handleSlotSelect(dateStr, time)}
                  style={{
                    padding: '1rem 0.5rem',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    backgroundColor: 'white',
                    color: '#333',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '600',
                    transition: 'all 0.3s',
                    textAlign: 'center'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.borderColor = '#3498db'
                    e.target.style.backgroundColor = '#e3f2fd'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = '#e0e0e0'
                    e.target.style.backgroundColor = 'white'
                  }}
                >
                  🕐 {time}
                </button>
              ))}
            </div>
          </div>
        )
      })}

      <p style={{ textAlign: 'center', marginTop: '2rem', color: '#7f8c8d', fontSize: '0.9rem' }}>
        Option 4: Card-Based Selection
      </p>
    </div>
  )
}

export default AppointmentOption4
