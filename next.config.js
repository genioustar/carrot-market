/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    // reactRoot: true,
    runtime: "nodejs",
    serverComponents: true,
  },
  // images를 가져오기 이미지호스트서버 url
  images: {
    domains: ["shop-phinf.pstatic.net"],
  },
};

module.exports = nextConfig;
