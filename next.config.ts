import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  images: {
    localPatterns: [
      {
        pathname: "/images/**",
      },
    ],
  },
}

export default nextConfig
