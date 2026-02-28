import React from 'react'
import { LanguageProvider, useLanguage } from '../context/LanguageContext'
import Navigation from '../components/Navigation'

const BlogContent = () => {
  const { language } = useLanguage()

  const content = {
    en: {
      heroTitle: 'Blog',
      heroSubtitle: 'Tips, insights & resources for families',
      comingSoonTitle: 'Coming Soon',
      comingSoonText: 'We are working on helpful articles about speech therapy, child development, and communication tips for parents. Check back soon!',
      notifyText: 'In the meantime, feel free to reach out to us.',
    },
    sq: {
      heroTitle: 'Blog',
      heroSubtitle: 'Këshilla, njohuri dhe burime për familjet',
      comingSoonTitle: 'Së Shpejti',
      comingSoonText: 'Jemi duke punuar në artikuj të dobishëm mbi terapinë e të folurit, zhvillimin e fëmijëve dhe këshilla komunikimi për prindërit. Kthehuni së shpejti!',
      notifyText: 'Ndërkohë, mund të na kontaktoni.',
    },
  }

  const c = content[language]

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#2c3e50' }}>

      {/* Hero Banner */}
      <section style={{
        background: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)',
        padding: 'clamp(3rem, 10vw, 6rem) 1.5rem clamp(2rem, 6vw, 4rem)',
        textAlign: 'center',
        color: 'white',
      }}>
        <h1 style={{
          fontSize: 'clamp(2rem, 6vw, 3.5rem)',
          fontWeight: 'bold',
          marginBottom: '0.5rem',
        }}>
          {c.heroTitle}
        </h1>
        <p style={{
          fontSize: 'clamp(1rem, 3vw, 1.3rem)',
          opacity: 0.85,
          letterSpacing: '0.05em',
        }}>
          {c.heroSubtitle}
        </p>
      </section>

      {/* Coming Soon */}
      <section style={{
        minHeight: '55vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(3rem, 10vw, 6rem) 1.5rem',
        textAlign: 'center',
      }}>
        {/* Icon */}
        <div style={{
          width: '90px',
          height: '90px',
          borderRadius: '50%',
          backgroundColor: '#eaf4fd',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '2rem',
        }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#3498db"
            style={{ width: '44px', height: '44px' }}
          >
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
          </svg>
        </div>

        <h2 style={{
          fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
          fontWeight: 'bold',
          color: '#2c3e50',
          marginBottom: '1.25rem',
        }}>
          {c.comingSoonTitle}
        </h2>

        <p style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.15rem)',
          color: '#7f8c8d',
          lineHeight: 1.8,
          maxWidth: '560px',
          marginBottom: '1rem',
        }}>
          {c.comingSoonText}
        </p>

        <p style={{
          fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)',
          color: '#95a5a6',
        }}>
          {c.notifyText}
        </p>
      </section>

    </div>
  )
}

const BlogPage = () => {
  return (
    <LanguageProvider>
      <div style={{ paddingTop: '60px' }}>
        <Navigation />
        <BlogContent />
      </div>
    </LanguageProvider>
  )
}

export default BlogPage

export const Head = () => (
  <>
    <title>Blog — Logopedi për Fëmijë</title>
    <meta name="description" content="Articles and tips on speech therapy, child development, and communication support for families." />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
  </>
)
