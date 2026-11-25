import type { Metadata } from "next"

import { VbDepositToolPage } from "@/components/vb-deposit-tool"
import {
  DEPOSIT_TOOL_PATH,
  JsonLd,
  SITE_URL,
  vbMetadata,
} from "@/components/vb-seo"

export const metadata: Metadata = vbMetadata({
  path: DEPOSIT_TOOL_PATH,
  title:
    "Công cụ kiểm tra sổ cọc hẹn giao bạc & vàng (Giao từng phần, hoàn cọc) — ERP Vàng Bạc",
  description:
    "Nhập tay hoặc dán CSV đã ẩn danh để tính ngay lượng hàng còn phải giao, tiền còn phải thu và phát hiện đơn quá hạn hoặc lệch sổ cọc ngay trên trình duyệt.",
})

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Công cụ kiểm tra sổ cọc hẹn giao ERP Vàng Bạc",
  url: `${SITE_URL}${DEPOSIT_TOOL_PATH}`,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  inLanguage: "vi",
  isAccessibleForFree: true,
}

export default function DepositToolRoute() {
  return (
    <>
      <JsonLd data={toolJsonLd} />
      <VbDepositToolPage />
    </>
  )
}
