import React, { useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'

// OPTION 1: Simple Dropdown Style
const AppointmentOption1 = ({ translations }) => {
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
  const [message, setMessage] = useState({ type: '', text: '' })

  const timeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']

  const getAvailableDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 0; i < 30; i++) {
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
    const isConsultation = formData.type.includes('consultation')
    if (isConsultation && !formData.details.trim()) {
      setMessage({ type: 'error', text: t('errorMessage') })
      return
    }
    console.log('Appointment:', formData)
    setMessage({ type: 'success', text: t('successMessage') })
    setTimeout(() => {
      setFormData({ type: 'online-consultation', date: '', time: '', name: '', email: '', phone: '', details: '' })
      setMessage({ type: '', text: '' })
    }, 3000)
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
      <div style={{
        backgroundColor: 'white',
        padding: '3rem',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#2c3e50', textAlign: 'center' }}>
          {t('pageTitle')}
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#2c3e50' }}>
              {t('appointmentType')} *
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              style={{
                width: '100%',
                padding: '0.8rem',
                fontSize: '1rem',
                border: '2px solid #e0e0e0',
                borderRadius: '4px',
                backgroundColor: 'white'
              }}
            >
              <option value="in-person-consultation">{t('inPersonConsultation')}</option>
              <option value="online-consultation">{t('onlineConsultation')}</option>
              <option value="mentoring-meeting">{t('mentoringMeeting')}</option>
            </select>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#2c3e50' }}>
              {t('selectDate')} *
            </label>
            <select
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '0.8rem',
                fontSize: '1rem',
                border: '2px solid #e0e0e0',
                borderRadius: '4px',
                backgroundColor: 'white'
              }}
            >
              <option value="">{t('selectDate')}</option>
              {getAvailableDates().map((date, idx) => {
                const dateStr = date.toISOString().split('T')[0]
                const formatted = date.toLocaleDateString(language === 'en' ? 'en-US' : 'sq-AL', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric'
                })
                return <option key={idx} value={dateStr}>{formatted}</option>
              })}
            </select>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#2c3e50' }}>
              {t('selectTime')} *
            </label>
            <select
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '0.8rem',
                fontSize: '1rem',
                border: '2px solid #e0e0e0',
                borderRadius: '4px',
                backgroundColor: 'white'
              }}
            >
              <option value="">{t('selectTime')}</option>
              {timeSlots.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#2c3e50' }}>
              {t('yourName')} *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '0.8rem',
                fontSize: '1rem',
                border: '2px solid #e0e0e0',
                borderRadius: '4px'
              }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#2c3e50' }}>
              {t('yourEmail')} *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '0.8rem',
                fontSize: '1rem',
                border: '2px solid #e0e0e0',
                borderRadius: '4px'
              }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#2c3e50' }}>
              {t('yourPhone')} *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '0.8rem',
                fontSize: '1rem',
                border: '2px solid #e0e0e0',
                borderRadius: '4px'
              }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#2c3e50' }}>
              {t('details')} {formData.type.includes('consultation') && '*'}
            </label>
            <textarea
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              required={formData.type.includes('consultation')}
              placeholder={t('detailsPlaceholder')}
              rows="4"
              style={{
                width: '100%',
                padding: '0.8rem',
                fontSize: '1rem',
                border: '2px solid #e0e0e0',
                borderRadius: '4px',
                fontFamily: 'Arial, sans-serif'
              }}
            />
            {formData.type.includes('consultation') && (
              <small style={{ color: '#e74c3c' }}>{t('detailsRequired')}</small>
            )}
          </div>

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
              fontSize: '1.1rem',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            {t('bookAppointment')}
          </button>
        </form>
      </div>

      <p style={{ textAlign: 'center', marginTop: '1rem', color: '#7f8c8d', fontSize: '0.9rem' }}>
        Option 1: Simple Dropdown Style
      </p>
    </div>
  )
}

export default AppointmentOption1
