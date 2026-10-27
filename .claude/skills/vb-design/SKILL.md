---
name: vb-design
description: |
  Hệ thống thiết kế (Design System & Craft Rules) cho vangbac-web (ERP Vàng Bạc — Goplus).
  Áp dụng ngôn ngữ Architectural Grid (GuideRails + RailMarks), bảng màu Vàng kim & Navy,
  kỷ luật chữ số mono (tabular-nums) và quy tắc chống AI-slop từ OpenDesign.
triggers:
  - "vb-design"
  - "thiết kế vangbac-web"
  - "polish giao diện vàng bạc"
  - "audit ui vàng bạc"
---

# ERP Vàng Bạc — Design System & Craft Rules (`vb-design`)

Bản quy chuẩn thiết kế dành riêng cho `vangbac-web` (`vangbac.goplus.vn`), chắt lọc từ 4 trục của **OpenDesign** (`craft/`, `taste-skill`, `minimalist-skill`, `emil-design-eng`, `laws-of-ux`).

---

## 1. Nhận diện cốt lõi (Architectural Grid & Materiality)

- **Định vị:** B2B SaaS chuyên sâu cho chuỗi đại lý bạc tích trữ (Phú Quý, Bảo Tín Mạnh Hải, Ancarat), tiệm vàng truyền thống và hiệu cầm đồ.
- **Khung kiến trúc (`GuideRails` + `RailMarks`):**
  - Toàn bộ các mục nội dung dưới Hero nằm trong khung kẻ dọc `max-w-6xl` (`GuideRails`) với dấu cộng giao điểm `RailMarks` tại mỗi đường kẻ ngang (`border-b` / `border-t`).
  - Ưu tiên phân tách khối bằng đường kẻ `1px` (`border-vb-border`, `divide-vb-border`) thay vì lạm dụng thẻ nổi (`box-shadow` dày) tràn lan.
- **Chế độ Sáng / Tối (`sysdark:`):**
  - Không dùng đen tuyệt đối (`#000000`) trên nền tối; dùng `#08090B` (`--vb-bg`) và `#0E1014` (`--vb-surface`).
  - Khi chuyển đổi giao diện sáng/tối, tắt tạm thời mọi `transition` (`[data-theme-switching]`) để toàn trang đổi màu tức thì, không chớp lệch nhịp.

---

## 2. Hệ thống Màu sắc & Kỷ luật Màu nhấn (`craft/color.md`)

Sử dụng biến ngữ nghĩa khai báo tại `src/app/globals.css`:

| Vai trò | Token Tailwind | Sáng (Light) | Tối (`sysdark:`) | Tỷ trọng hiển thị |
| :--- | :--- | :--- | :--- | :--- |
| Nền trang | `bg-vb-bg` | `#FFFFFF` | `#08090B` | 70–85% |
| Nền bề mặt phụ | `bg-vb-surface` | `#F7F9FC` | `#0E1014` | — |
| Nền thẻ | `bg-vb-card` | `#FFFFFF` | `#111317` | — |
| Chữ tiêu đề | `text-vb-fg` | `#0B1220` | `#F5F7FA` | — |
| Chữ thân bài | `text-vb-body` | `#1F2937` | `#E6E9EF` | — |
| Chữ phụ / chú thích | `text-vb-muted` / `text-vb-subtle` | `#4B5565` / `#5B6475` | `#A3AAB8` / `#8B93A3` | — |
| Đường kẻ | `border-vb-border` / `border-vb-border-strong` | `#E3E7EE` / `#D6DCE6` | `#1F232A` / `#262B33` | — |
| Màu nhấn Vàng kim | `text-vb-gold` / `bg-vb-gold` | `#8A6516` | `#E3C77A` | **5–10%** |
| Màu nhấn Navy | `bg-vb-navy` | `#0F1B2D` | `#141F30` | 5% |

### Quy tắc kỷ luật màu nhấn (Accent Discipline)
- **Tối đa 2 vùng nhấn `--vb-gold` trên mỗi khung nhìn (viewport):** Ví dụ 1 nhãn `Eyebrow` + 1 nút CTA chính hoặc trạng thái tab/gói đang chọn (`featured`).
- Không tô màu vàng đồng thời lên cả icon, tiêu đề phụ, đường viền và nút phụ trong cùng một thẻ.
- Độ tương phản chữ/nền bắt buộc đạt chuẩn **WCAG 2.2 AA** (`≥ 4.5:1` cho chữ thường, `≥ 3:1` cho chữ lớn `≥ 18pt`).

