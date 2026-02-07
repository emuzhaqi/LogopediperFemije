import React from 'react'
import { useLanguage } from '../context/LanguageContext'
import image1 from '../images/sample_1920×1280.jpg'
import image2 from '../images/sample_1280×853.jpg'
import image3 from '../images/sample_640×426.jpg'
import image4 from '../images/sample_5184×3456.jpg'

const Design1 = () => {
  const { t } = useLanguage()

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Hero Section */}
      <section style={{
        height: '100vh',
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${image1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center',
        padding: '0 2rem'
      }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '1rem', fontWeight: 'bold' }}>
          {t('welcome')}
        </h1>
        <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
          {t('tagline')}
        </p>
        <button style={{
          padding: '1rem 2.5rem',
          fontSize: '1.2rem',
          backgroundColor: '#3498db',
          color: 'white',
          border: 'none',
          borderRadius: '50px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}>
          {t('bookNow')}
        </button>
      </section>

      {/* About Section */}
      <section style={{
        padding: '5rem 2rem',
        backgroundColor: '#ecf0f1',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#2c3e50' }}>
          {t('aboutTitle')}
        </h2>
        <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8', color: '#34495e' }}>
          {t('aboutText')}
        </p>
      </section>

      {/* Services Section */}
      <section style={{
        padding: '5rem 2rem',
        backgroundColor: 'white'
      }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center', color: '#2c3e50' }}>
          {t('servicesTitle')}
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {[
            { img: image2, title: t('service1'), desc: t('service1Desc') },
            { img: image3, title: t('service2'), desc: t('service2Desc') },
            { img: image4, title: t('service3'), desc: t('service3Desc') },
            { img: image1, title: t('service4'), desc: t('service4Desc') }
          ].map((service, index) => (
            <div key={index} style={{
              textAlign: 'center',
              padding: '1.5rem',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s'
            }}>
              <img src={service.img} alt={service.title} style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '8px',
                marginBottom: '1rem'
              }} />
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#2c3e50' }}>
                {service.title}
              </h3>
              <p style={{ color: '#7f8c8d', lineHeight: '1.6' }}>
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section style={{
        padding: '5rem 2rem',
        backgroundColor: '#3498db',
        color: 'white',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          {t('contactTitle')}
        </h2>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
          {t('contactText')}
        </p>
        <button style={{
          padding: '1rem 2.5rem',
          fontSize: '1.2rem',
          backgroundColor: 'white',
          color: '#3498db',
          border: 'none',
          borderRadius: '50px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}>
          {t('getStarted')}
        </button>
      </section>
    </div>
  )
}

export default Design1
