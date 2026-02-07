import React from 'react'
import { useLanguage } from '../context/LanguageContext'
import image1 from '../images/sample_1920×1280.jpg'
import image2 from '../images/sample_1280×853.jpg'
import image3 from '../images/sample_640×426.jpg'
import image4 from '../images/sample_5184×3456.jpg'

const Design3 = () => {
  const { t } = useLanguage()

  return (
    <div style={{ fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif' }}>
      {/* Hero Section */}
      <section style={{
        minHeight: '100vh',
        backgroundColor: '#16a085',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${image1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.2
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: '4.5rem', marginBottom: '1rem', fontWeight: '300' }}>
            {t('welcome')}
          </h1>
          <p style={{ fontSize: '1.8rem', marginBottom: '3rem', fontWeight: '300' }}>
            {t('tagline')}
          </p>
          <button style={{
            padding: '1.2rem 3rem',
            fontSize: '1.1rem',
            backgroundColor: 'white',
            color: '#16a085',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
          }}>
            {t('getStarted')}
          </button>
        </div>
      </section>

      {/* About Section */}
      <section style={{
        padding: '5rem 2rem',
        backgroundColor: 'white',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#2c3e50' }}>
          {t('aboutTitle')}
        </h2>
        <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8', color: '#34495e' }}>
          {t('aboutText')}
        </p>
      </section>

      {/* Services Section - Card Style */}
      <section style={{
        padding: '5rem 2rem',
        backgroundColor: '#f8f9fa'
      }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center', color: '#2c3e50' }}>
          {t('servicesTitle')}
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {[
            { img: image2, title: t('service1'), desc: t('service1Desc'), color: '#3498db' },
            { img: image3, title: t('service2'), desc: t('service2Desc'), color: '#9b59b6' },
            { img: image4, title: t('service3'), desc: t('service3Desc'), color: '#e67e22' },
            { img: image1, title: t('service4'), desc: t('service4Desc'), color: '#16a085' }
          ].map((service, index) => (
            <div key={index} style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s'
            }}>
              <div style={{
                height: '200px',
                backgroundImage: `url(${service.img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '1rem',
                  backgroundColor: service.color,
                  color: 'white'
                }}>
                  <h3 style={{ fontSize: '1.5rem', margin: 0 }}>
                    {service.title}
                  </h3>
                </div>
              </div>
              <div style={{ padding: '1.5rem' }}>
                <p style={{ color: '#7f8c8d', lineHeight: '1.6', margin: 0 }}>
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
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
          backgroundColor: '#16a085',
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

export default Design3
