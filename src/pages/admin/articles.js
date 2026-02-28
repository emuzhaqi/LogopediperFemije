import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { AdminAuthProvider, useAdminAuth } from '../../context/AdminAuthContext'
import LoginForm from '../../components/admin/LoginForm'
import AdminNavigation from '../../components/admin/AdminNavigation'
import { supabase } from '../../utils/supabase'

const FONT = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'

const inputStyle = {
  width: '100%',
  padding: 'clamp(0.5rem, 2vw, 0.625rem)',
  fontSize: 'clamp(0.875rem, 2vw, 1rem)',
  border: '1px solid #d1d5db',
  borderRadius: '4px',
  outline: 'none',
  fontFamily: FONT,
  boxSizing: 'border-box',
}

const labelStyle = {
  display: 'block',
  fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
  fontWeight: '500',
  color: '#374151',
  marginBottom: '0.375rem',
  fontFamily: FONT,
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function getCategories(article) {
  if (!article.article_categories?.length) return '—'
  return article.article_categories
    .map((ac) => ac.categories?.name)
    .filter(Boolean)
    .join(', ')
}

const ArticlesContent = () => {
  const { isAuthenticated, loading, token } = useAdminAuth()
  const [showForm, setShowForm] = useState(false)
  const [articles, setArticles] = useState([])
  const [loadingArticles, setLoadingArticles] = useState(false)
  const [formData, setFormData] = useState({ title: '', content: '', categories: '' })
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState(null)
  const [toggleLoadingId, setToggleLoadingId] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null)

  const fetchArticles = useCallback(async () => {
    if (!token) return
    setLoadingArticles(true)
    try {
      const { data, error } = await supabase.functions.invoke('get-all-articles', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (error) throw error
      if (data.error) throw new Error(data.error)
      setArticles(data.articles || [])
    } catch (err) {
      console.error('Failed to fetch articles:', err)
    } finally {
      setLoadingArticles(false)
    }
  }, [token])

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchArticles()
    }
  }, [isAuthenticated, token, fetchArticles])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setFormError(null)
    try {
      const { data, error } = await supabase.functions.invoke('save-article', {
        body: formData,
        headers: { Authorization: `Bearer ${token}` },
      })
      if (error) throw error
      if (data.error) throw new Error(data.error)
      setFormData({ title: '', content: '', categories: '' })
      setShowForm(false)
      await fetchArticles()
    } catch (err) {
      setFormError(err.message || 'Failed to save article')
    } finally {
      setSubmitting(false)
    }
  }

  const handleToggle = async (articleId, currentIsHidden) => {
    setToggleLoadingId(articleId)
    try {
      const { data, error } = await supabase.functions.invoke('toggle-article-visibility', {
        body: { article_id: articleId, is_hidden: !currentIsHidden },
        headers: { Authorization: `Bearer ${token}` },
      })
      if (error) throw error
      if (data.error) throw new Error(data.error)
      await fetchArticles()
    } catch (err) {
      console.error('Failed to toggle visibility:', err)
    } finally {
      setToggleLoadingId(null)
    }
  }

  const allCategories = useMemo(() => {
    const set = new Set()
    articles.forEach((a) => {
      if (a.article_categories?.length) {
        a.article_categories.forEach((ac) => { if (ac.categories?.name) set.add(ac.categories.name) })
      }
    })
    return Array.from(set).sort()
  }, [articles])

  const filteredArticles = useMemo(() => {
    return articles.filter((a) => {
      const matchesSearch = !searchQuery || a.title.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = !selectedCategory || (a.article_categories || []).some((ac) => ac.categories?.name === selectedCategory)
      return matchesSearch && matchesCategory
    })
  }, [articles, searchQuery, selectedCategory])

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f9fafb',
      }}>
        <div style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)', color: '#6b7280', fontFamily: FONT }}>
          Loading...
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginForm />
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      padding: 'calc(clamp(1rem, 3vw, 2rem) + 4rem) clamp(1rem, 3vw, 2rem) clamp(1rem, 3vw, 2rem)',
    }}>
      <AdminNavigation currentPage="articles" />

      {/* Page header */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: 'clamp(1rem, 3vw, 1.5rem)',
        marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <h1 style={{
          fontSize: 'clamp(1.25rem, 4vw, 1.875rem)',
          fontWeight: '600',
          color: '#1a1a1a',
          margin: 0,
          fontFamily: FONT,
        }}>
          Articles
        </h1>
        <button
          onClick={() => { setShowForm(!showForm); setFormError(null) }}
          style={{
            backgroundColor: '#2c3e50',
            color: 'white',
            padding: 'clamp(0.5rem, 2vw, 0.625rem) clamp(1rem, 3vw, 1.25rem)',
            fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
            fontWeight: '500',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontFamily: FONT,
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1a252f'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2c3e50'}
        >
          {showForm ? '✕ Cancel' : '+ New Article'}
        </button>
      </div>

      {/* New Article form */}
      {showForm && (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: 'clamp(1rem, 3vw, 1.5rem)',
          marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        }}>
          <h2 style={{
            fontSize: 'clamp(1rem, 3vw, 1.25rem)',
            fontWeight: '600',
            color: '#1a1a1a',
            margin: '0 0 clamp(1rem, 3vw, 1.25rem)',
            fontFamily: FONT,
          }}>
            New Article
          </h2>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.75rem, 2vw, 1rem)' }}>
            <div>
              <label style={labelStyle}>Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                style={inputStyle}
                placeholder="Enter article title"
              />
            </div>

            <div>
              <label style={labelStyle}>Content (Markdown) *</label>
              <textarea
                required
                value={formData.content}
                onChange={e => setFormData({ ...formData, content: e.target.value })}
                style={{ ...inputStyle, minHeight: '280px', resize: 'vertical', lineHeight: '1.5' }}
                placeholder="Paste your markdown content here"
              />
            </div>

            <div>
              <label style={labelStyle}>Categories</label>
              <input
                type="text"
                value={formData.categories}
                onChange={e => setFormData({ ...formData, categories: e.target.value })}
                style={inputStyle}
                placeholder="e.g. fjalim, gjuhë, fëmijë"
              />
              <p style={{ margin: '0.25rem 0 0', fontSize: '0.75rem', color: '#9ca3af', fontFamily: FONT }}>
                Comma or semicolon separated keywords
              </p>
            </div>

            {formError && (
              <div style={{
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '4px',
                padding: '0.75rem 1rem',
                color: '#dc2626',
                fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                fontFamily: FONT,
              }}>
                {formError}
              </div>
            )}

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => { setShowForm(false); setFormError(null) }}
                style={{
                  backgroundColor: 'white',
                  color: '#374151',
                  padding: 'clamp(0.5rem, 2vw, 0.625rem) clamp(1rem, 3vw, 1.25rem)',
                  fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                  fontWeight: '500',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontFamily: FONT,
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                style={{
                  backgroundColor: submitting ? '#9ca3af' : '#2c3e50',
                  color: 'white',
                  padding: 'clamp(0.5rem, 2vw, 0.625rem) clamp(1rem, 3vw, 1.25rem)',
                  fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                  fontWeight: '500',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  fontFamily: FONT,
                }}
              >
                {submitting ? 'Publishing…' : 'Publish Article'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search + filter */}
      {articles.length > 0 && (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: 'clamp(0.875rem, 2vw, 1.25rem)',
          marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
        }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title…"
            style={{ ...inputStyle, maxWidth: '400px' }}
          />
          {allCategories.length > 0 && (
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setSelectedCategory(null)}
                style={{
                  padding: '0.25rem 0.75rem',
                  borderRadius: '999px',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  border: '1.5px solid',
                  cursor: 'pointer',
                  fontFamily: FONT,
                  borderColor: selectedCategory === null ? '#2c3e50' : '#d1d5db',
                  backgroundColor: selectedCategory === null ? '#2c3e50' : 'white',
                  color: selectedCategory === null ? 'white' : '#6b7280',
                }}
              >
                All
              </button>
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                  style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '999px',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    border: '1.5px solid',
                    cursor: 'pointer',
                    fontFamily: FONT,
                    borderColor: selectedCategory === cat ? '#2c3e50' : '#d1d5db',
                    backgroundColor: selectedCategory === cat ? '#2c3e50' : 'white',
                    color: selectedCategory === cat ? 'white' : '#6b7280',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Articles list */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
      }}>
        <div style={{
          padding: 'clamp(1rem, 3vw, 1.5rem)',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <h2 style={{
            fontSize: 'clamp(1rem, 3vw, 1.25rem)',
            fontWeight: '600',
            color: '#1a1a1a',
            margin: 0,
            fontFamily: FONT,
          }}>
            All Articles
          </h2>
          {(searchQuery || selectedCategory) && (
            <span style={{ fontSize: '0.8rem', color: '#6b7280', fontFamily: FONT }}>
              {filteredArticles.length} of {articles.length}
            </span>
          )}
        </div>

        {loadingArticles ? (
          <div style={{ padding: 'clamp(2rem, 5vw, 4rem)', textAlign: 'center', color: '#6b7280', fontFamily: FONT }}>
            Loading articles…
          </div>
        ) : articles.length === 0 ? (
          <div style={{ padding: 'clamp(2rem, 5vw, 4rem)', textAlign: 'center', color: '#6b7280', fontFamily: FONT, fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>
            No articles yet. Click <strong>+ New Article</strong> to create your first one.
          </div>
        ) : filteredArticles.length === 0 ? (
          <div style={{ padding: 'clamp(2rem, 5vw, 4rem)', textAlign: 'center', color: '#6b7280', fontFamily: FONT, fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>
            No articles match your search.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: FONT }}>
              <thead>
                <tr style={{ backgroundColor: '#f9fafb' }}>
                  {['Title', 'Categories', 'Status', 'Created', 'Actions'].map(col => (
                    <th key={col} style={{
                      padding: 'clamp(0.625rem, 2vw, 0.875rem) clamp(0.75rem, 2vw, 1rem)',
                      textAlign: 'left',
                      fontSize: 'clamp(0.75rem, 2vw, 0.8125rem)',
                      fontWeight: '600',
                      color: '#374151',
                      borderBottom: '1px solid #e5e7eb',
                      whiteSpace: 'nowrap',
                    }}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredArticles.map((article, idx) => (
                  <tr
                    key={article.id}
                    style={{ backgroundColor: idx % 2 === 0 ? 'white' : '#fafafa' }}
                  >
                    <td style={{
                      padding: 'clamp(0.625rem, 2vw, 0.875rem) clamp(0.75rem, 2vw, 1rem)',
                      fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                      color: '#1a1a1a',
                      fontWeight: '500',
                      maxWidth: '260px',
                    }}>
                      {article.title}
                    </td>
                    <td style={{
                      padding: 'clamp(0.625rem, 2vw, 0.875rem) clamp(0.75rem, 2vw, 1rem)',
                      fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                      color: '#6b7280',
                      maxWidth: '200px',
                    }}>
                      {getCategories(article)}
                    </td>
                    <td style={{ padding: 'clamp(0.625rem, 2vw, 0.875rem) clamp(0.75rem, 2vw, 1rem)' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '999px',
                        fontSize: '0.75rem',
                        fontWeight: '500',
                        backgroundColor: article.is_hidden ? '#fef3c7' : '#d1fae5',
                        color: article.is_hidden ? '#92400e' : '#065f46',
                      }}>
                        {article.is_hidden ? 'Hidden' : 'Visible'}
                      </span>
                    </td>
                    <td style={{
                      padding: 'clamp(0.625rem, 2vw, 0.875rem) clamp(0.75rem, 2vw, 1rem)',
                      fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                      color: '#6b7280',
                      whiteSpace: 'nowrap',
                    }}>
                      {formatDate(article.created_at)}
                    </td>
                    <td style={{ padding: 'clamp(0.625rem, 2vw, 0.875rem) clamp(0.75rem, 2vw, 1rem)' }}>
                      <button
                        onClick={() => handleToggle(article.id, article.is_hidden)}
                        disabled={toggleLoadingId === article.id}
                        style={{
                          backgroundColor: article.is_hidden ? '#2c3e50' : '#dc2626',
                          color: 'white',
                          padding: '0.375rem 0.75rem',
                          fontSize: 'clamp(0.7rem, 2vw, 0.8125rem)',
                          fontWeight: '500',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: toggleLoadingId === article.id ? 'not-allowed' : 'pointer',
                          opacity: toggleLoadingId === article.id ? 0.6 : 1,
                          whiteSpace: 'nowrap',
                          fontFamily: FONT,
                        }}
                      >
                        {toggleLoadingId === article.id
                          ? '…'
                          : article.is_hidden ? 'Unhide' : 'Hide'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

const ArticlesPage = () => {
  return (
    <AdminAuthProvider>
      <ArticlesContent />
    </AdminAuthProvider>
  )
}

export default ArticlesPage

export const Head = () => (
  <>
    <title>Articles - Admin Panel</title>
    <meta name="description" content="Manage articles in the admin panel" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
    <meta name="robots" content="noindex, nofollow" />
  </>
)
