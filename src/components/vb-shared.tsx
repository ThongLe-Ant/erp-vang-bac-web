import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeftRight,
  ArrowRight,
  Bell,
  Check,
  FileCheck2,
  FileSpreadsheet,
  Gem,
  HandCoins,
  MessageCircle,
  RefreshCw,
  Scale,
  ShoppingCart,
  Tag,
  TicketPercent,
  TrendingUp,
  Vault,
  Wallet,
} from "lucide-react"

import type React from "react"

import { VbHeaderShell } from "./vb-header-shell"
import { VbMobileMenu } from "./vb-mobile-menu"
import { VB_THEME_SCRIPT, VbThemeToggle } from "./vb-theme-toggle"

/* ============================================================================
 * Phần dùng chung giữa trang chủ ERP Vàng Bạc và trang chức năng: liên hệ,
 * bảng giá, nội dung từng chức năng, nền khối lập phương, đầu trang, chân trang.
 * ========================================================================== */

export const FEATURES_HREF = "/chuc-nang"

/** Khách bấm "Đặt lịch demo" đều về khối liên hệ , chưa có bản demo tự cấp. */
export const BOOK_DEMO_HREF = "/#dang-ky"

export const CONTACT = {
  phone: "0396870644",
  phoneLabel: "0396 870 644",
  zalo: "https://zalo.me/0396870644",
  email: "thongproleminh@gmail.com",
}

export const GOPLUS_URL = "https://goplus.vn"

export const HEADING_STYLE = {
  fontSize: "clamp(1.65rem, 2.6vw, 2.25rem)",
  lineHeight: 1.15,
} as const

/* ---------- Nền khối lập phương ----------
 * Cùng hình học với nền trang đăng nhập (AuthBrandPattern trong core), nhưng vẽ
 * theo đơn vị pixel thay vì viewBox 600×900 co giãn: dùng thẳng component của
 * core trên dải ngang toàn màn hình thì khối bị phóng to gấp đôi, lệch hẳn với
 * trang đăng nhập. */

const CUBE_A = 72
const CUBE_DX = (CUBE_A * Math.sqrt(3)) / 2
const CUBE_DY = CUBE_A / 2
const CUBE_TILE_W = CUBE_A * Math.sqrt(3)
const CUBE_TILE_H = CUBE_A * 3

const r2 = (n: number) => Math.round(n * 100) / 100

function cubeAt(cx: number, cy: number) {
  const [t, b, up, dn] = [
    cy - CUBE_A,
    cy + CUBE_A,
    cy - CUBE_DY,
    cy + CUBE_DY,
  ].map(r2)
  const [l, rt, x, y] = [cx - CUBE_DX, cx + CUBE_DX, cx, cy].map(r2)
  return (
    `M${x} ${t}L${rt} ${up}L${rt} ${dn}L${x} ${b}L${l} ${dn}L${l} ${up}Z` +
    `M${x} ${t}L${x} ${y}M${x} ${y}L${l} ${dn}M${x} ${y}L${rt} ${dn}`
  )
}

function cubeTopAt(cx: number, cy: number) {
  const [t, up, y] = [cy - CUBE_A, cy - CUBE_DY, cy].map(r2)
  const [l, rt, x] = [cx - CUBE_DX, cx + CUBE_DX, cx].map(r2)
  return `M${x} ${t}L${rt} ${up}L${x} ${y}L${l} ${up}Z`
}

const CUBE_TILE_CENTERS: Array<[number, number]> = [
  [0, 0],
  [CUBE_TILE_W, 0],
  [0, CUBE_TILE_H],
  [CUBE_TILE_W, CUBE_TILE_H],
  [CUBE_TILE_W / 2, CUBE_TILE_H / 2],
  [CUBE_TILE_W / 2, -CUBE_TILE_H / 2],
  [CUBE_TILE_W / 2, CUBE_TILE_H * 1.5],
]

// [cột, nửa hàng, độ đậm] , nằm đúng lưới tổ ong nên mặt tô khớp khối vẽ sẵn.
const CUBE_HIGHLIGHTS: Array<[number, number, number]> = [
  [1, 1, 0.14],
  [2, 1, 0.12],
  [3, 2, 0.18],
  [5, 1, 0.1],
  [7, 4, 0.11],
  [9, 2, 0.15],
  [11, 1, 0.16],
  [12, 2, 0.11],
  [13, 3, 0.17],
]

type CubeStep = "R" | "L" | "CR" | "CL" | "ZR" | "ZL" | "UR"

const CUBE_STEP_DELTAS: Record<CubeStep, Array<[number, number]>> = {
  R: [
    [1, 1],
    [0, 2],
  ],
  L: [
    [-1, 1],
    [0, 2],
  ],
  CR: [
    [0, 2],
    [1, 1],
  ],
  CL: [
    [0, 2],
    [-1, 1],
  ],
  ZR: [
    [1, 1],
    [1, -1],
  ],
  ZL: [
    [-1, 1],
    [-1, -1],
  ],
  UR: [
    [0, -2],
    [1, -1],
  ],
}

/**
 * Dựng đường gấp khúc bám khít các cạnh của lưới khối lập phương bắt đầu từ
 * đỉnh trên T(m, h) với (m + h) chẵn. Mỗi bước đi qua 2 cạnh dài đúng CUBE_A.
 */
function cubeTrailAt(m: number, h: number, steps: CubeStep[]) {
  let u = m
  let v = 3 * h - 2
  let d = `M${r2(u * CUBE_DX)} ${r2(v * CUBE_DY)}`
  for (const step of steps) {
    for (const [du, dv] of CUBE_STEP_DELTAS[step]) {
      u += du
      v += dv
      d += `L${r2(u * CUBE_DX)} ${r2(v * CUBE_DY)}`
    }
  }
  return d
}

// Các đường sáng chạy xen kẽ qua khe giữa các khối từ trái sang phải.
const CUBE_LIGHT_TRAILS: Array<{
  m: number
  h: number
  steps: CubeStep[]
  dur: string
  delay: string
}> = [
  {
    m: 0,
    h: 0,
    steps: ["R", "ZR", "CR", "ZR", "R", "UR", "ZR"],
    dur: "8.5s",
    delay: "0s",
  },
  {
    m: 1,
    h: 3,
    steps: ["ZR", "UR", "ZR", "R", "ZR", "CR", "ZR"],
    dur: "10s",
    delay: "-3.2s",
  },
  {
    m: 4,
    h: 0,
    steps: ["CR", "ZR", "R", "ZR", "UR", "ZR", "R", "ZR"],
    dur: "9.2s",
    delay: "-1.6s",
  },
  {
    m: 7,
    h: 1,
    steps: ["ZR", "R", "CL", "R", "ZR", "UR", "ZR", "CR"],
    dur: "7.8s",
    delay: "-4.8s",
  },
  {
    m: 11,
    h: 1,
    steps: ["R", "ZR", "CR", "L", "R", "ZR", "UR", "ZR"],
    dur: "8.8s",
    delay: "-2.4s",
  },
  {
    m: 15,
    h: 0,
    steps: ["CR", "ZR", "R", "ZL", "R", "ZR", "CR"],
    dur: "9.6s",
    delay: "-6.1s",
  },
  {
    m: 18,
    h: 2,
    steps: ["ZR", "UR", "ZR", "R", "CR", "ZR", "UR"],
    dur: "8.2s",
    delay: "-1.1s",
  },
]

