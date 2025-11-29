/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  basePath: isProd ? "/Recobra-landing" : "",
  assetPrefix: isProd ? "/Recobra-landing/" : "",
};

export default nextConfig;