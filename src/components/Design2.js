import React from 'react'
import { useLanguage } from '../context/LanguageContext'
import image1 from '../images/sample_1920×1280.jpg'
import image2 from '../images/sample_1280×853.jpg'
import image3 from '../images/sample_640×426.jpg'
import image4 from '../images/sample_5184×3456.jpg'

const Design2 = () => {
  const { t } = useLanguage()

  return (
    <div style={{ fontFamily: 'Georgia, serif', backgroundColor: '#fafafa' }}>
      {/* Hero Section */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        minHeight: '100vh',
        alignItems: 'center'
      }}>
        <div style={{
          padding: '4rem',
          backgroundColor: '#fff'
        }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', color: '#2c3e50', lineHeight: '1.2' }}>
            {t('welcome')}
          </h1>
          <p style={{ fontSize: '1.3rem', marginBottom: '2rem', color: '#34495e', lineHeight: '1.8' }}>
            {t('tagline')}
          </p>
          <p style={{ fontSize: '1rem', marginBottom: '2rem', color: '#7f8c8d', lineHeight: '1.8' }}>
            {t('aboutText')}
          </p>
          <button style={{
            padding: '1rem 2rem',
            fontSize: '1rem',
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}>
            {t('learnMore')}
          </button>
        </div>
        <div style={{
          height: '100vh',
          backgroundImage: `url(${image1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }} />
      </section>

      {/* Services Grid */}
      <section style={{
        padding: '5rem 2rem',
        backgroundColor: '#fff'
      }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center', color: '#2c3e50' }}>
          {t('servicesTitle')}
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '3rem',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {[
            { img: image2, title: t('service1'), desc: t('service1Desc') },
            { img: image3, title: t('service2'), desc: t('service2Desc') },
            { img: image4, title: t('service3'), desc: t('service3Desc') },
            { img: image1, title: t('service4'), desc: t('service4Desc') }
          ].map((service, index) => (
            <div key={index} style={{
              display: 'flex',
              gap: '1.5rem',
              alignItems: 'flex-start'
            }}>
              <img src={service.img} alt={service.title} style={{
                width: '120px',
                height: '120px',
                objectFit: 'cover',
                borderRadius: '50%',
                flexShrink: 0
              }} />
              <div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#2c3e50' }}>
                  {service.title}
                </h3>
                <p style={{ color: '#7f8c8d', lineHeight: '1.6' }}>
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '5rem 2rem',
        backgroundColor: '#2c3e50',
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
          backgroundColor: '#e74c3c',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}>
          {t('bookNow')}
        </button>
      </section>
    </div>
  )
}

export default Design2