const CUBE_TRAIL_PATHS = CUBE_LIGHT_TRAILS.map((trail, i) => ({
  key: `trail-${i}`,
  d: cubeTrailAt(trail.m, trail.h, trail.steps),
  dur: trail.dur,
  delay: trail.delay,
}))

/** `id` phải khác nhau khi một trang có nhiều nền khối. `light`: khối vàng
 * mờ trên nền sáng, không phủ tối phía dưới. */
export function CubeBackdrop({
  id = "vb-cubes",
  light = false,
}: {
  id?: string
  light?: boolean
}) {
  return (
    <svg
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${
        light
          ? "sysdark:text-[#E8C97A] sysdark:opacity-35 text-[#9C7218] opacity-45"
          : "sysdark:text-[#E8C97A] sysdark:opacity-80 text-[#F5D98B] opacity-90"
      }`}
    >
      <style>{`
        @keyframes vb-cube-beam {
          from { stroke-dashoffset: 1200; }
          to { stroke-dashoffset: 0; }
        }
        .vb-cube-beam {
          animation: vb-cube-beam var(--vb-dur, 9s) linear infinite;
          animation-delay: var(--vb-delay, 0s);
        }
        @media (prefers-reduced-motion: reduce) {
          .vb-cube-beam {
            animation: none;
            stroke-dashoffset: 420;
          }
        }
      `}</style>
      <defs>
        <pattern
          id={id}
          width={CUBE_TILE_W}
          height={CUBE_TILE_H}
          patternUnits="userSpaceOnUse"
        >
          {CUBE_TILE_CENTERS.map(([cx, cy]) => (
            <path
              key={`${cx}-${cy}`}
              d={cubeAt(cx, cy)}
              fill="none"
              stroke="currentColor"
              strokeOpacity={light ? "0.16" : "0.22"}
              strokeWidth="1.25"
            />
          ))}
        </pattern>
        <radialGradient id={`${id}-glow`} cx="0.78" cy="0.08" r="0.9">
          <stop offset="0" stopColor="#FFD978" stopOpacity="0.26" />
          <stop offset="0.5" stopColor="#C99A2E" stopOpacity="0.1" />
          <stop offset="1" stopColor="#C99A2E" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-beam`} x1="0" y1="0" x2="1" y2="0.4">
          <stop offset="0" stopColor="#F5D06F" stopOpacity="0.35" />
          <stop offset="0.5" stopColor="#FFF7DC" stopOpacity="0.95" />
          <stop offset="1" stopColor="#E5B84B" stopOpacity="0.45" />
        </linearGradient>
        <linearGradient id={`${id}-foot`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.55" stopColor="#120B02" stopOpacity="0" />
          <stop offset="1" stopColor="#120B02" stopOpacity="0.28" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
      <g fill="currentColor">
        {CUBE_HIGHLIGHTS.map(([col, half, opacity]) => (
          <path
            key={`${col}-${half}`}
            d={cubeTopAt(
              col * CUBE_TILE_W + (half % 2 ? CUBE_TILE_W / 2 : 0),
              (half * CUBE_TILE_H) / 2,
            )}
            fillOpacity={opacity}
          />
        ))}
      </g>
      {/* Các đường sáng chạy xen kẽ theo cạnh các khối lập phương */}
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        {CUBE_TRAIL_PATHS.map((t) => (
          <path
            key={`${t.key}-base`}
            d={t.d}
            stroke="currentColor"
            strokeOpacity={light ? "0.24" : "0.34"}
            strokeWidth="1.6"
          />
        ))}
        {CUBE_TRAIL_PATHS.map((t) => (
          <g key={t.key}>
            {!light && (
              <path
                d={t.d}
                pathLength={1200}
                stroke="#F5C857"
                strokeOpacity="0.35"
                strokeWidth="5"
                strokeDasharray="220 980"
                className="vb-cube-beam"
                style={
                  {
                    "--vb-dur": t.dur,
                    "--vb-delay": t.delay,
                  } as React.CSSProperties
                }
              />
            )}
            <path
              d={t.d}
              pathLength={1200}
              stroke={light ? "currentColor" : `url(#${id}-beam)`}
              strokeOpacity={light ? "0.65" : "1"}
              strokeWidth={light ? "2" : "2.25"}
              strokeDasharray="220 980"
              className="vb-cube-beam"
              style={
                {
                  "--vb-dur": t.dur,
                  "--vb-delay": t.delay,
                } as React.CSSProperties
              }
            />
          </g>
        ))}
      </g>
      <rect width="100%" height="100%" fill={`url(#${id}-glow)`} />
      {!light && <rect width="100%" height="100%" fill={`url(#${id}-foot)`} />}
    </svg>
  )
}

/** Hai đường kẻ dọc ở mép khung nội dung, chạy suốt phần dưới trang để các
 * mục nối thành một khung. Cha phải là `relative`. Chỉ hiện trên màn rộng. */
export function GuideRails() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-10 hidden lg:block"
    >
      <div className="sysdark:border-[#1A1D23] mx-auto h-full max-w-6xl border-x border-[#DCE2EC]" />
    </div>
  )
}

/** Dấu "+" ở hai mép khung nội dung, đặt ngay trên đường kẻ ngang đầu một mục
 * — chỗ đường kẻ dọc (GuideRails) cắt đường kẻ ngang. Cha phải là `relative`. */
export function RailMarks() {
  const mark =
    "absolute -top-[6px] h-[11px] w-[11px] text-[#7F8EAA] sysdark:text-[#4B5363]"
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 z-20 hidden lg:block"
    >
      <div className="relative mx-auto max-w-6xl">
        {["-left-[5.5px]", "-right-[5.5px]"].map((side) => (
          <svg key={side} viewBox="0 0 11 11" className={`${mark} ${side}`}>
            <path
              d="M5.5 0v11M0 5.5h11"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
        ))}
      </div>
    </div>
  )
}

/** Nhãn nhỏ đầu mục kiểu kỹ thuật: số thứ tự trong ngoặc vuông + chữ mono. */
export function Eyebrow({
  index,
  children,
  className = "",
}: {
  index?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <p
      className={`sysdark:text-[#E3C77A] inline-flex items-center gap-2 font-mono text-xs font-medium tracking-[0.08em] text-[#8A6516] uppercase ${className}`}
    >
      {index ? (
        <span className="sysdark:text-[#4B5363] text-[#9AA8C2]">[{index}]</span>
      ) : (
        <span className="h-1.5 w-1.5 bg-current" />
      )}
      {children}
    </p>
  )
}

/** Quầng vàng rất nhạt phía sau một khối cần nhấn (ảnh, bảng giá, liên hệ).
 * Cha phải là `relative isolate`. */
export function SoftGlow({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`sysdark:bg-[radial-gradient(closest-side,rgba(218,165,52,0.28),transparent)] pointer-events-none absolute -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(201,154,46,0.22),transparent)] blur-2xl ${className || "-inset-x-12 -inset-y-16"}`}
    />
  )
}

