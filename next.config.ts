
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  // output: 'export', // Removed for ISR
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
    // unoptimized: true, // Removed to allow Next.js default image optimization with a server
  },
};

export default nextConfig;
