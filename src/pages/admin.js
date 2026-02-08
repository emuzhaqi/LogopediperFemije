import React from 'react'
import { AdminAuthProvider, useAdminAuth } from '../context/AdminAuthContext'
import LoginForm from '../components/admin/LoginForm'
import AdminDashboard from '../components/admin/AdminDashboard'

const AdminPageContent = () => {
  const { isAuthenticated, loading } = useAdminAuth()

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f9fafb'
      }}>
        <div style={{
          fontSize: 'clamp(1rem, 3vw, 1.25rem)',
          color: '#6b7280',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
          Loading...
        </div>
      </div>
    )
  }

  return isAuthenticated ? <AdminDashboard /> : <LoginForm />
}

const AdminPage = () => {
  return (
    <AdminAuthProvider>
      <AdminPageContent />
    </AdminAuthProvider>
  )
}

export default AdminPage

export const Head = () => (
  <>
    <title>Admin Panel - LogopediperFemije</title>
    <meta name="description" content="Admin panel for managing appointments" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
    <meta name="robots" content="noindex, nofollow" />
  </>
)
