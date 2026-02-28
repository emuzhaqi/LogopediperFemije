import React, { createContext, useContext, useState } from 'react'

const LanguageContext = createContext()

export const translations = {
  en: {
    // Common
    welcome: 'Welcome to Logopedi për Fëmijë',
    tagline: 'Professional Speech Therapy for Children',
    aboutTitle: 'About Our Services',
    aboutText: 'We provide specialized speech therapy services for children, helping them develop communication skills in a supportive and engaging environment.',
    servicesTitle: 'Our Services',
    contactTitle: 'Contact Us',
    bookNow: 'Book Appointment',

    // Services
    service1: 'Speech Assessment',
    service1Desc: 'Comprehensive evaluation of speech and language development',
    service2: 'Individual Therapy',
    service2Desc: 'One-on-one therapy sessions tailored to your child\'s needs',
    service4: 'Parent Consultation',
    service4Desc: 'Guidance and support for parents and caregivers',

    // Gallery
    galleryTitle: 'Our Clinic',
    gallerySubtitle: 'A warm and welcoming space designed for children',

    // Artie Chatbot
    artieTitle: 'Chat with Artie',
    artieGreeting: "Hi! I'm Artie, your speech therapy assistant. How can I help you today?",
    artiePlaceholder: 'Ask me about speech therapy…',
    artieSend: 'Send',
    artieError: "Sorry, I can't reach the server right now. Please try again later.",

    // About Page
    aboutPageTitle: 'About Eva Alimeri',
    aboutPageSubtitle: 'Licensed Speech-Language Pathologist',
    aboutBioTitle: 'Profile',
    aboutBio1: 'Eva Alimeri is a licensed speech-language pathologist with several years of experience in the field of communication disorders and developmental delays in children. Since June 1, 2023, she has been running her own speech therapy clinic, offering: Speech assessments, Speech therapy, Developmental therapy, ABA therapy, and Play therapy.',
    aboutBio2: 'She completed her Bachelor\'s studies in Speech-Language Pathology at the Faculty of Medical Technical Sciences in 2015, followed by a Master\'s degree between 2015–2017, during which time she also began her professional practice.',
    aboutBio3: 'From 2015 to 2023, she worked in various institutions where she treated cases with diagnoses including: speech delays, language delays, global developmental delays, articulation disorders, phonological disorders, stuttering, autism spectrum disorder, cerebral palsy, ADHD, and Down syndrome, among others.',
    aboutBio4: 'Eva is also regularly engaged in educating and raising awareness among parents about the development of speech and communication in children. She has conducted the workshop "Language Stimulation 0–3 Years" and informational sessions in kindergartens, covering topics such as age-appropriate language development, early signs of delays, and practical ways to stimulate speech at home — activities aimed at empowering parents to better understand the developmental process and intervene at the right time.',
    aboutCredentialsTitle: 'Education & Training',
    aboutCred1: 'Master in Speech-Language Pathology — Faculty of Medical Technical Sciences, University of Tirana (2017)',
    aboutCred2: 'Bachelor in Speech-Language Pathology — Faculty of Medical Technical Sciences, University of Tirana (2015)',
    aboutCred3: 'Assessment and speech therapy planning for 0–3 years (trained by experienced Italian speech therapists)',
    aboutCred4: 'Dyslexia Assessment using the standardised dyslexia test in the Albanian language',
    aboutCred5: 'Assessment and treatment of stuttering',
    aboutCred6: 'RBT — Registered Behavior Technician',
    aboutCred7: 'Language disorders and speech-language rehabilitation',
    aboutCred8: 'VB-MAPP and ABLLS-R (developmental assessment protocols)',
    aboutCred9: 'Theory of Mind in children with neurodevelopmental disorders',
    aboutCred10: 'PRT — Pivotal Response Treatment',
    aboutPhilosophyTitle: 'My Philosophy',
    aboutPhilosophy: 'I believe every child communicates in their own unique way. My role is to meet them where they are, celebrate every small victory, and partner with families every step of the journey. Therapy should feel like play, joyful, meaningful, and empowering.',
    aboutCTATitle: 'Ready to take the first step?',
    aboutCTAButton: 'Book an Appointment',
  },
  sq: {
    // Common
    welcome: 'Mirë se vini në Logopedi për Fëmijë',
    tagline: 'Terapi Profesionale e të Folurit për Fëmijë',
    aboutTitle: 'Rreth Shërbimeve Tona',
    aboutText: 'Ne ofrojmë shërbime të specializuara të terapisë së të folurit për fëmijë, duke i ndihmuar ata të zhvillojnë aftësitë e komunikimit në një mjedis mbështetës dhe tërheqës.',
    servicesTitle: 'Shërbimet Tona',
    contactTitle: 'Na Kontaktoni',
    bookNow: 'Rezervo Takim',

    // Services
    service1: 'Vlerësim Logopedik',
    service1Desc: 'Vlerësim gjithëpërfshirës i zhvillimit të të folurit dhe gjuhës',
    service2: 'Terapi Logopedike',
    service2Desc: 'Seanca terapie një-me-një të përshtatura për nevojat e fëmijës tuaj',
    service4: 'Konsulencë për Prindër',
    service4Desc: 'Udhëzime dhe mbështetje për prindërit dhe kujdestarët',

    // Gallery
    galleryTitle: 'Klinika Jonë',
    gallerySubtitle: 'Një hapësirë e ngrohtë dhe mikëpritëse e dizajnuar për fëmijë',

    // Artie Chatbot
    artieTitle: 'Bisedo me Artie',
    artieGreeting: "Përshëndetje! Jam Artie, asistenti juaj i terapisë së të folurit. Si mund t'ju ndihmoj?",
    artiePlaceholder: 'Pyesni për terapinë e të folurit…',
    artieSend: 'Dërgo',
    artieError: 'Na vjen keq, nuk mund të lidhem me serverin. Ju lutemi provoni përsëri më vonë.',

    // About Page
    aboutPageTitle: 'Eva Alimeri',
    aboutPageSubtitle: 'Logopede e Licencuar',
    aboutBioTitle: 'Profili',
    aboutBio1: 'Eva Alimeri është logopede e licencuar me përvojë disa vjeçare në fushën e çrregullimeve të komunikimit dhe zhvillimit tek fëmijët. Prej 1 qershorit 2023 ushtron aktivitetin në klinikën e saj logopedike, ku ofron: Vlerësime logopedike, Terapi logopedike, Terapi zhvillimi, Terapi ABA, Terapi loje.',
    aboutBio2: 'Ajo përfundoi studimet Bachelor në degën Logopedi pranë Fakultetit të Shkencave Mjekësore Teknike në vitin 2015. Më pas vijoi studimet Master në periudhën 2015–2017, kohë gjatë së cilës nisi edhe ushtrimin e profesionit.',
    aboutBio3: 'Nga viti 2015 deri në vitin 2023 ka punuar në institucione të ndryshme, ku ka trajtuar raste me diagnoza si: vonesa në të folur, vonesa gjuhësore, vonesa globale në zhvillim, çrregullime të artikulimit, çrregullime fonologjike, belbëzim, çrregullime të spektrit të autizmit, paralizë cerebrale, ADHD, sindroma Down etj.',
    aboutBio4: 'Gjithashtu, Eva angazhohet rregullisht në edukimin dhe ndërgjegjësimin e prindërve mbi zhvillimin e të folurit dhe komunikimit tek fëmijët. Ajo ka realizuar workshopin "Stimulimi gjuhësor 0-3 vjec" dhe takime informuese në kopshte, duke trajtuar tema si zhvillimi gjuhësor sipas moshës, shenjat e hershme të vonesave dhe mënyrat praktike të stimulimit të të folurit në shtëpi. Aktivitete, të cilat synojnë fuqizimin e prindërve për të kuptuar më mirë procesin e zhvillimit dhe për të ndërhyrë në kohën e duhur.',
    aboutCredentialsTitle: 'Arsimi & Trajnimet',
    aboutCred1: 'Master në Logopedi — Fakulteti i Shkencave Mjekësore Teknike, Universiteti i Tiranës (2017)',
    aboutCred2: 'Bachelor në Logopedi — Fakulteti i Shkencave Mjekësore Teknike, Universiteti i Tiranës (2015)',
    aboutCred3: 'Diagnostikimi dhe ndërtimi i planit logopedik 0-3 vjec (trajnuar nga logopede italianë me përvojë shumëvjeçare)',
    aboutCred4: 'Vlerësimi i Disleksisë me testin e standartizuar të disleksisë në gjuhën shqipe',
    aboutCred5: 'Vlerësimi dhe trajtimi i belbëzimit',
    aboutCred6: 'RBT (Registered Behavior Technician)',
    aboutCred7: 'Çrregullimet gjuhësore dhe rehabilitimi logopedik',
    aboutCred8: 'VB-MAPP dhe ABLLS-R (protokolle vlerësimi zhvillimor)',
    aboutCred9: 'Teoria e mendjes tek fëmijët me çrregullime neurozhvillimore',
    aboutCred10: 'PRT (Pivotal Response Treatment)',
    aboutPhilosophyTitle: 'Filozofia Ime',
    aboutPhilosophy: 'Besoj se çdo fëmijë komunikon në mënyrën e tij unike. Roli im është t\'i takoj aty ku janë, të festoj çdo fitore të vogël dhe të bashkëpunoj me familjet në çdo hap të rrugëtimit. Terapia duhet të ndihet si lojë, e gëzueshme, kuptimplote dhe fuqizuese.',
    aboutCTATitle: 'Gati për të bërë hapin e parë?',
    aboutCTAButton: 'Rezervo një Takim',
  }
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('language') || 'sq'
    }
    return 'sq'
  })

  const toggleLanguage = () => {
    setLanguage(prev => {
      const next = prev === 'en' ? 'sq' : 'en'
      if (typeof window !== 'undefined') localStorage.setItem('language', next)
      return next
    })
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
