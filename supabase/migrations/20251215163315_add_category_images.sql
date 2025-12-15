/*
  # Add Category Images
  
  1. New Columns
    - Add `image_url` column to categories table for category display images
    
  2. Data Updates
    - Update categories with specific images:
      - Men: https://i.postimg.cc/qqJzgSGG/download_(13).jpg
      - Women: https://i.postimg.cc/XJG0L878/High_quality_ADIRE_print_baggy_pant_One_size_fits_6_16_full_length_19500_Zara_bodysuit_Top_Avail.jpg
      - Unisex: https://i.postimg.cc/PxWgxz9K/Soft-Leather-Duffel-Bag-40L-Convertible-Travel-Bag.jpg
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'categories' AND column_name = 'image_url'
  ) THEN
    ALTER TABLE categories ADD COLUMN image_url text;
  END IF;
END $$;

UPDATE categories SET image_url = 'https://i.postimg.cc/qqJzgSGG/download_(13).jpg' WHERE slug = 'men';
UPDATE categories SET image_url = 'https://i.postimg.cc/XJG0L878/High_quality_ADIRE_print_baggy_pant_One_size_fits_6_16_full_length_19500_Zara_bodysuit_Top_Avail.jpg' WHERE slug = 'women';
UPDATE categories SET image_url = 'https://i.postimg.cc/PxWgxz9K/Soft-Leather-Duffel-Bag-40L-Convertible-Travel-Bag.jpg' WHERE slug = 'unisex';