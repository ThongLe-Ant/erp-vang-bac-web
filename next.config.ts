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
  async headers() {
    return [
      {
        /* llms.txt phục vụ bot AI đọc ngữ cảnh sản phẩm, không phải trang HTML để Google lập chỉ mục */
        source: "/llms.txt",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: "/favicon.ico",
        destination: "/images/logos/go-mark.png",
      },
    ]
  },
}

export default nextConfig
