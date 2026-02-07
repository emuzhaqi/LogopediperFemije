import React from 'react'
import { Link } from 'gatsby'
import { useLanguage } from '../context/LanguageContext'

const Navigation = () => {
  const { language, toggleLanguage } = useLanguage()

  const navLinks = {
    en: {
      home: 'Home',
      appointments: 'Book Appointment'
    },
    sq: {
      home: 'Ballina',
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
      <div style={{
        color: 'white',
        fontSize: 'clamp(1rem, 3vw, 1.2rem)',
        fontWeight: 'bold'
      }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
          LogopediperFemije
        </Link>
      </div>

      <div style={{
        display: 'flex',
        gap: 'clamp(0.5rem, 3vw, 2rem)',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
            transition: 'opacity 0.3s'
          }}
        >
          {navLinks[language].home}
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

        <button
          onClick={toggleLanguage}
          style={{
            padding: 'clamp(0.4rem, 1.5vw, 0.5rem) clamp(0.75rem, 3vw, 1.5rem)',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)',
            fontWeight: 'bold',
            transition: 'all 0.3s',
            whiteSpace: 'nowrap'
          }}
        >
          {language === 'en' ? 'SQ 🇦🇱' : 'EN 🇬🇧'}
        </button>
      </div>
    </nav>
  )
}

export default Navigation
