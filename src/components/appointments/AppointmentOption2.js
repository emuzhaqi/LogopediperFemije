import React, { useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'

// OPTION 2: Step-by-Step Wizard Style
const AppointmentOption2 = ({ translations }) => {
  const { language } = useLanguage()
  const t = (key) => translations[language][key] || key

  const [step, setStep] = useState(1)
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
    for (let i = 0; i < 21; i++) {
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
      setStep(1)
      setFormData({ type: 'online-consultation', date: '', time: '', name: '', email: '', phone: '', details: '' })
      setMessage({ type: '', text: '' })
    }, 3000)
  }

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#2c3e50' }}>
              {t('appointmentType')}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { value: 'in-person-consultation', label: t('inPersonConsultation'), icon: '👥' },
                { value: 'online-consultation', label: t('onlineConsultation'), icon: '💻' },
                { value: 'mentoring-meeting', label: t('mentoringMeeting'), icon: '🎓' }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => {
                    setFormData({ ...formData, type: option.value })
                    setStep(2)
                  }}
                  style={{
                    padding: '1.5rem',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    backgroundColor: formData.type === option.value ? '#e3f2fd' : 'white',
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                    textAlign: 'left',
                    transition: 'all 0.3s'
                  }}
                >
                  <span style={{ fontSize: '2rem', marginRight: '1rem' }}>{option.icon}</span>
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )

      case 2:
        return (
          <div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#2c3e50' }}>
              {t('selectDate')}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.8rem', marginBottom: '1.5rem' }}>
              {getAvailableDates().map((date, idx) => {
                const dateStr = date.toISOString().split('T')[0]
                const formatted = date.toLocaleDateString(language === 'en' ? 'en-US' : 'sq-AL', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric'
                })
                const isSelected = formData.date === dateStr
                return (
                  <button
                    key={idx}
                    onClick={() => setFormData({ ...formData, date: dateStr })}
                    style={{
                      padding: '1rem',
                      border: isSelected ? '2px solid #3498db' : '1px solid #e0e0e0',
                      borderRadius: '4px',
                      backgroundColor: isSelected ? '#3498db' : 'white',
                      color: isSelected ? 'white' : '#333',
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}
                  >
                    {formatted}
                  </button>
                )
              })}
            </div>
            <button
              onClick={() => formData.date && setStep(3)}
              disabled={!formData.date}
              style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: formData.date ? '#3498db' : '#ccc',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: formData.date ? 'pointer' : 'not-allowed',
                fontSize: '1rem',
                fontWeight: 'bold'
              }}
            >
              {language === 'en' ? 'Next' : 'Vazhdo'}
            </button>
          </div>
        )

      case 3:
        return (
          <div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#2c3e50' }}>
              {t('selectTime')}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.8rem', marginBottom: '1.5rem' }}>
              {timeSlots.map(time => {
                const isSelected = formData.time === time
                return (
                  <button
                    key={time}
                    onClick={() => setFormData({ ...formData, time })}
                    style={{
                      padding: '1rem',
                      border: isSelected ? '2px solid #3498db' : '1px solid #e0e0e0',
                      borderRadius: '4px',
                      backgroundColor: isSelected ? '#3498db' : 'white',
                      color: isSelected ? 'white' : '#333',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontWeight: 'bold'
                    }}
                  >
                    {time}
                  </button>
                )
              })}
            </div>
            <button
              onClick={() => formData.time && setStep(4)}
              disabled={!formData.time}
              style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: formData.time ? '#3498db' : '#ccc',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: formData.time ? 'pointer' : 'not-allowed',
                fontSize: '1rem',
                fontWeight: 'bold'
              }}
            >
              {language === 'en' ? 'Next' : 'Vazhdo'}
            </button>
          </div>
        )

      case 4:
        return (
          <div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#2c3e50' }}>
              {language === 'en' ? 'Your Information' : 'Informacioni Juaj'}
            </h3>
            <form onSubmit={handleSubmit}>
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
        )

      default:
        return null
    }
  }

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '2rem' }}>
      <div style={{
        backgroundColor: 'white',
        padding: '3rem',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#2c3e50', textAlign: 'center' }}>
          {t('pageTitle')}
        </h2>

        {/* Progress Steps */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
          {[1, 2, 3, 4].map(s => (
            <div key={s} style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: step >= s ? '#3498db' : '#e0e0e0',
              color: step >= s ? 'white' : '#999',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold'
            }}>
              {s}
            </div>
          ))}
        </div>

        {renderStep()}

        {step > 1 && step < 4 && (
          <button
            onClick={() => setStep(step - 1)}
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1.5rem',
              backgroundColor: 'transparent',
              color: '#3498db',
              border: '1px solid #3498db',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {language === 'en' ? 'Back' : 'Prapa'}
          </button>
        )}
      </div>

      <p style={{ textAlign: 'center', marginTop: '1rem', color: '#7f8c8d', fontSize: '0.9rem' }}>
        Option 2: Step-by-Step Wizard
      </p>
    </div>
  )
}

export default AppointmentOption2
