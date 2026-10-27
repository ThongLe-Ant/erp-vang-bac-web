import type { Metadata } from "next"

import {
  CONTACT,
  DEALER_MODELS,
  FAQ,
  FEATURE_MODULES,
  PLANS,
} from "./vb-shared"

/* SEO & AI Semantic Search (GEO/AEO) cho trang giới thiệu ERP Vàng Bạc:
 * metadata + dữ liệu có cấu trúc schema.org (@graph giàu thực thể) để Google,
 * Perplexity, ChatGPT, Claude và Gemini hiểu rõ các mô hình đại lý mục tiêu. */

export const SITE_URL = (
  process.env.SITE_URL || "https://vangbac.goplus.vn"
).replace(/\/$/, "")

export const LANDING_PATH = "/"
export const FEATURES_PATH = "/chuc-nang"
export const GUIDES_PATH = "/cam-nang"
export const BROCHURE_PATH = "/ho-so-giai-phap"

const abs = (path: string) => `${SITE_URL}${path}`

const OG_IMAGE = {
  url: "/images/screens/quay-phu-quy.jpg",
  alt: "Màn hình quầy POS ERP Vàng Bạc: bán bạc tích trữ, vàng truyền thống và khoá giá chống trượt giá",
}

const KEYWORDS = [
  "phần mềm quản lý chuỗi tiệm vàng",
  "phần mềm đại lý bạc tích trữ",
  "phần mềm đại lý bạc Phú Quý",
  "phần mềm đại lý Bảo Tín Mạnh Hải",
  "phần mềm đại lý Ancarat",
  "phần mềm quản lý tiệm vàng bạc truyền thống",
  "phần mềm mua bán bạc thỏi tích trữ",
  "phần mềm quản lý tiệm vàng",
  "phần mềm quản lý tiệm bạc",
  "phần mềm cầm đồ vàng bạc",
  "phần mềm quản lý hiệu cầm đồ",
  "phần mềm in tem vàng Thông tư 22",
  "bảng giá vàng bạc tự động Zalo",
  "Zalo OA ZNS tiệm vàng bạc",
  "thu mua vàng cũ trừ đá trừ dơ",
  "ERP Vàng Bạc",
  "Goplus",
]

export function vbMetadata({
  path,
  title,
  description,
}: {
  path: string
  title: string
  description: string
}): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: { absolute: title },
    description,
    keywords: KEYWORDS,
    applicationName: "ERP Vàng Bạc",
    alternates: {
      canonical: path,
      types: {
        "text/markdown": "/llms.txt",
      },
    },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: "vi_VN",
      siteName: "ERP Vàng Bạc",
      url: path,
      title,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
    },
  }
}

const ORG_ID = `${SITE_URL}/#organization`
const APP_ID = `${SITE_URL}/#software`

const organization = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: "Goplus",
  url: "https://goplus.vn",
  logo: `${SITE_URL}/images/logos/go-mark.png`,
  email: CONTACT.email,
  telephone: `+84${CONTACT.phone.slice(1)}`,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    telephone: `+84${CONTACT.phone.slice(1)}`,
    email: CONTACT.email,
    areaServed: "VN",
    availableLanguage: "vi",
  },
  sameAs: [CONTACT.zalo],
}

const offers = PLANS.map((plan) => {
  const amount = Number(plan.price.replace(/\D/g, ""))
  return {
    "@type": "Offer",
    name: `Gói ${plan.name}`,
    description: `${plan.price}${plan.unit}. ${plan.items.join(", ")}.`,
    url: `${SITE_URL}/#bang-gia`,
    ...(amount
      ? {
          price: amount,
          priceCurrency: "VND",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: amount,
            priceCurrency: "VND",
            unitText: "tháng",
            referenceQuantity: {
              "@type": "QuantitativeValue",
              value: 1,
              unitCode: "MON",
            },
          },
        }
      : {}),
  }
})