/** Ba mô hình kinh doanh mục tiêu mà hệ thống phục vụ trực tiếp. */
export const DEALER_MODELS = [
  {
    id: "dai-ly-bac-tich-tru",
    badge: "Đại lý thương hiệu",
    title: "Đại lý bạc tích trữ Phú Quý, Bảo Tín Mạnh Hải, Ancarat",
    desc: "Bán bạc tích trữ theo giá niêm yết thời gian thực và nối đơn trực tiếp với hãng.",
    highlights: [
      "Tự cập nhật giá Phú Quý, BTMH, Ancarat",
      "Khoá giá chống trượt ngay lúc lên đơn",
      "Quản lý hợp đồng hẹn giao & mua lại",
      "Đặt đơn lấy chiết khấu, khớp phiên bán lại",
    ],
  },
  {
    id: "chuoi-vang-bac-truyen-thong",
    badge: "Kim hoàn truyền thống",
    title: "Chuỗi tiệm vàng bạc trang sức truyền thống",
    desc: "Bán trang sức theo tuổi vàng, thu mua vàng cũ đổi mới và quản lý kho đa chi nhánh.",
    highlights: [
      "Tính tiền theo tuổi vàng + công + đá",
      "Thu mua cân trừ đá, trừ dơ, đổi bù",
      "In tem kim hoàn 2 cánh chuẩn Thông tư 22",
      "Điều chuyển, kiểm kê giữa kho và quầy",
    ],
  },
  {
    id: "hieu-cam-do",
    badge: "Cầm đồ & tài sản",
    title: "Chuỗi hiệu cầm đồ vàng bạc",
    desc: "Quản lý hợp đồng cầm, tính lãi phí theo ngày thực tế và kiểm soát két tài sản.",
    highlights: [
      "Tính lãi phí theo ngày, thu lãi từng kỳ",
      "Định giá món cầm theo bảng giá tuổi vàng",
      "Sơ đồ ô két lưu giữ tài sản từng chi nhánh",
      "Tự động nhắn Zalo nhắc khách trước hạn chuộc",
    ],
  },
] as const

export const SCOPES = [
  {
    id: "bac-phu-quy",
    name: "Bạc Phú Quý",
    desc: "Bán và thu mua bạc Phú Quý, giá tự cập nhật theo Phú Quý, đặt hàng và bán lại về Phú Quý.",
  },
  {
    id: "vang-phu-quy",
    name: "Vàng Phú Quý",
    desc: "Bán và thu mua vàng Phú Quý theo giá Phú Quý, cùng quầy với bạc.",
  },
  {
    id: "vang-truyen-thong",
    name: "Vàng truyền thống",
    desc: "Bảng giá theo tuổi vàng, tính theo cân + công + đá, thu mua trừ đá trừ dơ, đổi bù, in tem.",
  },
  {
    id: "cam-do",
    name: "Cầm đồ",
    desc: "Hợp đồng cầm, gói lãi phí, nhắc hạn chuộc qua Zalo, kho tài sản cầm, thanh lý.",
  },
] as const

export const PLANS = [
  {
    id: "standard",
    name: "Standard",
    price: "3.000.000đ",
    unit: "/tháng",
    note: "Bạc Phú Quý, chọn thêm một mảng vàng.",
    items: ["Bạc Phú Quý", "Chọn 1: Vàng Phú Quý hoặc Vàng truyền thống"],
    cta: "Chọn gói Standard",
    tone: "plain",
  },
  {
    id: "professional",
    name: "Professional",
    price: "5.000.000đ",
    unit: "/tháng",
    note: "Đủ cả vàng Phú Quý lẫn vàng truyền thống.",
    items: ["Bạc Phú Quý", "Vàng Phú Quý", "Vàng truyền thống"],
    cta: "Chọn gói Professional",
    tone: "featured",
  },
  {
    id: "business",
    name: "Business",
    price: "7.000.000đ",
    unit: "/tháng",
    note: "Thêm cầm đồ trên cùng một hệ thống.",
    items: ["Bạc Phú Quý", "Vàng Phú Quý", "Vàng truyền thống", "Cầm đồ"],
    cta: "Chọn gói Business",
    tone: "plain",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Từ 10.000.000đ",
    unit: "/tháng",
    note: "Toàn bộ hệ thống, tuỳ chỉnh theo yêu cầu riêng.",
    items: [
      "Toàn bộ phạm vi của hệ thống",
      "Tuỳ chỉnh theo yêu cầu riêng của doanh nghiệp",
    ],
    cta: "Liên hệ báo giá",
    tone: "dark",
  },
] as const

/** Bảng so sánh ở /chuc-nang: mỗi dòng một phạm vi, mỗi cột một gói (cùng
 * thứ tự PLANS). `true` = có, `false` = không, chuỗi = ghi chú. */
export const PLAN_MATRIX: ReadonlyArray<{
  label: string
  cells: ReadonlyArray<boolean | string>
}> = [
  { label: "Bạc Phú Quý", cells: [true, true, true, true] },
  { label: "Vàng Phú Quý", cells: ["Chọn 1 trong 2", true, true, true] },
  { label: "Vàng truyền thống", cells: ["Chọn 1 trong 2", true, true, true] },
  { label: "Cầm đồ", cells: [false, false, true, true] },
  { label: "Tuỳ chỉnh theo yêu cầu riêng", cells: [false, false, false, true] },
]

/* ---------- Chức năng theo từng bước ----------
 * Dùng cho dòng thời gian ở trang chủ và các mục ở trang /chuc-nang.
 * Chỉ ghi điều app làm thật (đối chiếu repo vinhhoa 14/10/2026). `scope` =
 * phạm vi trong bảng giá mà chức năng thuộc về; không có = gói nào cũng có.
 * `src: null` = chưa có ảnh chụp (ảnh phải chụp trên DB dữ liệu mẫu, KHÔNG
 * chụp từ app đang nối DB thật của khách). */

