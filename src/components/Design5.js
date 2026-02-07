import React from 'react'
import { useLanguage } from '../context/LanguageContext'
import image1 from '../images/sample_1920×1280.jpg'
import image2 from '../images/sample_1280×853.jpg'
import image3 from '../images/sample_640×426.jpg'
import image4 from '../images/sample_5184×3456.jpg'

const Design5 = () => {
  const { t } = useLanguage()

  return (
    <div style={{ fontFamily: '"Poppins", sans-serif', backgroundColor: '#fff5ee' }}>
      {/* Hero Section - Playful & Friendly */}
      <section style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '4rem 2rem',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: '4rem',
            marginBottom: '1.5rem',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
          }}>
            {t('welcome')}
          </h1>
          <p style={{
            fontSize: '1.8rem',
            marginBottom: '3rem',
            fontWeight: '300'
          }}>
            {t('tagline')}
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '4rem',
            marginTop: '4rem',
            flexWrap: 'wrap'
          }}>
            {[image1, image2, image3, image4].map((img, idx) => (
              <div key={idx} style={{
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '6px solid white',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
              }}>
                <img src={img} alt={`Gallery ${idx + 1}`} style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }} />
              </div>
            ))}
          </div>
          <button style={{
            marginTop: '3rem',
            padding: '1.2rem 3rem',
            fontSize: '1.2rem',
            backgroundColor: '#ffd93d',
            color: '#333',
            border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
            fontWeight: 'bold',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
          }}>
            {t('bookNow')}
          </button>
        </div>
      </section>

      {/* About Section */}
      <section style={{
        padding: '5rem 2rem',
        backgroundColor: 'white'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: '3rem',
            marginBottom: '2rem',
            color: '#667eea',
            fontWeight: 'bold'
          }}>
            {t('aboutTitle')}
          </h2>
          <p style={{
            fontSize: '1.3rem',
            lineHeight: '1.8',
            color: '#555'
          }}>
            {t('aboutText')}
          </p>
        </div>
      </section>

      {/* Services Section - Colorful Cards */}
      <section style={{
        padding: '5rem 2rem',
        backgroundColor: '#fff5ee'
      }}>
        <h2 style={{
          fontSize: '3rem',
          marginBottom: '3rem',
          textAlign: 'center',
          color: '#667eea',
          fontWeight: 'bold'
        }}>
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
            { img: image2, title: t('service1'), desc: t('service1Desc'), bg: '#ff6b9d' },
            { img: image3, title: t('service2'), desc: t('service2Desc'), bg: '#c44569' },
            { img: image4, title: t('service3'), desc: t('service3Desc'), bg: '#f9ca24' },
            { img: image1, title: t('service4'), desc: t('service4Desc'), bg: '#6c5ce7' }
          ].map((service, index) => (
            <div key={index} style={{
              backgroundColor: service.bg,
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
              transform: 'rotate(-2deg)',
              transition: 'transform 0.3s'
            }}>
              <img src={service.img} alt={service.title} style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover'
              }} />
              <div style={{ padding: '2rem', color: 'white' }}>
                <h3 style={{
                  fontSize: '1.6rem',
                  marginBottom: '0.8rem',
                  fontWeight: 'bold'
                }}>
                  {service.title}
                </h3>
                <p style={{
                  lineHeight: '1.6',
                  fontSize: '1rem'
                }}>
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
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: 'bold' }}>
          {t('contactTitle')}
        </h2>
        <p style={{ fontSize: '1.4rem', marginBottom: '2rem' }}>
          {t('contactText')}
        </p>
        <button style={{
          padding: '1.2rem 3rem',
          fontSize: '1.2rem',
          backgroundColor: '#ffd93d',
          color: '#333',
          border: 'none',
          borderRadius: '50px',
          cursor: 'pointer',
          fontWeight: 'bold',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
        }}>
          {t('getStarted')}
        </button>
      </section>
    </div>
  )
}

export default Design5
