/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
      },
      {
        hostname: "api-snippet-master.sahildev.pro",
      },
    ],
  },
};

export default nextConfig;
