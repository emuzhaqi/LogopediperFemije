import React, { useState } from 'react'
import { useAdminAuth } from '../../context/AdminAuthContext'
import AppointmentsTable from './AppointmentsTable'

const AdminDashboard = () => {
  const { logout } = useAdminAuth()
  const [statusFilter, setStatusFilter] = useState('pending')
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  })

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      padding: 'clamp(1rem, 3vw, 2rem)'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: 'clamp(1rem, 3vw, 1.5rem)',
        marginBottom: 'clamp(1rem, 3vw, 2rem)',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 'clamp(0.5rem, 2vw, 1rem)'
      }}>
        <h1 style={{
          fontSize: 'clamp(1.25rem, 4vw, 1.875rem)',
          fontWeight: '600',
          color: '#1a1a1a',
          margin: 0,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
          Admin Panel
        </h1>

        <button
          onClick={logout}
          style={{
            backgroundColor: '#dc2626',
            color: 'white',
            padding: 'clamp(0.5rem, 2vw, 0.625rem) clamp(1rem, 3vw, 1.25rem)',
            fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
            fontWeight: '500',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#b91c1c'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#dc2626'}
        >
          Logout
        </button>
      </div>

      {/* Filters */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: 'clamp(1rem, 3vw, 1.5rem)',
        marginBottom: 'clamp(1rem, 3vw, 2rem)',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{
          fontSize: 'clamp(1rem, 3vw, 1.25rem)',
          fontWeight: '600',
          color: '#1a1a1a',
          marginBottom: 'clamp(0.75rem, 2vw, 1rem)',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
          Filters
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'clamp(0.75rem, 2vw, 1rem)'
        }}>
          {/* Status Filter */}
          <div>
            <label
              htmlFor="status-filter"
              style={{
                display: 'block',
                fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                fontWeight: '500',
                color: '#374151',
                marginBottom: 'clamp(0.25rem, 1vw, 0.5rem)'
              }}
            >
              Status
            </label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                width: '100%',
                padding: 'clamp(0.5rem, 2vw, 0.625rem)',
                fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                outline: 'none',
                cursor: 'pointer',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
            </select>
          </div>

          {/* Date Range Start */}
          <div>
            <label
              htmlFor="date-start"
              style={{
                display: 'block',
                fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                fontWeight: '500',
                color: '#374151',
                marginBottom: 'clamp(0.25rem, 1vw, 0.5rem)'
              }}
            >
              From Date
            </label>
            <input
              type="date"
              id="date-start"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              style={{
                width: '100%',
                padding: 'clamp(0.5rem, 2vw, 0.625rem)',
                fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                outline: 'none',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}
            />
          </div>

          {/* Date Range End */}
          <div>
            <label
              htmlFor="date-end"
              style={{
                display: 'block',
                fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                fontWeight: '500',
                color: '#374151',
                marginBottom: 'clamp(0.25rem, 1vw, 0.5rem)'
              }}
            >
              To Date
            </label>
            <input
              type="date"
              id="date-end"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              style={{
                width: '100%',
                padding: 'clamp(0.5rem, 2vw, 0.625rem)',
                fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                outline: 'none',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}
            />
          </div>
        </div>
      </div>

      {/* Appointments Table */}
      <AppointmentsTable
        statusFilter={statusFilter}
        dateRange={dateRange}
      />
    </div>
  )
}

export default AdminDashboard