export const FEATURE_MODULES = [
  {
    id: "gia-vang",
    icon: TrendingUp,
    name: "Giá vàng bạc",
    when: "Mở cửa",
    brief: "Giá theo nguồn về, mọi quầy đổi cùng lúc.",
    title: "Giá về là mọi quầy đổi theo, đơn đã chốt giữ nguyên giá",
    text: "Giá mua vào, bán ra tự cập nhật từ nguồn: Phú Quý, Bảo Tín Mạnh Hải, Ancarat, kèm giá bạc thế giới để so. Mọi quầy, mọi chi nhánh dùng chung một bảng giá.",
    points: [
      { t: "Tự cập nhật theo nguồn", d: "Không phải hô nhau sửa bảng giá." },
      {
        t: "Chốt giá chống trượt giá",
        d: "Khóa cứng đơn giá tại thời điểm bấm tạo đơn.",
      },
      { t: "Lịch sử từng lần đổi", d: "Tra lại giá ở bất kỳ thời điểm nào." },
      {
        t: "So với giá thế giới",
        d: "Biểu đồ giá tiệm cạnh giá bạc thế giới.",
      },
    ],
    example:
      "9:15 nguồn tăng bạc miếng thêm 10.000đ/lượng → cả 5 chi nhánh hiện giá mới; đơn chốt lúc 9:10 vẫn tính giá cũ.",
    src: "/images/screens/gia-bac-thi-truong.jpg?v=3",
    alt: "Biểu đồ giá bán, giá mua của tiệm so với giá bạc thế giới",
  },
  {
    id: "ban-hang",
    icon: ShoppingCart,
    name: "Bán hàng POS",
    when: "Có khách",
    scope: "Bạc & vàng Phú Quý",
    brief: "Bán và thu mua chung một quầy, chống trượt giá.",
    title: "Bán và thu mua trên cùng một màn hình quầy, chống trượt giá",
    text: "Chọn sản phẩm, giá lấy thẳng từ bảng giá đang chạy và khóa giá ngay khi chốt đơn. Đổi qua lại giữa bán hàng và thu mua ngay trên giỏ hàng, in phiếu tại chỗ.",
    points: [
      {
        t: "Chống trượt giá lúc biến động",
        d: "Cảnh báo ngay nếu bảng giá nhảy khi đang thanh toán.",
      },
      { t: "Thu mua ngay tại quầy", d: "Bấm sang Thu mua, không mở màn khác." },
      { t: "Khuyến mãi, voucher", d: "Áp chương trình ưu đãi ngay trên đơn." },
      { t: "QR chuyển khoản theo đơn", d: "Điền sẵn số tiền và nội dung." },
    ],
    example:
      "Khách mua 2 lượng bạc miếng, quét QR trả 2.360.000đ → ngân hàng báo có, đơn tự chuyển sang đã thanh toán.",
    src: "/images/screens/quay-phu-quy.jpg?v=3",
    alt: "Quầy bán bạc và vàng Phú Quý: thẻ sản phẩm có giá mua, giá bán theo bảng giá; giỏ hàng chuyển qua lại Bán hàng, Thu mua",
  },
  {
    id: "don-hop-dong",
    icon: FileCheck2,
    name: "Đơn & hợp đồng vật chất",
    when: "Có khách",
    scope: "Bạc & vàng Phú Quý",
    brief: "Quản lý hợp đồng hẹn giao, mua lại hợp đồng.",
    title: "Quản lý đơn hàng, hợp đồng vật chất và mua lại hợp đồng",
    text: "Theo dõi toàn bộ vòng đời đơn giao ngay và hợp đồng hẹn ngày nhận hàng: tiền cọc, phần chưa thanh toán, xuất trả hàng từng phần hoặc mua lại hợp đồng bạc Phú Quý ngay trên đơn gốc.",
    points: [
      {
        t: "Hợp đồng vật chất hẹn giao",
        d: "Theo dõi số hợp đồng, tiền đặt cọc và ngày hẹn trả.",
      },
      {
        t: "Mua lại hợp đồng tại chỗ",
        d: "Thu mua lại toàn phần hoặc một phần theo giá niêm yết mới.",
      },
      {
        t: "Tự động gạch nợ ngân hàng",
        d: "Chuyển khoản về đúng nội dung là đơn tự cập nhật đã thu.",
      },
      {
        t: "In hợp đồng & phiếu thu",
        d: "In đầy đủ bộ chứng từ giao khách và lưu quầy.",
      },
    ],
    example:
      "Khách đặt hợp đồng 10 lượng bạc hẹn giao tuần sau, nay giá tăng muốn bán lại ngay → bấm Mua lại hợp đồng để tất toán và tính chênh lệch tự động.",
    src: "/images/screens/don-ban-thu-tien.jpg?v=3",
    alt: "Danh sách đơn bán hàng và hợp đồng vật chất: tiền cọc, phần chưa thanh toán và tổng tiền từng đơn",
  },
  {
    id: "dat-hang-phu-quy",
    icon: RefreshCw,
    name: "Đặt đơn Phú Quý",
    when: "Trong ngày",
    scope: "Bạc & vàng Phú Quý",
    brief: "Kết nối hệ thống đơn hàng Phú Quý, tính chiết khấu.",
    title: "Đặt đơn kết nối trực tiếp hệ thống Phú Quý, rõ biên lời từng đơn",
    text: "Đẩy đơn đặt hàng trực tiếp từ phần mềm lên hệ thống Phú Quý hoặc đồng bộ đơn về tự động. Hiển thị rõ mã đơn Phú Quý, chiết khấu đại lý và biên lời so với đơn bán của khách.",
    points: [
      {
        t: "Kết nối trực tiếp Phú Quý",
        d: "Lên đơn đặt hàng không cần gõ lại trên cổng đại lý.",
      },
      {
        t: "Nối thẳng đơn bán (SO)",
        d: "Biết ngay đơn đặt Phú Quý nào phục vụ hợp đồng khách nào.",
      },
      {
        t: "Chiết khấu & biên lời",
        d: "Tự tính chiết khấu đại lý và % biên lời trên từng đơn.",
      },
      {
        t: "Đồng bộ trạng thái giao",
        d: "Theo dõi đang giao, đã nhận hàng, hoàn thành theo thời gian thực.",
      },
    ],
    example:
      "Khách chốt đơn SO-AU-261014-0002 → tạo đơn đặt Phú Quý YD2610140918K ngay trên phần mềm, hiện rõ chiết khấu 5.633.000đ và biên lời +2,45%.",
    src: "/images/screens/dat-hang-phu-quy.jpg?v=3",
    alt: "Danh sách đơn đặt hàng kết nối hệ thống Phú Quý: mã đơn Phú Quý, chiết khấu đại lý và biên lời từng đơn",
  },
  {
    id: "ban-lai-phu-quy",
    icon: ArrowLeftRight,
    name: "Bán lại Phú Quý",
    when: "Trong ngày",
    scope: "Bạc & vàng Phú Quý",
    brief: "Bán lại đơn thu mua & khớp phiên bán lại Phú Quý.",
    title: "Bán lại đơn hàng về Phú Quý, khớp tự động theo từng phiên",
    text: "Gom các đơn thu mua bạc và vàng Phú Quý từ khách để đẩy lệnh bán lại về hệ thống Phú Quý. Tự động tách và khớp số lượng bán lại một phần hoặc bán lại đủ, kèm mã đơn BYD từ Phú Quý.",
    points: [
      {
        t: "Theo dõi đơn chờ bán lại",
        d: "Liệt kê rõ đơn thu mua nào chưa bán lại hoặc mới bán một phần.",
      },
      {
        t: "Khớp phiên bán lại tự động",
        d: "Gom nhiều đơn thu mua vào một phiên bán lại lên Phú Quý.",
      },
      {
        t: "Bán lại theo nhu cầu",
        d: "Chủ động xả tồn kho về Phú Quý khi giá đạt mức kỳ vọng.",
      },
      {
        t: "Lưu mã đơn BYD đối soát",
        d: "Ghi nhận mã BYD và số tiền thực nhận từ Phú Quý.",
      },
    ],
    example:
      "Trong ca sáng thu mua 5 đơn bạc thỏi từ khách → bấm Tạo bán lại, hệ thống khớp phiên và trả về mã BYD2610140912K kèm giá trị chốt.",
    src: "/images/screens/mua-ban-lai-phu-quy.jpg?v=3",
    alt: "Màn hình quản lý bán lại Phú Quý: trạng thái đã bán lại đủ, bán lại một phần và mã đơn bán lại BYD",
  },
  {
    id: "vang-truyen-thong",
    icon: Gem,
    name: "Vàng truyền thống",
    when: "Có khách",
    scope: "Vàng truyền thống",
    brief: "Tính theo tuổi vàng, cân, công và đá.",
    title: "Bán vàng theo tuổi, tính đủ cân, công và đá",
    text: "Tiệm khai bảng giá theo tuổi vàng. Quầy chọn món, phần mềm tính tiền theo khối lượng × giá tuổi + tiền công + tiền đá, rồi in tem dán sản phẩm.",
    points: [
      {
        t: "Bảng giá tuổi vàng",
        d: "24K, 18K, 610… mỗi tuổi một giá mua, giá bán.",
      },
      {
        t: "Chỉ, lượng hay gram",
        d: "Nhập theo đơn vị quen dùng, tự quy đổi.",
      },
      { t: "Công và đá tách riêng", d: "Hoá đơn ghi rõ từng khoản." },
      { t: "In tem kim hoàn", d: "In thẳng ra máy in tem của tiệm." },
    ],
    example:
      "Nhẫn 18K nặng 1,25 chỉ, giá tuổi 18K 6.200.000đ/chỉ, tiền công 300.000đ → khách trả 8.050.000đ.",
    src: "/images/screens/ban-vang-tuoi.jpg?v=3",
    alt: "Quầy vàng truyền thống: mỗi món ghi khối lượng × giá tuổi vàng, cộng tiền công, tiền đá",
  },
  {
    id: "in-tem-kim-hoan",
    icon: Tag,
    name: "In tem kim hoàn",
    when: "Nhập hàng",
    scope: "Vàng truyền thống",
    brief: "In tem trang sức 2 cánh TSPL/ZPL qua Web Serial.",
    title:
      "In tem trang sức 2 cánh đúng chuẩn tiệm vàng, không cần cài phần mềm rời",
    text: "Tự động sinh mã lệnh TSPL/ZPL cho tem kim hoàn 2 cánh (40mm × 10mm × 2) với đầy đủ mã vạch, tổng trọng lượng, trọng lượng đá, trọng lượng vàng, tiền công và tên tiệm.",
    points: [
      {
        t: "Xem trước trực quan 2 cánh",
        d: "Kiểm tra bố cục cánh mã vạch và cánh thông tin trước khi in.",
      },
      {
        t: "In trực tiếp qua Web Serial",
        d: "Bấm gửi thẳng ra máy in mã vạch hoặc tải file .prn.",
      },
      {
        t: "Chuẩn thông tư tem nhãn",
        d: "Đủ KL tổng, KL đá, KL vàng thuần, tiền công và tuổi vàng.",
      },
      {
        t: "Hỗ trợ cả TSPL và ZPL",
        d: "Tương thích hầu hết máy in tem kim hoàn phổ biến.",
      },
    ],
    example:
      "Chọn Kiềng cưới 9999 chạm rồng phượng 5 chỉ, công 1.200.000đ → bấm Gửi máy in, tem 2 cánh ra ngay trong 1 giây.",
    src: "/images/screens/in-tem-kim-hoan.jpg?v=3",
    alt: "Màn hình in tem kim hoàn TSPL/ZPL với khung xem trước tem trang sức 2 cánh",
  },
  {
    id: "thu-mua",
    icon: Scale,
    name: "Thu mua",
    when: "Có khách",
    scope: "Vàng truyền thống",
    brief: "Cân trừ đá, trừ dơ; đổi hàng thì cấn trừ.",
    title: "Thu mua cân trừ đá, trừ dơ; đổi hàng chỉ trả phần chênh",
    text: "Cân tổng, nhập khối lượng đá và dơ, phần mềm tự ra khối lượng tính tiền theo giá thu của tuổi vàng. Khách đổi cũ lấy mới thì cấn trừ trên cùng một đơn.",
    points: [
      { t: "Trừ đá, trừ dơ", d: "Ghi đủ cân tổng, đá, dơ, còn lại." },
      { t: "Giá thu theo tuổi", d: "Lấy từ bảng giá tuổi vàng đang chạy." },
      { t: "Đổi bù cấn trừ", d: "Bán mới, thu cũ, khách trả phần chênh." },
      {
        t: "Phiếu vàng nguyên liệu",
        d: "Vàng thu về có phiếu, vào kho riêng.",
      },
    ],
    example:
      "Khách bán nhẫn 18K cân 2,35 chỉ, đá 0,12 chỉ → tính 2,23 chỉ × giá thu 18K; đổi lấy dây mới thì chỉ trả phần chênh.",
    src: "/images/screens/thu-mua-can.jpg?v=3",
    alt: "Giỏ thu mua ba món: dây chuyền 18K cân 3,25 chỉ, trừ đá 0,18 chỉ, trừ dơ 0,04 chỉ, ra tiền trả khách",
  },
  {
    id: "cam-do",
    icon: HandCoins,
    name: "Cầm đồ",
    when: "Có khách",
    scope: "Cầm đồ",
    brief: "Tính lãi phí, nhắc hạn chuộc qua Zalo.",
    title: "Hợp đồng cầm đồ: đúng lãi phí, tự nhắc hạn chuộc",
    text: "Nhận tài sản, giao tiền cầm theo gói lãi phí và hạn mức cầm của tiệm. Đóng lãi, gia hạn, chuộc đều tính theo số ngày thực tế, làm tròn lên 1.000đ.",
    points: [
      { t: "Gói lãi phí", d: "Khai theo %/tháng, tính ra từng ngày." },
      {
        t: "Hạn mức cầm",
        d: "Theo giá trị tài sản; vượt mức cần người duyệt.",
      },
      { t: "Nhắc hạn chuộc", d: "Tự gửi tin Zalo cho khách trước hạn." },
      { t: "Quá hạn, thanh lý", d: "Phí quá hạn tự cộng, thanh lý có phiếu." },
    ],
    example:
      "Cầm 15.000.000đ, gói 1,5%/tháng, chuộc sau 20 ngày → lãi phí 150.000đ; còn 3 ngày tới hạn khách đã nhận tin Zalo nhắc.",
    src: "/images/screens/hop-dong-cam.jpg?v=3",
    alt: "Danh sách hợp đồng cầm đồ: tiền cầm, hạn chuộc, hợp đồng đang cầm và quá hạn",
  },
  {
    id: "kho-tai-san-cam",
    icon: Vault,
    name: "Kho tài sản cầm",
    when: "Trong ngày",
    scope: "Cầm đồ",
    brief: "Biết từng món cầm đang nằm ở ô nào.",
    title: "Biết từng món cầm đang nằm ở ô nào, ai đang giữ",
    text: "Tài sản nhận cầm được xếp vào ô lưu trong kho của chi nhánh. Điều chuyển, kiểm kê đều có phiếu, nên lệch một món là chỉ ra được món nào.",
    points: [
      { t: "Ô lưu tài sản", d: "Mỗi món một vị trí, tra theo hợp đồng." },
      { t: "Điều chuyển có phiếu", d: "Gửi đi, nhận về, có người xác nhận." },
      { t: "Kiểm kê tài sản cầm", d: "Đếm thực tế, so với sổ, ra phần lệch." },
      { t: "Lịch sử ra vào", d: "Món nào vào, ra, chuyển lúc nào." },
    ],
    example:
      "Kiểm kê cuối tuần đếm được 311/312 món → phiếu kiểm kê chỉ ra món còn lại đang trên đường chuyển sang chi nhánh 2.",
    src: "/images/screens/o-luu-tai-san.jpg?v=3",
    alt: "Sơ đồ ô lưu tài sản cầm theo khu, ngăn: mỗi ô ghi số món đang giữ trên sức chứa",
  },
  {
    id: "dieu-chuyen-kho",
    icon: ArrowLeftRight,
    name: "Tồn kho & điều chuyển",
    when: "Trong ngày",
    brief: "Nhập xuất, điều chuyển liên chi nhánh & kiểm kê kho.",
    title: "Điều chuyển hàng hoá giữa các chi nhánh và quầy trưng bày chặt chẽ",
    text: "Quản lý tồn kho theo từng chi nhánh, kho chính và quầy trưng bày. Mọi lệnh điều chuyển từ kho tổng xuống chi nhánh hoặc xuất ra khay trưng bày đều có phiếu duyệt hai đầu và kiểm kê đối chiếu.",
    points: [
      {
        t: "Điều chuyển liên chi nhánh",
        d: "Theo dõi kho xuất, kho nhập, người tạo và trạng thái duyệt.",
      },
      {
        t: "Tách kho chính & quầy trưng bày",
        d: "Biết chính xác số lượng đang nằm trong két hay ngoài quầy.",
      },
      {
        t: "Kiểm kê kho định kỳ",
        d: "Chốt tồn sổ sách, nhập tồn thực tế và tự tính chênh lệch.",
      },
      {
        t: "Thẻ kho chi tiết từng món",
        d: "Truy vết mọi lần nhập, xuất, chuyển của từng mã sản phẩm.",
      },
    ],
    example:
      "Kho chính Trụ sở lập phiếu PDC-261014-0002 chuyển 4 mã bạc thỏi sang Chi nhánh 2 → thủ kho Chi nhánh 2 xác nhận nhận đủ mới cộng tồn.",
    src: "/images/screens/dieu-chuyen-kiem-ke-kho.jpg?v=3",
    alt: "Danh sách phiếu điều chuyển kho giữa Kho chính Trụ sở, Quầy trưng bày và Kho Chi nhánh 2",
  },
  {
    id: "voucher-khuyen-mai",
    icon: TicketPercent,
    name: "Voucher & khuyến mãi",
    when: "Chiến dịch",
    brief: "Phát hành mã ưu đãi, đo doanh thu trước và sau KM.",
    title: "Quản lý chương trình khuyến mãi, phát hành voucher và đo hiệu quả",
    text: "Thiết lập các đợt khuyến mãi theo bậc giá trị đơn hàng hoặc tặng mã voucher cho khách hàng thân thiết. Hệ thống tự động kiểm tra điều kiện áp mã tại quầy và thống kê doanh thu phát sinh.",
    points: [
      {
        t: "Đợt phát hành linh hoạt",
        d: "Tạo chiến dịch theo dịp lễ, khai trương hoặc tri ân khách VIP.",
      },
      {
        t: "Theo dõi trạng thái từng mã",
        d: "Biết ngay mã nào đã sử dụng, chưa sử dụng hay hết hạn.",
      },
      {
        t: "Gắn thẳng với đơn phát sinh",
        d: "Truy ngược từ mã voucher sang đơn bán hàng đã áp dụng.",
      },
      {
        t: "Đo lường doanh thu KM",
        d: "Thống kê tổng giá trị đơn trước và sau khi dùng voucher.",
      },
    ],
    example:
      "Đợt Tuần lễ Vàng & Bạc Tháng 10 phát hành 12 mã, 6 mã đã dùng giúp kéo doanh thu đơn hàng từ 412,5 triệu lên 586,8 triệu đồng.",
    src: "/images/screens/voucher-khuyen-mai.jpg?v=3",
    alt: "Màn hình quản lý kho voucher và đợt phát hành khuyến mãi kèm thống kê doanh thu",
  },
  {
    id: "zalo-bot-bao-gia",
    icon: MessageCircle,
    name: "Bot báo giá nhóm Zalo",
    when: "Tự động 24/7",
    brief: "Tự sinh ảnh bảng giá sắc nét & bắn vào các nhóm Zalo.",
    title: "Giá vừa đổi là Bot tự vẽ ảnh bảng giá và gửi vào mọi nhóm Zalo",
    text: "Kết nối trực tiếp với nguồn giá của tiệm: mỗi khi giá mua bán thay đổi, hệ thống tự động dựng ảnh bảng giá sắc nét kèm hotline đặt hàng và bắn đồng loạt vào các nhóm Zalo sỉ/lẻ mà không cần nhân viên trực.",
    points: [
      {
        t: "Tự động dựng ảnh bảng giá",
        d: "Ảnh PNG chuẩn nhận diện thương hiệu, rõ giá mua, bán và biến động.",
      },
      {
        t: "Chạy ngầm trên máy chủ",
        d: "Quét giá định kỳ 25 giây/lần, không cần mở máy tính.",
      },
      {
        t: "Chống spam thông minh",
        d: "Chỉ phát tin khi giá niêm yết thực sự có thay đổi.",
      },
      {
        t: "Broadcast nhiều nhóm cùng lúc",
        d: "Gửi đồng thời vào hàng chục nhóm khách sỉ, khách VIP.",
      },
    ],
    example:
      "14:35 bạc thỏi 999 tăng 18.000đ/lượng → trong 3 giây cả 6 nhóm Zalo (hơn 3.000 thành viên) nhận ngay ảnh bảng giá mới kèm số hotline chốt đơn.",
    src: "/images/screens/zalo-bot-bao-gia.jpg?v=3",
    alt: "Bảng điều khiển Zalo Bot tự động sinh ảnh bảng giá vàng bạc và gửi vào các nhóm Zalo",
  },
  {
    id: "zalo-oa-zns",
    icon: Bell,
    name: "Tin nhắn Zalo OA (ZNS)",
    when: "Tự động",
    brief: "Gửi ZNS xác nhận đơn, báo có hàng & hoá đơn MISA.",
    title: "Chăm sóc khách hàng tự động qua Zalo OA chính thức của tiệm",
    text: "Mỗi khi khách chốt đơn đặt cọc, khi hàng từ Phú Quý về tới kho tiệm, hoặc khi kế toán phát hành hoá đơn điện tử MISA, hệ thống tự động gửi tin nhắn ZNS chuẩn mẫu tới Zalo của khách.",
    points: [
      {
        t: "Xác nhận đơn & hợp đồng",
        d: "Gửi ngay mã đơn, số tiền cọc, ngày hẹn giao kèm link tra cứu.",
      },
      {
        t: "Báo có hàng mời khách nhận",
        d: "Khi kho nhập hàng về, tự động nhắn khách mang hợp đồng ra nhận.",
      },
      {
        t: "Thông báo hoá đơn MISA",
        d: "Gửi mã tra cứu hoá đơn điện tử ngay khi phát hành.",
      },
      {
        t: "Nhật ký gửi minh bạch",
        d: "Theo dõi trạng thái đã gửi, chờ gửi hoặc lỗi theo từng số điện thoại.",
      },
    ],
    example:
      "Khách hàng vừa chốt hợp đồng HD2610140005 → điện thoại khách nhận ngay tin Zalo OA xác nhận đơn và lịch hẹn giao ngày 19/10/2026.",
    src: "/images/screens/zalo-oa-zns.jpg?v=3",
    alt: "Nhật ký gửi tin nhắn Zalo OA (ZNS) tự động: xác nhận đơn hàng, mời khách nhận hàng và thông báo hoá đơn MISA",
  },
  {
    id: "kho-quy",
    icon: Wallet,
    name: "Kho & sổ quỹ",
    when: "Cuối ngày",
    brief: "Kiểm quỹ, đối chiếu ngân hàng báo có.",
    title: "Tiền và hàng khớp đến từng đồng, từng chỉ",
    text: "Kho có phiếu nhập, xuất, chuyển, kiểm kê; quỹ có phiếu thu, chi và kiểm kê tiền mặt theo chi nhánh. Mọi con số nối về đơn hàng nên lệch ở đâu là chỉ ra ở đó.",
    points: [
      { t: "Nhập, xuất, chuyển, kiểm kê", d: "Tồn kho trừ theo từng đơn." },
      { t: "Kiểm kê tiền mặt", d: "Đếm quỹ theo mệnh giá, từng chi nhánh." },
      { t: "Ngân hàng báo có", d: "Tiền về là đơn tự gạch, không dò sao kê." },
      { t: "Thu chi có duyệt", d: "Phiếu chi qua người duyệt mới ghi sổ." },
    ],
    example:
      "Cuối ngày kiểm quỹ chi nhánh 1 thiếu 200.000đ → sổ quỹ chỉ ra một phiếu chi đã lập nhưng chưa ai duyệt.",
    src: "/images/screens/kiem-quy-menh-gia.jpg?v=3",
    alt: "Phiếu kiểm kê tiền mặt: đếm theo từng mệnh giá, so với sổ quỹ, chênh lệch 0",
  },
  {
    id: "bao-cao",
    icon: FileSpreadsheet,
    name: "Báo cáo & MISA",
    when: "Cuối tháng",
    brief: "Lãi lỗ từng đơn, tồn kho; chứng từ sang MISA.",
    title: "Báo cáo đủ cho chủ tiệm, chứng từ tự sang MISA",
    text: "Lãi lỗ theo từng đơn, doanh thu, tồn kho, công nợ khách và nhà cung cấp. Kế toán vẫn làm trên MISA AMIS như cũ, chỉ không phải gõ lại số bán hàng.",
    points: [
      { t: "Lãi lỗ từng đơn", d: "Theo giá vốn thật của từng món." },
      { t: "Tồn kho, nhập xuất", d: "Tổng hợp tồn, bảng kê nhập xuất." },
      { t: "Công nợ", d: "Khách hàng và nhà cung cấp, theo từng đơn." },
      { t: "Đồng bộ MISA AMIS", d: "Đối soát theo mã, không đẩy trùng." },
    ],
    example:
      "Cuối tháng kế toán mở MISA đã thấy đủ chứng từ bán hàng của 5 chi nhánh, mã nào lệch thì danh sách đối soát chỉ ra.",
    src: "/images/screens/lai-lo-tung-don.jpg?v=3",
    alt: "Báo cáo lãi lỗ theo từng đơn: doanh thu, giá vốn, lãi và tỉ lệ lãi",
  },
] as const

