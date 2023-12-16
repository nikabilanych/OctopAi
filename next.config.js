/** @type {import('next').NextConfig} */
const nextConfig = {
  //allow images
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
