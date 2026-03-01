import React from 'react'
import { LanguageProvider } from '../context/LanguageContext'
import Navigation, { FloatingLangToggle } from '../components/Navigation'
import Design1 from '../components/Design1'
import ArtieChatbot from '../components/ArtieChatbot'

const IndexPage = () => {
  return (
    <LanguageProvider>
      <div style={{ paddingTop: '60px' }}>
        <Navigation />
        <Design1 />
        <ArtieChatbot />
        <FloatingLangToggle />
      </div>
    </LanguageProvider>
  )
}

export default IndexPage

const siteUrl = 'https://www.logopediperfemije.com'

export const Head = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: 'Logopedi për Fëmijë',
    description: 'Shërbime profesionale të terapisë së të folurit për fëmijë, me Eva Alimeri — logopede e licencuar.',
    url: siteUrl,
    image: `${siteUrl}/icons/icon-512x512.png`,
    priceRange: '$$',
    telephone: '+355693664953',
    email: 'logopediperfemije@gmail.com',
    medicalSpecialty: 'Speech-Language Pathology',
    availableService: [
      { '@type': 'MedicalTherapy', name: 'In-Person Speech Therapy Consultation' },
      { '@type': 'MedicalTherapy', name: 'Online Speech Therapy Consultation' },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rruga Aleksandri i Madh',
      addressLocality: 'Tiranë',
      addressCountry: 'AL',
    },
    areaServed: {
      '@type': 'City',
      name: 'Tiranë',
    },
    founder: {
      '@type': 'Person',
      name: 'Eva Alimeri',
      jobTitle: 'Speech-Language Pathologist',
    },
    inLanguage: ['sq', 'en'],
    sameAs: ['https://www.instagram.com/logopede_eva_alimeri'],
  }

  return (
    <>
      <html lang="sq" />
      <title>Logopedi për Fëmijë — Terapi e të Folurit për Fëmijë</title>
      <meta name="description" content="Shërbime profesionale të terapisë së të folurit për fëmijë. Eva Alimeri, logopede e licencuar — konsultime në person dhe online. Speech therapy for children in Albanian and English." />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      <link rel="canonical" href={siteUrl} />

      {/* Hreflang */}
      <link rel="alternate" hrefLang="sq" href={siteUrl} />
      <link rel="alternate" hrefLang="en" href={siteUrl} />
      <link rel="alternate" hrefLang="x-default" href={siteUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content="Logopedi për Fëmijë — Terapi e të Folurit për Fëmijë" />
      <meta property="og:description" content="Shërbime profesionale të terapisë së të folurit për fëmijë. Eva Alimeri, logopede e licencuar — konsultime në person dhe online." />
      <meta property="og:image" content={`${siteUrl}/icons/icon-512x512.png`} />
      <meta property="og:locale" content="sq_AL" />
      <meta property="og:locale:alternate" content="en_US" />
      <meta property="og:site_name" content="Logopedi për Fëmijë" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Logopedi për Fëmijë — Terapi e të Folurit për Fëmijë" />
      <meta name="twitter:description" content="Shërbime profesionale të terapisë së të folurit për fëmijë. Eva Alimeri, logopede e licencuar." />
      <meta name="twitter:image" content={`${siteUrl}/icons/icon-512x512.png`} />

      {/* JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </>
  )
}