const software = {
  "@type": "SoftwareApplication",
  "@id": APP_ID,
  name: "ERP Vàng Bạc",
  alternateName: [
    "Phần mềm quản lý chuỗi đại lý vàng bạc & bạc tích trữ Goplus",
    "Phần mềm đại lý bạc Phú Quý, Bảo Tín Mạnh Hải, Ancarat",
  ],
  applicationCategory: "BusinessApplication",
  applicationSubCategory:
    "Phần mềm ERP quản lý chuỗi đại lý vàng bạc truyền thống, bạc tích trữ và cầm đồ",
  operatingSystem: "Web",
  inLanguage: "vi",
  url: abs(LANDING_PATH),
  image: `${SITE_URL}${OG_IMAGE.url}`,
  description:
    "Phần mềm quản lý chuyên biệt cho chuỗi đại lý bạc tích trữ (Phú Quý, Bảo Tín Mạnh Hải, Ancarat), chuỗi tiệm vàng bạc trang sức truyền thống đa chi nhánh và hiệu cầm đồ: đồng bộ giá tự động theo nguồn, khoá giá chống trượt giá tại quầy, quản lý hợp đồng bạc vật chất hẹn giao, đặt đơn nối hệ thống Phú Quý, khớp phiên bán lại, bán vàng theo tuổi vàng có cân trừ đá trừ dơ, in tem kim hoàn Thông tư 22, điều chuyển kho liên chi nhánh, Zalo OA ZNS chính thức, tự động xuất ảnh bảng giá Zalo và đồng bộ MISA AMIS.",
  audience: {
    "@type": "BusinessAudience",
    audienceType:
      "Chuỗi đại lý bạc tích trữ Phú Quý, đại lý Bảo Tín Mạnh Hải, đại lý Ancarat, chuỗi tiệm vàng bạc trang sức truyền thống, hiệu cầm đồ đa chi nhánh",
  },
  about: DEALER_MODELS.map((m) => ({
    "@type": "Service",
    name: m.title,
    description: m.desc,
  })),
  mentions: [
    {
      "@type": "Brand",
      name: "Phú Quý",
      description:
        "Đồng bộ bảng giá vàng bạc Phú Quý, đặt đơn trực tiếp lấy chiết khấu đại lý (YD...K) và khớp phiên bán lại hợp đồng bạc (BYD...K)",
    },
    {
      "@type": "Brand",
      name: "Bảo Tín Mạnh Hải",
      description:
        "Tự động cập nhật bảng giá vàng bạc và bạc tích trữ theo nguồn Bảo Tín Mạnh Hải",
    },
    {
      "@type": "Brand",
      name: "Ancarat",
      description:
        "Tự động cập nhật bảng giá bạc tích trữ và vàng bạc theo nguồn Ancarat",
    },
    {
      "@type": "Thing",
      name: "Bạc tích trữ (Bạc thỏi, Bạc miếng 999)",
      description:
        "Quản lý mua bán giao ngay, hợp đồng hẹn ngày giao và mua bán lại bạc tích trữ 1 lượng, 5 lượng, 10 lượng, 1kg",
    },
    {
      "@type": "Thing",
      name: "Vàng trang sức truyền thống",
      description:
        "Bán vàng theo tuổi vàng (9999, 999, 24K, 18K, 14K, 10K) × khối lượng + tiền công + tiền đá; thu mua cân trừ đá, trừ dơ; in tem kim hoàn 2 cánh chuẩn Thông tư 22/2013/TT-BKHCN",
    },
  ],
  featureList: FEATURE_MODULES.map((m) => `${m.name}: ${m.text}`),
  offers,
  provider: { "@id": ORG_ID },
}

const faqPage = {
  "@type": "FAQPage",
  "@id": `${SITE_URL}/#hoi-dap`,
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
}

export function landingJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      software,
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: abs(LANDING_PATH),
        name: "ERP Vàng Bạc — Phần mềm quản lý chuỗi đại lý vàng bạc, bạc tích trữ & cầm đồ",
        inLanguage: "vi",
        about: { "@id": APP_ID },
        publisher: { "@id": ORG_ID },
      },
      faqPage,
    ],
  }
}

export function featuresJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      software,
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}${FEATURES_PATH}#webpage`,
        url: abs(FEATURES_PATH),
        name: "Chức năng ERP Vàng Bạc — Đại lý bạc tích trữ Phú Quý, Bảo Tín Mạnh Hải, Ancarat & tiệm vàng truyền thống",
        inLanguage: "vi",
        about: { "@id": APP_ID },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "ERP Vàng Bạc",
              item: abs(LANDING_PATH),
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Chức năng",
              item: abs(FEATURES_PATH),
            },
          ],
        },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: FEATURE_MODULES.map((m, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${SITE_URL}${FEATURES_PATH}#${m.id}`,
            name: m.title,
            description: m.text,
          })),
        },
      },
    ],
  }
}

export function guidesIndexJsonLd(
  guides: ReadonlyArray<{
    slug: string
    title: string
    description: string
  }>,
) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      software,
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}${GUIDES_PATH}#webpage`,
        url: abs(GUIDES_PATH),
        name: "Cẩm nang vận hành đại lý bạc tích trữ, tiệm vàng truyền thống & cầm đồ — ERP Vàng Bạc",
        inLanguage: "vi",
        about: { "@id": APP_ID },
        publisher: { "@id": ORG_ID },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: guides.map((g, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${SITE_URL}${GUIDES_PATH}/${g.slug}`,
            name: g.title,
            description: g.description,
          })),
        },
      },
    ],
  }
}

export function guideArticleJsonLd(article: {
  slug: string
  title: string
  description: string
  publishedAt: string
  heroImage: string
}) {
  const url = abs(`${GUIDES_PATH}/${article.slug}`)
  return {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      software,
      {
        "@type": "TechArticle",
        "@id": `${url}#article`,
        headline: article.title,
        description: article.description,
        datePublished: article.publishedAt,
        dateModified: article.publishedAt,
        inLanguage: "vi",
        url,
        image: `${SITE_URL}${article.heroImage.replace(/\?.*$/, "")}`,
        author: { "@id": ORG_ID },
        publisher: { "@id": ORG_ID },
        about: { "@id": APP_ID },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "ERP Vàng Bạc",
            item: abs(LANDING_PATH),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Cẩm nang",
            item: abs(GUIDES_PATH),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: article.title,
            item: url,
          },
        ],
      },
    ],
  }
}

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  )
}
