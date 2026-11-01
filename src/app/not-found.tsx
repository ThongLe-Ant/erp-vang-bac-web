import Link from "next/link"
import { ArrowRight } from "lucide-react"

import {
  Eyebrow,
  FEATURES_HREF,
  GuideRails,
  HEADING_STYLE,
  RailMarks,
  VbFooter,
  VbHeader,
} from "@/components/vb-shared"

export default function NotFound() {
  return (
    <div className="bg-vb-bg text-vb-fg selection:bg-vb-gold flex min-h-dvh flex-col antialiased selection:text-white">
      <VbHeader />

      <div className="flex flex-1 flex-col">
        <div aria-hidden="true" className="h-[76px]" />
        <div className="relative flex flex-1 items-center overflow-x-clip">
          <GuideRails />
          <section className="border-vb-border relative w-full border-y py-16 lg:py-24">
            <RailMarks />
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="max-w-xl">
                <Eyebrow>404 · Không tìm thấy trang</Eyebrow>
                <h1
                  className="text-vb-fg mt-2.5 font-semibold tracking-[-0.02em] [text-wrap:balance]"
                  style={HEADING_STYLE}
                >
                  Đường dẫn không tồn tại hoặc đã được chuyển vị trí
                </h1>
                <p className="text-vb-muted mt-3 text-sm leading-relaxed">
                  Bạn có thể quay về trang chủ ERP Vàng Bạc hoặc xem chi tiết 16
                  phân hệ chức năng và cẩm nang vận hành bên dưới.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link
                    href="/"
                    className="bg-vb-fg text-vb-bg inline-flex min-h-[40px] items-center gap-1.5 rounded-md px-4 py-2 text-xs font-semibold transition-[opacity,transform] duration-150 hover:opacity-88 active:scale-[0.98]"
                  >
                    Về trang chủ
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    href={FEATURES_HREF}
                    className="border-vb-border-strong bg-vb-card text-vb-body hover:border-vb-gold hover:text-vb-gold inline-flex min-h-[40px] items-center rounded-md border px-4 py-2 text-xs font-semibold transition-[border-color,color,transform] duration-150 active:scale-[0.98]"
                  >
                    16 phân hệ chức năng
                  </Link>
                  <Link
                    href="/cam-nang"
                    className="border-vb-border-strong bg-vb-card text-vb-body hover:border-vb-gold hover:text-vb-gold inline-flex min-h-[40px] items-center rounded-md border px-4 py-2 text-xs font-semibold transition-[border-color,color,transform] duration-150 active:scale-[0.98]"
                  >
                    Cẩm nang vận hành
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <VbFooter />
    </div>
  )
}
