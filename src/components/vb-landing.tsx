"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Check,
  Gem,
  HandCoins,
  History,
  Mail,
  Maximize2,
  MessageCircle,
  Phone,
  RefreshCw,
  Scale,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Users,
  X,
} from "lucide-react"

import {
  BOOK_DEMO_HREF,
  BookDemoBand,
  CONTACT,
  CubeBackdrop,
  DEALER_MODELS,
  FAQ,
  FEATURES_HREF,
  GuideRails,
  HEADING_STYLE,
  PLANS,
  RailMarks,
  SoftGlow,
  VbFooter,
  VbHeader,
} from "./vb-shared"

/* ============================================================================
 * Trang giới thiệu ERP Vàng Bạc:
 * - Hero nền khối lập phương 3D viền LED + màn hình thực tế cỡ lớn (940px)
 * - 3 mô hình tiệm kèm mức giá tương ứng (khung kiến trúc liền mạch)
 * - Bộ sưu tập 6 màn hình nghiệp vụ thực tế cỡ lớn (2 cột rõ nét, không đè nhãn)
 * - Bảng giá 4 gói rõ ràng, Hỏi đáp & Đặt lịch demo.
 * ========================================================================== */

const SLIDE_MS = 6000

const SLIDES = [
  {
    id: "pos-khoa-gia",
    icon: ShoppingCart,
    tab: "Bán quầy",
    title: "Bán theo giá vàng bạc thời gian thực, chống trượt giá đơn mua bán",
    text: "Lên đơn là giữ nguyên đơn giá cho khách, dù bảng giá thay đổi giữa lúc thanh toán đơn vẫn không bị trượt giá.",
    url: "vangbac.goplus.vn/vi/pos",
    src: "/images/screens/quay-phu-quy.jpg?v=3",
    alt: "Quầy POS bán hàng theo giá vàng bạc thời gian thực và chống trượt giá đơn mua bán",
    fit: "object-contain object-center",
  },
  {
    id: "vang-truyen-thong",
    icon: Gem,
    tab: "Vàng tuổi & Đá quý",
    title: "Bán trang sức theo tuổi vàng + tiền công + đá quý & in tem 2 cánh",
    text: "Tính khối lượng × giá tuổi + công + đá, cân trừ đá trừ dơ và in tem kim hoàn chuẩn Thông tư 22.",
    url: "vangbac.goplus.vn/vi/gold/pos",
    src: "/images/screens/ban-vang-tuoi.jpg?v=3",
    alt: "Quầy vàng truyền thống tính khối lượng nhân giá tuổi cộng tiền công và tiền đá",
    fit: "object-contain object-center",
  },
  {
    id: "dat-hang-phu-quy",
    icon: RefreshCw,
    tab: "Đặt hàng Phú Quý",
    title: "Đặt hàng trực tiếp với Phú Quý, tính rõ chiết khấu & tiền lời",
    text: "Tự đồng bộ mã đơn YD...K, chiết khấu đại lý và tính tiền lời trên từng đơn bán.",
    url: "vangbac.goplus.vn/vi/purchase-orders",
    src: "/images/screens/dat-hang-phu-quy.jpg?v=3",
    alt: "Danh sách đơn đặt hàng kết nối trực tiếp hệ thống Phú Quý kèm chiết khấu và tiền lời",
    fit: "object-contain object-center",
  },
  {
    id: "ban-lai-phu-quy",
    icon: Scale,
    tab: "Mua bán lại",
    title: "Mua lại hợp đồng bạc & khớp phiên bán lại Phú Quý",
    text: "Thu mua lại hợp đồng bạc của khách, theo dõi trạng thái và gom đơn vào phiên bán lại Phú Quý.",
    url: "vangbac.goplus.vn/vi/resell-phu-quy",
    src: "/images/screens/mua-ban-lai-phu-quy.jpg?v=3",
    alt: "Quản lý đơn mua lại hợp đồng bạc Phú Quý và trạng thái bán lại BYD...K",
    fit: "object-contain object-center",
  },
  {
    id: "cam-do",
    icon: HandCoins,
    tab: "Cầm đồ & Két",
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
    text: "Khi giá thay đổi, phần mềm tự tạo ảnh bảng giá gửi nhóm Zalo sỉ/lẻ và nhắn tin Zalo OA xác nhận đơn cho khách.",
    url: "vangbac.goplus.vn/vi/zalo-oa",
    src: "/images/screens/zalo-bot-bao-gia.jpg?v=3",
    alt: "Tự động xuất ảnh bảng giá vàng bạc cập nhật nhóm Zalo và gửi tin chăm sóc khách hàng qua Zalo OA",
    fit: "object-contain object-center",
  },
] as const

