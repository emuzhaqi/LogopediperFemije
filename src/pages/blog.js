import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'gatsby'
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

                      <Link
                        to={`/blog/${article.slug}`}
                        style={{
                          display: 'inline-block',
                          backgroundColor: '#3498db',
                          color: 'white',
                          borderRadius: '6px',
                          padding: '0.45rem 1.1rem',
                          fontSize: '0.875rem',
                          fontWeight: '500',
                          textDecoration: 'none',
                        }}
                      >
                        {c.readMore}
                      </Link>
                    </article>
                  )
                })}
              </div>
            )}
          </>
        )}
      </section>
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

const siteUrl = 'https://www.logopediperfemije.com'
const pageUrl = `${siteUrl}/blog`

export const Head = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Blog — Logopedi për Fëmijë',
    description: 'Artikuj dhe këshilla mbi terapinë e të folurit, zhvillimin e fëmijëve dhe mbështetjen e komunikimit për familjet.',
    url: pageUrl,
    publisher: {
      '@type': 'Organization',
      name: 'Logopedi për Fëmijë',
      url: siteUrl,
    },
  }

  return (
  <>
    <html lang="sq" />
    <title>Blog — Këshilla për Terapinë e të Folurit | Logopedi për Fëmijë</title>
    <meta name="description" content="Artikuj dhe këshilla mbi terapinë e të folurit, zhvillimin e fëmijëve dhe mbështetjen e komunikimit për familjet. Articles and tips on speech therapy and child development." />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
    <link rel="canonical" href={pageUrl} />

    {/* Hreflang */}
    <link rel="alternate" hrefLang="sq" href={pageUrl} />
    <link rel="alternate" hrefLang="en" href={pageUrl} />
    <link rel="alternate" hrefLang="x-default" href={pageUrl} />

    {/* Open Graph */}
    <meta property="og:type" content="website" />
    <meta property="og:url" content={pageUrl} />
    <meta property="og:title" content="Blog — Këshilla për Terapinë e të Folurit | Logopedi për Fëmijë" />
    <meta property="og:description" content="Artikuj dhe këshilla mbi terapinë e të folurit, zhvillimin e fëmijëve dhe mbështetjen e komunikimit për familjet." />
    <meta property="og:image" content={`${siteUrl}/icons/icon-512x512.png`} />
    <meta property="og:site_name" content="Logopedi për Fëmijë" />

    {/* Twitter Card */}
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="Blog — Këshilla për Terapinë e të Folurit" />
    <meta name="twitter:description" content="Artikuj dhe këshilla mbi terapinë e të folurit, zhvillimin e fëmijëve dhe mbështetjen e komunikimit për familjet." />
    <meta name="twitter:image" content={`${siteUrl}/icons/icon-512x512.png`} />

    {/* JSON-LD */}
    <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
  </>
  )
}
