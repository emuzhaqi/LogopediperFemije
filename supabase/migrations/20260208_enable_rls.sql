-- Enable Row Level Security on appointments table
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Allow public (anonymous) inserts for booking appointments
CREATE POLICY "Allow public inserts" ON appointments
  FOR INSERT TO anon WITH CHECK (true);

-- Allow public reads so clients can see available time slots
CREATE POLICY "Allow public reads" ON appointments
  FOR SELECT TO anon USING (true);

-- Allow authenticated users (admin) to update appointments
CREATE POLICY "Allow authenticated updates" ON appointments
  FOR UPDATE TO authenticated USING (true);

-- Prevent all deletes (appointments should not be deleted)
CREATE POLICY "Prevent deletes" ON appointments
  FOR DELETE USING (false);
