import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["placehold.co"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    })
    return config
  },

  /* config options here */
}

export default nextConfig
// module.exports = nextConfig; // A sintaxe com `export default` já é suficiente, esta linha pode ser removida.
