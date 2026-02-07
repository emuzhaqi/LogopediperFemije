import React from 'react'
import { useLanguage } from '../context/LanguageContext'

const Navigation = () => {
  const { language, toggleLanguage } = useLanguage()

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: '#2c3e50',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 1000,
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        color: 'white',
        fontSize: '1.2rem',
        fontWeight: 'bold'
      }}>
        LogopediperFemije
      </div>

      <button
        onClick={toggleLanguage}
        style={{
          padding: '0.5rem 1.5rem',
          backgroundColor: '#3498db',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '0.9rem',
          fontWeight: 'bold',
          transition: 'all 0.3s'
        }}
      >
        {language === 'en' ? 'SQ 🇦🇱' : 'EN 🇬🇧'}
      </button>
    </nav>
  )
}

export default Navigation
