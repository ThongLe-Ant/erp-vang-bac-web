import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check, ImageIcon, Minus } from "lucide-react"

import { VbFeaturesNav } from "./vb-features-nav"
import {
  BookDemoBand,
  Eyebrow,
  FEATURE_MODULES,
  GuideRails,
  HEADING_STYLE,
  PLANS,
  PLAN_ADDONS,
  PLAN_MATRIX,
  RailMarks,
  SoftGlow,
  VbFooter,
  VbHeader,
} from "./vb-shared"

/* ============================================================================
 * Trang chức năng ERP Vàng Bạc: đầu trang kiến trúc hiển thị H1 rõ ràng cho
 * người đọc & bộ máy tìm kiếm, mỗi chức năng một mục (chữ và ảnh so le), cuối
 * trang là bảng so sánh theo gói đọc từ PLAN_MATRIX (cùng nguồn với PLANS).
 * ========================================================================== */

const GENERATION_COMPARE = [
  {
    criteria: "Nền tảng & truy cập từ xa",
    legacy: "Cài cục bộ 1 máy Windows tại quầy; hỏng ổ cứng dễ mất sổ, khó xem lãi lỗ từ xa",
    genericPos: "Web / App đa nền tảng nhưng dùng chung hạ tầng đa ngành",
    goerp: "Web Cloud thời gian thực trên điện thoại/PC; CSDL độc lập từng doanh nghiệp/chuỗi",
  },
  {
    criteria: "Vàng truyền thống & tem Thông tư 22",
    legacy: "Có tính theo tuổi & in tem, nhưng giao diện cũ, phụ thuộc cài driver thủ công",
    genericPos: "Thường chỉ bán theo mã sẵn, thiếu công thức tuổi vàng & cân trừ đá trừ dơ",
    goerp: "Đủ công thức tuổi vàng + tiền công + đá, cân thu đổi trừ đá dơ & in tem 2 cánh TT22",
  },
  {
    criteria: "Đại lý Bạc tích trữ (Phú Quý, BTMH, Ancarat)",
    legacy: "Không có đồng bộ giá hãng, không nối đơn cổng hãng & không có khóa giá đơn",
    genericPos: "Không hỗ trợ bảng giá nhảy nhiều nhịp/ngày & hợp đồng hẹn giao từng phần",
    goerp: "Đồng bộ giá đa nguồn, khóa giá POS chống trượt, sổ cọc hẹn giao & đẩy đơn Phú Quý",
  },
  {
    criteria: "Báo giá nhóm Zalo & chăm sóc khách",
    legacy: "Nhân viên tự sửa ảnh/gõ tay gửi từng nhóm mỗi lần giá đổi",
    genericPos: "Không có công cụ xuất ảnh bảng giá tự động theo nhịp thị trường",
    goerp: "Tự xuất ảnh bảng giá mang tên tiệm gửi nhóm Zalo & gửi tin ZNS qua Zalo OA",
  },
  {
    criteria: "Nghiệp vụ Cầm đồ & sơ đồ két",
    legacy: "Thường bán rời thành phần mềm riêng, tách dữ liệu sổ quỹ",
    genericPos: "Không hỗ trợ định giá tuổi vàng, tính lãi ngày & sơ đồ két – ngăn – khay",
    goerp: "Tích hợp liền mạch trên cùng sổ quỹ (chọn trong Business hoặc bật Add-on +500k)",
  },
  {
    criteria: "Kết nối kế toán MISA AMIS & đa chi nhánh",
    legacy: "Xuất Excel thủ công, khó gom chứng từ nhiều chi nhánh",
    genericPos: "Xuất hóa đơn cơ bản, thiếu đối soát đặc thù thu mua vàng cũ & điều chuyển kho vàng",
    goerp: "Đồng bộ 2 chiều MISA AMIS chống đẩy trùng (Add-on +600k / có sẵn Enterprise) & điều chuyển liên chi nhánh",
  },
] as const

