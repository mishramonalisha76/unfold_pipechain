/** @type {import('next').NextConfig} */
const rewrites = () => {
  return [
    {
      source: "/graphql",
      destination:"http://ec2-34-227-206-18.compute-1.amazonaws.com/graphql"
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

module.exports = { rewrites, ...nextConfig };
