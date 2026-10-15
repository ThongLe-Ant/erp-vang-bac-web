# vangbac-web

Trang giới thiệu ERP Vàng Bạc — vangbac.goplus.vn, một sản phẩm trong hệ sinh thái Goplus. Next.js độc lập, không phụ thuộc `@goerp/core`. Khung sao từ `goeat-web`.

- `/` trang chủ, `/chuc-nang` chi tiết chức năng; `robots.txt`, `sitemap.xml`, `llms.txt`.
- Nội dung (bảng giá `PLANS`/`PLAN_MATRIX`, chức năng `FEATURE_MODULES`, hỏi đáp `FAQ`) ở `src/components/vb-shared.tsx`; slider đầu trang `SLIDES` ở `vb-landing.tsx`.
- Chưa có demo tự cấp: mọi nút "Đặt lịch demo" về khối liên hệ `#dang-ky` (Zalo).
- Ảnh màn hình ở `public/images/screens/` PHẢI chụp trên DB dữ liệu mẫu, không chụp từ app đang nối DB thật của khách. Mục nào `src: null` thì trang hiện khung "ảnh đang cập nhật".
- Giao diện sáng/tối: biến thể Tailwind `sysdark:` khai ở `src/app/globals.css`, công tắc ở `src/components/vb-theme-toggle.tsx`.

```bash
pnpm install
pnpm dev        # http://localhost:3050
pnpm build && pnpm start
```

Biến môi trường: xem `.env.example`.
