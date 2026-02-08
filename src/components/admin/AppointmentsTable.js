import React, { useState, useEffect } from 'react'
import { supabase } from '../../utils/supabase'
import { useAdminAuth } from '../../context/AdminAuthContext'
import AppointmentRow from './AppointmentRow'
import NotificationToast from './NotificationToast'

const AppointmentsTable = ({ statusFilter, dateRange }) => {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [notification, setNotification] = useState(null)
  const { token } = useAdminAuth()

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
  }

  // Fetch appointments
  const fetchAppointments = async () => {
    setLoading(true)
    setError(null)

    try {
      let query = supabase
        .from('appointments')
        .select('*')
        .order('appointment_date', { ascending: true })

      // Apply status filter
      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter)
      }

      // Apply date range filter
      if (dateRange.start) {
        query = query.gte('appointment_date', dateRange.start)
      }
      if (dateRange.end) {
        query = query.lte('appointment_date', dateRange.end)
      }

      const { data, error: fetchError } = await query

      if (fetchError) throw fetchError

      setAppointments(data || [])
    } catch (err) {
      console.error('Error fetching appointments:', err)
      setError('Failed to load appointments')
    } finally {
      setLoading(false)
    }
  }

  // Initial fetch
  useEffect(() => {
    fetchAppointments()
  }, [statusFilter, dateRange])

  // Real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('appointments-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'appointments'
        },
        (payload) => {
          console.log('Real-time update:', payload)
          fetchAppointments()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [statusFilter, dateRange])

  if (loading) {
    return (
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: 'clamp(2rem, 5vw, 3rem)',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: 'clamp(0.875rem, 2vw, 1rem)',
          color: '#6b7280',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
          Loading appointments...
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: 'clamp(2rem, 5vw, 3rem)',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: 'clamp(0.875rem, 2vw, 1rem)',
          color: '#dc2626',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
          {error}
        </div>
      </div>
    )
  }

  if (appointments.length === 0) {
    return (
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: 'clamp(2rem, 5vw, 3rem)',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: 'clamp(0.875rem, 2vw, 1rem)',
          color: '#6b7280',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
          No appointments found
        </div>
      </div>
    )
  }

  return (
    <>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        overflowX: 'auto'
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
          <thead>
            <tr style={{
              backgroundColor: '#f9fafb',
              borderBottom: '2px solid #e5e7eb'
            }}>
              <th style={{
                padding: 'clamp(0.75rem, 2vw, 1rem)',
                textAlign: 'left',
                fontWeight: '600',
                color: '#374151',
                whiteSpace: 'nowrap'
              }}>
                Date
              </th>
              <th style={{
                padding: 'clamp(0.75rem, 2vw, 1rem)',
                textAlign: 'left',
                fontWeight: '600',
                color: '#374151',
                whiteSpace: 'nowrap'
              }}>
                Time
              </th>
              <th style={{
                padding: 'clamp(0.75rem, 2vw, 1rem)',
                textAlign: 'left',
                fontWeight: '600',
                color: '#374151',
                whiteSpace: 'nowrap'
              }}>
                Type
              </th>
              <th style={{
                padding: 'clamp(0.75rem, 2vw, 1rem)',
                textAlign: 'left',
                fontWeight: '600',
                color: '#374151',
                whiteSpace: 'nowrap'
              }}>
                Client Name
              </th>
              <th style={{
                padding: 'clamp(0.75rem, 2vw, 1rem)',
                textAlign: 'left',
                fontWeight: '600',
                color: '#374151',
                whiteSpace: 'nowrap'
              }}>
                Email
              </th>
              <th style={{
                padding: 'clamp(0.75rem, 2vw, 1rem)',
                textAlign: 'left',
                fontWeight: '600',
                color: '#374151',
                whiteSpace: 'nowrap'
              }}>
                Phone
              </th>
              <th style={{
                padding: 'clamp(0.75rem, 2vw, 1rem)',
                textAlign: 'left',
                fontWeight: '600',
                color: '#374151',
                whiteSpace: 'nowrap'
              }}>
                Status
              </th>
              <th style={{
                padding: 'clamp(0.75rem, 2vw, 1rem)',
                textAlign: 'left',
                fontWeight: '600',
                color: '#374151',
                whiteSpace: 'nowrap'
              }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <AppointmentRow
                key={appointment.id}
                appointment={appointment}
                onUpdate={fetchAppointments}
                showNotification={showNotification}
              />
            ))}
          </tbody>
        </table>
      </div>

      {notification && (
        <NotificationToast
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </>
  )
}

export default AppointmentsTable