export function VbFeaturesPage() {
  return (
    <div className="bg-vb-bg text-vb-fg selection:bg-vb-gold min-h-dvh antialiased selection:text-white">
      <VbHeader active="Chức năng" />

      <div>
        <div aria-hidden="true" className="h-[76px]" />

        {/* ---------- Đầu trang hiển thị H1 rõ ràng, đồng bộ /cam-nang & /ho-so-giai-phap ---------- */}
        <div className="relative overflow-x-clip">
          <GuideRails />
          <section className="border-vb-border relative border-b pt-12 pb-10 lg:pt-16 lg:pb-12">
            <RailMarks />
            <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
              <div className="max-w-2xl">
                <Eyebrow index="01">
                  {FEATURE_MODULES.length} phân hệ nghiệp vụ
                </Eyebrow>
                <h1
                  className="text-vb-fg mt-2.5 font-semibold tracking-[-0.02em] [text-wrap:balance]"
                  style={HEADING_STYLE}
                >
                  Chức năng quản lý đại lý bạc tích trữ, tiệm vàng truyền thống
                  &amp; cầm đồ
                </h1>
                <p className="text-vb-muted mt-2.5 text-sm leading-relaxed">
                  Từ bảng giá tự động Phú Quý, Bảo Tín Mạnh Hải, Ancarat, quầy
                  POS giữ giá chống trượt, in tem Thông tư 22, sơ đồ két cầm đồ
                  đến đối soát sổ quỹ và đồng bộ MISA AMIS.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href="/cam-nang"
                  className="border-vb-border-strong bg-vb-card text-vb-body hover:border-vb-gold hover:text-vb-gold inline-flex shrink-0 items-center gap-1.5 rounded-md border px-4 py-2 font-mono text-xs font-semibold uppercase transition-[border-color,color,transform] duration-150 active:scale-[0.98]"
                >
                  Cẩm nang vận hành
                </Link>
                <Link
                  href="/ho-so-giai-phap"
                  className="border-vb-border-strong bg-vb-card text-vb-body hover:border-vb-gold hover:text-vb-gold inline-flex shrink-0 items-center gap-1.5 rounded-md border px-4 py-2 font-mono text-xs font-semibold uppercase transition-[border-color,color,transform] duration-150 active:scale-[0.98]"
                >
                  Hồ sơ giải pháp (A4 / PDF)
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </section>
        </div>

        {/* ---------- Thanh chọn nhanh, dính dưới đầu trang ---------- */}
        <VbFeaturesNav />

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
                className={`border-vb-border relative scroll-mt-40 border-b py-14 lg:py-16 ${flip ? "bg-vb-surface/50" : "bg-vb-bg"}`}
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
                      <span className="text-vb-subtle font-mono">
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
                      className="text-vb-fg mt-4 font-semibold tracking-[-0.02em] [text-wrap:balance]"
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
                      className={`border-vb-border mt-6 rounded-xl border p-4 ${
                        flip ? "bg-vb-card" : "bg-vb-surface/75"
                      }`}
                    >
                      <p className="tnum text-vb-gold-deep sysdark:text-vb-gold-bright font-mono text-[11px] font-semibold tracking-[0.08em] uppercase">
                        Ví dụ thực tế tại quầy · #
                        {String(i + 1).padStart(2, "0")}
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
                          className="block aspect-[16/10] w-full bg-white object-contain object-center"
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

          {/* ---------- So sánh 3 thế hệ phần mềm ---------- */}
          <section
            id="so-sanh-giai-phap"
            className="border-vb-border bg-vb-surface/40 relative scroll-mt-32 border-b py-14 lg:py-20"
          >
            <RailMarks />
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-3xl text-center">
                <Eyebrow>Góc nhìn chọn hệ thống</Eyebrow>
                <h2
                  className="text-vb-fg mt-2.5 font-semibold tracking-[-0.02em] [text-wrap:balance]"
                  style={HEADING_STYLE}
                >
                  So sánh 3 thế hệ phần mềm cho tiệm vàng &amp; đại lý bạc
                </h2>
                <p className="text-vb-muted mt-2.5 text-sm leading-relaxed sm:text-base">
                  Nhiều tiệm chọn phần mềm đời cũ vì quen tay hoặc POS đa ngành
                  vì giá rẻ, nhưng lại bị đứt gãy ngay khi mở thêm mảng bạc tích
                  trữ, cầm đồ hoặc đa chi nhánh.
                </p>
              </div>

              <div className="border-vb-border bg-vb-bg mt-10 overflow-x-auto rounded-lg border">
                <table className="w-full min-w-[760px] text-left text-sm">
                  <thead>
                    <tr className="bg-vb-surface border-vb-border border-b">
                      <th
                        scope="col"
                        className="text-vb-subtle w-[22%] px-5 py-4 font-mono text-xs font-semibold uppercase"
                      >
                        Tiêu chí vận hành
                      </th>
                      <th
                        scope="col"
                        className="text-vb-body w-[25%] px-4 py-4 font-semibold"
                      >
                        Phần mềm cài máy tính đời cũ
                      </th>
                      <th
                        scope="col"
                        className="text-vb-body w-[25%] px-4 py-4 font-semibold"
                      >
                        POS bán lẻ đa ngành
                      </th>
                      <th
                        scope="col"
                        className="sysdark:bg-[#9C7218] w-[28%] bg-[#8A6516] px-4 py-4 font-semibold text-white"
                      >
                        ERP Vàng Bạc (Goplus)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-vb-border divide-y">
                    {GENERATION_COMPARE.map((row) => (
                      <tr key={row.criteria} className="align-top">
                        <th
                          scope="row"
                          className="text-vb-fg px-5 py-4 font-semibold"
                        >
                          {row.criteria}
                        </th>
                        <td className="text-vb-muted px-4 py-4 text-xs leading-relaxed">
                          {row.legacy}
                        </td>
                        <td className="text-vb-muted px-4 py-4 text-xs leading-relaxed">
                          {row.genericPos}
                        </td>
                        <td className="bg-vb-gold-soft/35 text-vb-fg px-4 py-4 text-xs leading-relaxed font-medium">
                          {row.goerp}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* ---------- So sánh theo gói ---------- */}
          <section
            id="so-sanh"
            className="bg-vb-bg relative scroll-mt-32 py-14 lg:py-20"
          >
            <RailMarks />
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <Eyebrow>So sánh gói</Eyebrow>
                <h2
                  className="text-vb-fg mt-2.5 font-semibold tracking-[-0.02em] [text-wrap:balance]"
                  style={HEADING_STYLE}
                >
                  Phạm vi có trong từng gói
                </h2>
              </div>

              <div className="border-vb-border mt-10 overflow-x-auto rounded-lg border">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead>
                    <tr className="bg-vb-surface">
                      <th
                        scope="col"
                        className="bg-vb-surface text-vb-subtle border-vb-border sticky left-0 z-10 border-r px-5 py-4 font-mono text-xs font-semibold uppercase sm:border-r-0"
                      >
                        Phạm vi
                      </th>
                      {PLANS.map((p) => (
                        <th
                          key={p.id}
                          scope="col"
                          className={`w-[17%] px-3 py-4 text-center ${
                            p.tone === "featured"
                              ? "bg-vb-fg text-vb-bg [&>span]:!text-vb-bg"
                              : ""
                          }`}
                        >
                          <span className="text-vb-fg block font-bold">
                            {p.name}
                          </span>
                          {p.listPrice && (
                            <span className="tnum text-vb-subtle mt-0.5 block font-mono text-[11px] line-through opacity-75">
                              {p.listPrice}
                            </span>
                          )}
                          <span className="tnum text-vb-subtle mt-0.5 block font-mono text-xs font-semibold">
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
                                isFeaturedCol ? "bg-vb-gold-soft/35" : ""
                              }`}
                            >
                              {c === true ? (
                                <Check
                                  aria-label="Có"
                                  className="text-vb-gold mx-auto h-4 w-4"
                                />
                              ) : c === false ? (
                                <Minus
                                  aria-label="Không"
                                  className="text-vb-border-strong mx-auto h-4 w-4"
                                />
                              ) : (
                                <span className="tnum text-vb-subtle font-mono text-xs font-medium">
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

              <div className="border-vb-border bg-vb-surface/70 mt-6 grid grid-cols-1 gap-4 rounded-xl border p-5 md:grid-cols-3">
                {PLAN_ADDONS.map((addon) => (
                  <div
                    key={addon.name}
                    className="border-vb-border bg-vb-card rounded-lg border p-4"
                  >
                    <p className="text-vb-fg text-sm font-semibold">
                      {addon.name}
                    </p>
                    <p className="tnum text-vb-gold-deep sysdark:text-vb-gold-bright mt-1 font-mono text-sm font-bold">
                      {addon.price}
                    </p>
                    <p className="text-vb-muted mt-1.5 text-xs leading-relaxed">
                      {addon.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <BookDemoBand />
        </div>
      </div>

      <VbFooter />
    </div>
  )
}
