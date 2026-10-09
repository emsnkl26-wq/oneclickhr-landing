import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // The marketing site ships no raster art of its own: product visuals are
  // hand-built HTML/SVG. Remote patterns stay empty on purpose.
  images: { remotePatterns: [] },
  async redirects() {
    return [
      { source: '/features', destination: '/product', permanent: true },
      { source: '/solutions', destination: '/product', permanent: true },
    ]
  },
}

export default nextConfig
