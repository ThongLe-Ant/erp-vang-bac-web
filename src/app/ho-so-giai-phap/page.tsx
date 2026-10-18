import { VbBrochurePage } from "@/components/vb-brochure"
import { BROCHURE_PATH, vbMetadata } from "@/components/vb-seo"

export const metadata = vbMetadata({
  path: BROCHURE_PATH,
  title:
    "Hồ sơ giải pháp ERP Vàng Bạc (Brochure PDF) — Đại lý bạc tích trữ, tiệm vàng & cầm đồ",
  description:
    "Tài liệu tóm tắt 16 phân hệ nghiệp vụ và bảng giá ERP Vàng Bạc (Goplus) dành cho chủ chuỗi đại lý bạc tích trữ Phú Quý, Bảo Tín Mạnh Hải, Ancarat, tiệm vàng truyền thống và hiệu cầm đồ.",
})

export default function BrochureRoutePage() {
  return <VbBrochurePage />
}
