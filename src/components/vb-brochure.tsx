"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  Check,
  Globe,
  Mail,
  MessageCircle,
  Phone,
  Printer,
  ShieldCheck,
} from "lucide-react"

import {
  CONTACT,
  DEALER_MODELS,
  FEATURE_MODULES,
  PLANS,
  VbFooter,
  VbHeader,
  VbWordmark,
} from "./vb-shared"

export function VbBrochurePage() {
  return (
    <div className="sysdark:bg-[#08090B] sysdark:text-[#F5F7FA] min-h-dvh bg-[#F4F6FA] text-[#0B1220] antialiased print:bg-white print:text-[#0B1220]">
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 10mm;
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
          .vb-print-sheet {
            box-shadow: none !important;
            border: 1px solid #d6dce6 !important;
            margin: 0 !important;
            max-width: 100% !important;
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

      {/* Thanh công cụ phía trên tờ Brochure (ẩn khi in PDF) */}
      <div className="vb-no-print sysdark:border-[#1F232A] sysdark:bg-[#0E1014] border-b border-[#D6DCE6] bg-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              href="/cam-nang"
              className="sysdark:text-[#E3C77A] inline-flex items-center gap-1.5 text-xs font-semibold text-[#8A6516] hover:underline"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Quay lại Cẩm nang
            </Link>
            <span className="text-xs text-[#8B93A3]">|</span>
            <span className="sysdark:text-[#A3AAB8] text-xs font-medium text-[#4B5565]">
              Bản tóm tắt giải pháp B2B (Chuẩn in A4 / Lưu PDF gửi Zalo)
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-full bg-[#8A6516] px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#6F5112]"
            >
              <Printer className="h-3.5 w-3.5" />
              In / Lưu file PDF gửi khách
            </button>
            <a
              href={CONTACT.zalo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#0068FF] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#0057D6]"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              Nhắn Zalo tư vấn
            </a>
          </div>
        </div>
      </div>

      {/* Khung tài liệu Brochure */}
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:py-10 print:p-0">
        <div className="vb-print-sheet sysdark:border-[#262B33] sysdark:bg-[#111317] overflow-hidden rounded-2xl border border-[#D6DCE6] bg-white shadow-xl print:rounded-none">
          {/* Đầu trang Hồ sơ giải pháp */}
          <div className="bg-[#241906] bg-[radial-gradient(ellipse_80%_90%_at_85%_0%,rgba(218,165,52,0.42),transparent_70%),linear-gradient(135deg,#241906_0%,#4A350C_52%,#261B07_100%)] p-6 text-white sm:p-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <VbWordmark onDark />
                <p className="mt-1 font-mono text-[11px] tracking-[0.08em] text-[#E8D49A] uppercase">
                  Hồ sơ giải pháp quản trị toàn diện · Hệ sinh thái Goplus
                </p>
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-[#E4E7EE]">
                <span className="inline-flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5 text-[#E8D49A]" />
                  vangbac.goplus.vn
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-[#E8D49A]" />
                  Zalo / Hotline: {CONTACT.phoneLabel}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-[#E8D49A]" />
                  {CONTACT.email}
                </span>
              </div>
            </div>

            <h1 className="mt-5 text-xl leading-snug font-bold sm:text-2xl">
              Phần mềm ERP chuyên biệt cho Đại lý Bạc tích trữ, Chuỗi Tiệm vàng
              truyền thống &amp; Hiệu Cầm đồ
            </h1>
            <p className="mt-2 max-w-3xl text-xs leading-relaxed text-[#E4E7EE] sm:text-sm">
              Đồng bộ bảng giá tự động từ Phú Quý, Bảo Tín Mạnh Hải, Ancarat ·
              Khoá giá chống trượt tại POS · Quản lý hợp đồng bạc hẹn giao, nối
              đơn &amp; phiên bán lại Phú Quý · Bán vàng theo tuổi + công + đá,
              thu mua trừ đá trừ dơ, in tem Thông tư 22 · Hợp đồng cầm đồ &amp;
              ô két · Zalo OA (ZNS) &amp; Đồng bộ kế toán MISA AMIS.
            </p>
          </div>

          {/* Mục 1: 3 Mô hình kinh doanh mục tiêu */}
          <div className="sysdark:border-[#1F232A] border-b border-[#E3E7EE] p-6 sm:p-8">
            <p className="sysdark:text-[#E3C77A] font-mono text-xs font-semibold tracking-wider text-[#8A6516] uppercase">
              01 · Ba mô hình triển khai trọng tâm
            </p>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
              {DEALER_MODELS.map((m, idx) => (
                <div
                  key={m.id}
                  className="sysdark:border-[#262B33] sysdark:bg-[#0E1014] rounded-xl border border-[#E3E7EE] bg-[#F7F9FC] p-4 print:bg-[#FAFBFD]"
                >
                  <p className="sysdark:text-[#E3C77A] font-mono text-[11px] font-semibold text-[#8A6516] uppercase">
                    0{idx + 1} · {m.badge}
                  </p>
                  <h2 className="sysdark:text-[#F5F7FA] mt-1 text-sm font-bold text-[#0B1220]">
                    {m.title}
                  </h2>
                  <p className="sysdark:text-[#A3AAB8] mt-1 text-xs leading-relaxed text-[#4B5565]">
                    {m.desc}
                  </p>
                  <ul className="sysdark:border-[#1F232A] sysdark:text-[#E6E9EF] mt-3 space-y-1.5 border-t border-[#E3E7EE] pt-2.5 text-xs text-[#1F2937]">
                    {m.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-1.5">
                        <Check className="sysdark:text-[#E3C77A] mt-0.5 h-3.5 w-3.5 shrink-0 text-[#8A6516]" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Mục 2: Ảnh giao diện trọng tâm */}
          <div className="sysdark:border-[#1F232A] border-b border-[#E3E7EE] p-6 sm:p-8">
            <p className="sysdark:text-[#E3C77A] font-mono text-xs font-semibold tracking-wider text-[#8A6516] uppercase">
              02 · Giao diện vận hành thực tế tại quầy
            </p>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sysdark:border-[#262B33] overflow-hidden rounded-xl border border-[#D6DCE6]">
                <Image
                  src="/images/screens/quay-phu-quy.jpg?v=3"
                  alt="Quầy POS bán hàng khoá giá chống trượt"
                  width={1440}
                  height={900}
                  sizes="(min-width: 640px) 440px, 100vw"
                  className="block aspect-[16/10] w-full bg-white object-contain"
                />
                <p className="sysdark:bg-[#0E1014] sysdark:text-[#C9CED8] bg-[#F7F9FC] px-3 py-2 text-xs font-medium text-[#374151]">
                  <b>Quầy POS Bạc &amp; Vàng thương hiệu:</b> Khoá giá ngay giây
                  tạo đơn, VietQR tự động gạch nợ ngân hàng.
                </p>
              </div>
              <div className="sysdark:border-[#262B33] overflow-hidden rounded-xl border border-[#D6DCE6]">
                <Image
                  src="/images/screens/ban-vang-tuoi.jpg?v=3"
                  alt="Quầy vàng truyền thống tính cân nhân giá tuổi cộng công và đá"
                  width={1440}
                  height={900}
                  sizes="(min-width: 640px) 440px, 100vw"
                  className="block aspect-[16/10] w-full bg-white object-contain"
                />
                <p className="sysdark:bg-[#0E1014] sysdark:text-[#C9CED8] bg-[#F7F9FC] px-3 py-2 text-xs font-medium text-[#374151]">
                  <b>Quầy Kim hoàn truyền thống:</b> Tính Khối lượng × Giá tuổi
                  vàng + Công + Đá, thu mua trừ đá/dơ, in tem TT22.
                </p>
              </div>
            </div>
          </div>

          {/* Mục 3: 16 Phân hệ nghiệp vụ khép kín */}
          <div className="vb-print-break sysdark:border-[#1F232A] border-b border-[#E3E7EE] p-6 sm:p-8">
            <p className="sysdark:text-[#E3C77A] font-mono text-xs font-semibold tracking-wider text-[#8A6516] uppercase">
              03 · Danh mục 16 phân hệ nghiệp vụ trên cùng một hệ thống
            </p>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {FEATURE_MODULES.map((m, i) => (
                <div
                  key={m.id}
                  className="sysdark:border-[#262B33] sysdark:bg-[#0E1014] rounded-lg border border-[#E3E7EE] bg-[#FAFBFD] p-3"
                >
                  <p className="sysdark:text-[#E3C77A] font-mono text-[11px] font-bold text-[#8A6516]">
                    {String(i + 1).padStart(2, "0")} · {m.name}
                  </p>
                  <p className="sysdark:text-[#C9CED8] mt-1 text-xs leading-relaxed text-[#374151]">
                    {m.brief}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mục 4: Bảng giá thuê bao & Cam kết triển khai */}
          <div className="p-6 sm:p-8">
            <p className="sysdark:text-[#E3C77A] font-mono text-xs font-semibold tracking-wider text-[#8A6516] uppercase">
              04 · Bảng giá gói thuê bao &amp; Cam kết bảo mật dữ liệu
            </p>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {PLANS.map((p) => {
                const featured = p.tone === "featured"
                return (
                  <div
                    key={p.id}
                    className={`flex flex-col rounded-xl border p-4 ${
                      featured
                        ? "sysdark:border-[#C99A2E] sysdark:bg-[#131009] border-[#8A6516] bg-[#FAF6EC]"
                        : "sysdark:border-[#262B33] sysdark:bg-[#0E1014] border-[#D6DCE6] bg-white"
                    }`}
                  >
                    <p className="sysdark:text-[#E3C77A] text-xs font-bold tracking-wide text-[#8A6516] uppercase">
                      {p.name}
                    </p>
                    <p className="sysdark:text-[#F5F7FA] tnum mt-1 text-lg font-bold text-[#0B1220]">
                      {p.price}
                      <span className="text-xs font-normal text-[#5B6475]">
                        {p.unit}
                      </span>
                    </p>
                    <p className="sysdark:text-[#8B93A3] mt-1 text-xs text-[#4B5565]">
                      {p.note}
                    </p>
                    <ul className="sysdark:border-[#1F232A] sysdark:text-[#E6E9EF] mt-3 space-y-1 border-t border-[#E3E7EE] pt-2.5 text-xs text-[#1F2937]">
                      {p.items.map((item) => (
                        <li key={item} className="flex items-start gap-1.5">
                          <Check className="sysdark:text-[#E3C77A] mt-0.5 h-3.5 w-3.5 shrink-0 text-[#8A6516]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>

            <div className="sysdark:border-[#4A3A14] sysdark:bg-[#141F30] mt-6 flex flex-col justify-between gap-4 rounded-xl border border-[#0F1B2D] bg-[#0F1B2D] p-5 text-white sm:flex-row sm:items-center">
              <div className="space-y-1">
                <p className="flex items-center gap-2 text-sm font-bold text-[#E8D49A]">
                  <ShieldCheck className="h-4 w-4 shrink-0" />
                  Mỗi chuỗi tiệm chạy trên ứng dụng &amp; cơ sở dữ liệu độc lập
                </p>
                <p className="text-xs text-[#C3CAD6]">
                  Phân quyền chặt chẽ theo vai trò – chi nhánh · Ghi nhật ký mọi
                  thao tác · Hỗ trợ cài đặt máy in tem &amp; đào tạo nhân sự tận
                  nơi.
                </p>
              </div>
              <div className="shrink-0 text-left sm:text-right">
                <p className="text-xs text-[#E8D49A]">
                  Liên hệ Đặt lịch Demo trực tiếp:
                </p>
                <p className="tnum text-base font-bold text-white">
                  Zalo / ĐT: {CONTACT.phoneLabel}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="vb-no-print">
        <VbFooter />
      </div>
    </div>
  )
}