/* ---------- Hỏi đáp ----------
 * Hiện trên trang chính và khai lại trong dữ liệu có cấu trúc (FAQPage) ,
 * hai chỗ phải cùng một nội dung nên dùng chung mảng này. Từ vựng cầm đồ:
 * tiền cầm, lãi phí, chuộc, gia hạn , KHÔNG dùng vay, dư nợ. */
export const FAQ = [
  {
    q: "ERP Vàng Bạc phù hợp với những mô hình tiệm và đại lý nào?",
    a: "Phần mềm được thiết kế chuyên biệt cho 3 mô hình: (1) Chuỗi đại lý phân phối bạc tích trữ và vàng thương hiệu của Phú Quý, Bảo Tín Mạnh Hải, Ancarat; (2) Chuỗi tiệm vàng bạc trang sức truyền thống nhiều chi nhánh; và (3) Hiệu cầm đồ vàng bạc. Các chi nhánh dùng chung một hệ thống, phân quyền chặt theo từng quầy và từng kho.",
  },
  {
    q: "Phần mềm hỗ trợ chuỗi đại lý bán bạc tích trữ Phú Quý, Bảo Tín Mạnh Hải, Ancarat như thế nào?",
    a: "Hệ thống tự động cập nhật bảng giá mua vào – bán ra từ Phú Quý, Bảo Tín Mạnh Hải, Ancarat và giá bạc thế giới; khoá giá chống trượt giá ngay giây lên đơn; quản lý đơn bán giao ngay và hợp đồng bạc tích trữ hẹn ngày nhận hàng; kết nối đặt đơn trực tiếp lên hệ thống Phú Quý để theo dõi chiết khấu đại lý; quản lý đơn mua lại hợp đồng bạc của khách và gom nhiều đơn vào phiên bán lại chốt lời; đồng thời có Zalo Bot tự vẽ bảng giá gửi vào các nhóm Zalo sỉ/lẻ mỗi khi giá đổi.",
  },
  {
    q: "Chuỗi tiệm vừa bán bạc tích trữ thương hiệu, vừa bán vàng trang sức truyền thống có dùng chung được không?",
    a: "Được. Trên cùng một hệ thống, quầy bạc tích trữ bán theo mã sản phẩm niêm yết (bạc thỏi, bạc miếng 1 lượng, 5 lượng, 10 lượng, 1kg), còn quầy vàng truyền thống bán theo công thức khối lượng × giá tuổi vàng (9999, 24K, 18K, 14K, 10K) + tiền công + tiền đá, kèm cân thu mua trừ đá trừ dơ và in tem kim hoàn 2 cánh chuẩn Thông tư 22.",
  },
  {
    q: "Giá vàng bạc lấy từ đâu? Đơn đã chốt có bị trượt giá khi thị trường biến động không?",
    a: "Giá tự cập nhật từ nguồn Phú Quý, Bảo Tín Mạnh Hải, Ancarat và áp xuống mọi quầy, mọi chi nhánh. Khi thu ngân mở giỏ hàng hoặc chốt đơn, hệ thống khoá cứng đơn giá trong phiên giao dịch nên bảng giá có nhảy sau đó đơn đã chốt vẫn giữ nguyên giá. Toàn bộ lịch sử đổi giá đều được lưu lại để đối chiếu.",
  },
  {
    q: "Giá thuê phần mềm ERP Vàng Bạc bao nhiêu một tháng?",
    a: "Gói Standard 3.000.000đ/tháng, Professional 5.000.000đ/tháng (đầy đủ Bạc tích trữ, Vàng thương hiệu và Vàng truyền thống), Business 7.000.000đ/tháng (thêm phân hệ Cầm đồ), và Enterprise từ 10.000.000đ/tháng cho chuỗi lớn cần tuỳ chỉnh theo yêu cầu riêng.",
  },
  {
    q: "Thu mua vàng cũ có cân trừ đá, trừ dơ và đổi bù trên cùng một đơn được không?",
    a: "Được. Quầy nhập cân tổng, khối lượng đá và dơ; phần mềm tự trừ để ra khối lượng vàng thuần và nhân với giá thu mua theo tuổi vàng. Nếu khách đổi vàng cũ lấy trang sức mới hoặc bạc tích trữ, phần mềm cấn trừ trực tiếp trên một phiếu và chỉ thu/chi phần tiền chênh lệch.",
  },
  {
    q: "Cầm đồ tính lãi phí và quản lý kho tài sản cầm thế nào?",
    a: "Tính theo gói lãi phí tiệm khai (%/tháng quy đổi ra số ngày thực tế, làm tròn 1.000đ), hỗ trợ phí giữ hộ và phí quá hạn. Mỗi món cầm được gắn vào ô két lưu giữ của từng chi nhánh, có phiếu điều chuyển, kiểm kê định kỳ và tự động nhắn Zalo nhắc khách trước ngày tới hạn chuộc.",
  },
  {
    q: "Phần mềm có đồng bộ với kế toán MISA AMIS và bảo mật dữ liệu riêng cho từng chuỗi không?",
    a: "Có. Phần mềm đồng bộ danh mục và chứng từ bán hàng, thu chi sang MISA AMIS kèm bảng đối soát chống đẩy trùng. Mỗi chuỗi đại lý chạy trên một ứng dụng và một cơ sở dữ liệu độc lập, phân quyền theo vai trò – chi nhánh và ghi nhật ký toàn bộ thao tác.",
  },
] as const

