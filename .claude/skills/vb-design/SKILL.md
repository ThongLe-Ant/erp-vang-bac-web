---
name: vb-design
description: Hệ thống quy chuẩn thiết kế "Swiss Bullion & Editorial Architecture" cho ERP Vàng Bạc (vangbac-web), đúc kết từ OpenDesign (anti-ai-slop, minimalist-skill, web-prototype-taste-editorial, digits-fintech-swiss-template).
---

# Quy chuẩn Thiết kế ERP Vàng Bạc (`vb-design`)

Tài liệu này quy định kiến trúc thị giác, bảng màu, typography và chống "AI Slop" cho dự án `vangbac-web` (`https://vangbac.goplus.vn`).

## 1. Triết lý "Swiss Bullion & Editorial Architecture"

1. **Nền Giấy Kem Ấm & Đá Đen Obsidian (`globals.css`):**
   - Light Mode dùng nền **Warm Bullion Paper (`#FAF8F4`)**, bề mặt phụ `#F2EFE9`, đường kẻ `#E4DFD5`, chữ chính `#111214` (không dùng nền trắng lạnh `#FFFFFF` hay đen tuyền `#000000`).
   - Dark Mode dùng nền **Obsidian Vault (`#0A0B0D`)**, bề mặt `#101216`, đường kẻ `#202329`, chữ chính `#F5F3EE`.
2. **Cấm tuyệt đối các dấu hiệu "AI Slop" (`anti-ai-slop.md` & `redesign-skill`):**
   - **Không dùng các mảng nền nâu-vàng gradient cắt vụn trang sáng** (`#241906` + `radial-gradient`). Toàn trang giữ một tông nền xuyên suốt.
   - **Không dùng đốm mờ `SoftGlow` (`blur-2xl`/`blur-3xl`)** hay hoạ tiết khối lập phương trang trí `CubeBackdrop`.
   - **Không dùng nút hình viên thuốc (`rounded-full`)** cho nút CTA hay thanh điều hướng; sử dụng góc vuông vức kiến trúc (`rounded-md` / `6px`).
   - **Không dùng thẻ bo góc kèm viền trái màu (`rounded-r-lg border-l-2` — Cardinal Sin #5)**; dùng khung biên lai phẳng `1px` có thanh tiêu đề monospace.
3. **Bộ 3 Typography (`layout.tsx` & `globals.css`):**
   - **Editorial Display (`--font-serif` — `Newsreader`):** Dùng cho tiêu đề lớn `H1`, `H2` và con số thống kê lớn (`tracking-[-0.02em]`).
   - **UI & Body (`--font-sans` — `Be Vietnam Pro`):** Dùng cho văn bản, danh sách, nút bấm (`max-w-[68ch]`).
   - **Technical & Số liệu (`--font-mono` — `JetBrains Mono` + `.tnum`):** Dùng cho giá vàng/bạc, trọng lượng (chỉ/phân/ly), mã đơn (`YD...K`, `BYD...K`), phím tắt `<kbd class="vb-kbd">` và nhãn mục `[01]`.
4. **Khung lưới kiến trúc `GuideRails` + `RailMarks`:**
   - Mọi phần tử từ Header (`VbHeaderShell`), Dải thông số (`Bullion Spec Strip`), Hero, Bảng giá cho tới Footer đều ăn khớp vào khung `max-w-6xl` có hai đường kẻ dọc `1px` (`border-vb-border`) và dấu cộng `RailMarks` tại các giao điểm.
