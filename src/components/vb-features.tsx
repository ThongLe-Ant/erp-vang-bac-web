import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Check,
  ImageIcon,
  MessageCircle,
  Minus,
} from "lucide-react"

import {
  BOOK_DEMO_HREF,
  CONTACT,
  CubeBackdrop,
  Eyebrow,
  FEATURE_MODULES,
  GuideRails,
  HEADING_STYLE,
  PLANS,
  PLAN_MATRIX,
  RailMarks,
  SoftGlow,
  VbFooter,
  VbHeader,
} from "./vb-shared"

/* ============================================================================
 * Trang chức năng ERP Vàng Bạc: mỗi chức năng một mục (chữ và ảnh so le), cuối
 * trang là bảng so sánh theo gói, đọc từ PLAN_MATRIX (cùng nguồn với PLANS).
 * ========================================================================== */

export function VbFeaturesPage() {
  return (
    <div className="sysdark:bg-[#08090B] sysdark:text-[#F5F7FA] sysdark:selection:bg-[#9C7218] min-h-dvh bg-white text-[#0B1220] antialiased selection:bg-[#8A6516] selection:text-white">
      <VbHeader active="Chức năng" />

      <div>
        <h1 className="sr-only">
          Chức năng phần mềm quản lý chuỗi đại lý bạc tích trữ Phú Quý, Bảo Tín
          Mạnh Hải, Ancarat, tiệm vàng truyền thống &amp; cầm đồ
        </h1>
        <div aria-hidden="true" className="h-[76px]" />

        {/* ---------- Thanh chọn nhanh, dính dưới đầu trang ---------- */}
        <nav
          aria-label="Các chức năng"
          className="sysdark:border-[#1F232A] sysdark:bg-[#0E1014]/90 sticky top-[76px] z-20 border-b border-[#E3E7EE] bg-white/95 backdrop-blur-sm"
        >
          <ul className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8 [&::-webkit-scrollbar]:hidden">
            {FEATURE_MODULES.map((m) => {
              const Icon = m.icon
              return (
                <li key={m.id} className="shrink-0">
                  <a
                    href={`#${m.id}`}
                    className="sysdark:border-[#262B33] sysdark:text-[#E6E9EF] sysdark:hover:border-[#C99A2E] sysdark:hover:text-[#E3C77A] inline-flex items-center gap-1.5 rounded-full border border-[#D6DCE6] px-3.5 py-2 text-sm font-medium text-[#1F2937] transition-colors hover:border-[#8A6516] hover:text-[#8A6516]"
                  >
                    <Icon className="sysdark:text-[#E3C77A] h-4 w-4 text-[#8A6516]" />
                    {m.name}
                  </a>
                </li>
              )
            })}
            <li className="shrink-0">
              <a
                href="#so-sanh"
                className="sysdark:text-[#E3C77A] inline-flex items-center rounded-full px-3.5 py-2 text-sm font-semibold text-[#8A6516] hover:underline"
              >
                So sánh gói
              </a>
            </li>
          </ul>
        </nav>

        {/* ---------- Từng chức năng & so sánh gói, chung một khung kẻ dọc ---------- */}
        <div className="relative overflow-x-clip">
          <GuideRails />
          {FEATURE_MODULES.map((m, i) => {
            const Icon = m.icon
            const flip = i % 2 === 1
            return (
              <section
                key={m.id}
                id={m.id}
                aria-labelledby={`${m.id}-title`}
                className={`sysdark:border-[#1F232A] relative scroll-mt-40 border-b border-[#E3E7EE] py-14 lg:py-16 ${flip ? "sysdark:bg-[#0E1014] bg-[#F7F9FC]" : "sysdark:bg-[#08090B] bg-white"}`}
              >
                <RailMarks />
                <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-8">
                  <div className={`lg:col-span-5 ${flip ? "lg:order-2" : ""}`}>
                    <p className="sysdark:text-[#E3C77A] flex flex-wrap items-center gap-2 text-xs font-semibold text-[#8A6516]">
                      <span className="sysdark:bg-[#9C7218] inline-flex h-7 w-7 items-center justify-center rounded-md bg-[#8A6516] text-white">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="tnum font-mono tracking-[0.06em] uppercase">
                        {String(i + 1).padStart(2, "0")} · {m.name}
                      </span>
                      <span className="sysdark:text-[#6B7280] text-[#8B93A3]">
                        · {m.when}
                      </span>
                      {"scope" in m && (
                        <span className="sysdark:bg-[#4A3A14] rounded-full bg-[#0B1220] px-2 py-0.5 text-[11px] font-semibold text-white">
                          {m.scope}
                        </span>
                      )}
                    </p>
                    <h2
                      id={`${m.id}-title`}
                      className="sysdark:text-[#F5F7FA] mt-4 font-medium tracking-[-0.02em] [text-wrap:balance] text-[#0B1220]"
                      style={HEADING_STYLE}
                    >
                      {m.title}
                    </h2>
                    <p className="sysdark:text-[#A3AAB8] mt-3 text-base leading-relaxed text-[#4B5565]">
                      {m.text}
                    </p>

                    <ul className="mt-7 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                      {m.points.map((p) => (
                        <li key={p.t} className="flex gap-2.5">
                          <Check className="sysdark:text-[#E3C77A] mt-0.5 h-4 w-4 shrink-0 text-[#8A6516]" />
                          <div>
                            <p className="sysdark:text-[#F5F7FA] text-sm font-semibold text-[#0B1220]">
                              {p.t}
                            </p>
                            <p className="sysdark:text-[#8B93A3] mt-0.5 text-sm leading-relaxed text-[#5B6475]">
                              {p.d}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <p className="sysdark:border-[#1F232A] sysdark:text-[#A3AAB8] mt-6 border-t border-[#E3E7EE] pt-4 text-[13px] leading-relaxed text-[#4B5565]">
                      <b className="sysdark:text-[#F5F7FA] font-semibold text-[#0F1B2D]">
                        Ví dụ:{" "}
                      </b>
                      {m.example}
                    </p>
                  </div>

                  <div
                    className={`relative isolate lg:col-span-7 ${flip ? "lg:order-1" : ""}`}
                  >
                    <SoftGlow />
                    <div className="sysdark:border-[#262B33] sysdark:bg-[#111317] sysdark:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.28)] overflow-hidden rounded-xl border border-[#D6DCE6] bg-white shadow-[0_24px_48px_-24px_rgba(11,18,32,0.28)]">
                      <div className="sysdark:border-[#1F232A] sysdark:bg-[#16191E] flex h-8 items-center gap-1.5 border-b border-[#E3E7EE] bg-[#F4F6FA] px-3">
                        <span className="sysdark:bg-[#262B33] h-2.5 w-2.5 rounded-full bg-[#D6DCE6]" />
                        <span className="sysdark:bg-[#262B33] h-2.5 w-2.5 rounded-full bg-[#D6DCE6]" />
                        <span className="sysdark:bg-[#262B33] h-2.5 w-2.5 rounded-full bg-[#D6DCE6]" />
                      </div>
                      {(m.src as string | null) ? (
                        <Image
                          src={m.src}
                          alt={m.alt}
                          width={1440}
                          height={900}
                          sizes="(min-width: 1024px) 640px, 100vw"
                          className="block aspect-[16/10] w-full bg-[#F8FAFC] object-contain object-center"
                        />
                      ) : (
                        <div
                          role="img"
                          aria-label={`${m.alt} (ảnh đang cập nhật)`}
                          className="sysdark:bg-[#0E1014] flex aspect-video w-full flex-col items-center justify-center gap-2 bg-[#F7F9FC] text-sm text-[#8B93A3]"
                        >
                          <ImageIcon className="h-6 w-6" />
                          Ảnh màn hình đang cập nhật
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            )
          })}

          {/* ---------- So sánh theo gói ---------- */}
          <section
            id="so-sanh"
            className="relative scroll-mt-40 py-14 lg:py-20"
          >
            <RailMarks />
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <Eyebrow>So sánh gói</Eyebrow>
                <h2
                  className="sysdark:text-[#F5F7FA] mt-2 font-medium tracking-[-0.02em] [text-wrap:balance] text-[#0B1220]"
                  style={HEADING_STYLE}
                >
                  Phạm vi có trong từng gói
                </h2>
              </div>

              <div className="sysdark:border-[#1F232A] mt-10 overflow-x-auto rounded-xl border border-[#E3E7EE]">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead>
                    <tr className="sysdark:bg-[#0E1014] bg-[#F7F9FC]">
                      <th
                        scope="col"
                        className="sysdark:text-[#8B93A3] px-5 py-4 font-semibold text-[#5B6475]"
                      >
                        Phạm vi
                      </th>
                      {PLANS.map((p) => (
                        <th
                          key={p.id}
                          scope="col"
                          className={`w-[17%] px-3 py-4 text-center ${p.tone === "featured" ? "sysdark:bg-[#9C7218] bg-[#8A6516] [&>span]:!text-white" : ""}`}
                        >
                          <span className="sysdark:text-[#F5F7FA] block font-bold text-[#0B1220]">
                            {p.name}
                          </span>
                          <span className="tnum sysdark:text-[#8B93A3] mt-0.5 block text-xs font-medium text-[#5B6475]">
                            {p.price}
                            {p.unit}
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {PLAN_MATRIX.map((r) => (
                      <tr
                        key={r.label}
                        className="sysdark:border-[#1F232A] border-t border-[#E3E7EE]"
                      >
                        <th
                          scope="row"
                          className="sysdark:text-[#E6E9EF] px-5 py-3.5 font-medium text-[#1F2937]"
                        >
                          {r.label}
                        </th>
                        {r.cells.map((c, i) => (
                          <td
                            key={PLANS[i].id}
                            className="px-3 py-3.5 text-center"
                          >
                            {c === true ? (
                              <Check
                                aria-label="Có"
                                className="sysdark:text-[#E3C77A] mx-auto h-4 w-4 text-[#8A6516]"
                              />
                            ) : c === false ? (
                              <Minus
                                aria-label="Không"
                                className="sysdark:text-[#3A404A] mx-auto h-4 w-4 text-[#C4CBD6]"
                              />
                            ) : (
                              <span className="sysdark:text-[#8B93A3] text-xs font-medium text-[#5B6475]">
                                {c}
                              </span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>

        {/* ---------- Kêu gọi liên hệ ---------- */}
        <section className="sysdark:bg-[#110C04] sysdark:bg-[radial-gradient(ellipse_75%_90%_at_82%_0%,rgba(218,165,52,0.38),transparent_70%)] relative overflow-hidden bg-[#241906] bg-[radial-gradient(ellipse_75%_90%_at_82%_0%,rgba(218,165,52,0.45),transparent_70%),linear-gradient(135deg,#241906_0%,#4A350C_52%,#261B07_100%)] py-14 lg:py-16">
          <CubeBackdrop id="vb-cubes-cta" />
          <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div>
              <h2
                className="font-medium tracking-[-0.02em] [text-wrap:balance] text-white"
                style={HEADING_STYLE}
              >
                Xem tận mắt các chức năng trên bản demo
              </h2>
              <p className="mt-2 text-sm text-[#C3CAD6]">
                Demo trên dữ liệu mẫu, theo đúng mô hình tiệm của bạn. Email:{" "}
                {CONTACT.email}
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Link
                href={BOOK_DEMO_HREF}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#C99A2E] px-5 py-3 text-sm font-semibold text-[#0B1220] hover:bg-[#D9B24E]"
              >
                Đặt lịch demo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={CONTACT.zalo}
                className="sysdark:hover:bg-[#111317]/10 inline-flex items-center gap-1.5 rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                <MessageCircle className="h-4 w-4" />
                Nhắn Zalo
              </a>
            </div>
          </div>
        </section>
      </div>

      <VbFooter />
    </div>
  )
}
