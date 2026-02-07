import React from 'react'
import { useLanguage } from '../context/LanguageContext'

const Navigation = ({ currentDesign, setCurrentDesign }) => {
  const { language, toggleLanguage, t } = useLanguage()

  const designs = ['design1', 'design2', 'design3', 'design4', 'design5']

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
        display: 'flex',
        gap: '1rem',
        alignItems: 'center'
      }}>
        {designs.map((design, index) => (
          <button
            key={design}
            onClick={() => setCurrentDesign(index + 1)}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: currentDesign === index + 1 ? '#3498db' : 'transparent',
              color: 'white',
              border: '1px solid #3498db',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              transition: 'all 0.3s'
            }}
          >
            {t(design)}
          </button>
        ))}
      </div>

      <button
        onClick={toggleLanguage}
        style={{
          padding: '0.5rem 1.5rem',
          backgroundColor: '#e74c3c',
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
