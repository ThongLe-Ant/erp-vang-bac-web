import type { MetadataRoute } from "next"

import { FEATURES_PATH, LANDING_PATH, SITE_URL } from "@/components/vb-seo"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}${LANDING_PATH}`,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}${FEATURES_PATH}`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ]
}
