import React from 'react'
import { Link, navigate } from 'gatsby'
import { useAdminAuth } from '../../context/AdminAuthContext'

const AdminNavigation = ({ currentPage }) => {
  const { logout } = useAdminAuth()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: '#2c3e50',
      padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1rem, 4vw, 2rem)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 1000,
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      flexWrap: 'wrap',
      gap: '1rem'
    }}>
      {/* Home icon */}
      <Link to="/admin" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'white' }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{ width: 'clamp(1.4rem, 4vw, 1.75rem)', height: 'clamp(1.4rem, 4vw, 1.75rem)' }}
        >
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
      </Link>

      {/* Right side links */}
      <div style={{
        display: 'flex',
        gap: 'clamp(0.5rem, 3vw, 1.5rem)',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <Link
          to="/admin/articles"
          style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
            padding: 'clamp(0.4rem, 1.5vw, 0.5rem) clamp(0.75rem, 2.5vw, 1rem)',
            backgroundColor: currentPage === 'articles' ? '#1a252f' : 'transparent',
            borderRadius: '4px',
            border: '1px solid rgba(255,255,255,0.3)',
            whiteSpace: 'nowrap',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={e => { if (currentPage !== 'articles') e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)' }}
          onMouseLeave={e => { if (currentPage !== 'articles') e.currentTarget.style.backgroundColor = 'transparent' }}
        >
          Articles
        </Link>

        <button
          onClick={handleLogout}
          style={{
            backgroundColor: '#dc2626',
            color: 'white',
            padding: 'clamp(0.4rem, 1.5vw, 0.5rem) clamp(0.75rem, 2.5vw, 1rem)',
            fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
            fontWeight: '500',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            whiteSpace: 'nowrap',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#b91c1c'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#dc2626'}
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default AdminNavigation
