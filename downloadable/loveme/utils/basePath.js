// Get the base path for static assets (used for GitHub Pages deployment)
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default basePath;

// Helper function to prefix a path with the base path
export function withBasePath(path) {
  if (!path) return path;
  // Don't double-prefix if it already starts with the base path
  if (basePath && path.startsWith(basePath)) return path;
  // Don't prefix external URLs
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('//')) return path;
  return `${basePath}${path}`;
}

