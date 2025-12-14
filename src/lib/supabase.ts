import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string | null;
  description: string | null;
  price: number;
  colors: string[] | null;
  sizes: string[] | null;
  color: string | null;
  size: string | null;
  image_url: string | null;
  featured: boolean | null;
  in_stock: boolean | null;
  sort_order: number | null;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  display_order: number;
  created_at: string;
}

export interface Customer {
  id: string;
  phone_number: string;
  name: string | null;
  email: string | null;
  total_orders: number;
  total_spent: number;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  customer_id: string;
  order_number: string;
  product_id: string | null;
  product_name: string;
  product_price: number;
  quantity: number;
  size: string | null;
  color: string | null;
  total_amount: number;
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
  delivery_address: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  id: string;
  session_id: string;
  product_id: string;
  quantity: number;
  size: string | null;
  color: string | null;
  created_at: string;
  updated_at: string;
}

export interface WishlistItem {
  id: string;
  session_id: string;
  product_id: string;
  created_at: string;
}

export interface Payment {
  id: string;
  paypal_order_id: string;
  customer_name: string;
  customer_email: string;
  total_amount: number;
  original_amount: number;
  discount_amount: number;
  items_count: number;
  session_id: string;
  status: 'completed' | 'pending' | 'failed';
  payment_method: string;
  created_at: string;
  updated_at: string;
}
