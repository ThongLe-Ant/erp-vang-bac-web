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
    <div className="sysdark:bg-[#08090B] sysdark:text-[#F5F7FA] sysdark:selection:bg-[#9C7218] min-h-dvh bg-white text-[#0B1220] antialiased selection:bg-[#8A6516] selection:text-white print:bg-white print:text-[#0B1220]">
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
        }
      `}</style>

      <div className="vb-no-print">
        <VbHeader active="Cẩm nang" />
        <div aria-hidden="true" className="h-[76px]" />
      </div>

      <div className="relative overflow-x-clip">
        <GuideRails />

        {/* ---------- Đầu bản tóm tắt ---------- */}
        <section className="sysdark:border-[#1F232A] relative border-b border-[#E3E7EE] pt-10 pb-10 lg:pt-14 lg:pb-12 print:pt-0 print:pb-6">
          <RailMarks />
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-2xl">
                <Eyebrow>Tóm tắt giải pháp · vangbac.goplus.vn</Eyebrow>
                <h1
                  className="sysdark:text-[#F5F7FA] mt-2 font-medium tracking-[-0.02em] [text-wrap:balance] text-[#0B1220]"
                  style={HEADING_STYLE}
                >
                  ERP Vàng Bạc — Quản lý đại lý bạc tích trữ, tiệm vàng truyền
                  thống &amp; cầm đồ
                </h1>
                <p className="sysdark:text-[#A3AAB8] mt-2.5 text-sm leading-relaxed text-[#4B5565]">
                  Tự cập nhật giá từ Phú Quý, Bảo Tín Mạnh Hải, Ancarat. Quản lý
                  bán hàng khoá giá chống trượt, thu mua trừ đá trừ dơ, in tem
                  Thông tư 22, hợp đồng cầm đồ, tồn kho nhiều chi nhánh và đồng
                  bộ MISA AMIS trên một hệ thống.
                </p>
              </div>

              <div className="flex flex-col items-start gap-3 lg:items-end">
                <div className="vb-no-print flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="sysdark:border-[#343A44] sysdark:text-[#E6E9EF] sysdark:hover:border-[#C99A2E] inline-flex items-center gap-1.5 rounded-full border border-[#C9D0DC] px-4 py-2 text-xs font-semibold text-[#111827] transition-colors hover:border-[#8A6516]"
                  >
                    <Printer className="h-3.5 w-3.5" />
                    In / Lưu PDF (A4)
                  </button>
                  <a
                    href={CONTACT.zalo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sysdark:bg-[#C99A2E] sysdark:text-[#0B1220] inline-flex items-center rounded-full bg-[#0F1B2D] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#1C2B44]"
                  >
                    Nhắn Zalo đặt lịch demo
                  </a>
                </div>
                <p className="tnum sysdark:text-[#8B93A3] font-mono text-xs text-[#5B6475]">
                  Zalo / ĐT: {CONTACT.phoneLabel} · {CONTACT.email}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- 01. Ba mô hình áp dụng (cùng lưới kẻ dọc với trang chủ) ---------- */}
        <section className="sysdark:border-[#1F232A] relative border-b border-[#E3E7EE] pt-10 lg:pt-12 print:pt-6">
          <RailMarks />
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <Eyebrow index="01">Mô hình áp dụng</Eyebrow>
          </div>

          <div className="sysdark:border-[#1F232A] mx-auto mt-4 max-w-6xl border-t border-[#E3E7EE]">
            <div className="sysdark:divide-[#1F232A] grid grid-cols-1 divide-y divide-[#E3E7EE] lg:grid-cols-3 lg:divide-x lg:divide-y-0 print:grid-cols-3 print:divide-x print:divide-y-0">
              {DEALER_MODELS.map((m, idx) => (
                <div key={m.id} className="p-6 print:p-4">
                  <p className="sysdark:text-[#7A8292] font-mono text-[11px] font-medium tracking-[0.08em] text-[#6B7485] uppercase">
                    {String(idx + 1).padStart(2, "0")} · {m.badge}
                  </p>
                  <h2 className="sysdark:text-[#F5F7FA] mt-1.5 text-base font-bold text-[#0B1220]">
                    {m.title}
                  </h2>
                  <p className="sysdark:text-[#A3AAB8] mt-1.5 text-xs leading-relaxed text-[#4B5565]">
                    {m.desc}
                  </p>
                  <ul className="sysdark:border-[#1F232A] sysdark:text-[#E6E9EF] mt-4 space-y-1.5 border-t border-[#E3E7EE] pt-3 text-xs text-[#1F2937]">
                    {m.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2">
                        <span className="sysdark:text-[#E3C77A] font-mono text-[#8A6516]">
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

        {/* ---------- 02. Danh mục 16 phân hệ nghiệp vụ ---------- */}
        <section className="sysdark:border-[#1F232A] relative border-b border-[#E3E7EE] pt-10 lg:pt-12 print:pt-6">
          <RailMarks />
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between gap-4">
              <Eyebrow index="02">Danh mục 16 phân hệ nghiệp vụ</Eyebrow>
              <Link
                href="/chuc-nang"
                className="vb-no-print sysdark:text-[#E3C77A] text-xs font-semibold text-[#8A6516] hover:underline"
              >
                Xem ảnh màn hình từng phân hệ →
              </Link>
            </div>
          </div>

          <div className="sysdark:border-[#1F232A] mx-auto mt-4 max-w-6xl border-t border-[#E3E7EE]">
            <div className="sysdark:divide-[#1F232A] grid grid-cols-1 divide-y divide-[#E3E7EE] md:grid-cols-2 md:[&>*:nth-child(odd)]:border-r md:[&>*:nth-child(odd)]:border-[#E3E7EE] sysdark:md:[&>*:nth-child(odd)]:border-[#1F232A] print:grid-cols-2">
              {FEATURE_MODULES.map((m, i) => (
                <div
                  key={m.id}
                  className="flex items-start justify-between gap-4 px-6 py-3.5 print:px-4 print:py-2.5"
                >
                  <div className="min-w-0">
                    <p className="sysdark:text-[#F5F7FA] text-sm font-semibold text-[#0B1220]">
                      <span className="tnum sysdark:text-[#E3C77A] mr-2 font-mono text-xs text-[#8A6516]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {m.name}
                    </p>
                    <p className="sysdark:text-[#A3AAB8] mt-0.5 text-xs leading-relaxed text-[#4B5565]">
                      {m.brief}
                    </p>
                  </div>
                  <span className="sysdark:text-[#7A8292] shrink-0 font-mono text-[11px] text-[#6B7485]">
                    {"scope" in m ? m.scope : m.when}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- 03. Bảng giá & phạm vi theo gói ---------- */}
        <section className="vb-print-break sysdark:border-[#1F232A] relative border-b border-[#E3E7EE] py-10 lg:py-12 print:py-6">
          <RailMarks />
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <Eyebrow index="03">Bảng giá &amp; phạm vi theo gói</Eyebrow>

            <div className="sysdark:border-[#1F232A] mt-4 overflow-x-auto rounded-lg border border-[#E3E7EE]">
              <table className="w-full min-w-[600px] text-left text-sm">
                <thead>
                  <tr className="sysdark:bg-[#0E1014] bg-[#F7F9FC]">
                    <th
                      scope="col"
                      className="sysdark:text-[#8B93A3] px-5 py-3.5 font-semibold text-[#5B6475]"
                    >
                      Phạm vi nghiệp vụ
                    </th>
                    {PLANS.map((p) => (
                      <th
                        key={p.id}
                        scope="col"
                        className="w-[18%] px-3 py-3.5 text-center"
                      >
                        <span className="sysdark:text-[#F5F7FA] block font-bold text-[#0B1220]">
                          {p.name}
                        </span>
                        <span className="tnum sysdark:text-[#E3C77A] mt-0.5 block font-mono text-xs font-semibold text-[#8A6516]">
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
                        className="sysdark:text-[#E6E9EF] px-5 py-3 font-medium text-[#1F2937]"
                      >
                        {r.label}
                      </th>
                      {r.cells.map((c, i) => (
                        <td
                          key={PLANS[i].id}
                          className="px-3 py-3 text-center"
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

            <div className="sysdark:border-[#1F232A] sysdark:text-[#A3AAB8] mt-6 flex flex-col justify-between gap-2 border-t border-[#E3E7EE] pt-4 text-xs text-[#4B5565] sm:flex-row sm:items-center">
              <span>
                Mỗi chuỗi đại lý vận hành trên một ứng dụng và một cơ sở dữ liệu
                riêng biệt. Cài đặt và đào tạo tận nơi khi triển khai.
              </span>
              <span className="tnum sysdark:text-[#F5F7FA] shrink-0 font-mono font-semibold text-[#0B1220]">
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
