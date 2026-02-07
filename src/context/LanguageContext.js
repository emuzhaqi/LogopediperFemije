import React, { createContext, useContext, useState } from 'react'

const LanguageContext = createContext()

export const translations = {
  en: {
    // Navigation
    design1: 'Design 1',
    design2: 'Design 2',
    design3: 'Design 3',
    design4: 'Design 4',
    design5: 'Design 5',
    language: 'Language',

    // Common
    welcome: 'Welcome to LogopediperFemije',
    tagline: 'Professional Speech Therapy for Children',
    aboutTitle: 'About Our Services',
    aboutText: 'We provide specialized speech therapy services for children, helping them develop communication skills in a supportive and engaging environment.',
    servicesTitle: 'Our Services',
    contactTitle: 'Contact Us',
    contactText: 'Schedule a consultation today',
    learnMore: 'Learn More',
    bookNow: 'Book Appointment',
    getStarted: 'Get Started',

    // Services
    service1: 'Speech Assessment',
    service1Desc: 'Comprehensive evaluation of speech and language development',
    service2: 'Individual Therapy',
    service2Desc: 'One-on-one therapy sessions tailored to your child\'s needs',
    service3: 'Group Sessions',
    service3Desc: 'Interactive group activities to practice social communication',
    service4: 'Parent Consultation',
    service4Desc: 'Guidance and support for parents and caregivers',

    // Contact
    email: 'Email',
    phone: 'Phone',
    location: 'Location',
  },
  sq: {
    // Navigation (Albanian)
    design1: 'Dizajni 1',
    design2: 'Dizajni 2',
    design3: 'Dizajni 3',
    design4: 'Dizajni 4',
    design5: 'Dizajni 5',
    language: 'Gjuha',

    // Common
    welcome: 'Mirë se vini në LogopediperFemije',
    tagline: 'Terapi Profesionale e të Folurit për Fëmijë',
    aboutTitle: 'Rreth Shërbimeve Tona',
    aboutText: 'Ne ofrojmë shërbime të specializuara të terapisë së të folurit për fëmijë, duke i ndihmuar ata të zhvillojnë aftësitë e komunikimit në një mjedis mbështetës dhe tërheqës.',
    servicesTitle: 'Shërbimet Tona',
    contactTitle: 'Na Kontaktoni',
    contactText: 'Planifikoni një konsultim sot',
    learnMore: 'Mëso Më Shumë',
    bookNow: 'Rezervo Takim',
    getStarted: 'Fillo Tani',

    // Services
    service1: 'Vlerësimi i të Folurit',
    service1Desc: 'Vlerësim gjithëpërfshirës i zhvillimit të të folurit dhe gjuhës',
    service2: 'Terapi Individuale',
    service2Desc: 'Seanca terapie një-me-një të përshtatura për nevojat e fëmijës tuaj',
    service3: 'Seanca Grupore',
    service3Desc: 'Aktivitete grupore interaktive për të praktikuar komunikimin social',
    service4: 'Konsulencë për Prindër',
    service4Desc: 'Udhëzime dhe mbështetje për prindërit dhe kujdestarët',

    // Contact
    email: 'Email',
    phone: 'Telefon',
    location: 'Vendndodhja',
  }
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en')

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'sq' : 'en')
  }

  const t = (key) => translations[language][key] || key

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
