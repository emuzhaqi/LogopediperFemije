import React from 'react'
import { Link } from 'gatsby'
import ReactMarkdown from 'react-markdown'
import { LanguageProvider } from '../context/LanguageContext'
import Navigation from '../components/Navigation'

function getCategories(article) {
  return (article.article_categories || [])
    .map((ac) => ac.categories?.name)
    .filter(Boolean)
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function stripMarkdown(text) {
  return (text || '')
    .replace(/#{1,6}\s+/g, '')
    .replace(/\*{1,2}([^*]+)\*{1,2}/g, '$1')
    .replace(/_{1,2}([^_]+)_{1,2}/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/`{1,3}[^`]*`{1,3}/g, '')
    .replace(/>\s+/g, '')
    .replace(/\n+/g, ' ')
    .trim()
}

const BlogPostTemplate = ({ pageContext }) => {
  const { article } = pageContext
  const cats = getCategories(article)

  return (
    <LanguageProvider>
      <div style={{ paddingTop: '60px', fontFamily: 'Arial, sans-serif', color: '#2c3e50' }}>
        <Navigation />

        {/* Hero Banner */}
        <section style={{
          background: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)',
          padding: 'clamp(3rem, 10vw, 6rem) 1.5rem clamp(2rem, 6vw, 4rem)',
          textAlign: 'center',
          color: 'white',
        }}>
          {cats.length > 0 && (
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '1rem' }}>
              {cats.map((cat) => (
                <span key={cat} style={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  borderRadius: '999px',
                  padding: '0.15rem 0.75rem',
                  fontSize: '0.8rem',
                  fontWeight: '500',
                }}>
                  {cat}
                </span>
              ))}
            </div>
          )}
          <h1 style={{ fontSize: 'clamp(1.6rem, 5vw, 2.8rem)', fontWeight: 'bold', marginBottom: '0.75rem', lineHeight: 1.3, maxWidth: '820px', margin: '0 auto 0.75rem' }}>
            {article.title}
          </h1>
          <p style={{ fontSize: '0.9rem', opacity: 0.75, marginTop: '0.75rem' }}>
            {formatDate(article.created_at)}
          </p>
        </section>

        {/* Article Content */}
        <section style={{
          maxWidth: '740px',
          margin: '0 auto',
          padding: 'clamp(2.5rem, 8vw, 4rem) 1.5rem',
        }}>
          <div style={{ fontSize: '1rem', lineHeight: 1.8, color: '#2c3e50' }}>
            <ReactMarkdown
              components={{
                h1: ({ children }) => <h1 style={{ fontSize: '1.6rem', fontWeight: 'bold', margin: '1.5rem 0 0.75rem', color: '#2c3e50' }}>{children}</h1>,
                h2: ({ children }) => <h2 style={{ fontSize: '1.3rem', fontWeight: 'bold', margin: '1.5rem 0 0.5rem', color: '#2c3e50' }}>{children}</h2>,
                h3: ({ children }) => <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: '1.25rem 0 0.5rem', color: '#2c3e50' }}>{children}</h3>,
                p: ({ children }) => <p style={{ margin: '0 0 1rem', lineHeight: 1.8 }}>{children}</p>,
                ul: ({ children }) => <ul style={{ paddingLeft: '1.5rem', margin: '0 0 1rem' }}>{children}</ul>,
                ol: ({ children }) => <ol style={{ paddingLeft: '1.5rem', margin: '0 0 1rem' }}>{children}</ol>,
                li: ({ children }) => <li style={{ marginBottom: '0.35rem', lineHeight: 1.7 }}>{children}</li>,
                strong: ({ children }) => <strong style={{ fontWeight: '700' }}>{children}</strong>,
                em: ({ children }) => <em style={{ fontStyle: 'italic' }}>{children}</em>,
                blockquote: ({ children }) => (
                  <blockquote style={{ borderLeft: '4px solid #3498db', paddingLeft: '1rem', margin: '1rem 0', color: '#6b7280', fontStyle: 'italic' }}>
                    {children}
                  </blockquote>
                ),
                code: ({ children }) => <code style={{ backgroundColor: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '4px', fontSize: '0.9em', fontFamily: 'monospace' }}>{children}</code>,
                pre: ({ children }) => <pre style={{ backgroundColor: '#f3f4f6', padding: '1rem', borderRadius: '8px', overflowX: 'auto', margin: '0 0 1rem' }}>{children}</pre>,
                hr: () => <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '1.5rem 0' }} />,
                a: ({ href, children }) => <a href={href} style={{ color: '#3498db' }} target="_blank" rel="noopener noreferrer">{children}</a>,
              }}
            >
              {article.content || ''}
            </ReactMarkdown>
          </div>

          <div style={{ marginTop: '2.5rem', paddingTop: '1.25rem', borderTop: '1px solid #e5e7eb' }}>
            <Link
              to="/blog"
              style={{
                color: '#3498db',
                textDecoration: 'none',
                fontSize: '0.9rem',
              }}
            >
              ← Kthehu te artikujt
            </Link>
          </div>
        </section>
      </div>
    </LanguageProvider>
  )
}

export default BlogPostTemplate

const siteUrl = 'https://www.logopediperfemije.com'

export const Head = ({ pageContext }) => {
  const { article } = pageContext
  const plain = stripMarkdown(article.content)
  const description = plain.slice(0, 160)
  const canonicalUrl = `${siteUrl}/blog/${article.slug}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description,
    datePublished: article.created_at,
    url: canonicalUrl,
    author: {
      '@type': 'Person',
      name: 'Eva Alimeri',
      url: `${siteUrl}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Logopedi për Fëmijë',
      url: siteUrl,
    },
  }

  return (
    <>
      <html lang="sq" />
      <title>{article.title} — Logopedi për Fëmijë</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="article" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={`${article.title} — Logopedi për Fëmijë`} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}/icons/icon-512x512.png`} />
      <meta property="og:site_name" content="Logopedi për Fëmijë" />
      <meta property="article:published_time" content={article.created_at} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={`${article.title} — Logopedi për Fëmijë`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}/icons/icon-512x512.png`} />

      {/* JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </>
  )
}
