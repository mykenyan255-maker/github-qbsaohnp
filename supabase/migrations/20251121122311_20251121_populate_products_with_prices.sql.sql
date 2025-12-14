/*
  # Populate Products with Realistic Data

  1. Adds complete product inventory with prices and images
  2. Includes products for Women, Men, and Unisex categories
  3. Each product has proper pricing and placeholder images
*/

-- Women's Products
INSERT INTO products (name, category, description, price, colors, sizes, image_url, featured, in_stock) VALUES
('Bodycon Dress', 'women', 'Classic bodycon dress in elegant black', 3500, '{"Black", "Navy"}', '{"S", "M", "L", "XL"}', 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=500', true, true),
('Floral Summer Dress', 'women', 'Light and breezy summer dress with floral print', 2800, '{"Pink", "Purple", "Blue"}', '{"S", "M", "L"}', 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=500', true, true),
('Casual Shirt', 'women', 'Comfortable casual shirt for everyday wear', 2200, '{"White", "Blue", "Beige"}', '{"S", "M", "L", "XL"}', 'https://images.pexels.com/photos/3622613/pexels-photo-3622613.jpeg?auto=compress&cs=tinysrgb&w=500', true, true),
('Long Sleeve Sweater', 'women', 'Cozy long sleeve sweater perfect for cool weather', 3200, '{"Maroon", "Cream", "Navy"}', '{"S", "M", "L", "XL"}', 'https://images.pexels.com/photos/3621937/pexels-photo-3621937.jpeg?auto=compress&cs=tinysrgb&w=500', true, true),
('Denim Jeans', 'women', 'Classic blue denim jeans for any occasion', 3800, '{"Dark Blue", "Light Blue"}', '{"24", "26", "28", "30"}', 'https://images.pexels.com/photos/3622614/pexels-photo-3622614.jpeg?auto=compress&cs=tinysrgb&w=500', false, true),
('Ankle Boots', 'women', 'Stylish ankle boots in premium leather', 5500, '{"Black", "Brown"}', '{"35", "36", "37", "38", "39"}', 'https://images.pexels.com/photos/3622615/pexels-photo-3622615.jpeg?auto=compress&cs=tinysrgb&w=500', false, true),
('Crop Top', 'women', 'Modern crop top for trendy outfits', 1800, '{"White", "Black", "Red"}', '{"S", "M", "L"}', 'https://images.pexels.com/photos/3622616/pexels-photo-3622616.jpeg?auto=compress&cs=tinysrgb&w=500', true, true),
('Maxi Skirt', 'women', 'Elegant maxi skirt in flowing fabric', 4200, '{"Black", "Navy", "Khaki"}', '{"S", "M", "L"}', 'https://images.pexels.com/photos/3622617/pexels-photo-3622617.jpeg?auto=compress&cs=tinysrgb&w=500', false, true),
('Leather Jacket', 'women', 'Premium leather jacket for edge and style', 8500, '{"Black", "Brown"}', '{"S", "M", "L", "XL"}', 'https://images.pexels.com/photos/3622618/pexels-photo-3622618.jpeg?auto=compress&cs=tinysrgb&w=500', true, true),
('Evening Gown', 'women', 'Stunning evening gown for special occasions', 12000, '{"Black", "Navy", "Burgundy"}', '{"S", "M", "L"}', 'https://images.pexels.com/photos/3622619/pexels-photo-3622619.jpeg?auto=compress&cs=tinysrgb&w=500', false, true),

-- Men's Products
('Polo Shirt', 'men', 'Classic polo shirt in premium cotton', 2500, '{"Navy", "White", "Black"}', '{"S", "M", "L", "XL", "XXL"}', 'https://images.pexels.com/photos/3622620/pexels-photo-3622620.jpeg?auto=compress&cs=tinysrgb&w=500', true, true),
('T-Shirt', 'men', 'Comfortable everyday t-shirt', 1500, '{"Black", "White", "Gray"}', '{"S", "M", "L", "XL", "XXL"}', 'https://images.pexels.com/photos/3622621/pexels-photo-3622621.jpeg?auto=compress&cs=tinysrgb&w=500', true, true),
('Formal Shirt', 'men', 'Professional formal shirt for business', 4500, '{"White", "Light Blue", "Cream"}', '{"S", "M", "L", "XL", "XXL"}', 'https://images.pexels.com/photos/3622622/pexels-photo-3622622.jpeg?auto=compress&cs=tinysrgb&w=500', true, true),
('Chino Pants', 'men', 'Smart casual chino pants', 3500, '{"Khaki", "Navy", "Black"}', '{"28", "30", "32", "34", "36"}', 'https://images.pexels.com/photos/3622623/pexels-photo-3622623.jpeg?auto=compress&cs=tinysrgb&w=500', false, true),
('Jeans', 'men', 'Durable denim jeans for everyday wear', 4200, '{"Dark Blue", "Light Blue", "Black"}', '{"28", "30", "32", "34", "36"}', 'https://images.pexels.com/photos/3622624/pexels-photo-3622624.jpeg?auto=compress&cs=tinysrgb&w=500', true, true),
('Blazer', 'men', 'Sophisticated blazer for professional look', 7500, '{"Navy", "Black", "Gray"}', '{"S", "M", "L", "XL"}', 'https://images.pexels.com/photos/3622625/pexels-photo-3622625.jpeg?auto=compress&cs=tinysrgb&w=500', true, true),
('Sweater', 'men', 'Cozy sweater for cool weather', 3800, '{"Navy", "Gray", "Maroon"}', '{"S", "M", "L", "XL"}', 'https://images.pexels.com/photos/3622626/pexels-photo-3622626.jpeg?auto=compress&cs=tinysrgb&w=500', false, true),
('Hoodie', 'men', 'Casual hoodie for comfort and style', 3200, '{"Black", "Navy", "Gray"}', '{"S", "M", "L", "XL", "XXL"}', 'https://images.pexels.com/photos/3622627/pexels-photo-3622627.jpeg?auto=compress&cs=tinysrgb&w=500', true, true),
('Leather Belt', 'men', 'Premium leather belt', 1800, '{"Black", "Brown"}', '{"S", "M", "L", "XL"}', 'https://images.pexels.com/photos/3622628/pexels-photo-3622628.jpeg?auto=compress&cs=tinysrgb&w=500', false, true),
('Suit', 'men', 'Complete formal suit for special occasions', 15000, '{"Black", "Navy", "Gray"}', '{"S", "M", "L", "XL"}', 'https://images.pexels.com/photos/3622629/pexels-photo-3622629.jpeg?auto=compress&cs=tinysrgb&w=500', false, true),

-- Unisex Products
('Oversized Hoodie', 'unisex', 'Trendy oversized hoodie for everyone', 3500, '{"Black", "White", "Gray"}', '{"S", "M", "L", "XL", "XXL"}', 'https://images.pexels.com/photos/3622630/pexels-photo-3622630.jpeg?auto=compress&cs=tinysrgb&w=500', true, true),
('Basic T-Shirt', 'unisex', 'Simple and versatile basic t-shirt', 1200, '{"White", "Black", "Navy"}', '{"S", "M", "L", "XL", "XXL"}', 'https://images.pexels.com/photos/3622631/pexels-photo-3622631.jpeg?auto=compress&cs=tinysrgb&w=500', true, true),
('Joggers', 'unisex', 'Comfortable joggers for relaxing', 2800, '{"Black", "Gray", "Navy"}', '{"S", "M", "L", "XL"}', 'https://images.pexels.com/photos/3622632/pexels-photo-3622632.jpeg?auto=compress&cs=tinysrgb&w=500', true, true),
('Cargo Pants', 'unisex', 'Practical cargo pants with multiple pockets', 3200, '{"Khaki", "Black", "Navy"}', '{"S", "M", "L", "XL"}', 'https://images.pexels.com/photos/3622633/pexels-photo-3622633.jpeg?auto=compress&cs=tinysrgb&w=500', false, true),
('Windbreaker Jacket', 'unisex', 'Lightweight windbreaker for active wear', 4500, '{"Black", "Navy", "Red"}', '{"S", "M", "L", "XL", "XXL"}', 'https://images.pexels.com/photos/3622634/pexels-photo-3622634.jpeg?auto=compress&cs=tinysrgb&w=500', true, true),
('Crew Neck Sweater', 'unisex', 'Classic crew neck sweater', 3500, '{"Navy", "Gray", "Cream"}', '{"S", "M", "L", "XL", "XXL"}', 'https://images.pexels.com/photos/3622635/pexels-photo-3622635.jpeg?auto=compress&cs=tinysrgb&w=500', false, true),
('Sneakers', 'unisex', 'Classic white sneakers', 4200, '{"White", "Black", "Gray"}', '{"35", "36", "37", "38", "39", "40", "41"}', 'https://images.pexels.com/photos/3622636/pexels-photo-3622636.jpeg?auto=compress&cs=tinysrgb&w=500', true, true),
('Baseball Cap', 'unisex', 'Comfortable baseball cap', 1500, '{"Black", "Navy", "Khaki"}', '{"One Size"}', 'https://images.pexels.com/photos/3622637/pexels-photo-3622637.jpeg?auto=compress&cs=tinysrgb&w=500', false, true),
('Backpack', 'unisex', 'Durable backpack for daily use', 4800, '{"Black", "Navy", "Gray"}', '{"One Size"}', 'https://images.pexels.com/photos/3622638/pexels-photo-3622638.jpeg?auto=compress&cs=tinysrgb&w=500', false, true),
('Scarf', 'unisex', 'Versatile scarf in various colors', 1800, '{"Black", "Navy", "Beige"}', '{"One Size"}', 'https://images.pexels.com/photos/3622639/pexels-photo-3622639.jpeg?auto=compress&cs=tinysrgb&w=500', false, true);
