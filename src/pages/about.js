import React from 'react'
import { Link } from 'gatsby'
import { LanguageProvider, useLanguage } from '../context/LanguageContext'
import Navigation from '../components/Navigation'
import evaPhoto from '../images/eva.jpg'
import image1 from '../images/image1.jpg'
import image2 from '../images/image2.jpg'
import image3 from '../images/image3.jpg'
import image4 from '../images/image4.jpg'

const AboutContent = () => {
  const { t } = useLanguage()

  const credentials = [
    t('aboutCred1'),
    t('aboutCred2'),
    t('aboutCred3'),
    t('aboutCred4'),
    t('aboutCred5'),
    t('aboutCred6'),
    t('aboutCred7'),
    t('aboutCred8'),
    t('aboutCred9'),
    t('aboutCred10'),
  ]

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#2c3e50' }}>

      {/* Hero Banner */}
      <section style={{
        background: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)',
        padding: 'clamp(3rem, 10vw, 6rem) 1.5rem clamp(2rem, 6vw, 4rem)',
        textAlign: 'center',
        color: 'white',
      }}>
        <h1 style={{
          fontSize: 'clamp(2rem, 6vw, 3.5rem)',
          fontWeight: 'bold',
          marginBottom: '0.5rem',
        }}>
          {t('aboutPageTitle')}
        </h1>
        <p style={{
          fontSize: 'clamp(1rem, 3vw, 1.3rem)',
          opacity: 0.85,
          letterSpacing: '0.05em',
        }}>
          {t('aboutPageSubtitle')}
        </p>
      </section>

      {/* Profile + Bio */}
      <section style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: 'clamp(2.5rem, 8vw, 5rem) 1.5rem',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: 'clamp(2rem, 5vw, 4rem)',
          alignItems: 'start',
        }}>
          {/* Photo */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <img
              src={evaPhoto}
              alt="Eva Alimeri"
              style={{
                width: '100%',
                maxWidth: '320px',
                height: '380px',
                objectFit: 'cover',
                objectPosition: 'top',
                borderRadius: '12px',
                boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
              }}
            />
            <p style={{
              fontSize: '0.85rem',
              color: '#7f8c8d',
              fontStyle: 'italic',
            }}>
              Eva Alimeri
            </p>
          </div>

          {/* Bio */}
          <div>
            <h2 style={{
              fontSize: 'clamp(1.4rem, 4vw, 2rem)',
              marginTop: 0,
              marginBottom: '1.5rem',
              color: '#2c3e50',
            }}>
              {t('aboutBioTitle')}
            </h2>
            {[t('aboutBio1'), t('aboutBio2')].map((para, i) => (
              <p key={i} style={{
                fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)',
                lineHeight: 1.85,
                marginBottom: '1.2rem',
                color: '#34495e',
                textAlign: 'justify',
              }}>
                {para}
              </p>
            ))}
          </div>
        </div>

        {[t('aboutBio3'), t('aboutBio4')].map((para, i) => (
          <p key={i} style={{
            fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)',
            lineHeight: 1.85,
            marginTop: '1.2rem',
            marginBottom: 0,
            color: '#34495e',
            paddingLeft: 'clamp(0px, 6vw, 3.5rem)',
            textAlign: 'justify',
          }}>
            {para}
          </p>
        ))}
      </section>

      {/* Credentials */}
      <section style={{
        backgroundColor: '#ecf0f1',
        padding: 'clamp(2.5rem, 8vw, 5rem) 1.5rem',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(1.4rem, 4vw, 2rem)',
            marginBottom: '2rem',
            textAlign: 'center',
            color: '#2c3e50',
          }}>
            {t('aboutCredentialsTitle')}
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
            {credentials.map((cred, i) => (
              <li key={i} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.85rem',
                backgroundColor: 'white',
                padding: '1rem 1.25rem',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                color: '#34495e',
                lineHeight: 1.5,
              }}>
                <span style={{
                  flexShrink: 0,
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: '#3498db',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '0.8rem',
                }}>
                  {i + 1}
                </span>
                {cred}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Gallery — hidden until photos are updated */}
      {false && <section style={{
        padding: 'clamp(2rem, 8vw, 5rem) 1.5rem',
        backgroundColor: '#f8f9fa'
      }}>
        <h2 style={{
          fontSize: 'clamp(1.4rem, 4vw, 2rem)',
          marginBottom: '0.75rem',
          textAlign: 'center',
          color: '#2c3e50'
        }}>
          {t('galleryTitle')}
        </h2>
        <p style={{
          textAlign: 'center',
          color: '#7f8c8d',
          fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)',
          marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)'
        }}>
          {t('gallerySubtitle')}
        </p>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '0.75rem',
        }}>
          <div style={{ gridColumn: '1', gridRow: '1 / 3' }}>
            <img
              src={image1}
              alt="Clinic space 1"
              style={{
                width: '100%',
                height: '100%',
                minHeight: '280px',
                objectFit: 'cover',
                borderRadius: '10px',
                display: 'block'
              }}
            />
          </div>
          {[image2, image3, image4, image1].map((img, i) => (
            <div key={i}>
              <img
                src={img}
                alt={`Clinic space ${i + 2}`}
                style={{
                  width: '100%',
                  height: '160px',
                  objectFit: 'cover',
                  borderRadius: '10px',
                  display: 'block'
                }}
              />
            </div>
          ))}
        </div>
      </section>}

      {/* Philosophy */}
      <section style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: 'clamp(2.5rem, 8vw, 5rem) 1.5rem',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontSize: 'clamp(1.4rem, 4vw, 2rem)',
          marginBottom: '1.5rem',
          color: '#2c3e50',
        }}>
          {t('aboutPhilosophyTitle')}
        </h2>
        <blockquote style={{
          fontSize: 'clamp(1rem, 3vw, 1.25rem)',
          lineHeight: 1.9,
          color: '#34495e',
          fontStyle: 'italic',
          borderLeft: '4px solid #3498db',
          paddingLeft: '1.5rem',
          margin: '0',
          textAlign: 'left',
        }}>
          "{t('aboutPhilosophy')}"
        </blockquote>
      </section>

      {/* CTA */}
      <section style={{
        backgroundColor: '#3498db',
        padding: 'clamp(2.5rem, 8vw, 5rem) 1.5rem',
        textAlign: 'center',
        color: 'white',
      }}>
        <h2 style={{
          fontSize: 'clamp(1.4rem, 4vw, 2rem)',
          marginBottom: '2rem',
        }}>
          {t('aboutCTATitle')}
        </h2>
        <Link
          to="/appointments"
          style={{
            display: 'inline-block',
            padding: '1rem 2.5rem',
            fontSize: 'clamp(1rem, 3vw, 1.2rem)',
            backgroundColor: 'white',
            color: '#3498db',
            borderRadius: '50px',
            fontWeight: 'bold',
            textDecoration: 'none',
          }}
        >
          {t('aboutCTAButton')}
        </Link>
      </section>
    </div>
  )
}

const AboutPage = () => {
  return (
    <LanguageProvider>
      <div style={{ paddingTop: '60px' }}>
        <Navigation />
        <AboutContent />
      </div>
    </LanguageProvider>
  )
}

export default AboutPage

export const Head = () => (
  <>
    <title>About Eva Alimeri — Logopedi për Fëmijë</title>
    <meta name="description" content="Learn about Eva Alimeri, licensed speech-language pathologist specialising in children's communication therapy." />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
  </>
)
