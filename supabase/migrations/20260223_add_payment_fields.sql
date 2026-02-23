ALTER TABLE appointments
  ADD COLUMN payment_link     TEXT,
  ADD COLUMN payment_amount   NUMERIC DEFAULT 35,
  ADD COLUMN payment_status   TEXT DEFAULT 'unpaid',
  ADD COLUMN paypal_order_id  TEXT;
  -- payment_status values: 'unpaid' | 'paid'
