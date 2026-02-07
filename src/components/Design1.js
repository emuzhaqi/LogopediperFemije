import React from 'react'
import { Link } from 'gatsby'
import { useLanguage } from '../context/LanguageContext'
import image1 from '../images/image1.jpg'
import image2 from '../images/image2.jpg'
import image3 from '../images/image3.jpg'

const Design1 = () => {
  const { t } = useLanguage()

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Hero Section */}
      <section style={{
        minHeight: '100vh',
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${image2})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center',
        padding: '2rem 1rem'
      }}>
        <h1 style={{
          fontSize: 'clamp(2rem, 8vw, 4rem)',
          marginBottom: '1rem',
          fontWeight: 'bold',
          maxWidth: '90%'
        }}>
          {t('welcome')}
        </h1>
        <p style={{
          fontSize: 'clamp(1rem, 4vw, 1.5rem)',
          marginBottom: '2rem',
          maxWidth: '90%'
        }}>
          {t('tagline')}
        </p>
        <Link to="/appointments" style={{
          padding: '1rem 2.5rem',
          fontSize: '1.2rem',
          backgroundColor: '#3498db',
          color: 'white',
          border: 'none',
          borderRadius: '50px',
          cursor: 'pointer',
          fontWeight: 'bold',
          textDecoration: 'none',
          display: 'inline-block'
        }}>
          {t('bookNow')}
        </Link>
      </section>

      {/* About Section */}
      <section style={{
        padding: 'clamp(2rem, 8vw, 5rem) 1.5rem',
        backgroundColor: '#ecf0f1',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
          marginBottom: '1.5rem',
          color: '#2c3e50'
        }}>
          {t('aboutTitle')}
        </h2>
        <p style={{
          fontSize: 'clamp(1rem, 3vw, 1.2rem)',
          maxWidth: '800px',
          margin: '0 auto',
          lineHeight: '1.8',
          color: '#34495e',
          padding: '0 1rem'
        }}>
          {t('aboutText')}
        </p>
      </section>

      {/* Services Section */}
      <section style={{
        padding: 'clamp(2rem, 8vw, 5rem) 1.5rem',
        backgroundColor: 'white'
      }}>
        <h2 style={{
          fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
          marginBottom: 'clamp(2rem, 5vw, 3rem)',
          textAlign: 'center',
          color: '#2c3e50'
        }}>
          {t('servicesTitle')}
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
          gap: 'clamp(1rem, 3vw, 2rem)',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1rem'
        }}>
          {[
            { img: image2, title: t('service1'), desc: t('service1Desc') },
            { img: image3, title: t('service2'), desc: t('service2Desc') },
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
        padding: 'clamp(2rem, 8vw, 5rem) 1.5rem',
        backgroundColor: '#3498db',
        color: 'white'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          paddingLeft: 'clamp(1rem, 4vw, 2rem)'
        }}>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
            marginBottom: '2.5rem'
          }}>
            {t('contactTitle')}
          </h2>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            fontSize: 'clamp(1rem, 3vw, 1.15rem)'
          }}>
          {/* Phone */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <a href="tel:+355693664953" style={{
              color: 'white',
              textDecoration: 'none',
              transition: 'opacity 0.3s'
            }}>
              +355 69 366 4953
            </a>
          </div>

          {/* Email */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <a href="mailto:logopediperfemije@gmail.com" style={{
              color: 'white',
              textDecoration: 'none',
              transition: 'opacity 0.3s',
              wordBreak: 'break-word'
            }}>
              logopediperfemije@gmail.com
            </a>
          </div>

          {/* Instagram */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            <a href="https://instagram.com/logopedi.per.femije" target="_blank" rel="noopener noreferrer" style={{
              color: 'white',
              textDecoration: 'none',
              transition: 'opacity 0.3s'
            }}>
              @logopedi.per.femije
            </a>
          </div>
        </div>
      </div>
      </section>
    </div>
  )
}

export default Design1
