import type { MetadataRoute } from "next"

import { GUIDES } from "@/components/vb-guides"
import {
  BROCHURE_PATH,
  FEATURES_PATH,
  GUIDES_PATH,
  LANDING_PATH,
  SITE_URL,
} from "@/components/vb-seo"

const SITE_LAST_MODIFIED = new Date("2026-11-01")

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}${LANDING_PATH}`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}${FEATURES_PATH}`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}${GUIDES_PATH}`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    ...GUIDES.map((g) => ({
      url: `${SITE_URL}${GUIDES_PATH}/${g.slug}`,
      lastModified: new Date(g.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${SITE_URL}${BROCHURE_PATH}`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.75,
    },
  ]
}
