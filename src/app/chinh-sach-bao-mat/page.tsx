import { PRIVACY_PATH, vbMetadata } from "@/components/vb-seo"
import {
  CONTACT,
  GOPLUS_URL,
  HEADING_STYLE,
  VbFooter,
  VbHeader,
} from "@/components/vb-shared"

export const metadata = vbMetadata({
  path: PRIVACY_PATH,
  title: "Chính sách bảo mật & quyền riêng tư — ERP Vàng Bạc",
  description:
    "Thông báo về thu thập dữ liệu truy cập, sử dụng cookie phân tích (Google Analytics, Meta Pixel) và cam kết bảo mật dữ liệu của trang giới thiệu ERP Vàng Bạc.",
})

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-vb-bg text-vb-fg selection:bg-vb-gold min-h-dvh antialiased selection:text-white">
      <VbHeader />

      <div aria-hidden="true" className="h-[76px]" />

      <section className="border-vb-border border-b py-12 lg:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-vb-gold font-mono text-xs font-semibold tracking-[0.08em] uppercase">
            Thông báo pháp lý &amp; quyền riêng tư
          </p>
          <h1
            className="text-vb-fg mt-2.5 font-semibold tracking-[-0.02em]"
            style={HEADING_STYLE}
          >
            Chính sách bảo mật &amp; Cookie
          </h1>
          <p className="text-vb-muted mt-3 text-sm leading-relaxed">
            Cập nhật lần cuối: 06/11/2026 · Áp dụng cho trang thông tin giới
            thiệu giải pháp <strong>vangbac.goplus.vn</strong> thuộc hệ sinh
            thái{" "}
            <a
              href={GOPLUS_URL}
              className="text-vb-gold font-medium underline underline-offset-4"
            >
              Goplus
            </a>
            .
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="text-vb-body mx-auto max-w-4xl space-y-8 px-4 text-sm leading-relaxed sm:px-6 lg:px-8">
          <div>
            <h2 className="text-vb-fg text-lg font-semibold">
              1. Phạm vi thu thập thông tin trên website giới thiệu
            </h2>
            <p className="mt-2">
              Trang <strong>vangbac.goplus.vn</strong> là trang thông tin giới
              thiệu tính năng và tài liệu hướng dẫn nghiệp vụ của phần mềm ERP
              Vàng Bạc. Website không yêu cầu tạo tài khoản và không thu thập dữ
              liệu giao dịch kinh doanh của tiệm vàng bạc trên trang công khai
              này. Khi bạn chủ động liên hệ tư vấn qua Zalo hoặc email, chúng
              tôi chỉ tiếp nhận thông tin liên hệ do chính bạn cung cấp để hỗ
              trợ cài đặt và tư vấn giải pháp.
            </p>
          </div>

          <div>
            <h2 className="text-vb-fg text-lg font-semibold">
              2. Cookie và công cụ đo lường truy cập
            </h2>
            <p className="mt-2">
              Để đánh giá hiệu quả nội dung hướng dẫn và tối ưu trải nghiệm đọc
              tài liệu, website có thể sử dụng các công cụ phân tích tiêu chuẩn
              (bao gồm Google Analytics, Google Ads và Meta Pixel khi được kích
              hoạt). Các công cụ này sử dụng cookie hoặc mã định danh trình
              duyệt để ghi nhận dữ liệu tổng hợp ẩn danh như:
            </p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>
                Các trang chuyên mục được xem (ví dụ: trang chức năng, bài cẩm
                nang nghiệp vụ, trang hồ sơ giải pháp).
              </li>
              <li>
                Sự kiện tương tác cơ bản khi người đọc nhấp vào liên kết liên hệ
                tư vấn (Zalo, điện thoại hoặc email) nhằm đo lường nhu cầu hỗ
                trợ kỹ thuật.
              </li>
              <li>
                Loại thiết bị, trình duyệt và thời lượng phiên đọc phục vụ cải
                thiện tốc độ tải trang và phân phối thông tin giới thiệu phù
                hợp.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-vb-fg text-lg font-semibold">
              3. Quyền kiểm soát cookie của người truy cập
            </h2>
            <p className="mt-2">
              Bạn hoàn toàn có thể từ chối hoặc xóa cookie bất cứ lúc nào thông
              qua phần cài đặt quyền riêng tư trên trình duyệt web của mình, sử
              dụng chế độ duyệt web riêng tư, hoặc điều chỉnh tùy chọn cá nhân
              hóa quảng cáo trong phần Cài đặt tài khoản Google và Meta của bạn.
              Việc chặn cookie đo lường không ảnh hưởng đến quyền đọc toàn bộ
              bài viết và tài liệu trên website này.
            </p>
          </div>

          <div>
            <h2 className="text-vb-fg text-lg font-semibold">
              4. Bảo mật dữ liệu vận hành của cửa hàng sử dụng phần mềm
            </h2>
            <p className="mt-2">
              Đối với khách hàng doanh nghiệp/cửa hàng đăng ký sử dụng hệ thống
              phần mềm quản lý ERP Vàng Bạc, toàn bộ dữ liệu hàng tồn kho, sổ
              quỹ, chứng từ mua bán và khách hàng của tiệm thuộc quyền sở hữu
              riêng biệt của từng đơn vị, được phân tách độc lập và không sử
              dụng cho bất kỳ mục đích quảng cáo bên thứ ba nào.
            </p>
          </div>

          <div>
            <h2 className="text-vb-fg text-lg font-semibold">
              5. Thông tin liên hệ
            </h2>
            <p className="mt-2">
              Mọi câu hỏi liên quan đến quyền riêng tư hoặc yêu cầu hỗ trợ thông
              tin, vui lòng liên hệ đội ngũ phát triển Goplus qua Zalo/Điện
              thoại{" "}
              <a
                href={`tel:${CONTACT.phone}`}
                className="text-vb-fg font-semibold underline underline-offset-4"
              >
                {CONTACT.phoneLabel}
              </a>{" "}
              hoặc email{" "}
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-vb-fg font-semibold underline underline-offset-4"
              >
                {CONTACT.email}
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <VbFooter />
    </div>
  )
}
