-- Migration: Add details column to products table
-- Run this in Supabase SQL Editor to add product specifications support

-- Add details column for storing product specs (color, dimensions, material, etc.)
ALTER TABLE products ADD COLUMN IF NOT EXISTS details TEXT;

-- Verify the column was added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'products' AND column_name = 'details';

