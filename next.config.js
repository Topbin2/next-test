/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  assetPrefix:
    process.env.NODE_ENV === "production"
      ? "https://next-test-mu-roan.vercel.app/"
      : "",
};

module.exports = nextConfig;
