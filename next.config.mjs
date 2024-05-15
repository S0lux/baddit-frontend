/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.redditstatic.com',
        port: '',
        pathname: '/**',
      },],
    domains: ["placehold.co", "res.cloudinary.com"]
  },
};

export default nextConfig;