export const NAV_LINKS = [
  { href: "/#san-pham", label: "Sản phẩm" },
  { href: FEATURES_HREF, label: "Chức năng" },
  { href: "/#bang-gia", label: "Bảng giá" },
  { href: "/#hoi-dap", label: "Hỏi đáp" },
] as const

/** Chữ thương hiệu: dấu Goplus + "ERP Vàng Bạc". Chưa có logo riêng. */
export function VbWordmark({ onDark = false }: { onDark?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <Image
        src="/images/logos/go-mark.png"
        alt=""
        width={28}
        height={28}
        className="h-7 w-7 object-contain"
      />
      <span
        className={`text-[15px] font-semibold tracking-[-0.01em] ${onDark ? "text-white" : "text-vb-fg"}`}
      >
        ERP Vàng Bạc
      </span>
    </span>
  )
}

/** `wide`: trang chủ có khung ảnh rộng 1440px, logo thẳng mép với khung đó;
 * các trang khác dùng khung 6xl như phần nội dung. */
export function VbHeader({
  active,
  wide = false,
}: {
  active?: string
  wide?: boolean
}) {
  return (
    <VbHeaderShell wide={wide}>
      {/* Chạy ngay khi đọc tới đây, trước khi phần thân trang hiện ra. */}
      <script dangerouslySetInnerHTML={{ __html: VB_THEME_SCRIPT }} />
      <Link
        href="/"
        aria-label="ERP Vàng Bạc , trang chủ"
        className="sysdark:focus-visible:outline-[#E3C77A] flex shrink-0 items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8A6516]"
      >
        <VbWordmark />
      </Link>

      <nav
        aria-label="Điều hướng trang giới thiệu"
        className="sysdark:text-[#C9CED8] hidden items-center gap-7 text-sm font-medium text-[#3B4555] md:flex"
      >
        {NAV_LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            aria-current={active === l.label ? "page" : undefined}
            className="sysdark:hover:text-white sysdark:aria-[current=page]:text-[#E3C77A] aria-[current=page]:text-vb-gold hover:text-[#4A360B] aria-[current=page]:font-semibold"
          >
            {l.label}
          </Link>
        ))}
      </nav>

      <div className="flex shrink-0 items-center gap-2">
        <VbThemeToggle className="hidden md:inline-flex" />
        <Link
          href={BOOK_DEMO_HREF}
          className="sysdark:bg-[#C99A2E] sysdark:text-[#0B1220] sysdark:hover:bg-[#D9B24E] inline-flex items-center rounded-full bg-[#0F1B2D] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1C2B44]"
        >
          Đặt lịch demo
        </Link>
        <VbMobileMenu links={NAV_LINKS} active={active} />
      </div>
    </VbHeaderShell>
  )
}

