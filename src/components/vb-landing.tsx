"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeftRight,
  ArrowRight,
  Check,
  RefreshCw,
  Sparkles,
  FileSpreadsheet,
  HandCoins,
  History,
  Landmark,
  Mail,
  Maximize2,
  MessageCircle,
  Phone,
  Scale,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  TrendingUp,
  Users,
  Vault,
  X,
} from "lucide-react"

import {
  CONTACT,
  CubeBackdrop,
  DEALER_MODELS,
  Eyebrow,
  FAQ,
  FEATURES_HREF,
  FEATURE_MODULES,
  GuideRails,
  RailMarks,
  SoftGlow,
  VbFooter,
  VbHeader,
  HEADING_STYLE,
  PLANS,
  BOOK_DEMO_HREF,
  BookDemoBand,
} from "./vb-shared"

/* ============================================================================
 * Trang giới thiệu ERP Vàng Bạc bản gọn: sản phẩm (slider) → một ngày ở tiệm
 * → bảng giá → hỏi đáp → liên hệ đặt lịch demo. Chi tiết từng chức năng ở trang /chuc-nang.
 * ========================================================================== */

const SLIDE_MS = 6000

/* Ảnh chụp trên DB dữ liệu giả lập ("Cửa hàng Demo"), không chụp từ app đang
 * nối DB thật của khách. */
const SLIDES = [
  {
    id: "pos-khoa-gia",
    icon: ShoppingCart,
    tab: "Bán quầy",
    title: "Bán theo giá vàng bạc thời gian thực, khoá giá chống trượt",
    text: "Mở giỏ hàng là giữ nguyên đơn giá tại giây bấm — đổi bảng giá giữa chừng đơn vẫn không trượt.",
    url: "vangbac.goplus.vn/vi/pos",
    src: "/images/screens/quay-phu-quy.jpg?v=3",
    alt: "Quầy POS bán hàng theo giá vàng bạc thời gian thực kèm đồng hồ khoá giá chống trượt giá",
    fit: "object-contain object-center",
  },
  {
    id: "dat-hang-phu-quy",
    icon: RefreshCw,
    tab: "Đặt đơn",
    title: "Đặt đơn nối thẳng hệ thống Phú Quý, tính ngay biên lãi",
    text: "Tự lấy mã đơn YD...K, chiết khấu đại lý và đối chiếu lãi gộp trên từng đơn bán.",
    url: "vangbac.goplus.vn/vi/purchase-orders",
    src: "/images/screens/dat-hang-phu-quy.jpg?v=3",
    alt: "Danh sách đơn đặt hàng kết nối trực tiếp hệ thống Phú Quý kèm chiết khấu và biên lợi nhuận",
    fit: "object-contain object-center",
  },
  {
    id: "ban-lai-phu-quy",
    icon: Scale,
    tab: "Bán lại",
    title: "Mua lại hợp đồng bạc & khớp phiên bán lại Phú Quý",
    text: "Thu mua lại hợp đồng bạc vật chất, theo dõi trạng thái bán lại và gom đơn vào phiên chốt lời.",
    url: "vangbac.goplus.vn/vi/resell-phu-quy",
    src: "/images/screens/mua-ban-lai-phu-quy.jpg?v=3",
    alt: "Quản lý đơn mua lại hợp đồng bạc Phú Quý và trạng thái bán lại BYD...K",
    fit: "object-contain object-center",
  },
  {
    id: "vang-truyen-thong",
    icon: Sparkles,
    tab: "Vàng tuổi",
    title: "Mua bán vàng bạc truyền thống, in tem kim hoàn & thu mua",
    text: "Tính khối lượng × giá tuổi + công + đá, cân trừ đá trừ dơ và in tem 2 cánh chuẩn Thông tư 22.",
    url: "vangbac.goplus.vn/vi/gold/pos",
    src: "/images/screens/ban-vang-tuoi.jpg?v=3",
    alt: "Quầy vàng truyền thống tính khối lượng nhân giá tuổi cộng tiền công và tiền đá",
    fit: "object-contain object-center",
  },
  {
    id: "cam-do",
    icon: HandCoins,
    tab: "Cầm đồ",
    title: "Hợp đồng cầm đồ, nhắc hạn chuộc & quản lý két tài sản",
    text: "Theo dõi tiền cầm, kỳ đóng lãi, hạn chuộc, định giá món cầm và vị trí két lưu giữ theo chi nhánh.",
    url: "vangbac.goplus.vn/vi/pawn",
    src: "/images/screens/hop-dong-cam.jpg?v=3",
    alt: "Danh sách hợp đồng cầm đồ với tiền cầm, lãi suất và hạn chuộc",
    fit: "object-contain object-center",
  },
  {
    id: "zalo-bot",
    icon: MessageCircle,
    tab: "Zalo & Báo giá",
    title: "Tự động xuất ảnh bảng giá Zalo & gửi tin ZNS qua Zalo OA",
    text: "Giá nhảy là hệ thống tự dựng ảnh bảng giá gửi nhóm sỉ/lẻ; khách chốt đơn nhận ngay tin Zalo OA chính thức.",
    url: "vangbac.goplus.vn/vi/zalo-oa",
    src: "/images/screens/zalo-bot-bao-gia.jpg?v=3",
    alt: "Tự động xuất ảnh bảng giá vàng bạc cập nhật nhóm Zalo và gửi tin chăm sóc khách hàng qua Zalo OA",
    fit: "object-contain object-center",
  },
] as const

