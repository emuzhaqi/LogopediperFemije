import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vantqwppvpojcerpyanu.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhbnRxd3BwdnBvamNlcnB5YW51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1MDI3MzUsImV4cCI6MjA4NjA3ODczNX0.XE7u0NkzG1vYOxuOF3bobro3UvbcCz-c5-CX94L04LI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
