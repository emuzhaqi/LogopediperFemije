-- Fix: allow the admin (anon key) to update appointments.
-- The admin JWT uses a custom role ('admin'), not Supabase's 'authenticated' role,
-- so the previous "Allow authenticated updates" policy was silently rejecting all
-- admin writes. We add a matching policy for the anon role.
CREATE POLICY "Allow anon updates" ON public.appointments
  FOR UPDATE TO anon
  USING (true)
  WITH CHECK (true);

-- Fix: allow the admin to manage blocked_dates (insert / delete).
-- The existing policy only covered SELECT.
CREATE POLICY "Allow anon inserts to blocked_dates"
  ON public.blocked_dates
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anon deletes from blocked_dates"
  ON public.blocked_dates
  FOR DELETE TO anon
  USING (true);