const HERO_POINTS = [
  "Khoá giá chống trượt ngay khi mở đơn tại quầy",
  "Hợp đồng bạc tích trữ, đặt đơn & bán lại Phú Quý",
  "Bán vàng theo tuổi + công + đá, in tem 2 cánh",
  "Hợp đồng cầm đồ, xuất bảng giá & tin nhắn Zalo OA (ZNS)",
] as const

const TRUST_ITEMS = [
  { icon: Users, label: "Phân quyền theo vai trò, chi nhánh" },
  { icon: History, label: "Nhật ký thao tác đầy đủ" },
  { icon: ShieldCheck, label: "Dữ liệu mỗi tiệm tách riêng" },
  { icon: Smartphone, label: "Dùng trên máy tính và điện thoại" },
] as const

const PLAN_OPTIONS = PLANS.map((p) => p.name)

/** Dòng thời gian trang chủ: một ngày ở tiệm, 6 bước. Vàng truyền thống và
 * kho tài sản cầm chỉ ở trang /chuc-nang cho dòng thời gian khỏi dài. */
const TIMELINE_IDS = [
  "gia-vang",
  "ban-hang",
  "thu-mua",
  "cam-do",
  "kho-quy",
  "bao-cao",
] as const
const TIMELINE = TIMELINE_IDS.map(
  (id) => FEATURE_MODULES.find((m) => m.id === id)!,
)

/* ---------- Phần đầu: chữ một hàng, ảnh sản phẩm to ở giữa ----------
 * Khung ảnh tự co theo chiều cao màn hình để vào trang là thấy trọn ảnh,
 * màn cao thì ảnh to ra tới hết bề ngang. Tab chức năng nằm trên thanh khung. */

