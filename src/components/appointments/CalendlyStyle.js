import React, { useState, useEffect } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { supabase } from '../../utils/supabase'

const CalendlyStyle = ({ translations }) => {
  const { language } = useLanguage()
  const t = (key) => translations[language][key] || key

  const introText = {
    en: {
      intro: "If these thoughts have ever crossed your mind:",
      q1: "When will my child start speaking?",
      q2: "Is my child communicating enough?",
      q3: "How can I best support them?",
      q4: "Will growing up bilingual affect their development?",
      moreQuestions: "…and so many more—",
      newParent: "Or if you are a new parent who simply wants to learn, understand, and walk more mindfully beside your child during the beautiful journey of communication, speech, and language development—",
      connect: "Then I would truly love to connect and talk with you.",
      together: "Together, we can explore your questions, your concerns, and your child's unique path, in a safe and supportive space.",
      whatsapp: "Once you choose a date that feels right for you, you will receive a WhatsApp message with all the details explained step by step.",
      thanks: "Thank you from the heart for your trust.",
      fee: "Consultation fee: 35 euros."
    },
    sq: {
      intro: "Nëse këto pyetje ju kanë shkuar ndonjëherë nëpër mend:",
      q1: "Kur do të fillojë fëmija im të flasë?",
      q2: "A po komunikon mjaftueshëm fëmija im?",
      q3: "Si mund ta mbështes më mirë?",
      q4: "A do të ndikojë rritja dy-gjuhëshe në zhvillimin e tyre?",
      moreQuestions: "…dhe shumë të tjera—",
      newParent: "Ose nëse jeni prind i ri që thjesht dëshiron të mësojë, të kuptojë dhe të ecë me më shumë vëmendje pranë fëmijës tuaj gjatë udhëtimit të bukur të komunikimit, të folurit dhe zhvillimit të gjuhës—",
      connect: "Atëherë do të doja vërtet të lidhem dhe të bisedoj me ju.",
      together: "Së bashku, mund të eksplorojmë pyetjet tuaja, shqetësimet tuaja dhe rrugën unike të fëmijës tuaj, në një hapësirë të sigurt dhe mbështetëse.",
      whatsapp: "Pasi të zgjidhni një datë që ju duket e përshtatshme, do të merrni një mesazh në WhatsApp me të gjitha detajet të shpjeguara hap pas hapi.",
      thanks: "Faleminderit nga zemra për besimin tuaj.",
      fee: "Tarifa e konsultimit: 35 euro."
    }
  }

  const intro = introText[language]

  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [step, setStep] = useState(1) // 1: date, 2: form
  const [formData, setFormData] = useState({
    type: 'online-consultation',
    name: '',
    email: '',
    phone: '',
    details: ''
  })
  const [message, setMessage] = useState({ type: '', text: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [blockedDates, setBlockedDates] = useState([])

  useEffect(() => {
    const fetchBlockedDates = async () => {
      try {
        const { data, error } = await supabase
          .from('blocked_dates')
          .select('blocked_date')
        if (error) throw error
        setBlockedDates(data.map(row => row.blocked_date))
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

  const getToday = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return today
  }

  const isDateDisabled = (date) => {
    if (!date) return true
    const today = getToday()
    const maxDate = new Date(today)
    maxDate.setDate(today.getDate() + 14)
    const dayOfWeek = date.getDay()
    if (date < today) return true
    if (date > maxDate) return true
    if (dayOfWeek === 0 || dayOfWeek === 6) return true
    if (blockedDates.includes(toDateStr(date))) return true
    return false
  }

  // Get days in month
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

  const formatDate = (date) => {
    if (!date) return ''
    return date.toLocaleDateString(language === 'en' ? 'en-US' : 'sq-AL', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
    setSelectedDate(null)
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
    setSelectedDate(null)
  }

  const handleDateClick = (date) => {
    if (!isDateDisabled(date)) {
      setSelectedDate(date)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Re-validate date on submit
    if (!selectedDate || isDateDisabled(selectedDate)) {
      setMessage({
        type: 'error',
        text: language === 'en'
          ? 'The selected date is not available. Please choose another date.'
          : 'Data e zgjedhur nuk është e disponueshme. Ju lutemi zgjidhni një datë tjetër.'
      })
      return
    }

    const isConsultation = formData.type.includes('consultation')
    if (isConsultation && !formData.details.trim()) {
      setMessage({ type: 'error', text: t('errorMessage') })
      return
    }

    setIsSubmitting(true)
    setMessage({ type: '', text: '' })

    try {
      const dateStr = toDateStr(selectedDate)

      const appointmentData = {
        appointment_type: formData.type,
        appointment_date: dateStr,
        appointment_time: null,
        client_name: formData.name,
        client_email: formData.email,
        client_phone: formData.phone,
        details: formData.details || null,
        status: 'pending'
      }

      const { error } = await supabase
        .from('appointments')
        .insert([appointmentData])

      if (error) throw error

      setMessage({ type: 'success', text: t('successMessage') })

      setTimeout(() => {
        setStep(1)
        setSelectedDate(null)
        setFormData({ type: 'online-consultation', name: '', email: '', phone: '', details: '' })
        setMessage({ type: '', text: '' })
        setIsSubmitting(false)
      }, 3000)
    } catch (error) {
      console.error('Error booking appointment:', error)
      setMessage({
        type: 'error',
        text: language === 'en'
          ? 'Failed to book appointment. Please try again.'
          : 'Dështoi rezervimi. Ju lutemi provoni përsëri.'
      })
      setIsSubmitting(false)
    }
  }

  const monthNames = language === 'en'
    ? ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    : ['Janar', 'Shkurt', 'Mars', 'Prill', 'Maj', 'Qershor', 'Korrik', 'Gusht', 'Shtator', 'Tetor', 'Nëntor', 'Dhjetor']

  const dayNames = language === 'en'
    ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    : ['Die', 'Hën', 'Mar', 'Mër', 'Enj', 'Pre', 'Sht']

  if (step === 2) {
    return (
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '2rem',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '2.5rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
        }}>
          <button
            onClick={() => setStep(1)}
            style={{
              marginBottom: '1.5rem',
              padding: '0.5rem 1rem',
              backgroundColor: 'transparent',
              color: '#006bff',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}
          >
            ← {language === 'en' ? 'Back' : 'Prapa'}
          </button>

          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            marginBottom: '0.5rem',
            color: '#1a1a1a'
          }}>
            {language === 'en' ? 'Enter Details' : 'Vendos Detajet'}
          </h2>

          <div style={{
            padding: '1rem',
            backgroundColor: '#f0f7ff',
            borderRadius: '6px',
            marginBottom: '1.5rem',
            fontSize: '0.9rem',
            color: '#0d47a1'
          }}>
            <div style={{ fontWeight: '600' }}>
              {formatDate(selectedDate)}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.9rem',
                fontWeight: '500',
                color: '#4a4a4a'
              }}>
                {t('appointmentType')} *
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  fontSize: '1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  backgroundColor: 'white',
                  color: '#1a1a1a'
                }}
              >
                <option value="in-person-consultation">{t('inPersonConsultation')}</option>
                <option value="online-consultation">{t('onlineConsultation')}</option>
                <option value="mentoring-meeting">{t('mentoringMeeting')}</option>
              </select>
            </div>

            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.9rem',
                fontWeight: '500',
                color: '#4a4a4a'
              }}>
                {t('yourName')} *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  fontSize: '1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px'
                }}
              />
            </div>

            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.9rem',
                fontWeight: '500',
                color: '#4a4a4a'
              }}>
                {t('yourEmail')} *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  fontSize: '1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px'
                }}
              />
            </div>

            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.9rem',
                fontWeight: '500',
                color: '#4a4a4a'
              }}>
                {t('yourPhone')} *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  fontSize: '1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px'
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.9rem',
                fontWeight: '500',
                color: '#4a4a4a'
              }}>
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
                  padding: '0.75rem',
                  fontSize: '1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontFamily: 'inherit',
                  resize: 'vertical'
                }}
              />
              {formData.type.includes('consultation') && (
                <small style={{ color: '#dc2626', fontSize: '0.85rem' }}>
                  {t('detailsRequired')}
                </small>
              )}
            </div>

            {message.text && (
              <div style={{
                padding: '0.75rem',
                marginBottom: '1rem',
                backgroundColor: message.type === 'success' ? '#d1fae5' : '#fee2e2',
                color: message.type === 'success' ? '#065f46' : '#991b1b',
                borderRadius: '6px',
                fontSize: '0.9rem'
              }}>
                {message.text}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: '100%',
                padding: '0.875rem',
                fontSize: '1rem',
                fontWeight: '600',
                backgroundColor: isSubmitting ? '#ccc' : '#006bff',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => { if (!isSubmitting) e.target.style.backgroundColor = '#0056d2' }}
              onMouseLeave={(e) => { if (!isSubmitting) e.target.style.backgroundColor = '#006bff' }}
            >
              {isSubmitting
                ? (language === 'en' ? 'Booking...' : 'Duke rezervuar...')
                : (language === 'en' ? 'Schedule Event' : 'Rezervo Takimin')
              }
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      maxWidth: '900px',
      margin: '0 auto',
      padding: 'clamp(1rem, 4vw, 2rem)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      {/* Introduction Text */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: 'clamp(1.5rem, 4vw, 2.5rem)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        lineHeight: '1.7',
        color: '#374151',
        fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)',
        marginBottom: 'clamp(1rem, 3vw, 2rem)'
      }}>
          <p style={{ marginBottom: '1rem', fontStyle: 'italic' }}>{intro.intro}</p>

          <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem', listStyle: 'none' }}>
            <li style={{ marginBottom: '0.5rem' }}>• {intro.q1}</li>
            <li style={{ marginBottom: '0.5rem' }}>• {intro.q2}</li>
            <li style={{ marginBottom: '0.5rem' }}>• {intro.q3}</li>
            <li style={{ marginBottom: '0.5rem' }}>• {intro.q4}</li>
          </ul>

          <p style={{ marginBottom: '1rem', fontStyle: 'italic' }}>{intro.moreQuestions}</p>

          <p style={{ marginBottom: '1.5rem' }}>{intro.newParent}</p>

          <p style={{ marginBottom: '1.5rem', fontWeight: '500', color: '#1a1a1a' }}>{intro.connect}</p>

          <p style={{ marginBottom: '1.5rem' }}>{intro.together}</p>

          <p style={{ marginBottom: '1.5rem', fontSize: '0.9rem', color: '#6b7280' }}>{intro.whatsapp}</p>

          <p style={{ marginBottom: '1.5rem', fontStyle: 'italic', color: '#374151' }}>{intro.thanks}</p>

          <div style={{
            padding: '1rem',
            backgroundColor: '#f0f7ff',
            borderRadius: '6px',
            borderLeft: '4px solid #006bff',
            fontWeight: '600',
            color: '#006bff'
          }}>
            {intro.fee}
          </div>
      </div>

      {/* Calendar Section */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
      }}>
        <div style={{ padding: 'clamp(1rem, 3vw, 2rem)' }}>
          <h2 style={{
            fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
            fontWeight: '600',
            marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
            color: '#1a1a1a'
          }}>
            {language === 'en' ? 'Select a Date' : 'Zgjidh Datën'}
          </h2>

          {/* Month Navigation */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem'
          }}>
            <button
              onClick={handlePrevMonth}
              style={{
                padding: '0.5rem',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.2rem',
                color: '#6b7280'
              }}
            >
              ‹
            </button>
            <div style={{
              fontSize: 'clamp(1rem, 3vw, 1.1rem)',
              fontWeight: '600',
              color: '#1a1a1a'
            }}>
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </div>
            <button
              onClick={handleNextMonth}
              style={{
                padding: '0.5rem',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.2rem',
                color: '#6b7280'
              }}
            >
              ›
            </button>
          </div>

          {/* Calendar Grid */}
          <div>
            {/* Day Headers */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '0.5rem',
              marginBottom: '0.5rem'
            }}>
              {dayNames.map(day => (
                <div key={day} style={{
                  textAlign: 'center',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  color: '#9ca3af',
                  padding: '0.5rem 0'
                }}>
                  {day}
                </div>
              ))}
            </div>

            {/* Days */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: 'clamp(0.25rem, 1vw, 0.5rem)'
            }}>
              {getDaysInMonth(currentMonth).map((date, idx) => {
                const disabled = isDateDisabled(date)
                const isSelected = selectedDate && date &&
                  selectedDate.toDateString() === date.toDateString()

                return (
                  <button
                    key={idx}
                    onClick={() => date && handleDateClick(date)}
                    disabled={disabled || !date}
                    style={{
                      padding: '0.75rem',
                      border: isSelected ? '2px solid #006bff' : '1px solid transparent',
                      borderRadius: '6px',
                      backgroundColor: isSelected ? '#e6f2ff' : (!disabled && date ? 'white' : 'transparent'),
                      color: isSelected ? '#006bff' : (!disabled && date ? '#1a1a1a' : '#d1d5db'),
                      cursor: (!disabled && date) ? 'pointer' : (date ? 'not-allowed' : 'default'),
                      fontSize: '0.9rem',
                      fontWeight: isSelected ? '600' : 'normal',
                      transition: 'all 0.15s'
                    }}
                    onMouseEnter={(e) => {
                      if (!disabled && date && !isSelected) {
                        e.target.style.backgroundColor = '#f3f4f6'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!disabled && date && !isSelected) {
                        e.target.style.backgroundColor = 'white'
                      }
                    }}
                  >
                    {date ? date.getDate() : ''}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Selected date summary + Next button */}
          {selectedDate && (
            <div style={{ marginTop: '1.5rem' }}>
              <div style={{
                padding: '1rem',
                backgroundColor: '#f0f7ff',
                borderRadius: '6px',
                marginBottom: '1rem',
                fontSize: '0.9rem',
                color: '#0d47a1',
                fontWeight: '600'
              }}>
                {formatDate(selectedDate)}
              </div>
              <button
                onClick={() => setStep(2)}
                style={{
                  width: '100%',
                  padding: '0.875rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  backgroundColor: '#006bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#0056d2'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#006bff'}
              >
                {language === 'en' ? 'Next' : 'Vazhdo'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CalendlyStyle
