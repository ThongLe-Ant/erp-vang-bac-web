import type { Metadata } from "next"
import { notFound } from "next/navigation"

import {
  GUIDES,
  VbGuideDetailPage,
  getGuideBySlug,
} from "@/components/vb-guides"
import {
  GUIDES_PATH,
  JsonLd,
  guideArticleJsonLd,
  vbMetadata,
} from "@/components/vb-seo"

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = getGuideBySlug(slug)
  if (!article) return {}
  return vbMetadata({
    path: `${GUIDES_PATH}/${article.slug}`,
    title: `${article.title} — ERP Vàng Bạc`,
    description: article.description,
  })
}

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = getGuideBySlug(slug)
  if (!article) notFound()

  return (
    <>
      <JsonLd data={guideArticleJsonLd(article)} />
      <VbGuideDetailPage article={article} />
    </>
  )
}
