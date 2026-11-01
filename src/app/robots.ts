import type { MetadataRoute } from "next"

import { SITE_URL } from "@/components/vb-seo"

/* Trang giới thiệu công khai: cho mọi bot tìm kiếm & trợ lý AI,
 * chặn các đường dẫn kỹ thuật nội bộ của Cloudflare (/cdn-cgi/) và API (/api/)
 * để tránh phát sinh URL rác trong Google Search Console. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/cdn-cgi/", "/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
