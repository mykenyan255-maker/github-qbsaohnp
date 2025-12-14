/*
  # Create Payments Table for PayPal Transactions

  1. New Tables
    - `payments`
      - `id` (uuid, primary key)
      - `paypal_order_id` (text, unique) - PayPal order ID
      - `customer_name` (text) - Customer name from PayPal
      - `customer_email` (text) - Customer email from PayPal
      - `total_amount` (numeric) - Discounted amount charged
      - `original_amount` (numeric) - Original amount before discount
      - `discount_amount` (numeric) - Discount amount (50%)
      - `items_count` (integer) - Number of items in order
      - `session_id` (text) - Cart session ID
      - `status` (text) - Payment status (completed, pending, failed)
      - `payment_method` (text) - Payment method used
      - `created_at` (timestamptz) - Payment creation timestamp
      - `updated_at` (timestamptz) - Payment update timestamp

  2. Security
    - Enable RLS on `payments` table
    - Add policy to allow all authenticated operations (public read for data integrity)
    - Payments are permanent transaction records

  3. Indexes
    - Index on `paypal_order_id` for quick lookups
    - Index on `session_id` for session-based queries
    - Index on `created_at` for chronological ordering
*/

CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  paypal_order_id text UNIQUE NOT NULL,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  total_amount numeric NOT NULL,
  original_amount numeric NOT NULL,
  discount_amount numeric NOT NULL,
  items_count integer NOT NULL,
  session_id text NOT NULL,
  status text NOT NULL DEFAULT 'completed',
  payment_method text NOT NULL DEFAULT 'paypal',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on payments"
  ON payments
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX idx_payments_paypal_order_id ON payments(paypal_order_id);
CREATE INDEX idx_payments_session_id ON payments(session_id);
CREATE INDEX idx_payments_created_at ON payments(created_at DESC);
CREATE INDEX idx_payments_customer_email ON payments(customer_email);
