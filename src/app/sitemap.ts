import type { MetadataRoute } from "next"

import { GUIDES } from "@/components/vb-guides"
import {
  BROCHURE_PATH,
  FEATURES_PATH,
  GUIDES_PATH,
  LANDING_PATH,
  SITE_URL,
} from "@/components/vb-seo"

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
      priority: 0.9,
    },
    {
      url: `${SITE_URL}${GUIDES_PATH}`,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    ...GUIDES.map((g) => ({
      url: `${SITE_URL}${GUIDES_PATH}/${g.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${SITE_URL}${BROCHURE_PATH}`,
      changeFrequency: "monthly",
      priority: 0.75,
    },
  ]
}
