import React, { useState, useEffect, useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import { LanguageProvider, useLanguage } from '../context/LanguageContext'
import Navigation from '../components/Navigation'
import { supabase } from '../utils/supabase'

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

const BlogContent = () => {
  const { language } = useLanguage()
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null)

  const content = {
    en: {
      heroTitle: 'Blog',
      heroSubtitle: 'Tips, insights & resources for families',
      emptyTitle: 'Coming Soon',
      emptyText: 'We are working on helpful articles about speech therapy, child development, and communication tips for parents. Check back soon!',
      emptyContact: 'In the meantime, feel free to reach out to us.',
      readMore: 'Read article',
      searchPlaceholder: 'Search by title…',
      allCategories: 'All',
      noResults: 'No articles match your search.',
      back: '← Back to articles',
    },
    sq: {
      heroTitle: 'Blog',
      heroSubtitle: 'Këshilla, njohuri dhe burime për familjet',
      emptyTitle: 'Së Shpejti',
      emptyText: 'Jemi duke punuar në artikuj të dobishëm mbi terapinë e të folurit, zhvillimin e fëmijëve dhe këshilla komunikimi për prindërit. Kthehuni së shpejti!',
      emptyContact: 'Ndërkohë, mund të na kontaktoni.',
      readMore: 'Lexo artikullin',
      searchPlaceholder: 'Kërko sipas titullit…',
      allCategories: 'Të gjitha',
      noResults: 'Asnjë artikull nuk përputhet me kërkimin tuaj.',
      back: '← Kthehu te artikujt',
    },
  }

  const c = content[language]

  useEffect(() => {
    supabase
      .from('articles')
      .select('id, title, slug, content, created_at, article_categories(categories(name))')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setArticles(data || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  // Close modal on Escape key
  useEffect(() => {
    if (!selectedArticle) return
    const handler = (e) => { if (e.key === 'Escape') setSelectedArticle(null) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [selectedArticle])

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = selectedArticle ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selectedArticle])

  const allCategories = useMemo(() => {
    const set = new Set()
    articles.forEach((a) => getCategories(a).forEach((c) => set.add(c)))
    return Array.from(set).sort()
  }, [articles])

  const filteredArticles = useMemo(() => {
    return articles.filter((a) => {
      const matchesSearch = !searchQuery || a.title.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = !selectedCategory || getCategories(a).includes(selectedCategory)
      return matchesSearch && matchesCategory
    })
  }, [articles, searchQuery, selectedCategory])

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#2c3e50' }}>

      {/* Hero Banner */}
      <section style={{
        background: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)',
        padding: 'clamp(3rem, 10vw, 6rem) 1.5rem clamp(2rem, 6vw, 4rem)',
        textAlign: 'center',
        color: 'white',
      }}>
        <h1 style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          {c.heroTitle}
        </h1>
        <p style={{ fontSize: 'clamp(1rem, 3vw, 1.3rem)', opacity: 0.85, letterSpacing: '0.05em' }}>
          {c.heroSubtitle}
        </p>
      </section>

      {/* Articles section */}
      <section style={{
        maxWidth: '860px',
        margin: '0 auto',
        padding: 'clamp(2.5rem, 8vw, 5rem) 1.5rem',
      }}>
        {loading ? (
          <div style={{ textAlign: 'center', color: '#95a5a6', fontSize: '1.1rem' }}>…</div>
        ) : articles.length === 0 ? (
          /* Coming Soon placeholder */
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div style={{
              width: '90px',
              height: '90px',
              borderRadius: '50%',
              backgroundColor: '#eaf4fd',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '2rem',
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#3498db" style={{ width: '44px', height: '44px' }}>
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
              </svg>
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', fontWeight: 'bold', color: '#2c3e50', marginBottom: '1.25rem' }}>
              {c.emptyTitle}
            </h2>
            <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.15rem)', color: '#7f8c8d', lineHeight: 1.8, maxWidth: '560px', marginBottom: '1rem' }}>
              {c.emptyText}
            </p>
            <p style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)', color: '#95a5a6' }}>
              {c.emptyContact}
            </p>
          </div>
        ) : (
          <>
            {/* Search + Category filters */}
            <div style={{ marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={c.searchPlaceholder}
                style={{
                  width: '100%',
                  padding: '0.65rem 1rem',
                  fontSize: '1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: 'Arial, sans-serif',
                }}
              />

              {allCategories.length > 0 && (
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    style={{
                      padding: '0.3rem 0.85rem',
                      borderRadius: '999px',
                      fontSize: '0.8rem',
                      fontWeight: '500',
                      border: '1.5px solid',
                      cursor: 'pointer',
                      borderColor: selectedCategory === null ? '#3498db' : '#d1d5db',
                      backgroundColor: selectedCategory === null ? '#3498db' : 'white',
                      color: selectedCategory === null ? 'white' : '#6b7280',
                    }}
                  >
                    {c.allCategories}
                  </button>
                  {allCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                      style={{
                        padding: '0.3rem 0.85rem',
                        borderRadius: '999px',
                        fontSize: '0.8rem',
                        fontWeight: '500',
                        border: '1.5px solid',
                        cursor: 'pointer',
                        borderColor: selectedCategory === cat ? '#3498db' : '#d1d5db',
                        backgroundColor: selectedCategory === cat ? '#3498db' : 'white',
                        color: selectedCategory === cat ? 'white' : '#6b7280',
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {filteredArticles.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#95a5a6', fontSize: '1rem' }}>{c.noResults}</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.25rem, 4vw, 2rem)' }}>
                {filteredArticles.map((article) => {
                  const cats = getCategories(article)
                  return (
                    <article
                      key={article.id}
                      style={{
                        backgroundColor: 'white',
                        borderRadius: '10px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                        padding: 'clamp(1.25rem, 4vw, 2rem)',
                        borderLeft: '4px solid #3498db',
                      }}
                    >
                      {cats.length > 0 && (
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                          {cats.map((cat) => (
                            <span
                              key={cat}
                              style={{
                                backgroundColor: '#eaf4fd',
                                color: '#2980b9',
                                borderRadius: '999px',
                                padding: '0.15rem 0.65rem',
                                fontSize: '0.75rem',
                                fontWeight: '500',
                              }}
                            >
                              {cat}
                            </span>
                          ))}
                        </div>
                      )}

                      <h2 style={{
                        fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
                        fontWeight: 'bold',
                        color: '#2c3e50',
                        margin: '0 0 0.5rem',
                        lineHeight: 1.3,
                      }}>
                        {article.title}
                      </h2>

                      <p style={{ margin: '0 0 1rem', fontSize: '0.85rem', color: '#95a5a6' }}>
                        {formatDate(article.created_at)}
                      </p>

                      <button
                        onClick={() => setSelectedArticle(article)}
                        style={{
                          backgroundColor: '#3498db',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '0.45rem 1.1rem',
                          fontSize: '0.875rem',
                          fontWeight: '500',
                          cursor: 'pointer',
                          fontFamily: 'Arial, sans-serif',
                        }}
                      >
                        {c.readMore}
                      </button>
                    </article>
                  )
                })}
              </div>
            )}
          </>
        )}
      </section>

      {/* Article Modal */}
      {selectedArticle && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setSelectedArticle(null) }}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.55)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            overflowY: 'auto',
            padding: 'clamp(1rem, 4vw, 3rem) 1rem',
          }}
        >
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            width: '100%',
            maxWidth: '740px',
            padding: 'clamp(1.5rem, 5vw, 3rem)',
            position: 'relative',
          }}>
            {/* Close button */}
            <button
              onClick={() => setSelectedArticle(null)}
              aria-label="Close"
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: '#6b7280',
                lineHeight: 1,
                padding: '0.25rem 0.5rem',
              }}
            >
              ✕
            </button>

            {/* Category pills */}
            {getCategories(selectedArticle).length > 0 && (
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                {getCategories(selectedArticle).map((cat) => (
                  <span key={cat} style={{
                    backgroundColor: '#eaf4fd',
                    color: '#2980b9',
                    borderRadius: '999px',
                    padding: '0.15rem 0.65rem',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                  }}>
                    {cat}
                  </span>
                ))}
              </div>
            )}

            <h1 style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)', fontWeight: 'bold', color: '#2c3e50', margin: '0 0 0.5rem', lineHeight: 1.3 }}>
              {selectedArticle.title}
            </h1>
            <p style={{ fontSize: '0.85rem', color: '#95a5a6', marginBottom: '2rem' }}>
              {formatDate(selectedArticle.created_at)}
            </p>

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
                {selectedArticle.content || ''}
              </ReactMarkdown>
            </div>

            <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
              <button
                onClick={() => setSelectedArticle(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#3498db',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  padding: 0,
                  fontFamily: 'Arial, sans-serif',
                }}
              >
                {c.back}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const BlogPage = () => {
  return (
    <LanguageProvider>
      <div style={{ paddingTop: '60px' }}>
        <Navigation />
        <BlogContent />
      </div>
    </LanguageProvider>
  )
}

export default BlogPage

export const Head = () => (
  <>
    <title>Blog — Logopedi për Fëmijë</title>
    <meta name="description" content="Articles and tips on speech therapy, child development, and communication support for families." />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
  </>
)
