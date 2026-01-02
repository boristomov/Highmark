-- ============================================
-- HIGHMARK RENTALS - SIMPLIFIED DATABASE SCHEMA
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PRODUCTS TABLE (main inventory items)
-- ============================================
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Basic Info
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  sku VARCHAR(100) UNIQUE,
  
  -- Descriptions
  description TEXT,
  short_description TEXT,
  
  -- Pricing (single price - keep it simple!)
  price DECIMAL(10, 2) NOT NULL,
  
  -- Category (simple enum - only 4 options)
  category VARCHAR(50) NOT NULL CHECK (category IN ('chair', 'table', 'tent', 'accessories')),
  
  -- Inventory
  quantity_available INTEGER NOT NULL DEFAULT 0,
  
  -- Image
  image_url TEXT,
  
  -- Tags (array of strings - simple!)
  tags TEXT[],
  
  -- Display
  active BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- INDEXES for Performance
-- ============================================
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_products_active ON products(active);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_tags ON products USING GIN(tags); -- Fast tag searching

-- ============================================
-- AUTO-UPDATE TIMESTAMP
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SAMPLE DATA
-- ============================================
INSERT INTO products (name, slug, sku, description, short_description, price, category, quantity_available, image_url, tags, featured, active) VALUES
  (
    'Gold Chiavari Chair',
    'gold-chiavari-chair',
    'CHAIR-001',
    'Elegant gold chiavari chairs perfect for weddings and upscale events. These classic chairs feature a timeless design with a lustrous gold finish. Lightweight yet sturdy, they are easy to arrange and comfortable for extended seating.',
    'Classic elegant chair with gold finish',
    5.00,
    'chair',
    100,
    'https://placeholder-for-your-cloudinary-url.com/gold-chiavari-chair.jpg',
    ARRAY['gold', 'elegant', 'wedding', 'wood'],
    true,
    true
  ),
  (
    'White Folding Chair',
    'white-folding-chair',
    'CHAIR-002',
    'Practical and comfortable white folding chairs suitable for any event. Made with durable plastic and a steel frame, these chairs are stackable for easy transport and storage.',
    'Durable white folding chair',
    3.00,
    'chair',
    200,
    'https://placeholder-for-your-cloudinary-url.com/white-folding-chair.jpg',
    ARRAY['white', 'modern', 'stackable'],
    false,
    true
  ),
  (
    'Round Table 60"',
    'round-table-60',
    'TABLE-001',
    'Classic 60-inch round table perfect for seating 8 guests comfortably. Features a sturdy folding design for easy setup and transport. White top surface is ideal for linens and creates a clean, elegant look.',
    'Seats 8 guests, 60" diameter',
    15.00,
    'table',
    50,
    'https://placeholder-for-your-cloudinary-url.com/round-table-60.jpg',
    ARRAY['white', 'round', 'seats-8', 'wedding'],
    true,
    true
  ),
  (
    'White Frame Tent 20x30',
    'white-frame-tent-20x30',
    'TENT-001',
    'Professional grade white frame tent perfect for outdoor events. Covers 600 square feet, suitable for approximately 60 guests with seating. Features durable vinyl top, aluminum frame, and staking system. Professional setup included.',
    'Covers 600 sq ft, seats 60 guests',
    250.00,
    'tent',
    5,
    'https://placeholder-for-your-cloudinary-url.com/white-tent-20x30.jpg',
    ARRAY['white', 'large', 'outdoor', 'wedding'],
    true,
    true
  ),
  (
    'Gold Rim Charger Plate',
    'gold-rim-charger-plate',
    'ACC-001',
    'Elegant clear glass charger plate with gold rim accent. Adds sophistication to any table setting. These decorative plates sit under the dinner plate and remain throughout the meal.',
    'Elegant glass charger with gold accent',
    2.50,
    'accessories',
    150,
    'https://placeholder-for-your-cloudinary-url.com/gold-charger-plate.jpg',
    ARRAY['gold', 'elegant', 'glass', 'wedding'],
    false,
    true
  ),
  (
    'Ivory Tablecloth 90x132',
    'ivory-tablecloth-90x132',
    'ACC-002',
    'Premium quality ivory polyester tablecloth with a subtle sheen. Wrinkle-resistant and easy to care for. This size fits 8ft banquet tables with a full drop to the floor.',
    'Premium ivory tablecloth for 8ft tables',
    8.00,
    'accessories',
    75,
    'https://placeholder-for-your-cloudinary-url.com/ivory-tablecloth.jpg',
    ARRAY['ivory', 'elegant', 'polyester', 'wedding'],
    true,
    true
  );