---

## 3. Hệ thống Chữ & Phân cấp Thị giác (`craft/typography.md`)

- **Font chữ (`src/app/layout.tsx`):**
  - Sans-serif (Tiêu đề & Nội dung): `Be Vietnam Pro` (`--font-vb-sans`), chỉ dùng 3 cấp độ đậm: `400` (đọc), `500/600` (nhấn/nhãn UI), `700` (con số giá/tiêu đề thẻ).
  - Monospace (Số liệu, Giá, Tuổi vàng, Mã đơn `YD...K` / `BYD...K`, Eyebrow): `JetBrains Mono` (`--font-vb-mono`).
- **Quy tắc Tracking & Căn chỉnh:**
  - Tiêu đề lớn (`H1`, `H2` ≥ 26px): `tracking-[-0.02em]` đến `tracking-[-0.025em]`, `line-height: 1.15–1.18`, luôn kèm `[text-wrap:balance]`.
  - Nhãn IN HOA (`uppercase` trên `Eyebrow`, badge, mã bước): bắt buộc `tracking-[0.06em]` đến `tracking-[0.08em]`.
  - Mọi con số tiền tệ (`3.000.000đ`), trọng lượng (`1,25 chỉ`), tỷ lệ (`+2,45%`), số thứ tự (`01/06`) bắt buộc gắn class `.tnum` (`font-variant-numeric: tabular-nums`).
  - Độ rộng đoạn văn đọc dài (`/cam-nang/[slug]`): giới hạn ở `60–70ch` (`max-w-[65ch]`), `leading-relaxed` (`1.625–1.7`).

---

## 4. Chuyển động & Vi tương tác (`emil-design-eng` & `ui-animation`)

- **Cấm `transition-all`:** Chỉ khai báo đúng thuộc tính cần chuyển tiếp (`transition-colors`, `transition-opacity`, `transition-transform`).
- **Đường cong & Thời lượng:**
  - Dùng `cubic-bezier(0.22, 1, 0.36, 1)` (`ease-out` nhạy ở đầu) với thời lượng `150ms–220ms` cho UI tương tác.
  - Phản hồi nhấn nút (Tactile Press): mọi nút CTA và pill chọn nhanh có `active:scale-[0.98]`.
  - Luôn tôn trọng `@media (prefers-reduced-motion: reduce)` (`motion-reduce:transition-none`).

---

## 5. Quy tắc Bố cục theo từng Trang (`laws-of-ux.md` & `taste-skill`)

1. **Trang chủ `/` (`vb-landing.tsx`):**
   - `ProductHero`: Khung cửa sổ phần mềm (Faux-OS Chrome) có thanh tab, thanh địa chỉ phân hệ (`vangbac.goplus.vn/vi/...`) và ảnh chụp từ DB mẫu.
   - `Một ngày ở tiệm`: Dàn theo lưới kiến trúc nối khít `GuideRails` để dễ đọc lướt trên cả desktop và mobile.
   - `Bảng giá`: Căn chỉnh thẳng hàng ngang (baseline alignment) giữa 4 gói cho phần tên gói, mức giá, ghi chú 1 dòng, đường kẻ phân cách, danh sách phạm vi và nút chọn gói ở đáy.
2. **Trang Chức năng `/chuc-nang` (`vb-features.tsx`):**
   - Thanh chọn nhanh (`Sticky Quick-Nav`) tự động nổi bật phân hệ đang nằm trong khung nhìn (`IntersectionObserver`).
   - Ví dụ thực tế tại quầy (`m.example`) trình bày dạng thẻ nghiệp vụ (Transaction Callout) dễ quét số liệu.
   - Bảng so sánh gói (`PLAN_MATRIX`) cố định cột đầu khi cuộn ngang trên mobile.
3. **Trang Cẩm nang `/cam-nang` & `/cam-nang/[slug]` (`vb-guides.tsx`):**
   - Bài viết chi tiết dùng bố cục 2 cột trên desktop: cột đọc chính (`65ch` + hộp `Key Takeaways` kỹ thuật) và cột phụ dính (`Sticky Sidebar` gồm Mục lục `H2` + Thẻ phân hệ & gói phần mềm liên quan).
4. **Trang Hồ sơ giải pháp `/ho-so-giai-phap` (`vb-brochure.tsx`):**
   - Tối ưu cho chế độ in A4 (`@media print`): có dải tóm tắt chỉ số đầu trang, giữ khối không bị cắt ngang trang (`break-inside-avoid`) và chân trang định danh B2B.
