async function getProductExportPaths() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
        return {}
    }

    try {
        const response = await fetch(`${supabaseUrl}/rest/v1/products?select=slug&active=eq.true`, {
            headers: {
                apikey: supabaseAnonKey,
                Authorization: `Bearer ${supabaseAnonKey}`,
            },
        })

        if (!response.ok) {
            console.warn(`Could not load product routes for export: ${response.status}`)
            return {}
        }

        const products = await response.json()

        return (products || []).reduce((paths, product) => {
            if (!product?.slug) return paths

            paths[`/product-single/${product.slug}`] = {
                page: '/product-single/[slug]',
                query: { slug: product.slug },
            }

            return paths
        }, {})
    } catch (error) {
        console.warn(`Could not load product routes for export: ${error.message}`)
        return {}
    }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // GitHub Pages requires fully static output. We use `next export` (Next 13.0.x).
    trailingSlash: true,
    // For GitHub Pages project sites, CI sets NEXT_PUBLIC_BASE_PATH to "/<repo>".
    // During `next dev`, force root so localhost:3000/ opens the app (env var may still be set from .env.local).
    ...(() => {
        const isDev = process.env.NODE_ENV === 'development'
        const bp = isDev ? '' : (process.env.NEXT_PUBLIC_BASE_PATH || '')
        return {
            basePath: bp,
            assetPrefix: isDev ? undefined : (process.env.NEXT_PUBLIC_BASE_PATH || undefined),
        }
    })(),
    // Explicitly expose NEXT_PUBLIC_ env vars for static export
    env: {
        // Dev: always root. Prod/export: GitHub Pages uses /repo from CI env (see workflow).
        NEXT_PUBLIC_BASE_PATH:
            process.env.NODE_ENV === 'development'
                ? ''
                : (process.env.NEXT_PUBLIC_BASE_PATH || ''),
        NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
        NEXT_PUBLIC_EMAILJS_SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        NEXT_PUBLIC_EMAILJS_TEMPLATE_INQUIRY: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_INQUIRY,
        NEXT_PUBLIC_EMAILJS_TEMPLATE_QUOTE: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_QUOTE,
        NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    },
    images: {
        domains: ['res.cloudinary.com', 'placeholder-for-your-cloudinary-url.com'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        // Required for static export / GitHub Pages
        unoptimized: true,
    },
    // Only export the routes we actually use right now.
    // This avoids export errors from unused dynamic routes (e.g. /product-single/[slug]).
    async exportPathMap() {
        const productPaths = await getProductExportPaths()

        return {
            '/': { page: '/' },
            '/about': { page: '/about' },
            '/shop': { page: '/shop' },
            '/cart': { page: '/cart' },
            '/contact': { page: '/contact' },
            '/portfolio-grid': { page: '/portfolio-grid' },
            '/privacy-policy': { page: '/privacy-policy' },
            '/terms-and-conditions': { page: '/terms-and-conditions' },
            '/404': { page: '/404' },
            ...productPaths,
        }
    },
}

module.exports = nextConfig

