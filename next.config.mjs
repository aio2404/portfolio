
/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    N8N_WEBHOOK_URL: process.env.N8N_WEBHOOK_URL,
    N8N_X_POST_WEBHOOK_URL: process.env.N8N_X_POST_WEBHOOK_URL,
  },
  images: {
    remotePatterns: [],
  },
  experimental: {
    optimizeCss: false,
  },
};

export default nextConfig;
