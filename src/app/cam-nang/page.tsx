import { GUIDES, VbGuidesIndexPage } from "@/components/vb-guides"
import {
  GUIDES_PATH,
  JsonLd,
  guidesIndexJsonLd,
  vbMetadata,
} from "@/components/vb-seo"

export const metadata = vbMetadata({
  path: GUIDES_PATH,
  title:
    "Cẩm nang vận hành đại lý bạc tích trữ, tiệm vàng truyền thống & cầm đồ — ERP Vàng Bạc",
  description:
    "Kinh nghiệm vận hành đại lý bạc tích trữ Phú Quý, Bảo Tín Mạnh Hải, Ancarat, quy định in tem kim hoàn 2 cánh Thông tư 22, đồng bộ hoá đơn điện tử MISA AMIS và quản lý hiệu cầm đồ vàng bạc đa chi nhánh.",
})

export default function GuidesPage() {
  return (
    <>
      <JsonLd data={guidesIndexJsonLd(GUIDES)} />
      <VbGuidesIndexPage />
    </>
  )
}