const BOOK_DEMO_POINTS = [
  "Demo trên dữ liệu mẫu: giá, bán, thu mua, cầm đồ",
  "Tư vấn chọn gói theo mô hình tiệm",
  "Cài đặt và đào tạo tận nơi khi triển khai",
] as const

/** Dải mời đặt lịch demo , đặt giữa các trang để khách luôn thấy lối vào. */
export function BookDemoBand() {
  return (
    <section className="sysdark:bg-[#110C04] sysdark:bg-[radial-gradient(ellipse_75%_90%_at_82%_0%,rgba(218,165,52,0.38),transparent_70%)] relative overflow-hidden bg-[#241906] bg-[radial-gradient(ellipse_75%_90%_at_82%_0%,rgba(218,165,52,0.45),transparent_70%),linear-gradient(135deg,#241906_0%,#4A350C_52%,#261B07_100%)] py-12 lg:py-14">
      <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-7 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="font-mono text-xs font-medium tracking-[0.08em] text-[#E3C77A] uppercase">
            Đặt lịch demo miễn phí
          </p>
          <h2
            style={HEADING_STYLE}
            className="mt-3 font-medium tracking-[-0.02em] [text-wrap:balance] text-white"
          >
            Xem phần mềm chạy đúng theo mô hình tiệm của bạn
          </h2>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-[#E4E7EE] sm:flex-row sm:flex-wrap sm:gap-x-6">
            {BOOK_DEMO_POINTS.map((p) => (
              <li key={p} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#E3C77A]" />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <a
          href={CONTACT.zalo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[48px] shrink-0 items-center gap-2 rounded-full bg-[#C99A2E] px-7 py-3 text-[15px] font-semibold text-[#0B1220] shadow-sm transition-colors hover:bg-[#D9B24E]"
        >
          Nhắn Zalo đặt lịch
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  )
}

export function VbFooter() {
  return (
    <footer className="sysdark:border-t border-vb-border sysdark:bg-[#08090B] text-vb-subtle bg-[#1F1505] py-8 text-xs text-[#D9CEB8]">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <span>
          © 2026 ERP Vàng Bạc, một sản phẩm của{" "}
          <a
            href={GOPLUS_URL}
            className="font-semibold text-[#E3C77A] hover:text-white"
          >
            Goplus
          </a>
        </span>
        <div className="flex flex-wrap items-center gap-4">
          <a href={CONTACT.zalo} className="hover:text-white">
            Nhắn Zalo
          </a>
          <a href={`mailto:${CONTACT.email}`} className="hover:text-white">
            {CONTACT.email}
          </a>
          <Link href={FEATURES_HREF} className="hover:text-white">
            Chức năng
          </Link>
          <a href={GOPLUS_URL} className="hover:text-white">
            Hệ sinh thái Goplus
          </a>
        </div>
      </div>
    </footer>
  )
}
