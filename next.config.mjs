/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: new URL(process.env.NEXT_PUBLIC_DIRECTUS_URL).hostname,
        port: '',
        pathname: '/assets/**',
      },
    ],
  },

}

export default nextConfig