const HERO_POINTS = [
  "Chống trượt giá đơn mua bán khi thị trường biến động",
  "Bán vàng theo tuổi + tiền công + đá quý, in tem 2 cánh TT22",
  "Đặt hàng & khớp phiên bán lại bạc tích trữ Phú Quý, BTMH, Ancarat",
  "Hợp đồng cầm đồ, két tài sản & xuất bảng giá Zalo tự động",
] as const

/** 6 màn hình thực tế hiển thị khổ lớn 2 cột (không đè nhãn lên ảnh). */
const VISUAL_SHOWCASE = [
  {
    id: "tem-kim-hoan",
    title: "In tem trang sức kim hoàn 2 cánh chuẩn Thông tư 22",
    desc: "In rõ tuổi vàng, khối lượng vàng - đá - tổng, tiền công và nhà sản xuất cho từng món nữ trang.",
    src: "/images/screens/in-tem-kim-hoan.jpg?v=3",
    alt: "Màn hình thiết kế và in tem kim hoàn 2 cánh chuẩn Thông tư 22",
    href: "/chuc-nang#vang-truyen-thong",
  },
  {
    id: "thu-mua-can-lai",
    title: "Thu mua vàng cũ trừ đá, trừ dơ & thu cũ đổi mới tính chênh lệch",
    desc: "Tự tính giá trị thu lại theo tuổi vàng thực tế và cấn trừ trực tiếp vào hoá đơn mua món mới.",
    src: "/images/screens/thu-mua-can.jpg?v=3",
    alt: "Màn hình thu mua vàng bạc trừ đá trừ dơ và thu cũ đổi mới",
    href: "/chuc-nang#vang-truyen-thong",
  },
  {
    id: "bang-gia-tu-dong",
    title: "Đồng bộ bảng giá Phú Quý, BTMH, Ancarat toàn chuỗi",
    desc: "Giá hãng đổi là toàn bộ quầy bán và màn hình TV tại các chi nhánh cập nhật tức thì.",
    src: "/images/screens/gia-bac-thi-truong.jpg?v=3",
    alt: "Bảng giá bạc và vàng thị trường tự động cập nhật theo thời gian thực",
    href: "/chuc-nang#gia-vang",
  },
  {
    id: "so-do-ket-cam",
    title: "Quản lý két & khay giữ tài sản cầm đồ theo chi nhánh",
    desc: "Biết chính xác từng món trang sức, đá quý cầm cố đang cất ở két nào, ngăn nào tại chi nhánh.",
    src: "/images/screens/o-luu-tai-san.jpg?v=3",
    alt: "Sơ đồ két lưu giữ tài sản cầm đồ theo từng ngăn và chi nhánh",
    href: "/chuc-nang#kho-tai-san-cam",
  },
  {
    id: "zalo-bao-gia",
    title: "Tự động xuất ảnh bảng giá gửi Zalo & nhắn tin chăm sóc khách hàng",
    desc: "Tự tạo ảnh bảng giá mang thương hiệu tiệm gửi nhóm Zalo và nhắn lịch hẹn giao, nhắc hạn chuộc.",
    src: "/images/screens/zalo-bot-bao-gia.jpg?v=3",
    alt: "Tự động xuất ảnh bảng giá vàng bạc gửi nhóm Zalo và tin nhắn ZNS",
    href: "/chuc-nang#zalo-bot-bao-gia",
  },
  {
    id: "lai-gop-tung-don",
    title: "Tính lời lỗ từng đơn bán & kiểm quỹ theo mệnh giá tiền",
    desc: "Chốt ca đếm tờ tiền mặt khớp sổ quỹ, tính ngay tiền lời thực tế trên mỗi giao dịch mua bán.",
    src: "/images/screens/lai-lo-tung-don.jpg?v=3",
    alt: "Báo cáo lời lỗ trên từng đơn bán vàng bạc và đối soát dòng tiền",
    href: "/chuc-nang#bao-cao",
  },
] as const

