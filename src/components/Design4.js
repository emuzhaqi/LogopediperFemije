import React from 'react'
import { useLanguage } from '../context/LanguageContext'
import image1 from '../images/sample_1920×1280.jpg'
import image2 from '../images/sample_1280×853.jpg'
import image3 from '../images/sample_640×426.jpg'
import image4 from '../images/sample_5184×3456.jpg'

const Design4 = () => {
  const { t } = useLanguage()

  return (
    <div style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', backgroundColor: '#fff' }}>
      {/* Hero Section - Minimalist */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '4rem 2rem',
        backgroundColor: '#f5f5f5'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center'
        }}>
          <div>
            <div style={{
              width: '60px',
              height: '4px',
              backgroundColor: '#ff6b6b',
              marginBottom: '2rem'
            }} />
            <h1 style={{
              fontSize: '3.5rem',
              marginBottom: '1.5rem',
              color: '#2c3e50',
              lineHeight: '1.2',
              fontWeight: '700'
            }}>
              {t('welcome')}
            </h1>
            <h2 style={{
              fontSize: '1.8rem',
              marginBottom: '2rem',
              color: '#34495e',
              fontWeight: '300'
            }}>
              {t('tagline')}
            </h2>
            <p style={{
              fontSize: '1.1rem',
              marginBottom: '2.5rem',
              color: '#7f8c8d',
              lineHeight: '1.8'
            }}>
              {t('aboutText')}
            </p>
            <button style={{
              padding: '1rem 2.5rem',
              fontSize: '1rem',
              backgroundColor: '#ff6b6b',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              letterSpacing: '1px'
            }}>
              {t('bookNow')}
            </button>
          </div>
          <div style={{
            height: '600px',
            backgroundImage: `url(${image1})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            boxShadow: '0 20px 60px rgba(0,0,0,0.15)'
          }} />
        </div>
      </section>

      {/* Services Section - Minimalist Cards */}
      <section style={{
        padding: '6rem 2rem',
        backgroundColor: '#fff'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{
            width: '60px',
            height: '4px',
            backgroundColor: '#ff6b6b',
            marginBottom: '1rem'
          }} />
          <h2 style={{
            fontSize: '2.8rem',
            marginBottom: '4rem',
            color: '#2c3e50',
            fontWeight: '700'
          }}>
            {t('servicesTitle')}
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '3rem'
          }}>
            {[
              { img: image2, title: t('service1'), desc: t('service1Desc') },
              { img: image3, title: t('service2'), desc: t('service2Desc') },
              { img: image4, title: t('service3'), desc: t('service3Desc') },
              { img: image1, title: t('service4'), desc: t('service4Desc') }
            ].map((service, index) => (
              <div key={index} style={{
                display: 'grid',
                gridTemplateColumns: '200px 1fr',
                gap: '2rem',
                alignItems: 'center'
              }}>
                <img src={service.img} alt={service.title} style={{
                  width: '200px',
                  height: '200px',
                  objectFit: 'cover'
                }} />
                <div>
                  <h3 style={{
                    fontSize: '1.8rem',
                    marginBottom: '0.8rem',
                    color: '#2c3e50',
                    fontWeight: '600'
                  }}>
                    {service.title}
                  </h3>
                  <p style={{
                    color: '#7f8c8d',
                    lineHeight: '1.8',
                    fontSize: '1rem'
                  }}>
                    {service.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section style={{
        padding: '6rem 2rem',
        backgroundColor: '#2c3e50',
        color: 'white'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.8rem', marginBottom: '1rem', fontWeight: '700' }}>
            {t('contactTitle')}
          </h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '2.5rem', opacity: 0.9 }}>
            {t('contactText')}
          </p>
          <button style={{
            padding: '1rem 2.5rem',
            fontSize: '1rem',
            backgroundColor: '#ff6b6b',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold',
            letterSpacing: '1px'
          }}>
            {t('getStarted')}
          </button>
        </div>
      </section>
    </div>
  )
}

export default Design4
