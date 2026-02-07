import React from 'react'
import { LanguageProvider } from '../context/LanguageContext'
import Navigation from '../components/Navigation'
import CalendlyStyle from '../components/appointments/CalendlyStyle'

const appointmentTranslations = {
  en: {
    pageTitle: 'Book an Appointment',
    selectDate: 'Select Date',
    selectTime: 'Select Time',
    appointmentType: 'Appointment Type',
    inPersonConsultation: 'In-Person Consultation',
    onlineConsultation: 'Online Consultation',
    mentoringMeeting: 'Mentoring Meeting (Online)',
    yourName: 'Your Name',
    yourEmail: 'Your Email',
    yourPhone: 'Your Phone',
    details: 'Details',
    detailsPlaceholder: 'Please describe what concerns you and what you would like to discuss...',
    detailsRequired: '* Required for consultations',
    bookAppointment: 'Book Appointment',
    selectTimeSlot: 'Please select a time slot',
    availableSlots: 'Available Time Slots',
    noSlotsAvailable: 'No slots available for this date',
    successMessage: 'Appointment booked successfully!',
    errorMessage: 'Please fill in all required fields',
  },
  sq: {
    pageTitle: 'Rezervo një Takim',
    selectDate: 'Zgjidh Datën',
    selectTime: 'Zgjidh Orën',
    appointmentType: 'Lloji i Takimit',
    inPersonConsultation: 'Konsultim Ballë për Ballë',
    onlineConsultation: 'Konsultim Online',
    mentoringMeeting: 'Takim Mentorimi (Online)',
    yourName: 'Emri Juaj',
    yourEmail: 'Email-i Juaj',
    yourPhone: 'Telefoni Juaj',
    details: 'Detajet',
    detailsPlaceholder: 'Ju lutem përshkruani çfarë ju shqetëson dhe çfarë dëshironi të diskutoni...',
    detailsRequired: '* E detyrueshme për konsultime',
    bookAppointment: 'Rezervo Takim',
    selectTimeSlot: 'Ju lutem zgjidhni një orar',
    availableSlots: 'Oraret e Disponueshme',
    noSlotsAvailable: 'Nuk ka orare të disponueshme për këtë datë',
    successMessage: 'Takimi u rezervua me sukses!',
    errorMessage: 'Ju lutem plotësoni të gjitha fushat e kërkuara',
  }
}

const AppointmentsPage = () => {
  return (
    <LanguageProvider>
      <style>{`
        @media (max-width: 768px) {
          .calendar-grid {
            grid-template-columns: 1fr !important;
          }
          .calendar-section {
            border-right: none !important;
            border-bottom: 1px solid #e5e7eb !important;
          }
        }
      `}</style>
      <div style={{ paddingTop: 'clamp(50px, 10vw, 60px)', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
        <Navigation />

        {/* Header */}
        <section style={{
          backgroundColor: 'white',
          borderBottom: '1px solid #e5e7eb',
          padding: 'clamp(1.5rem, 4vw, 2rem)',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: 'clamp(1.5rem, 5vw, 2rem)',
            fontWeight: '600',
            color: '#1a1a1a',
            marginBottom: '0.5rem',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}>
            Logopedi për Fëmijë
          </h1>
          <p style={{
            fontSize: 'clamp(0.9rem, 3vw, 1rem)',
            color: '#6b7280'
          }}>
            Book your speech therapy appointment
          </p>
        </section>

        <section style={{ paddingTop: 'clamp(1.5rem, 5vw, 3rem)', paddingBottom: 'clamp(1.5rem, 5vw, 3rem)' }}>
          <CalendlyStyle translations={appointmentTranslations} />
        </section>
      </div>
    </LanguageProvider>
  )
}

export default AppointmentsPage

export const Head = () => (
  <>
    <title>Book Appointment - LogopediperFemije</title>
    <meta name="description" content="Book a speech therapy appointment" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
  </>
)
