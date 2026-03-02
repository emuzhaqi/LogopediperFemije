import React from 'react'
import { Link } from 'gatsby'
import { useLanguage } from '../context/LanguageContext'

const FloatingLangToggle = () => {
  const { language, toggleLanguage } = useLanguage()
  return (
    <button
      onClick={toggleLanguage}
      title={language === 'en' ? 'Switch to Albanian' : 'Switch to English'}
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        left: '1.5rem',
        zIndex: 999,
        width: '52px',
        height: '52px',
        borderRadius: '50%',
        backgroundColor: '#2c3e50',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1.3rem',
        boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'scale(1.1)'
        e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'scale(1)'
        e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.25)'
      }}
    >
      {language === 'en' ? '🇦🇱' : '🇬🇧'}
    </button>
  )
}

export { FloatingLangToggle }

const Navigation = () => {
  const { language } = useLanguage()

  const navLinks = {
    en: {
      about: 'About Us',
      blog: 'Blog',
      appointments: 'Book Appointment'
    },
    sq: {
      about: 'Rreth Nesh',
      blog: 'Blog',
      appointments: 'Rezervo Takim'
    }
  }

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: '#2c3e50',
      padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1rem, 4vw, 2rem)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 1000,
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      flexWrap: 'wrap',
      gap: '1rem'
    }}>
      <Link to="/" aria-label="Home" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'white' }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{ width: 'clamp(1.4rem, 4vw, 1.75rem)', height: 'clamp(1.4rem, 4vw, 1.75rem)' }}
        >
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
      </Link>
      <div style={{
        display: 'flex',
        gap: 'clamp(0.5rem, 3vw, 2rem)',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <Link
          to="/blog"
          style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
            whiteSpace: 'nowrap'
          }}
        >
          {navLinks[language].blog}
        </Link>

        <Link
          to="/about"
          style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
            whiteSpace: 'nowrap'
          }}
        >
          {navLinks[language].about}
        </Link>

        <Link
          to="/appointments"
          style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
            padding: 'clamp(0.4rem, 1.5vw, 0.5rem) clamp(0.75rem, 2.5vw, 1rem)',
            backgroundColor: '#e74c3c',
            borderRadius: '4px',
            transition: 'opacity 0.3s',
            whiteSpace: 'nowrap'
          }}
        >
          {navLinks[language].appointments}
        </Link>

      </div>
    </nav>
  )
}

export default Navigation