const TRUST_ITEMS = [
  { icon: Users, label: "Phân quyền theo vai trò, chi nhánh" },
  { icon: History, label: "Nhật ký thao tác đầy đủ" },
  { icon: ShieldCheck, label: "Dữ liệu mỗi tiệm tách riêng" },
  { icon: Smartphone, label: "Dùng trên máy tính và điện thoại" },
] as const

const PLAN_OPTIONS = PLANS.map((p) => p.name)

/* ---------- Phần đầu: chữ gọn bên trái, ảnh sản phẩm to bên phải ---------- */

function ProductHero({
  onOpenLightbox,
}: {
  onOpenLightbox: (img: { src: string; alt: string; title: string }) => void
}) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
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

  const autoplay = !paused && !reduceMotion

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
        {/* Cột trái: tối đa 4 thành phần, không gắn hộp phụ rườm rà */}
        <div className="min-w-0">
          <p className="sysdark:text-[#D9C189] font-mono text-xs font-medium tracking-[0.08em] text-[#E8D49A] uppercase">
            Kim hoàn · Đá quý · Bạc tích trữ · Cầm đồ
          </p>
          <h1
            className="mt-3 font-semibold tracking-[-0.025em] [text-wrap:balance] text-white"
            style={{
              fontSize: "clamp(1.75rem, 2.5vw, 2.4rem)",
              lineHeight: 1.18,
            }}
          >
            Phần mềm quản lý tiệm vàng bạc, kim hoàn đá quý &amp; đại lý bạc
            tích trữ
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
              Bảng giá · từ 3tr/tháng
            </a>
          </div>
        </div>

        {/* Cột phải: Khung ảnh sản phẩm cỡ lớn (560px - 940px) */}
        <div
          className="w-full lg:w-[clamp(560px,calc((100dvh-220px)*16/10),min(940px,calc(100vw-500px)))]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div className="sysdark:bg-[#111317] overflow-hidden rounded-xl border border-white/20 bg-white shadow-[0_40px_80px_-30px_rgba(0,0,0,0.55)]">
            <div className="sysdark:border-[#1F232A] sysdark:bg-[#16191E] flex items-center justify-between gap-2 border-b border-[#E3E7EE] bg-[#F4F6FA] px-2.5 py-2">
              <div
                role="tablist"
                aria-label="Chức năng sản phẩm"
                className="relative grid min-w-0 flex-1 grid-cols-3 gap-1 sm:flex sm:justify-start"
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
              <button
                type="button"
                onClick={() =>
                  onOpenLightbox({
                    src: active.src,
                    alt: active.alt,
                    title: active.title,
                  })
                }
                className="sysdark:border-[#262B33] sysdark:bg-[#111317] sysdark:text-[#C9CED8] hidden shrink-0 items-center gap-1.5 rounded-md border border-[#D6DCE6] bg-white px-2.5 py-1 text-xs font-medium text-[#1F2937] transition-colors hover:border-[#8A6516] sm:inline-flex"
                aria-label={`Phóng to ảnh: ${active.title}`}
              >
                <Maximize2 className="h-3.5 w-3.5 text-[#8A6516]" />
                <span>Phóng to</span>
              </button>
            </div>

            <div
              id="vb-slide-panel"
              role="tabpanel"
              aria-roledescription="slide"
              aria-label={`${index + 1} / ${count}: ${active.title}`}
              className="relative cursor-zoom-in overflow-hidden bg-[#F8FAFC]"
              onClick={() =>
                onOpenLightbox({
                  src: active.src,
                  alt: active.alt,
                  title: active.title,
                })
              }
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
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onOpenLightbox({
                    src: active.src,
                    alt: active.alt,
                    title: active.title,
                  })
                }}
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
            <Link
              href={FEATURES_HREF}
              className="inline-flex shrink-0 items-center justify-center gap-1.5 text-sm font-semibold text-white hover:underline"
            >
              Xem chi tiết từng chức năng
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

