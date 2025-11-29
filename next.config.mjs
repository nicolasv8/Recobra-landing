/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/Recobra-landing",
  assetPrefix: "/Recobra-landing/",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig