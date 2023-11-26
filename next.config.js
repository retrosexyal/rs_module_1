/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'starwars-visualguide.com',
        port: '',
        pathname: '/assets/img/characters/**',
      },
    ],
  },
}

module.exports = nextConfig
