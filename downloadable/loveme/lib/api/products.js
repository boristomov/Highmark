import { supabase } from '../supabaseClient';

/**
 * Fetch all products with optional filters
 * @param {Object} filters - Filter options
 * @returns {Promise<Array>} Array of products
 */
export async function getProducts(filters = {}) {
    let query = supabase
        .from('products')
        .select('*')
        .eq('active', true)
        .order('featured', { ascending: false }) // Featured first
        .order('created_at', { ascending: false });

    // Filter by category
    if (filters.category) {
        query = query.eq('category', filters.category);
    }

    // Filter by price range
    if (filters.minPrice) {
        query = query.gte('price', filters.minPrice);
    }
    if (filters.maxPrice) {
        query = query.lte('price', filters.maxPrice);
    }

    // Filter by tags (array contains)
    if (filters.tag) {
        query = query.contains('tags', [filters.tag]);
    }

    // Featured only
    if (filters.featured) {
        query = query.eq('featured', true);
    }

    // Limit results
    if (filters.limit) {
        query = query.limit(filters.limit);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching products:', error);
        throw error;
    }

    return data;
}

/**
 * Fetch a single product by slug
 * @param {string} slug - Product slug
 * @returns {Promise<Object>} Product object
 */
export async function getProductBySlug(slug) {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .eq('active', true)
        .single();

    if (error) {
        console.error('Error fetching product:', error);
        throw error;
    }

    return data;
}

/**
 * Fetch a single product by ID
 * @param {string} id - Product UUID
 * @returns {Promise<Object>} Product object
 */
export async function getProductById(id) {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching product:', error);
        throw error;
    }

    return data;
}

/**
 * Fetch featured products
 * @param {number} limit - Number of products to fetch
 * @returns {Promise<Array>} Array of featured products
 */
export async function getFeaturedProducts(limit = 8) {
    return getProducts({ featured: true, limit });
}

/**
 * Search products by name or description
 * @param {string} searchTerm - Search term
 * @returns {Promise<Array>} Array of matching products
 */
export async function searchProducts(searchTerm) {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('active', true)
        .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,short_description.ilike.%${searchTerm}%`)
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error searching products:', error);
        throw error;
    }

    return data;
}

/**
 * Get related products (same category, exclude current product)
 * @param {string} productId - Current product ID
 * @param {string} category - Category name
 * @param {number} limit - Number of related products
 * @returns {Promise<Array>} Array of related products
 */
export async function getRelatedProducts(productId, category, limit = 4) {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category)
        .neq('id', productId)
        .eq('active', true)
        .limit(limit);

    if (error) {
        console.error('Error fetching related products:', error);
        throw error;
    }

    return data;
}

/**
 * Get all unique tags from all products
 * @returns {Promise<Array>} Array of unique tag strings
 */
export async function getAllTags() {
    const { data, error } = await supabase
        .from('products')
        .select('tags')
        .eq('active', true);

    if (error) {
        console.error('Error fetching tags:', error);
        throw error;
    }

    // Flatten and get unique tags
    const allTags = data.flatMap(product => product.tags || []);
    const uniqueTags = [...new Set(allTags)].sort();

    return uniqueTags;
}

