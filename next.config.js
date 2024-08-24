/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig : require("./route-config.json")
};

module.exports= nextConfig;
