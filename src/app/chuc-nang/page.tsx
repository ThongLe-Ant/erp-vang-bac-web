import { VbFeaturesPage } from "@/components/vb-features"
import {
  FEATURES_PATH,
  JsonLd,
  featuresJsonLd,
  vbMetadata,
} from "@/components/vb-seo"

export const metadata = vbMetadata({
  path: FEATURES_PATH,
  title:
    "16 Chức năng ERP Vàng Bạc — Đại lý bạc tích trữ Phú Quý, Bảo Tín Mạnh Hải, Ancarat, vàng truyền thống & cầm đồ",
  description:
    "Chi tiết 16 phân hệ ERP Vàng Bạc: đồng bộ giá Phú Quý, Bảo Tín Mạnh Hải, Ancarat; POS khoá giá chống trượt giá; quản lý hợp đồng bạc tích trữ; đặt đơn & khớp phiên bán lại Phú Quý; vàng truyền thống theo tuổi vàng, cân trừ đá dơ, in tem Thông tư 22; điều chuyển kho liên chi nhánh; cầm đồ; Bot báo giá nhóm Zalo; Zalo OA ZNS và MISA AMIS.",
})

export default function FeaturesPage() {
  return (
    <>
      <JsonLd data={featuresJsonLd()} />
      <VbFeaturesPage />
    </>
  )
}
