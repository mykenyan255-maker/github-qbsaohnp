/*
  # Add USD Pricing Support
  
  1. New Columns
    - Add `price_usd` column to products table to store prices in USD
    - Add `currency_code` column for future multi-currency support
    
  2. Data Migration
    - Calculate price_usd from existing KSH prices using fixed rate of 130 KSH = 1 USD
    - Populate all products with USD equivalent prices
    
  3. Constraints
    - Both price and price_usd must be >= 0
    - Default currency_code is USD
    
  4. Notes
    - Existing price column remains in KSH
    - All USD calculations use fixed conversion rate of 130:1
    - Future payments will use USD pricing while display uses KSH
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'price_usd'
  ) THEN
    ALTER TABLE products ADD COLUMN price_usd numeric CHECK (price_usd >= 0);
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'currency_code'
  ) THEN
    ALTER TABLE products ADD COLUMN currency_code text DEFAULT 'USD';
  END IF;
END $$;

DO $$
BEGIN
  UPDATE products 
  SET price_usd = ROUND(CAST(price as numeric) / 130, 2)
  WHERE price_usd IS NULL AND price > 0;
  
  UPDATE products 
  SET price_usd = 0
  WHERE price_usd IS NULL AND price = 0;
END $$;