
import type {NextConfig} from 'next';
import { withContentlayer } from 'next-contentlayer';

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
      {
        protocol: 'https',
        hostname: 'cdn.simpleicons.org',
        port: '',
        pathname: '/**',
      },
    ],
    // unoptimized: true, // Removed to allow Next.js default image optimization with a server
  },
};

export default withContentlayer(nextConfig);