function ProductHero() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  /** Ảnh đang phóng to (điện thoại: ảnh chụp màn máy tính quá nhỏ để đọc). */
  const [zoomed, setZoomed] = useState(false)
  const touchX = useRef<number | null>(null)

  const count = SLIDES.length
  const go = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count],
  )

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduceMotion(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  const autoplay = !paused && !reduceMotion && !zoomed

  // Khung phóng to: khoá cuộn trang phía sau, Esc để đóng.
  useEffect(() => {
    if (!zoomed) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setZoomed(false)
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener("keydown", onKey)
    }
  }, [zoomed])

  useEffect(() => {
    if (!autoplay) return
    const t = window.setTimeout(() => go(index + 1), SLIDE_MS)
    return () => window.clearTimeout(t)
  }, [autoplay, index, go])

  const active = SLIDES[index]

  return (
    <>
      <style>{`@keyframes vb-slide-progress{from{transform:scaleX(0)}to{transform:scaleX(1)}}@keyframes vb-fade-in{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}`}</style>

      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12">
        {/* Chữ giới thiệu - cột trái */}
        <div className="min-w-0">
          <p className="sysdark:text-[#D9C189] font-mono text-xs font-medium tracking-[0.08em] text-[#E8D49A] uppercase">
            ERP Vàng Bạc · Bạc tích trữ · Kim hoàn · Cầm đồ
          </p>
          <h1
            className="mt-3 font-semibold tracking-[-0.025em] [text-wrap:balance] text-white"
            style={{
              fontSize: "clamp(1.75rem, 2.5vw, 2.4rem)",
              lineHeight: 1.18,
            }}
          >
            Phần mềm quản lý tiệm vàng bạc, đại lý bạc tích trữ &amp; cầm đồ
          </h1>
          <p className="mt-3 text-base leading-relaxed [text-wrap:pretty] text-[#F2F4F8]">
            Tự cập nhật giá từ Phú Quý, Bảo Tín Mạnh Hải, Ancarat. Quản lý bán
            hàng, thu mua, cầm đồ và tồn kho nhiều chi nhánh trên một hệ thống.
          </p>
          <ul className="sysdark:text-[#C9CED8] mt-5 space-y-2.5 text-sm text-[#E4E7EE]">
            {HERO_POINTS.map((point) => (
              <li key={point} className="flex items-start gap-2.5">
                <Check className="sysdark:text-[#D9C189] mt-0.5 h-4 w-4 shrink-0 text-[#E8D49A]" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href={BOOK_DEMO_HREF}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#C99A2E] px-6 py-2.5 text-sm font-semibold text-[#0B1220] shadow-sm transition-[background-color,transform] duration-150 hover:bg-[#D9B24E] active:scale-[0.98]"
            >
              Đặt lịch demo
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#bang-gia"
              className="sysdark:hover:bg-white/5 inline-flex min-h-[44px] items-center justify-center rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition-[background-color,transform] duration-150 hover:bg-white/10 active:scale-[0.98]"
            >
              Xem bảng giá
            </a>
          </div>
          <p className="sysdark:text-[#D9C189] mt-3 text-xs text-[#E8D49A]">
            Demo trên dữ liệu mẫu, theo đúng mô hình tiệm của bạn.
          </p>
        </div>

        {/* Khung ảnh sản phẩm */}
        <div
          className="w-full lg:w-[clamp(560px,calc((100dvh-220px)*16/10),min(940px,calc(100vw-500px)))]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div className="sysdark:bg-[#111317] overflow-hidden rounded-xl border border-white/20 bg-white shadow-[0_40px_80px_-30px_rgba(0,0,0,0.55)]">
            <div className="sysdark:border-[#1F232A] sysdark:bg-[#16191E] flex items-center gap-2 border-b border-[#E3E7EE] bg-[#F4F6FA] px-2.5 py-2">
              <div className="hidden shrink-0 gap-1.5 pl-1 sm:flex">
                <span className="sysdark:bg-[#343A44] h-2.5 w-2.5 rounded-full bg-[#D3D9E2]" />
                <span className="sysdark:bg-[#343A44] h-2.5 w-2.5 rounded-full bg-[#D3D9E2]" />
                <span className="sysdark:bg-[#343A44] h-2.5 w-2.5 rounded-full bg-[#D3D9E2]" />
              </div>
              <div
                role="tablist"
                aria-label="Chức năng sản phẩm"
                className="relative grid min-w-0 flex-1 grid-cols-3 gap-1 sm:flex sm:justify-center"
              >
                {SLIDES.map((s, i) => {
                  const Icon = s.icon
                  const isActive = i === index
                  return (
                    <button
                      key={s.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls="vb-slide-panel"
                      onClick={() => go(i)}
                      className={`relative flex min-w-0 shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-md px-2 py-1.5 text-xs font-semibold whitespace-nowrap transition-[background-color,color,transform] duration-150 active:scale-[0.98] xl:px-2.5 xl:text-[13px] ${
                        isActive
                          ? "sysdark:bg-[#262B33] sysdark:text-white sysdark:shadow-none sysdark:ring-white/10 bg-white text-[#0F1B2D] shadow-sm ring-1 ring-[#D6DCE6]"
                          : "sysdark:text-[#8B93A3] sysdark:hover:bg-[#111317]/5 sysdark:hover:text-white text-[#5B6475] hover:bg-white/70 hover:text-[#0F1B2D]"
                      }`}
                    >
                      <Icon
                        className={`h-3.5 w-3.5 shrink-0 ${isActive ? "sysdark:text-[#E3C77A] text-[#8A6516]" : ""}`}
                      />
                      {s.tab}
                      {isActive && (
                        <span
                          key={`${index}-${autoplay}`}
                          aria-hidden
                          className="sysdark:bg-[#9C7218] absolute inset-x-0 bottom-0 h-[2px] origin-left bg-[#8A6516]"
                          style={
                            autoplay
                              ? {
                                  animation: `vb-slide-progress ${SLIDE_MS}ms linear forwards`,
                                }
                              : { transform: "scaleX(1)" }
                          }
                        />
                      )}
                    </button>
                  )
                })}
              </div>
              <div className="hidden shrink-0 items-center gap-2 pr-1 sm:flex">
                <span className="sysdark:border-[#262B33] sysdark:bg-[#111317] sysdark:text-[#8B93A3] hidden rounded border border-[#E3E7EE] bg-white px-2 py-0.5 font-mono text-[11px] text-[#5B6475] xl:inline-block">
                  {active.url}
                </span>
                <span className="tnum sysdark:text-[#6B7280] font-mono text-xs font-semibold text-[#8B93A3]">
                  {String(index + 1).padStart(2, "0")}/
                  {String(count).padStart(2, "0")}
                </span>
              </div>
            </div>

            <div
              id="vb-slide-panel"
              role="tabpanel"
              aria-roledescription="slide"
              aria-label={`${index + 1} / ${count}: ${active.title}`}
              className="relative overflow-hidden bg-[#F8FAFC]"
              onTouchStart={(e) => {
                touchX.current = e.touches[0]?.clientX ?? null
              }}
              onTouchEnd={(e) => {
                if (touchX.current === null) return
                const dx = (e.changedTouches[0]?.clientX ?? 0) - touchX.current
                if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1))
                touchX.current = null
              }}
            >
              {/* Các ảnh chồng lên nhau, đổi slide bằng mờ dần thay vì trượt
               * ngang: không bị tua ngược qua cả dãy khi từ ảnh cuối về ảnh
               * đầu. Ảnh tải sẵn hết để lúc đổi không bị chớp trắng. */}
              <div className="grid grid-cols-1">
                {SLIDES.map((s, i) => (
                  <div
                    key={s.id}
                    className={`transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] [grid-area:1/1] motion-reduce:transition-none ${
                      i === index
                        ? "opacity-100"
                        : "pointer-events-none opacity-0"
                    }`}
                    aria-hidden={i !== index}
                  >
                    <Image
                      src={s.src}
                      alt={s.alt}
                      width={1440}
                      height={900}
                      priority={i === 0}
                      loading={i === 0 ? undefined : "eager"}
                      sizes="(min-width: 1024px) 940px, 100vw"
                      className={`block aspect-[16/10] w-full bg-white ${s.fit}`}
                    />
                  </div>
                ))}
              </div>
              {/* Điện thoại: chạm để mở ảnh cỡ thật, kéo ngang để xem. */}
              <button
                type="button"
                onClick={() => setZoomed(true)}
                className="absolute inset-0 flex items-end justify-end p-2 sm:hidden"
                aria-label={`Phóng to ảnh: ${active.title}`}
              >
                <span className="inline-flex items-center gap-1 rounded-full bg-[#0B1220]/75 px-2.5 py-1 text-xs font-semibold text-white">
                  <Maximize2 className="h-3.5 w-3.5" />
                  Chạm để phóng to
                </span>
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <p
              key={active.id}
              className="sysdark:text-[#C9CED8] text-sm text-[#E4E7EE] motion-safe:animate-[vb-fade-in_500ms_ease-out]"
            >
              <b className="font-semibold text-white">{active.title}.</b>{" "}
              {active.text}
            </p>
            <a
              href={FEATURES_HREF}
              className="inline-flex shrink-0 items-center justify-center gap-1.5 text-sm font-semibold text-white hover:underline"
            >
              Xem chi tiết từng chức năng
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {zoomed && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          className="fixed inset-0 z-[100] flex flex-col bg-[#0B1220] sm:hidden"
        >
          <div className="flex items-center justify-between gap-3 px-4 py-3 text-white">
            <p className="min-w-0 text-sm font-semibold">{active.title}</p>
            <button
              type="button"
              onClick={() => setZoomed(false)}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10"
              aria-label="Đóng"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 overflow-auto overscroll-contain">
            <Image
              src={active.src}
              alt={active.alt}
              width={1440}
              height={900}
              sizes="1100px"
              className="block h-auto w-[1100px] max-w-none bg-white"
            />
          </div>
          <p className="px-4 py-3 text-center text-xs text-[#E8D49A]">
            Kéo ngang để xem hết màn hình
          </p>
        </div>
      )}
    </>
  )
}

/* ---------- Trang ---------- */

export function VbLandingPage() {
  const [plan, setPlan] = useState<string>("Professional")
  const [showPhone, setShowPhone] = useState(false)
  const [copied, setCopied] = useState(false)

  const zaloMessage = `Chào Goplus, mình muốn đặt lịch demo ERP Vàng Bạc (quan tâm gói ${plan}).`

  const handleCopyZalo = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(zaloMessage).catch(() => {})
      setCopied(true)
      window.setTimeout(() => setCopied(false), 4000)
    }
  }

  return (
    <div className="bg-vb-bg text-vb-fg selection:bg-vb-gold min-h-dvh antialiased selection:text-white">
      <VbHeader wide />

      <div>
        {/* ---------- Hero + slider sản phẩm (ảnh nằm ngay màn hình đầu) ---------- */}
        <section
          id="san-pham"
          className="sysdark:bg-[#0E0A03] sysdark:bg-[radial-gradient(ellipse_75%_85%_at_82%_0%,rgba(218,165,52,0.42),transparent_68%),radial-gradient(ellipse_60%_70%_at_12%_100%,rgba(184,132,28,0.24),transparent_65%),linear-gradient(135deg,#0E0A03_0%,#241906_52%,#120C03_100%)] relative scroll-mt-20 overflow-hidden bg-[#241906] bg-[radial-gradient(ellipse_75%_85%_at_82%_0%,rgba(218,165,52,0.48),transparent_68%),radial-gradient(ellipse_60%_70%_at_12%_100%,rgba(184,132,28,0.32),transparent_65%),linear-gradient(135deg,#241906_0%,#4A350C_52%,#261B07_100%)] pt-[100px] pb-10 lg:pt-[96px] lg:pb-12"
        >
          <CubeBackdrop />
          <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
            <ProductHero />
          </div>
        </section>

        {/* Phần dưới đầu trang: chung một khung kẻ dọc. */}
        <div className="relative overflow-x-clip">
          <GuideRails />

          {/* ---------- Số liệu & dải tin cậy ---------- */}
          <section
            aria-label="Số liệu vận hành và cam kết"
            className="border-vb-border bg-vb-surface sysdark:bg-[radial-gradient(#1F232A_1px,transparent_1px)] relative border-y bg-[radial-gradient(#D6DCE6_1px,transparent_1px)] [background-size:16px_16px]"
          >
            <RailMarks />
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-8 sm:px-6 lg:grid-cols-12 lg:items-center lg:px-8">
              <dl className="divide-vb-border-strong grid grid-cols-3 divide-x lg:col-span-5">
                {[
                  { v: "3 nguồn", l: "giá Phú Quý · BTMH · Ancarat" },
                  { v: "100%", l: "đơn chốt khoá giá chống trượt" },
                  { v: "Đa kho", l: "điều chuyển & phân quyền chi nhánh" },
                ].map((s) => (
                  <div key={s.l} className="px-3 first:pl-0">
                    <dt className="sr-only">{s.l}</dt>
                    <dd className="tnum text-vb-fg font-mono text-2xl font-medium tracking-tight">
                      {s.v}
                    </dd>
                    <dd className="text-vb-subtle mt-0.5 text-xs">{s.l}</dd>
                  </div>
                ))}
              </dl>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-3 lg:col-span-7">
                {TRUST_ITEMS.map((t) => {
                  const Icon = t.icon
                  return (
                    <li
                      key={t.label}
                      className="text-vb-body flex items-center gap-2.5 text-sm font-semibold"
                    >
                      <Icon className="text-vb-gold-deep sysdark:text-vb-gold-bright h-5 w-5 shrink-0" />
                      {t.label}
                    </li>
                  )
                })}
              </ul>
            </div>
          </section>

          {/* ---------- 3 mô hình kinh doanh mục tiêu (khung kẻ sọc nối thẳng GuideRails) ---------- */}
          <section
            id="mo-hinh"
            aria-labelledby="mo-hinh-title"
            className="border-vb-border bg-vb-bg relative scroll-mt-20 border-b pt-14 lg:pt-20"
          >
            <RailMarks />
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl">
                <Eyebrow index="01">Mô hình áp dụng</Eyebrow>
                <h2
                  id="mo-hinh-title"
                  className="text-vb-fg mt-2 font-medium tracking-[-0.02em] [text-wrap:balance]"
                  style={HEADING_STYLE}
                >
                  Dùng cho đại lý bạc tích trữ, tiệm vàng truyền thống &amp;
                  hiệu cầm đồ
                </h2>
              </div>
            </div>

            {/* Lưới 3 cột ăn khớp trực tiếp vào hai đường kẻ dọc GuideRails */}
            <div className="border-vb-border mx-auto mt-10 max-w-6xl border-t">
              <div className="divide-vb-border grid grid-cols-1 divide-y lg:grid-cols-3 lg:divide-x lg:divide-y-0">
                {DEALER_MODELS.map((m, idx) => {
                  const isFeatured = idx === 0
                  return (
                    <article
                      key={m.id}
                      className={`relative flex flex-col p-6 sm:p-8 ${
                        isFeatured
                          ? "sysdark:bg-[#131009] sysdark:before:bg-[#C99A2E] bg-[#FAF6EC]/70 before:absolute before:inset-x-0 before:-top-px before:h-[2px] before:bg-[#8A6516]"
                          : ""
                      }`}
                    >
                      <div>
                        <p
                          className={`tnum font-mono text-[11px] font-medium tracking-[0.08em] uppercase ${
                            isFeatured
                              ? "text-vb-gold-deep sysdark:text-vb-gold-bright font-semibold"
                              : "text-vb-subtle"
                          }`}
                        >
                          {String(idx + 1).padStart(2, "0")} · {m.badge}
                        </p>
                        <h3 className="text-vb-fg mt-2.5 text-lg leading-snug font-bold">
                          {m.title}
                        </h3>
                        <p className="text-vb-muted mt-2 text-sm leading-relaxed">
                          {m.desc}
                        </p>
                      </div>

                      <ul className="border-vb-border text-vb-body mt-5 space-y-2 border-t pt-4 text-sm">
                        {m.highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2">
                            <Check className="text-vb-gold-deep sysdark:text-vb-gold-bright mt-0.5 h-4 w-4 shrink-0" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  )
                })}
              </div>
            </div>
          </section>

          {/* ---------- Chức năng: một ngày ở tiệm theo dòng thời gian ----------
           * Lưới kiến trúc 3×2 nối trực tiếp vào GuideRails; chi tiết ở /chuc-nang. */}
          <section
            id="chuc-nang"
            className="bg-vb-bg relative scroll-mt-20 pt-16 pb-8 lg:pt-24 lg:pb-10"
          >
            <RailMarks />
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div className="max-w-2xl">
                  <Eyebrow index="02">Cách vận hành</Eyebrow>
                  <h2
                    className="text-vb-fg mt-2 font-medium tracking-[-0.02em] [text-wrap:balance]"
                    style={HEADING_STYLE}
                  >
                    Một ngày ở tiệm, từ lúc mở cửa tới cuối tháng
                  </h2>
                </div>
                <Link
                  href={FEATURES_HREF}
                  className="text-vb-gold-deep sysdark:text-vb-gold-bright sysdark:hover:text-white inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold transition-colors hover:text-[#4A360B]"
                >
                  Xem toàn bộ chức năng
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="border-vb-border mx-auto mt-10 max-w-6xl border-y">
              <ol className="bg-vb-border grid grid-cols-1 gap-px md:grid-cols-2 lg:grid-cols-3">
                {TIMELINE.map((m, i) => {
                  const Icon = m.icon
                  return (
                    <li
                      key={m.id}
                      className="bg-vb-bg hover:bg-vb-surface/60 relative flex flex-col justify-between p-6 transition-colors duration-150 sm:p-7"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-3">
                          <span className="tnum text-vb-subtle font-mono text-[11px] font-medium tracking-[0.08em] uppercase">
                            [{String(i + 1).padStart(2, "0")}] · {m.when}
                          </span>
                          <span className="border-vb-border bg-vb-surface text-vb-gold-deep sysdark:text-vb-gold-bright inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border">
                            <Icon className="h-[18px] w-[18px]" />
                          </span>
                        </div>
                        <h3 className="text-vb-fg mt-4 text-base font-bold">
                          <Link
                            href={`${FEATURES_HREF}#${m.id}`}
                            className="group/step hover:text-vb-gold-deep sysdark:hover:text-vb-gold-bright inline-flex items-center gap-1.5 transition-colors"
                          >
                            <span>{m.name}</span>
                            <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-[transform,opacity] duration-150 group-hover/step:translate-x-0 group-hover/step:opacity-100" />
                          </Link>
                        </h3>
                        <p className="text-vb-muted mt-1.5 text-sm leading-relaxed">
                          {m.brief}
                        </p>
                      </div>
                    </li>
                  )
                })}
              </ol>
            </div>

            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <p className="text-vb-muted mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-sm">
                <Smartphone className="text-vb-gold-deep sysdark:text-vb-gold-bright h-4 w-4" />
                <b className="text-vb-fg font-semibold">
                  Thêm trên trang Chức năng:
                </b>
                đặt đơn Phú Quý, phiên bán lại, điều chuyển kiểm kê kho, in tem
                Thông tư 22, voucher &amp; Zalo OA.
                <Link
                  href={FEATURES_HREF}
                  className="sysdark:bg-[#4A3A14] rounded-full bg-[#0B1220] px-2.5 py-0.5 font-mono text-xs font-semibold text-white transition-opacity hover:opacity-90"
                >
                  11 nghiệp vụ →
                </Link>
              </p>
            </div>
          </section>

          <BookDemoBand />

          {/* ---------- Bảng giá ---------- */}
          <section
            id="bang-gia"
            className="border-vb-border relative scroll-mt-24 border-t py-12 lg:py-16"
          >
            <RailMarks />
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <Eyebrow index="03">Bảng giá</Eyebrow>
                <h2
                  className="text-vb-fg mt-2 font-medium tracking-[-0.02em] [text-wrap:balance]"
                  style={HEADING_STYLE}
                >
                  Chọn gói theo mảng bạn kinh doanh
                </h2>
              </div>

              <div className="relative isolate mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:items-stretch">
                <SoftGlow className="inset-x-1/4 -inset-y-10" />
                {PLANS.map((p) => {
                  const dark = p.tone === "dark"
                  const featured = p.tone === "featured"
                  return (
                    <div
                      key={p.id}
                      className={`relative flex flex-col rounded-xl border p-6 lg:px-5 ${
                        dark
                          ? "sysdark:border-[#4A3A14] sysdark:bg-[#141F30] border-[#0F1B2D] bg-[#0F1B2D] text-white"
                          : featured
                            ? "sysdark:border-[#C99A2E] sysdark:bg-[#111317] sysdark:shadow-[0_30px_60px_-36px_rgba(201,154,46,0.45)] sysdark:ring-[#C99A2E] border-[#8A6516] bg-white shadow-[0_30px_60px_-36px_rgba(10,22,51,0.5)] ring-1 ring-[#8A6516]"
                            : "border-vb-border-strong bg-vb-card"
                      }`}
                    >
                      {featured && (
                        <span className="sysdark:bg-[#9C7218] absolute -top-3 left-6 rounded-full bg-[#8A6516] px-3 py-1 text-[11px] font-semibold text-white lg:left-5">
                          Đầy đủ vàng &amp; bạc
                        </span>
                      )}
                      <div className="lg:min-h-[124px]">
                        <h3
                          className={`text-sm font-semibold tracking-wide uppercase ${
                            dark
                              ? "sysdark:text-[#D9C189] text-[#E8D49A]"
                              : "text-vb-gold-deep sysdark:text-vb-gold-bright"
                          }`}
                        >
                          {p.name}
                        </h3>

                        <div className="mt-4 flex flex-wrap items-baseline gap-x-1 gap-y-0.5">
                          <span className="tnum text-2xl font-bold tracking-tight lg:text-[22px]">
                            {p.price.startsWith("Từ ") ? (
                              <>
                                <span className="mr-1 text-sm font-semibold tracking-normal">
                                  Từ
                                </span>
                                {p.price.slice(3)}
                              </>
                            ) : (
                              p.price
                            )}
                          </span>
                          {p.unit && (
                            <span
                              className={`shrink-0 text-sm whitespace-nowrap ${dark ? "sysdark:text-[#D9C189] text-[#E8D49A]" : "text-vb-subtle"}`}
                            >
                              {p.unit}
                            </span>
                          )}
                        </div>
                        <p
                          className={`mt-2 text-sm ${dark ? "sysdark:text-[#A3AAB8] text-[#C3CAD6]" : "text-vb-subtle"}`}
                        >
                          {p.note}
                        </p>
                      </div>

                      <ul
                        className={`mt-5 flex-1 space-y-2.5 border-t pt-5 text-sm ${
                          dark
                            ? "sysdark:text-[#C9CED8] border-white/10 text-[#E4E7EE]"
                            : "border-vb-border text-vb-body"
                        }`}
                      >
                        {p.items.map((item) => (
                          <li key={item} className="flex items-start gap-2.5">
                            <Check
                              className={`mt-0.5 h-4 w-4 shrink-0 ${dark ? "text-[#E3C77A]" : "text-vb-gold-deep sysdark:text-vb-gold-bright"}`}
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <a
                        href="#dang-ky"
                        onClick={() => setPlan(p.name)}
                        className={`mt-7 inline-flex min-h-[44px] items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-[background-color,border-color,color,transform] duration-150 active:scale-[0.98] ${
                          dark
                            ? "sysdark:text-[#08090B] sysdark:hover:bg-[#E6E9EF] bg-white text-[#0F1B2D] hover:bg-[#FBF5E6]"
                            : featured
                              ? "sysdark:bg-[#9C7218] sysdark:hover:bg-[#C99A2E] bg-[#8A6516] text-white hover:bg-[#6F5112]"
                              : "sysdark:border-[#343A44] text-vb-body sysdark:hover:border-[#C99A2E] border border-[#C9D0DC] hover:border-[#8A6516]"
                        }`}
                      >
                        {p.cta}
                      </a>
                    </div>
                  )
                })}
              </div>

              <p className="text-vb-subtle mt-8 text-center text-sm">
                Muốn xem trên số liệu mẫu trước khi chọn?{" "}
                <Link
                  href={`${FEATURES_HREF}#so-sanh`}
                  className="text-vb-gold-deep sysdark:text-vb-gold-bright font-semibold hover:underline"
                >
                  So sánh chi tiết các gói
                </Link>{" "}
                hoặc{" "}
                <a
                  href="#dang-ky"
                  className="text-vb-gold-deep sysdark:text-vb-gold-bright font-semibold hover:underline"
                >
                  nhắn Zalo để được tư vấn
                </a>
              </p>
            </div>
          </section>

          {/* ---------- Hỏi đáp (cùng nội dung với FAQPage trong vb-seo) ---------- */}
          <section
            id="hoi-dap"
            aria-labelledby="hoi-dap-title"
            className="border-vb-border relative scroll-mt-24 border-t py-12 lg:py-16"
          >
            <RailMarks />
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
              <div className="lg:col-span-4">
                <Eyebrow index="04">Hỏi đáp</Eyebrow>
                <h2
                  id="hoi-dap-title"
                  className="text-vb-fg mt-2 font-medium tracking-[-0.02em] [text-wrap:balance]"
                  style={HEADING_STYLE}
                >
                  Câu hỏi thường gặp
                </h2>
              </div>
              <div className="divide-vb-border border-vb-border divide-y border-y lg:col-span-8">
                {FAQ.map((f, i) => (
                  <details key={f.q} open={i === 0} className="group">
                    <summary className="text-vb-fg hover:text-vb-gold-deep sysdark:hover:text-vb-gold-bright flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-base font-semibold transition-colors [&::-webkit-details-marker]:hidden">
                      <h3>{f.q}</h3>
                      <span
                        aria-hidden
                        className="text-vb-gold-deep sysdark:text-vb-gold-bright font-mono text-lg leading-none transition-transform duration-150 group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="text-vb-muted pb-5 text-sm leading-relaxed">
                      {f.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* ---------- Đăng ký ---------- */}
          <section
            id="dang-ky"
            className="border-vb-border bg-vb-surface relative scroll-mt-24 overflow-hidden border-t py-14 lg:py-20"
          >
            <RailMarks />
            <CubeBackdrop id="vb-cubes-contact" light />
            <div className="relative isolate mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <SoftGlow className="inset-x-10 -inset-y-6" />
              <div className="border-vb-border-strong bg-vb-card grid grid-cols-1 overflow-hidden rounded-xl border lg:grid-cols-5">
                <div className="sysdark:bg-[#140E04] bg-[#241906] bg-[radial-gradient(ellipse_90%_90%_at_90%_0%,rgba(218,165,52,0.34),transparent_70%)] p-8 text-white sm:p-10 lg:col-span-2">
                  <h2
                    className="font-medium tracking-[-0.02em] [text-wrap:balance]"
                    style={{
                      fontSize: "clamp(1.5rem, 2.2vw, 1.9rem)",
                      lineHeight: 1.2,
                    }}
                  >
                    Đặt lịch <span className="whitespace-nowrap">demo</span>{" "}
                    &amp; <span className="whitespace-nowrap">báo giá</span>
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-[#C3CAD6]">
                    Nhắn Zalo hoặc gọi trực tiếp, trả lời trong giờ làm việc.
                  </p>
                  <ul className="sysdark:text-[#C9CED8] mt-6 space-y-2.5 text-sm text-[#E4E7EE]">
                    {[
                      "Demo theo đúng mô hình tiệm của bạn",
                      "Tư vấn chọn gói phù hợp",
                      "Cài đặt và đào tạo tận nơi khi triển khai",
                    ].map((line) => (
                      <li key={line} className="flex items-start gap-2.5">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#E3C77A]" />
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-8 sm:p-10 lg:col-span-3">
                  <p className="text-vb-fg text-xs font-semibold">
                    Gói quan tâm
                  </p>
                  <div className="mt-1.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {PLAN_OPTIONS.map((name) => {
                      const checked = plan === name
                      return (
                        <button
                          key={name}
                          type="button"
                          aria-pressed={checked}
                          onClick={() => setPlan(name)}
                          className={`rounded-md border px-3 py-2.5 text-center text-sm font-semibold transition-[background-color,border-color,color,transform] duration-150 active:scale-[0.98] ${
                            checked
                              ? "sysdark:border-[#C99A2E] sysdark:bg-[#9C7218] border-[#8A6516] bg-[#8A6516] text-white"
                              : "sysdark:border-[#343A44] text-vb-body sysdark:hover:border-[#C99A2E] border-[#C9D0DC] hover:border-[#8A6516]"
                          }`}
                        >
                          {name}
                        </button>
                      )
                    })}
                  </div>

                  <div className="mt-6 space-y-3">
                    <a
                      href={CONTACT.zalo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleCopyZalo}
                      className="flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-full bg-[#0068FF] px-6 py-3 text-sm font-semibold text-white transition-[background-color,transform] duration-150 hover:bg-[#0057D6] active:scale-[0.99]"
                    >
                      <MessageCircle className="h-5 w-5" />
                      Nhắn Zalo ngay (Gói {plan})
                    </a>
                    {copied && (
                      <p className="text-vb-gold-deep sysdark:text-vb-gold-bright text-center text-xs font-medium">
                        Đã sao chép sẵn câu nhắn gói {plan} — bạn chỉ cần dán
                        vào khung chat Zalo!
                      </p>
                    )}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-[auto_1fr]">
                      {/* Số điện thoại chỉ hiện khi khách bấm, bấm lần nữa là gọi. */}
                      {showPhone ? (
                        <a
                          href={`tel:${CONTACT.phone}`}
                          className="sysdark:border-[#C99A2E] text-vb-gold-deep sysdark:text-vb-gold-bright flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-[#8A6516] px-4 py-2.5 text-sm font-semibold transition-[background-color,transform] duration-150 hover:bg-[#FBF5E6] active:scale-[0.98]"
                        >
                          <Phone className="h-4 w-4" />
                          <span className="tnum">{CONTACT.phoneLabel}</span>
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setShowPhone(true)}
                          className="sysdark:border-[#343A44] text-vb-fg sysdark:hover:border-[#C99A2E] sysdark:hover:text-[#E3C77A] flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-[#C9D0DC] px-4 py-2.5 text-sm font-semibold transition-[border-color,color,transform] duration-150 hover:border-[#8A6516] hover:text-[#8A6516] active:scale-[0.98]"
                        >
                          <Phone className="h-4 w-4" />
                          Hiện số điện thoại
                        </button>
                      )}
                      <a
                        href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(`Đặt lịch demo ERP Vàng Bạc - gói ${plan}`)}`}
                        className="sysdark:border-[#343A44] text-vb-fg sysdark:hover:border-[#C99A2E] sysdark:hover:text-[#E3C77A] flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-[#C9D0DC] px-4 py-2.5 text-sm font-semibold transition-[border-color,color,transform] duration-150 hover:border-[#8A6516] hover:text-[#8A6516] active:scale-[0.98]"
                      >
                        <Mail className="h-4 w-4 shrink-0" />
                        {CONTACT.email}
                      </a>
                    </div>
                  </div>
                  <p className="text-vb-subtle mt-4 text-xs">
                    Khi nhắn, cho biết tên tiệm, số chi nhánh và mảng đang kinh
                    doanh (bạc, vàng, cầm đồ) để hẹn lịch nhanh hơn.
                  </p>
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