/* ---------- Trang ---------- */

export function VbLandingPage() {
  const [plan, setPlan] = useState<string>("Professional")
  const [showPhone, setShowPhone] = useState(false)
  const [copied, setCopied] = useState(false)
  const [lightbox, setLightbox] = useState<{
    src: string
    alt: string
    title: string
  } | null>(null)

  const zaloMessage = `Chào Goplus, mình muốn đặt lịch demo ERP Vàng Bạc (quan tâm gói ${plan}).`

  const handleCopyZalo = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(zaloMessage).catch(() => {})
      setCopied(true)
      window.setTimeout(() => setCopied(false), 4000)
    }
  }

  useEffect(() => {
    if (!lightbox) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLightbox(null)
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener("keydown", onKey)
    }
  }, [lightbox])

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
            <ProductHero onOpenLightbox={setLightbox} />
          </div>
        </section>

        {/* Phần dưới đầu trang: chung một khung kẻ dọc */}
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
                  { v: "3 nguồn", l: "giá Phú Quý, BTMH, Ancarat" },
                  { v: "100%", l: "đơn mua bán giữ nguyên giá lúc chốt" },
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

          {/* ---------- 3 mô hình kinh doanh mục tiêu (khung kẻ sọc nối thẳng GuideRails, kèm giá gói) ---------- */}
          <section
            id="mo-hinh"
            aria-labelledby="mo-hinh-title"
            className="border-vb-border bg-vb-bg relative scroll-mt-20 border-b pt-14 lg:pt-20"
          >
            <RailMarks />
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl">
                <h2
                  id="mo-hinh-title"
                  className="text-vb-fg font-semibold tracking-[-0.02em] [text-wrap:balance]"
                  style={HEADING_STYLE}
                >
                  Dùng cho đại lý bạc tích trữ, tiệm vàng kim hoàn đá quý &amp;
                  hiệu cầm đồ
                </h2>
              </div>
            </div>

            <div className="border-vb-border mx-auto mt-10 max-w-6xl border-t">
              <div className="divide-vb-border grid grid-cols-1 divide-y lg:grid-cols-3 lg:divide-x lg:divide-y-0">
                {DEALER_MODELS.map((m, idx) => {
                  const isFeatured = idx === 1
                  return (
                    <article
                      key={m.id}
                      className={`relative flex flex-col justify-between p-6 sm:p-8 ${
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
                          {m.badge}
                        </p>
                        <h3 className="text-vb-fg mt-2 text-lg leading-snug font-bold">
                          {m.title}
                        </h3>
                        <p className="text-vb-muted mt-2 text-sm leading-relaxed">
                          {m.desc}
                        </p>

                        <ul className="border-vb-border text-vb-body mt-5 space-y-2 border-t pt-4 text-sm">
                          {m.highlights.map((h) => (
                            <li key={h} className="flex items-start gap-2">
                              <Check className="text-vb-gold-deep sysdark:text-vb-gold-bright mt-0.5 h-4 w-4 shrink-0" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="border-vb-border mt-6 flex items-center justify-between gap-2 border-t pt-4">
                        <div>
                          <span className="text-vb-subtle block font-mono text-[11px] uppercase">
                            Gói {m.planName}
                          </span>
                          <span className="tnum text-vb-fg text-base font-bold">
                            {m.priceTag}
                          </span>
                        </div>
                        <a
                          href="#bang-gia"
                          onClick={() => setPlan(m.planName)}
                          className="text-vb-gold-deep sysdark:text-vb-gold-bright inline-flex items-center gap-1 text-xs font-semibold hover:underline"
                        >
                          Xem gói
                          <ArrowRight className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          </section>

          {/* ---------- Giao diện thực tế: Lưới 2 cột hình ảnh cỡ lớn nối thẳng GuideRails ---------- */}
          <section
            id="chuc-nang"
            aria-labelledby="chuc-nang-title"
            className="bg-vb-bg relative scroll-mt-20 pt-16 pb-10 lg:pt-20 lg:pb-12"
          >
            <RailMarks />
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div className="max-w-2xl">
                  <h2
                    id="chuc-nang-title"
                    className="text-vb-fg font-semibold tracking-[-0.02em] [text-wrap:balance]"
                    style={HEADING_STYLE}
                  >
                    Giao diện thực tế tại quầy bán, thu mua &amp; két tài sản
                  </h2>
                </div>
                <Link
                  href={FEATURES_HREF}
                  className="text-vb-gold-deep sysdark:text-vb-gold-bright sysdark:hover:text-white inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold transition-colors hover:text-[#4A360B]"
                >
                  Xem đầy đủ 11 nghiệp vụ
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="border-vb-border mx-auto mt-10 max-w-6xl border-y">
              <div className="bg-vb-border grid grid-cols-1 gap-px md:grid-cols-2">
                {VISUAL_SHOWCASE.map((item) => (
                  <article
                    key={item.id}
                    className="bg-vb-bg flex flex-col justify-between p-5 sm:p-7"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setLightbox({
                          src: item.src,
                          alt: item.alt,
                          title: item.title,
                        })
                      }
                      className="border-vb-border-strong group relative block aspect-[16/10] w-full cursor-zoom-in overflow-hidden rounded-lg border bg-white text-left shadow-xs"
                      aria-label={`Phóng to ảnh: ${item.title}`}
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={960}
                        height={600}
                        sizes="(min-width: 768px) 520px, 100vw"
                        className="h-full w-full object-contain object-center transition-transform duration-300 group-hover:scale-[1.015]"
                      />
                    </button>

                    <div className="mt-4">
                      <h3 className="text-vb-fg text-base font-bold">
                        <Link
                          href={item.href}
                          className="hover:text-vb-gold-deep sysdark:hover:text-vb-gold-bright transition-colors"
                        >
                          {item.title}
                        </Link>
                      </h3>
                      <p className="text-vb-muted mt-1 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
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
                <h2
                  className="text-vb-fg font-semibold tracking-[-0.02em] [text-wrap:balance]"
                  style={HEADING_STYLE}
                >
                  Bảng giá theo mảng kinh doanh
                </h2>
                <p className="text-vb-muted mt-2.5 text-sm sm:text-base">
                  Dùng thử miễn phí 14 ngày tại quầy · Chọn đúng phân hệ nhà mình
                  đang bán, không ép mua kèm mảng không dùng.
                </p>
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

          {/* ---------- Hỏi đáp ---------- */}
          <section
            id="hoi-dap"
            aria-labelledby="hoi-dap-title"
            className="border-vb-border relative scroll-mt-24 border-t py-12 lg:py-16"
          >
            <RailMarks />
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
              <div className="lg:col-span-4">
                <h2
                  id="hoi-dap-title"
                  className="text-vb-fg font-semibold tracking-[-0.02em] [text-wrap:balance]"
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
                    className="font-semibold tracking-[-0.02em] [text-wrap:balance]"
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
                        Đã sao chép sẵn câu nhắn gói {plan}, bạn chỉ cần dán
                        vào khung chat Zalo!
                      </p>
                    )}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-[auto_1fr]">
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
                    doanh (bạc, vàng, đá quý, cầm đồ) để hẹn lịch nhanh hơn.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.title}
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[100] flex flex-col bg-[#0B1220]/92 p-3 backdrop-blur-md sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 pb-3 text-white"
          >
            <p className="min-w-0 truncate text-sm font-semibold sm:text-base">
              {lightbox.title}
            </p>
            <button
              type="button"
              onClick={() => setLightbox(null)}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="Đóng"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div
            onClick={(e) => e.stopPropagation()}
            className="mx-auto flex flex-1 items-center justify-center overflow-auto overscroll-contain rounded-xl border border-white/15 bg-white p-1 shadow-2xl"
          >
            <Image
              src={lightbox.src}
              alt={lightbox.alt}
              width={1440}
              height={900}
              sizes="100vw"
              className="block max-h-[82dvh] w-auto max-w-full object-contain"
            />
          </div>
        </div>
      )}

      <VbFooter />
    </div>
  )
}
