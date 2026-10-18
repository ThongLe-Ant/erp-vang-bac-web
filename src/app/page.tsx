import { VbLandingPage } from "@/components/vb-landing"
import {
  JsonLd,
  LANDING_PATH,
  vbMetadata,
  landingJsonLd,
} from "@/components/vb-seo"

export const metadata = vbMetadata({
  path: LANDING_PATH,
  title:
    "ERP Vàng Bạc — Phần mềm chuỗi đại lý vàng bạc truyền thống, bạc tích trữ Phú Quý, Bảo Tín Mạnh Hải, Ancarat & cầm đồ",
  description:
    "Phần mềm quản lý chuyên biệt cho chuỗi đại lý bạc tích trữ (Phú Quý, Bảo Tín Mạnh Hải, Ancarat), tiệm vàng bạc truyền thống đa chi nhánh và hiệu cầm đồ: bắt giá tự động, khoá giá chống trượt giá, quản lý hợp đồng bạc vật chất, đặt đơn & bán lại Phú Quý, cân trừ đá trừ dơ, in tem Thông tư 22, tin nhắn Zalo OA (ZNS), tự động xuất ảnh bảng giá và đồng bộ MISA.",
})

export default function HomePage() {
  return (
    <>
      <JsonLd data={landingJsonLd()} />
      <VbLandingPage />
    </>
  )
}
