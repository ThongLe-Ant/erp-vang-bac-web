"use client"

import Link from "next/link"
import { Check, Minus, Printer } from "lucide-react"

import {
  CONTACT,
  DEALER_MODELS,
  Eyebrow,
  FEATURE_MODULES,
  GuideRails,
  HEADING_STYLE,
  PLANS,
  PLAN_MATRIX,
  RailMarks,
  VbFooter,
  VbHeader,
} from "./vb-shared"

export function VbBrochurePage() {
  return (
    <div className="bg-vb-bg text-vb-fg selection:bg-vb-gold min-h-dvh antialiased selection:text-white print:bg-white print:text-[#0B1220]">
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 12mm;
          }
          body {
            background: #ffffff !important;
            color: #0b1220 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .vb-no-print,
          footer,
          header,
          a[aria-label="Nhắn Zalo đặt lịch demo ERP Vàng Bạc"] {
            display: none !important;
          }
          .vb-print-break {
            break-before: page;
            page-break-before: always;
          }
          .vb-avoid-break {
            break-inside: avoid;
            page-break-inside: avoid;
          }
        }
      `}</style>

      <div className="vb-no-print">
        <VbHeader active="Cẩm nang" />
        <div aria-hidden="true" className="h-[76px]" />
      </div>

      <div className="relative overflow-x-clip">
        <GuideRails />

        {/* ---------- Đầu bản tóm tắt ---------- */}
        <section className="border-vb-border relative border-b pt-10 lg:pt-14 print:pt-0">
          <RailMarks />
          <div className="mx-auto max-w-6xl px-4 pb-8 sm:px-6 lg:px-8 lg:pb-10 print:pb-5">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-2xl">
                <Eyebrow>Tóm tắt giải pháp · vangbac.goplus.vn</Eyebrow>
                <h1
                  className="text-vb-fg mt-2.5 font-semibold tracking-[-0.02em] [text-wrap:balance]"
                  style={HEADING_STYLE}
                >
                  ERP Vàng Bạc - Quản lý đại lý bạc tích trữ, tiệm vàng truyền
                  thống &amp; cầm đồ
                </h1>
                <p className="text-vb-muted mt-2.5 text-sm leading-relaxed">
                  Tự cập nhật giá từ Phú Quý, Bảo Tín Mạnh Hải, Ancarat. Chống
                  trượt giá đơn mua bán tại quầy, thu mua trừ đá trừ dơ, in tem
                  Thông tư 22, hợp đồng cầm đồ, tồn kho nhiều chi nhánh và đồng
                  bộ MISA AMIS trên một hệ thống.
                </p>
              </div>

              <div className="flex flex-col items-start gap-3 lg:items-end">
                <div className="vb-no-print flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="border-vb-border-strong bg-vb-card text-vb-fg hover:border-vb-gold hover:text-vb-gold inline-flex items-center gap-1.5 rounded-md border px-4 py-2 text-xs font-semibold transition-[border-color,color,transform] duration-150 active:scale-[0.98]"
                  >
                    <Printer className="h-3.5 w-3.5" />
                    In / Lưu PDF (A4)
                  </button>
                  <a
                    href={CONTACT.zalo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-vb-fg text-vb-bg inline-flex items-center rounded-md px-4 py-2 text-xs font-semibold transition-[opacity,transform] duration-150 hover:opacity-88 active:scale-[0.98]"
                  >
                    Nhắn Zalo đặt lịch demo
                  </a>
                </div>
                <p className="tnum text-vb-subtle font-mono text-xs">
                  Zalo / ĐT: {CONTACT.phoneLabel} · {CONTACT.email}
                </p>
              </div>
            </div>
          </div>

          {/* Dải thông số kỹ thuật tóm tắt 3 ô ăn khớp GuideRails */}
          <div className="border-vb-border bg-vb-surface/60 mx-auto max-w-6xl border-t">
            <dl className="divide-vb-border grid grid-cols-1 divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0 print:grid-cols-3 print:divide-x print:divide-y-0">
              {[
                {
                  k: "Kiến trúc triển khai",
                  v: "1 Ứng dụng & 1 CSDL độc lập / chuỗi",
                },
                {
                  k: "Nguồn giá tự động",
                  v: "Phú Quý · BTMH · Ancarat · XAG/USD",
                },
                {
                  k: "Pháp lý & kế toán",
                  v: "Tem 2 cánh TT22 · Đồng bộ MISA AMIS",
                },
              ].map((spec) => (
                <div key={spec.k} className="px-6 py-3.5 print:px-4 print:py-2.5">
                  <dt className="text-vb-subtle font-mono text-[10px] font-semibold tracking-[0.08em] uppercase">
                    {spec.k}
                  </dt>
                  <dd className="tnum text-vb-fg mt-0.5 text-xs font-semibold">
                    {spec.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ---------- 01. Ba mô hình áp dụng (cùng lưới kẻ dọc với trang chủ) ---------- */}
        <section className="border-vb-border relative border-b pt-10 lg:pt-12 print:pt-6">
          <RailMarks />
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <Eyebrow index="01">Mô hình áp dụng</Eyebrow>
          </div>

          <div className="border-vb-border mx-auto mt-4 max-w-6xl border-t">
            <div className="divide-vb-border grid grid-cols-1 divide-y lg:grid-cols-3 lg:divide-x lg:divide-y-0 print:grid-cols-3 print:divide-x print:divide-y-0">
              {DEALER_MODELS.map((m, idx) => (
                <div key={m.id} className="vb-avoid-break p-6 print:p-4">
                  <p className="tnum text-vb-gold-deep sysdark:text-vb-gold-bright font-mono text-[11px] font-medium tracking-[0.08em] uppercase">
                    {String(idx + 1).padStart(2, "0")} · {m.badge}
                  </p>
                  <h2 className="text-vb-fg mt-1.5 text-base font-bold">
                    {m.title}
                  </h2>
                  <p className="text-vb-muted mt-1.5 text-xs leading-relaxed">
                    {m.desc}
                  </p>
                  <ul className="border-vb-border text-vb-body mt-4 space-y-1.5 border-t pt-3 text-xs">
                    {m.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2">
                        <span className="text-vb-gold-deep sysdark:text-vb-gold-bright font-mono">
                          —
                        </span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- 02. Danh mục phân hệ nghiệp vụ ---------- */}
        <section className="border-vb-border relative border-b pt-10 lg:pt-12 print:pt-6">
          <RailMarks />
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between gap-4">
              <Eyebrow index="02">Danh mục phân hệ nghiệp vụ trọng tâm</Eyebrow>
              <Link
                href="/chuc-nang"
                className="vb-no-print text-vb-gold-deep sysdark:text-vb-gold-bright text-xs font-semibold hover:underline"
              >
                Xem ảnh màn hình từng phân hệ →
              </Link>
            </div>
          </div>

          <div className="border-vb-border mx-auto mt-4 max-w-6xl border-t">
            <div className="bg-vb-border grid grid-cols-1 gap-px md:grid-cols-2 print:grid-cols-2">
              {FEATURE_MODULES.map((m, i) => (
                <div
                  key={m.id}
                  className="vb-avoid-break bg-vb-bg flex items-start justify-between gap-4 px-6 py-3.5 print:bg-white print:px-4 print:py-2.5"
                >
                  <div className="min-w-0">
                    <p className="text-vb-fg text-sm font-semibold">
                      <span className="tnum text-vb-gold-deep sysdark:text-vb-gold-bright mr-2 font-mono text-xs">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {m.name}
                    </p>
                    <p className="text-vb-muted mt-0.5 text-xs leading-relaxed">
                      {m.brief}
                    </p>
                  </div>
                  <span className="text-vb-subtle shrink-0 font-mono text-[11px]">
                    {"scope" in m ? m.scope : m.when}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- 03. Bảng giá & phạm vi theo gói ---------- */}
        <section className="vb-print-break border-vb-border relative border-b py-10 lg:py-12 print:py-6">
          <RailMarks />
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <Eyebrow index="03">Bảng giá &amp; phạm vi theo gói</Eyebrow>

            <div className="border-vb-border mt-4 overflow-x-auto rounded-lg border">
              <table className="w-full min-w-[600px] text-left text-sm">
                <thead>
                  <tr className="bg-vb-surface">
                    <th
                      scope="col"
                      className="bg-vb-surface text-vb-subtle border-vb-border sticky left-0 z-10 border-r px-5 py-3.5 font-semibold sm:border-r-0"
                    >
                      Phạm vi nghiệp vụ
                    </th>
                    {PLANS.map((p) => (
                      <th
                        key={p.id}
                        scope="col"
                        className={`w-[18%] px-3 py-3.5 text-center ${
                          p.tone === "featured"
                            ? "sysdark:bg-[#9C7218] bg-[#8A6516] [&>span]:!text-white"
                            : ""
                        }`}
                      >
                        <span className="text-vb-fg block font-bold">
                          {p.name}
                        </span>
                        <span className="tnum text-vb-gold-deep sysdark:text-vb-gold-bright mt-0.5 block font-mono text-xs font-semibold">
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
                      className="vb-avoid-break border-vb-border border-t"
                    >
                      <th
                        scope="row"
                        className="bg-vb-bg text-vb-body border-vb-border sticky left-0 z-10 border-r px-5 py-3 font-medium sm:border-r-0 print:bg-white"
                      >
                        {r.label}
                      </th>
                      {r.cells.map((c, i) => {
                        const isFeaturedCol = PLANS[i].tone === "featured"
                        return (
                          <td
                            key={PLANS[i].id}
                            className={`px-3 py-3 text-center ${
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

            <div className="border-vb-border text-vb-muted mt-6 flex flex-col justify-between gap-2 border-t pt-4 text-xs sm:flex-row sm:items-center">
              <span>
                Mỗi chuỗi đại lý vận hành trên một ứng dụng và một cơ sở dữ liệu
                riêng biệt. Cài đặt và đào tạo tận nơi khi triển khai.
              </span>
              <span className="tnum text-vb-fg shrink-0 font-mono font-semibold">
                vangbac.goplus.vn · {CONTACT.phoneLabel}
              </span>
            </div>
          </div>
        </section>
      </div>

      <div className="vb-no-print">
        <VbFooter />
      </div>
    </div>
  )
}
