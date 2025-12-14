/*
  # Populate Products with Image URL and Prices

  Updates all products with:
  1. New image URL for all products
  2. Price information
  3. Size and color data
  4. Category associations
*/

-- First, get the category IDs
DO $$
DECLARE
  women_id uuid;
  men_id uuid;
  unisex_id uuid;
  image_url text := 'https://i.postimg.cc/nrMbrGNB/Men-Plus-Summer-Two-Tone-Colorblock-Shirt-Drawstring-Waist-Shorts-Set-Without-Tee-Fashion-Going-O.jpg';
BEGIN
  SELECT id INTO women_id FROM categories WHERE name = 'Women';
  SELECT id INTO men_id FROM categories WHERE name = 'Men';
  SELECT id INTO unisex_id FROM categories WHERE name = 'Unisex';

  -- WOMEN'S PRODUCTS
  INSERT INTO products (category_id, name, description, price, color, size, image_url, featured, in_stock) VALUES
  (women_id, 'Bodycon Dress', 'Classic bodycon dress in elegant black', 3500, 'Black', 'S', image_url, true, true),
  (women_id, 'Bodycon Dress', 'Classic bodycon dress in elegant black', 3500, 'Black', 'M', image_url, true, true),
  (women_id, 'Bodycon Dress', 'Classic bodycon dress in elegant black', 3500, 'Black', 'L', image_url, true, true),
  (women_id, 'Floral Summer Dress', 'Light and breezy summer dress with floral print', 2800, 'Pink', 'S', image_url, true, true),
  (women_id, 'Floral Summer Dress', 'Light and breezy summer dress with floral print', 2800, 'Pink', 'M', image_url, true, true),
  (women_id, 'Casual Shirt', 'Comfortable casual shirt for everyday wear', 2200, 'White', 'S', image_url, true, true),
  (women_id, 'Casual Shirt', 'Comfortable casual shirt for everyday wear', 2200, 'Blue', 'M', image_url, true, true),
  (women_id, 'Long Sleeve Sweater', 'Cozy long sleeve sweater perfect for cool weather', 3200, 'Maroon', 'L', image_url, true, true),
  (women_id, 'Denim Jeans', 'Classic blue denim jeans for any occasion', 3800, 'Dark Blue', '24', image_url, false, true),
  (women_id, 'Denim Jeans', 'Classic blue denim jeans for any occasion', 3800, 'Light Blue', '26', image_url, false, true),
  (women_id, 'Ankle Boots', 'Stylish ankle boots in premium leather', 5500, 'Black', '35', image_url, false, true),
  (women_id, 'Crop Top', 'Modern crop top for trendy outfits', 1800, 'White', 'S', image_url, true, true),
  (women_id, 'Crop Top', 'Modern crop top for trendy outfits', 1800, 'Black', 'M', image_url, true, true),
  (women_id, 'Maxi Skirt', 'Elegant maxi skirt in flowing fabric', 4200, 'Black', 'S', image_url, false, true),
  (women_id, 'Leather Jacket', 'Premium leather jacket for edge and style', 8500, 'Black', 'S', image_url, true, true),
  (women_id, 'Evening Gown', 'Stunning evening gown for special occasions', 12000, 'Black', 'S', image_url, false, true);

  -- MEN'S PRODUCTS
  INSERT INTO products (category_id, name, description, price, color, size, image_url, featured, in_stock) VALUES
  (men_id, 'Polo Shirt', 'Classic polo shirt in premium cotton', 2500, 'Navy', 'S', image_url, true, true),
  (men_id, 'Polo Shirt', 'Classic polo shirt in premium cotton', 2500, 'Navy', 'M', image_url, true, true),
  (men_id, 'Polo Shirt', 'Classic polo shirt in premium cotton', 2500, 'White', 'L', image_url, true, true),
  (men_id, 'T-Shirt', 'Comfortable everyday t-shirt', 1500, 'Black', 'S', image_url, true, true),
  (men_id, 'T-Shirt', 'Comfortable everyday t-shirt', 1500, 'White', 'M', image_url, true, true),
  (men_id, 'Formal Shirt', 'Professional formal shirt for business', 4500, 'White', 'M', image_url, true, true),
  (men_id, 'Formal Shirt', 'Professional formal shirt for business', 4500, 'Light Blue', 'L', image_url, true, true),
  (men_id, 'Chino Pants', 'Smart casual chino pants', 3500, 'Khaki', '30', image_url, false, true),
  (men_id, 'Chino Pants', 'Smart casual chino pants', 3500, 'Navy', '32', image_url, false, true),
  (men_id, 'Jeans', 'Durable denim jeans for everyday wear', 4200, 'Dark Blue', '30', image_url, true, true),
  (men_id, 'Jeans', 'Durable denim jeans for everyday wear', 4200, 'Black', '32', image_url, true, true),
  (men_id, 'Blazer', 'Sophisticated blazer for professional look', 7500, 'Navy', 'M', image_url, true, true),
  (men_id, 'Blazer', 'Sophisticated blazer for professional look', 7500, 'Black', 'L', image_url, true, true),
  (men_id, 'Sweater', 'Cozy sweater for cool weather', 3800, 'Navy', 'M', image_url, false, true),
  (men_id, 'Hoodie', 'Casual hoodie for comfort and style', 3200, 'Black', 'M', image_url, true, true),
  (men_id, 'Hoodie', 'Casual hoodie for comfort and style', 3200, 'Navy', 'L', image_url, true, true);

  -- UNISEX PRODUCTS
  INSERT INTO products (category_id, name, description, price, color, size, image_url, featured, in_stock) VALUES
  (unisex_id, 'Oversized Hoodie', 'Trendy oversized hoodie for everyone', 3500, 'Black', 'S', image_url, true, true),
  (unisex_id, 'Oversized Hoodie', 'Trendy oversized hoodie for everyone', 3500, 'Black', 'M', image_url, true, true),
  (unisex_id, 'Oversized Hoodie', 'Trendy oversized hoodie for everyone', 3500, 'White', 'L', image_url, true, true),
  (unisex_id, 'Basic T-Shirt', 'Simple and versatile basic t-shirt', 1200, 'White', 'S', image_url, true, true),
  (unisex_id, 'Basic T-Shirt', 'Simple and versatile basic t-shirt', 1200, 'Black', 'M', image_url, true, true),
  (unisex_id, 'Joggers', 'Comfortable joggers for relaxing', 2800, 'Black', 'S', image_url, true, true),
  (unisex_id, 'Joggers', 'Comfortable joggers for relaxing', 2800, 'Gray', 'M', image_url, true, true),
  (unisex_id, 'Cargo Pants', 'Practical cargo pants with multiple pockets', 3200, 'Khaki', 'S', image_url, false, true),
  (unisex_id, 'Cargo Pants', 'Practical cargo pants with multiple pockets', 3200, 'Black', 'M', image_url, false, true),
  (unisex_id, 'Windbreaker Jacket', 'Lightweight windbreaker for active wear', 4500, 'Black', 'M', image_url, true, true),
  (unisex_id, 'Crew Neck Sweater', 'Classic crew neck sweater', 3500, 'Navy', 'L', image_url, false, true),
  (unisex_id, 'Sneakers', 'Classic white sneakers', 4200, 'White', '40', image_url, true, true),
  (unisex_id, 'Baseball Cap', 'Comfortable baseball cap', 1500, 'Black', 'One Size', image_url, false, true),
  (unisex_id, 'Backpack', 'Durable backpack for daily use', 4800, 'Black', 'One Size', image_url, false, true),
  (unisex_id, 'Scarf', 'Versatile scarf in various colors', 1800, 'Black', 'One Size', image_url, false, true);

END $$;
