/** @type {import('next').NextConfig} */
const rewrites = () => {
  return [
    {
      source: "/graphql",
      destination:"http://ec2-54-209-186-217.compute-1.amazonaws.com/graphql"
    },
  ];
};
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    loader: "default",
    domains: ["*"],
    formats: ["image/webp"],
    minimumCacheTTL: 60,
  },
};

module.exports = { rewrites, ...nextConfig, eslint: {
  // Warning: This allows production builds to successfully complete even if
  // your project has ESLint errors.
  ignoreDuringBuilds: true,
}, };
