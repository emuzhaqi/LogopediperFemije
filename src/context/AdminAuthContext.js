import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'

const AdminAuthContext = createContext()

export const AdminAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Check for existing token on mount
  useEffect(() => {
    const storedToken = sessionStorage.getItem('admin_token')
    if (storedToken) {
      // Validate token by checking expiration
      try {
        const payload = JSON.parse(atob(storedToken.split('.')[1]))
        const isExpired = payload.exp * 1000 < Date.now()

        if (!isExpired) {
          setToken(storedToken)
          setIsAuthenticated(true)
        } else {
          sessionStorage.removeItem('admin_token')
        }
      } catch (err) {
        console.error('Invalid token:', err)
        sessionStorage.removeItem('admin_token')
      }
    }
    setLoading(false)
  }, [])

  const login = async (password) => {
    setLoading(true)
    setError(null)

    try {
      const { data, error: authError } = await supabase.functions.invoke('admin-auth', {
        body: { password }
      })

      if (authError) throw authError

      if (data.error) {
        throw new Error(data.error)
      }

      if (data.token) {
        setToken(data.token)
        setIsAuthenticated(true)
        sessionStorage.setItem('admin_token', data.token)
        return { success: true }
      }
    } catch (err) {
      const errorMessage = err.message || 'Authentication failed'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setToken(null)
    setIsAuthenticated(false)
    sessionStorage.removeItem('admin_token')
    setError(null)
  }

  return (
    <AdminAuthContext.Provider
      value={{
        isAuthenticated,
        token,
        loading,
        error,
        login,
        logout
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  )
}

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext)
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider')
  }
  return context
}
