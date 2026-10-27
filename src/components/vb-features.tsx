"use client"

import { useEffect, useRef, useState } from "react"
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
  const [activeId, setActiveId] = useState<string>(FEATURE_MODULES[0].id)
  const navListRef = useRef<HTMLUListElement | null>(null)

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return
    const sectionIds = [...FEATURE_MODULES.map((m) => m.id), "so-sanh"]
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id)
        }
      },
      {
        rootMargin: "-140px 0px -55% 0px",
        threshold: 0,
      }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const container = navListRef.current
    if (!container) return
    const activePill = container.querySelector<HTMLElement>(
      `[data-nav-id="${activeId}"]`
    )
    if (!activePill) return
    const targetLeft =
      activePill.offsetLeft -
      container.clientWidth / 2 +
      activePill.clientWidth / 2
    container.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: "smooth",
    })
  }, [activeId])

  return (
    <div className="bg-vb-bg text-vb-fg selection:bg-vb-gold min-h-dvh antialiased selection:text-white">
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
          className="border-vb-border bg-vb-bg/95 sysdark:bg-vb-surface/90 sticky top-[76px] z-20 border-b backdrop-blur-md"
        >
          <ul
            ref={navListRef}
            className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8 [&::-webkit-scrollbar]:hidden"
          >
            {FEATURE_MODULES.map((m, idx) => {
              const Icon = m.icon
              const isActive = activeId === m.id
              return (
                <li key={m.id} className="shrink-0">
                  <a
                    href={`#${m.id}`}
                    data-nav-id={m.id}
                    aria-current={isActive ? "location" : undefined}
                    onClick={() => setActiveId(m.id)}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm transition-[background-color,border-color,color,transform] duration-150 active:scale-[0.98] ${
                      isActive
                        ? "border-vb-gold-deep text-vb-gold-deep sysdark:border-[#C99A2E] sysdark:bg-[#231B0B] sysdark:text-vb-gold-bright bg-[#FAF6EC] font-semibold"
                        : "border-vb-border-strong text-vb-body hover:border-vb-gold-deep hover:text-vb-gold-deep sysdark:hover:border-[#C99A2E] sysdark:hover:text-vb-gold-bright font-medium"
                    }`}
                  >
                    <Icon className="text-vb-gold-deep sysdark:text-vb-gold-bright h-4 w-4 shrink-0" />
                    <span className="tnum text-vb-subtle font-mono text-[11px]">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span>{m.name}</span>
                  </a>
                </li>
              )
            })}
            <li className="shrink-0">
              <a
                href="#so-sanh"
                data-nav-id="so-sanh"
                aria-current={activeId === "so-sanh" ? "location" : undefined}
                onClick={() => setActiveId("so-sanh")}
                className={`inline-flex items-center rounded-full border px-3.5 py-2 text-sm font-semibold transition-[background-color,border-color,color,transform] duration-150 active:scale-[0.98] ${
                  activeId === "so-sanh"
                    ? "border-vb-gold-deep text-vb-gold-deep sysdark:border-[#C99A2E] sysdark:bg-[#231B0B] sysdark:text-vb-gold-bright bg-[#FAF6EC]"
                    : "text-vb-gold-deep sysdark:text-vb-gold-bright border-transparent hover:underline"
                }`}
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
                className={`border-vb-border relative scroll-mt-40 border-b py-14 lg:py-16 ${flip ? "bg-vb-surface" : "bg-vb-bg"}`}
              >
                <RailMarks />
                <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-8">
                  <div className={`lg:col-span-5 ${flip ? "lg:order-2" : ""}`}>
                    <p className="text-vb-gold-deep sysdark:text-vb-gold-bright flex flex-wrap items-center gap-2 text-xs font-semibold">
                      <span className="sysdark:bg-[#9C7218] inline-flex h-7 w-7 items-center justify-center rounded-md bg-[#8A6516] text-white">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="tnum font-mono tracking-[0.06em] uppercase">
                        {String(i + 1).padStart(2, "0")} · {m.name}
                      </span>
                      <span className="text-vb-subtle">· {m.when}</span>
                      {"scope" in m && (
                        <span className="sysdark:bg-[#4A3A14] rounded-full bg-[#0B1220] px-2 py-0.5 text-[11px] font-semibold text-white">
                          {m.scope}
                        </span>
                      )}
                    </p>
                    <h2
                      id={`${m.id}-title`}
                      className="text-vb-fg mt-4 font-medium tracking-[-0.02em] [text-wrap:balance]"
                      style={HEADING_STYLE}
                    >
                      {m.title}
                    </h2>
                    <p className="text-vb-muted mt-3 text-base leading-relaxed">
                      {m.text}
                    </p>

                    <ul className="mt-7 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                      {m.points.map((p) => (
                        <li key={p.t} className="flex gap-2.5">
                          <Check className="text-vb-gold-deep sysdark:text-vb-gold-bright mt-0.5 h-4 w-4 shrink-0" />
                          <div>
                            <p className="text-vb-fg text-sm font-semibold">
                              {p.t}
                            </p>
                            <p className="text-vb-subtle mt-0.5 text-sm leading-relaxed">
                              {p.d}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <div
                      className={`border-vb-border border-l-vb-gold-deep sysdark:border-l-[#C99A2E] mt-6 rounded-r-lg border border-l-2 px-4 py-3.5 ${
                        flip ? "bg-vb-card" : "bg-vb-surface/75"
                      }`}
                    >
                      <p className="tnum text-vb-gold-deep sysdark:text-vb-gold-bright font-mono text-[11px] font-semibold tracking-[0.08em] uppercase">
                        Ví dụ thực tế tại quầy · #{String(i + 1).padStart(2, "0")}
                      </p>
                      <p className="tnum text-vb-muted mt-1 text-[13px] leading-relaxed">
                        {m.example}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`relative isolate lg:col-span-7 ${flip ? "lg:order-1" : ""}`}
                  >
                    <SoftGlow />
                    <div className="border-vb-border-strong bg-vb-card sysdark:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.45)] overflow-hidden rounded-xl border shadow-[0_24px_48px_-24px_rgba(11,18,32,0.28)]">
                      <div className="border-vb-border sysdark:bg-[#16191E] flex h-8 items-center justify-between gap-2 border-b bg-[#F4F6FA] px-3">
                        <div className="flex items-center gap-1.5">
                          <span className="sysdark:bg-[#262B33] h-2.5 w-2.5 rounded-full bg-[#D6DCE6]" />
                          <span className="sysdark:bg-[#262B33] h-2.5 w-2.5 rounded-full bg-[#D6DCE6]" />
                          <span className="sysdark:bg-[#262B33] h-2.5 w-2.5 rounded-full bg-[#D6DCE6]" />
                        </div>
                        <span className="tnum text-vb-subtle truncate font-mono text-[11px]">
                          {String(i + 1).padStart(2, "0")} · #{m.id}
                        </span>
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
                          className="bg-vb-surface text-vb-subtle flex aspect-video w-full flex-col items-center justify-center gap-2 text-sm"
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
            className="bg-vb-bg relative scroll-mt-40 py-14 lg:py-20"
          >
            <RailMarks />
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <Eyebrow>So sánh gói</Eyebrow>
                <h2
                  className="text-vb-fg mt-2 font-medium tracking-[-0.02em] [text-wrap:balance]"
                  style={HEADING_STYLE}
                >
                  Phạm vi có trong từng gói
                </h2>
              </div>

              <div className="border-vb-border mt-10 overflow-x-auto rounded-xl border">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead>
                    <tr className="bg-vb-surface">
                      <th
                        scope="col"
                        className="bg-vb-surface text-vb-subtle border-vb-border sticky left-0 z-10 border-r px-5 py-4 font-semibold sm:border-r-0"
                      >
                        Phạm vi
                      </th>
                      {PLANS.map((p) => (
                        <th
                          key={p.id}
                          scope="col"
                          className={`w-[17%] px-3 py-4 text-center ${p.tone === "featured" ? "sysdark:bg-[#9C7218] bg-[#8A6516] [&>span]:!text-white" : ""}`}
                        >
                          <span className="text-vb-fg block font-bold">
                            {p.name}
                          </span>
                          <span className="tnum text-vb-subtle mt-0.5 block text-xs font-medium">
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
                        className="border-vb-border hover:bg-vb-surface/50 border-t transition-colors"
                      >
                        <th
                          scope="row"
                          className="bg-vb-bg text-vb-body border-vb-border sticky left-0 z-10 border-r px-5 py-3.5 font-medium sm:border-r-0"
                        >
                          {r.label}
                        </th>
                        {r.cells.map((c, i) => {
                          const isFeaturedCol = PLANS[i].tone === "featured"
                          return (
                            <td
                              key={PLANS[i].id}
                              className={`px-3 py-3.5 text-center ${
                                isFeaturedCol
                                  ? "sysdark:bg-[#161209]/60 bg-[#FAF6EC]/50"
                                  : ""
                              }`}
                            >
                              {c === true ? (
                                <Check
                                  aria-label="Có"
                                  className="text-vb-gold-deep sysdark:text-vb-gold-bright mx-auto h-4 w-4"
                                />
                              ) : c === false ? (
                                <Minus
                                  aria-label="Không"
                                  className="sysdark:text-[#3A404A] mx-auto h-4 w-4 text-[#C4CBD6]"
                                />
                              ) : (
                                <span className="tnum text-vb-subtle text-xs font-medium">
                                  {c}
                                </span>
                              )}
                            </td>
                          )
                        })}
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
                className="inline-flex items-center gap-1.5 rounded-full bg-[#C99A2E] px-5 py-3 text-sm font-semibold text-[#0B1220] transition-[background-color,transform] duration-150 hover:bg-[#D9B24E] active:scale-[0.98]"
              >
                Đặt lịch demo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={CONTACT.zalo}
                className="sysdark:hover:bg-[#111317]/10 inline-flex items-center gap-1.5 rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white transition-[background-color,transform] duration-150 hover:bg-white/10 active:scale-[0.98]"
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
