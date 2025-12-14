/*
  # Eddjos Collections Product Catalog Schema

  ## Overview
  Complete database schema for Eddjos Collections fashion e-commerce platform
  with WhatsApp-based ordering system.

  ## 1. New Tables
  
  ### `products`
  Main product catalog table containing all clothing items
  - `id` (uuid, primary key) - Unique product identifier
  - `name` (text, not null) - Product name (e.g., "Eddjos Oversized Hoodie")
  - `category_id` (uuid) - Category reference
  - `description` (text) - Detailed product description
  - `price` (numeric, not null) - Price in Kenyan Shillings (KES)
  - `color` (text) - Product color
  - `size` (text) - Product size
  - `image_url` (text) - Primary product image URL
  - `featured` (boolean) - Whether product is featured on homepage
  - `in_stock` (boolean) - Inventory status
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `categories`
  Product category reference table
  - `id` (uuid, primary key) - Unique category identifier
  - `name` (text, unique, not null) - Category name
  - `icon` (text) - Category icon emoji
  - `created_at` (timestamptz) - Record creation timestamp

  ## 2. Security
  - Enable RLS on all tables
  - Public read access for product catalog (no authentication required)
  - No write access from client (products managed via admin tools)

  ## 3. Indexes
  - Index on product category for fast filtering
  - Index on featured products for homepage queries
  - Index on in_stock status for availability filtering
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  icon text,
  created_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  name text NOT NULL,
  description text,
  price numeric NOT NULL CHECK (price >= 0),
  color text,
  size text,
  image_url text,
  featured boolean DEFAULT false,
  in_stock boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_products_in_stock ON products(in_stock) WHERE in_stock = true;

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (no auth required for browsing)
CREATE POLICY "Categories are publicly readable"
  ON categories
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Products are publicly readable"
  ON products
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Insert default categories
INSERT INTO categories (name, icon) VALUES
  ('Women', '👚'),
  ('Men', '👔'),
  ('Unisex', '👕')
ON CONFLICT (name) DO NOTHING;
