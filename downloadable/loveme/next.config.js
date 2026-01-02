/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // GitHub Pages requires fully static output. We use `next export` (Next 13.0.x).
    trailingSlash: true,
    // For GitHub Pages project sites, the app is served under /<repo>/.
    // Set NEXT_PUBLIC_BASE_PATH to "/<repo>" in CI; keep empty for local dev.
    basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
    assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
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
        return {
            '/': { page: '/' },
            '/about': { page: '/about' },
            '/shop': { page: '/shop' },
            '/cart': { page: '/cart' },
            '/contact': { page: '/contact' },
            '/portfolio-grid': { page: '/portfolio-grid' },
            '/404': { page: '/404' },
        }
    },
}

module.exports = nextConfig

