"""Bộ 8 Mẫu Thiết Kế + 2 Ảnh Bìa Chính Diện Chuẩn Graphic Designer (Retina 2.0× sRGB) cho GoERP Vàng Bạc:
- Đồng bộ 100% theo chuẩn thiết kế & giọng văn thực tế tại quầy đã chốt ở Mẫu 1 chính diện (`mau-1-dai-ly-bac-fb.png`).
- Quản lý màu ColorSync Display P3 -> sRGB chuẩn xác + độ phân giải Native Retina 2.0×
  render trực tiếp qua trình duyệt tích hợp của Orca (`orca_render.py`).
- Khung MacBook Pro nhôm nguyên khối 2× Retina đặt trên mặt bàn Studio + thẻ phóng to nối điểm vector chính xác.

Danh sách 10 ấn phẩm chính thức (`marketing/out/mau/`):
  1. `mau-1-dai-ly-bac-fb.png`       — Đại lý Bạc tích trữ: Chốt đơn không lo trượt giá
  2. `mau-2-in-tem-thong-tu-22-fb.png` — Tiệm Vàng Kim Hoàn: Cắm máy in tem 2 cánh chuẩn Thông tư 22
  3. `mau-3-thu-cu-doi-moi-fb.png`   — Tiệm Vàng Truyền Thống: Thu mua vàng cũ trừ đá, trừ dơ không sợ tính nhầm
  4. `mau-4-dat-hang-phu-quy-fb.png` — Sổ Hẹn Giao Bạc Phú Quý: Nhiều đơn cọc hẹn giao, đối soát hãng không lệch sổ
  5. `mau-5-bang-gia-zalo-fb.png`    — Báo Giá Nhóm Zalo: Giá đổi chục lần trong ngày, không cần ngồi sửa ảnh gửi Zalo
  6. `mau-6-hieu-cam-do-fb.png`      — Hiệu Cầm Đồ Vàng Bạc: Nhận cầm đúng giá tuổi vàng, đến kỳ tự nhắc khách đóng lãi
  7. `mau-7-chu-tiem-lai-lo-fb.png`  — Chủ Tiệm Quản Lý Từ Xa: Không cần ngồi trực tại quầy, vẫn nắm rõ tiền lời từng đơn
  8. `mau-8-bang-gia-4-goi-fb.png`   — Bảng Giá 4 Gói (790k / 1.990k / 2.990k / Liên hệ báo giá — gửi tư vấn Zalo)
  9. `bia-fanpage-facebook.png`      — Ảnh bìa Fanpage Facebook (1640×624 chuẩn vùng an toàn Desktop & Mobile)
 10. `bia-zalo-oa.png`               — Ảnh bìa Hồ sơ Zalo OA (1280×720 chuẩn 16:9 HD)
"""
from __future__ import annotations

import sys
from pathlib import Path
from PIL import Image
from orca_render import render_pages_via_orca

ROOT = Path(__file__).resolve().parents[2]
KIT = Path(__file__).resolve().parent
ASSETS = KIT / "assets"
LOGO = ROOT / "public/images/logos/go-mark.png"
OUT = ROOT / "marketing/out/mau"
_SRGB_ICC = Path("/System/Library/ColorSync/Profiles/sRGB Profile.icc")
_SRGB_BYTES = _SRGB_ICC.read_bytes() if _SRGB_ICC.exists() else None

ZALO = "0396 870 644"
SITE = "vangbac.goplus.vn"
GOOGLE_FONTS_LINK = (
    '<link rel="preconnect" href="https://fonts.googleapis.com">'
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
    '<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap" rel="stylesheet">'
)

# Hệ màu sRGB chuẩn Graphic Design — Tươi, Đanh, Tương phản cao
NAVY = "#0A216B"
NAVY_DEEP = "#06164A"
GOLD_SOLID = "#F28500"      # Vàng kim cam đặc 100% trên nền trắng
GOLD_BORDER = "#F59E0B"     # Viền thẻ callout vàng 24K tươi
GOLD_BRIGHT = "#FACC15"     # Vàng sáng rực trên nền Navy

STUDIO_DECOR_SVG = """
<svg class="studio-decor" viewBox="0 0 1080 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#F59E0B" stop-opacity="0.13"/>
      <stop offset="65%" stop-color="#F59E0B" stop-opacity="0.03"/>
      <stop offset="100%" stop-color="#F59E0B" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="navyGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#1D4ED8" stop-opacity="0.09"/>
      <stop offset="70%" stop-color="#1D4ED8" stop-opacity="0.02"/>
      <stop offset="100%" stop-color="#1D4ED8" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <ellipse cx="720" cy="590" rx="430" ry="250" fill="url(#navyGlow)"/>
  <ellipse cx="480" cy="680" rx="310" ry="185" fill="url(#goldGlow)"/>
  <circle cx="745" cy="675" r="295" stroke="#DCE5F4" stroke-width="1.2" stroke-dasharray="5 7" opacity="0.85"/>
  <circle cx="745" cy="675" r="355" stroke="#E5ECF7" stroke-width="1" opacity="0.8"/>
  <path d="M0 52L36 16H252" stroke="#D5DFEE" stroke-width="1.25"/>
  <path d="M1080 52L1044 16H828" stroke="#D5DFEE" stroke-width="1.25"/>
  <circle cx="252" cy="16" r="2.6" fill="#F59E0B"/>
  <circle cx="828" cy="16" r="2.6" fill="#F59E0B"/>
  <g fill="#CBD5E1" opacity="0.72">
    <circle cx="1014" cy="134" r="1.7"/><circle cx="1030" cy="134" r="1.7"/><circle cx="1046" cy="134" r="1.7"/>
    <circle cx="1014" cy="150" r="1.7"/><circle cx="1030" cy="150" r="1.7"/><circle cx="1046" cy="150" r="1.7"/>
    <circle cx="1014" cy="166" r="1.7"/><circle cx="1030" cy="166" r="1.7"/><circle cx="1046" cy="166" r="1.7"/>
  </g>
</svg>
"""

ICONS = {
    "lock": '<rect x="5" y="11" width="14" height="10" rx="2.2"/><path d="M8 11V7.5a4 4 0 0 1 8 0V11"/>',
    "sync": '<path d="M20 11A8 8 0 0 0 5.3 6.7L4 8"/><path d="M4 4v4h4"/><path d="M4 13a8 8 0 0 0 14.7 4.3L20 16"/><path d="M20 20v-4h-4"/>',
    "chat": '<path d="M21 11.5a8.5 8.5 0 0 1-12.3 7.6L4 20l1.2-4.5A8.5 8.5 0 1 1 21 11.5z"/><path d="M8.5 11.5h7M8.5 8.5h4.5"/>',
    "globe": '<circle cx="12" cy="12" r="9"/><path d="M3.4 12h17.2M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    "arrow": '<path d="M5 12h14M13 6l6 6-6 6"/>',
    "check": '<path d="M20 6L9 17l-5-5"/>',
    "tag": '<path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L2 12V2h10l8.6 8.6a2 2 0 0 1 0 2.8z"/><circle cx="7" cy="7" r="1.6"/>',
    "scale": '<path d="M12 3v18M5 21h14M4 7h16"/><path d="M4 7l-2 6a3 3 0 0 0 6 0L6 7M18 7l-2 6a3 3 0 0 0 6 0l-2-6"/>',
    "box": '<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/>',
    "shield": '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
    "trend": '<path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>',
    "star": '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
}


def icon(name, stroke=GOLD_BRIGHT, sw="2.2"):
    return (
        f'<svg viewBox="0 0 24 24" fill="none" stroke="{stroke}" stroke-width="{sw}" '
        f'stroke-linecap="round" stroke-linejoin="round">{ICONS[name]}</svg>'
    )


SHARED_BASE_CSS = f"""
*{{box-sizing:border-box;margin:0;padding:0}}
html,body{{
  width:1080px;height:1080px;overflow:hidden;
  font-family:"Be Vietnam Pro",-apple-system,BlinkMacSystemFont,sans-serif;
  color:{NAVY};position:relative;
  background:linear-gradient(180deg,#FFFFFF 0%,#FFFFFF 31%,#F3F7FD 49%,#E7EEF9 78%,#E4ECF8 100%);
  -webkit-font-smoothing:antialiased;
  text-rendering:geometricPrecision;
}}
.tnum{{font-variant-numeric:tabular-nums;font-feature-settings:"tnum" 1}}
.studio-decor{{position:absolute;inset:0;width:1080px;height:1080px;pointer-events:none;z-index:1}}

.logo{{
  display:inline-flex;align-items:center;gap:12px;
  font-weight:800;font-size:29px;letter-spacing:-0.025em;color:{NAVY};
}}
.logo img{{width:46px;height:46px;object-fit:contain}}
.logo span{{color:{GOLD_SOLID}}}

.price-badge{{
  background:linear-gradient(180deg,#102C88 0%,{NAVY} 100%);
  color:#FFFFFF;
  font-size:18.5px;font-weight:600;
  padding:11px 24px;border-radius:999px;
  box-shadow:0 10px 20px -8px rgba(10,33,107,0.38);
}}
.price-badge b{{color:{GOLD_BRIGHT};font-weight:800}}

.callout{{
  background:#FFFFFF;
  border:2px solid {GOLD_BORDER};
  border-radius:18px;
  padding:25px 20px 14px;
  box-shadow:
    0 0 0 5px rgba(245,158,11,0.16),
    0 24px 48px -12px rgba(10,33,107,0.28),
    0 4px 12px -2px rgba(10,33,107,0.08);
}}
.callout .c-tag{{
  position:absolute;left:18px;top:-15px;
  display:inline-flex;align-items:center;gap:6px;
  background:linear-gradient(180deg,#123196 0%,{NAVY} 100%);
  color:#FFFFFF;font-size:12.8px;font-weight:800;
  padding:6px 14px;border-radius:999px;
  border:1.5px solid {GOLD_BORDER};
  letter-spacing:0.05em;text-transform:uppercase;
  white-space:nowrap;
  box-shadow:0 6px 14px -4px rgba(10,33,107,0.38);
}}
.callout .c-tag svg{{width:13px;height:13px}}
.callout .c-prod{{
  display:flex;align-items:center;gap:13px;
  padding-bottom:11px;border-bottom:1px solid #E5EAF2;
}}
.callout .c-thumb{{
  width:52px;height:52px;border-radius:12px;flex:none;
  background:#F4F7FB;border:1px solid #DCE4F0;padding:4px;
  display:flex;align-items:center;justify-content:center;
}}
.callout .c-thumb img{{width:100%;height:100%;object-fit:contain}}
.callout .c-thumb-ic{{
  width:50px;height:50px;border-radius:13px;flex:none;
  background:linear-gradient(145deg,#1537A4 0%,{NAVY} 100%);
  display:flex;align-items:center;justify-content:center;
  box-shadow:0 6px 12px -3px rgba(10,33,107,0.28);
}}
.callout .c-thumb-ic svg{{width:24px;height:24px}}
.callout .c-brand{{
  font-size:12.5px;font-weight:700;color:#526077;
  text-transform:uppercase;letter-spacing:0.035em;
  white-space:nowrap;
}}
.callout .c-name{{
  font-size:18.5px;font-weight:800;color:{NAVY};
  letter-spacing:-0.015em;margin-top:2px;
  white-space:nowrap;
}}
.callout .c-row{{
  display:flex;justify-content:space-between;align-items:baseline;
  padding:7px 0;border-bottom:1px solid #EEF2F7;gap:10px;
}}
.callout .c-row:last-child{{border-bottom:none;padding-bottom:2px}}
.callout .c-row i{{font-style:normal;font-size:15.2px;font-weight:600;color:#475569;white-space:nowrap}}
.callout .c-row b{{font-size:19.5px;font-weight:800;letter-spacing:-0.015em;white-space:nowrap}}
.callout .c-row.navy b{{color:{NAVY}}}
.callout .c-row.buy b{{color:#DC2626}}
.callout .c-row.sell b{{color:#059669}}
.callout .c-row.gold b{{color:#D97706}}
.callout .c-row.stock b{{font-size:15.2px;color:#059669;display:inline-flex;align-items:center;gap:5px;white-space:nowrap}}
.callout .c-row.stock svg{{width:16px;height:16px;flex:none}}

.cta-btn{{
  display:inline-flex;align-items:center;gap:14px;
  background:linear-gradient(180deg,#FFD84D 0%,#F59300 100%);
  color:{NAVY_DEEP};
  font-size:22.5px;font-weight:800;text-transform:uppercase;letter-spacing:0.015em;
  padding:13px 16px 13px 34px;border-radius:999px;white-space:nowrap;
  box-shadow:
    inset 0 1.5px 0 rgba(255,255,255,0.72),
    inset 0 -2px 0 rgba(194,106,0,0.28),
    0 14px 28px -8px rgba(242,133,0,0.48),
    0 4px 10px -2px rgba(10,33,107,0.12);
}}
.cta-btn .arr-circle{{
  width:38px;height:38px;border-radius:50%;flex:none;
  background:{NAVY};
  display:inline-flex;align-items:center;justify-content:center;
  box-shadow:0 4px 10px -2px rgba(6,22,74,0.35);
}}
.cta-btn .arr-circle svg{{width:20px;height:20px}}

.foot{{
  position:absolute;left:0;right:0;bottom:0;height:64px;z-index:10;
  background:{NAVY};color:#FFFFFF;
  border-top:3px solid #F59E0B;
  display:flex;align-items:center;justify-content:center;gap:48px;
  font-size:21px;font-weight:600;
}}
.foot span{{display:inline-flex;align-items:center;gap:9px}}
.foot svg{{width:22px;height:22px}}
.foot b{{color:{GOLD_BRIGHT};font-weight:800}}
.foot .sep{{width:5px;height:5px;border-radius:50%;background:#64748B}}
"""


def render_centered_poster(
    *,
    eyebrow: str,
    h1_line1: str,
    h1_line2: str,
    subtitle_html: str,
    mac_asset: str,
    callout_tag_icon: str,
    callout_tag_text: str,
    callout_brand: str,
    callout_name: str,
    rows: list[tuple[str, str, str]],  # [(row_class, label, value_html), ...]
    leader_path: str,
    leader_dot: tuple[int, int],
    price_badge_html: str = "Dùng thử <b>14 ngày</b> · Cài đặt tận quầy",
    cta_note_html: str = "Mở tài khoản chạy thử miễn phí theo đúng quầy,<br>nhân viên quen việc ngay trong 1 buổi.",
    thumb_img: str | None = None,
    thumb_icon: str | None = None,
    h1_size: float = 50.0,
    mac_left: int = 64,
    mac_top: int = 344,
    mac_width: int = 856,
    callout_pos_css: str = "right:44px;top:524px;width:376px;",
) -> str:
    dx, dy = leader_dot
    css = SHARED_BASE_CSS + f"""
    .stage-desk{{
      position:absolute;left:0;right:0;top:834px;bottom:64px;z-index:2;
      background:linear-gradient(180deg,#FFFFFF 0%,#F6F9FE 48%,#EBF1FA 100%);
      border-top:1px solid #D5E0F2;
      box-shadow:inset 0 2px 0 rgba(255,255,255,0.9);
    }}
    .topbar{{
      position:relative;z-index:5;
      display:flex;align-items:center;justify-content:space-between;
      padding:42px 56px 0;
    }}
    .hero-center{{
      position:relative;z-index:5;
      text-align:center;padding:18px 44px 0;
    }}
    .eyebrow-c{{
      display:inline-flex;align-items:center;gap:12px;
      font-size:15.5px;font-weight:800;letter-spacing:0.115em;
      color:{GOLD_SOLID};text-transform:uppercase;
    }}
    .eyebrow-c:before,.eyebrow-c:after{{
      content:"";width:28px;height:2.5px;background:{GOLD_SOLID};border-radius:2px;
    }}
    .h1-c{{
      margin-top:8px;
      font-size:{h1_size}px;line-height:1.14;font-weight:800;
      text-transform:uppercase;letter-spacing:-0.022em;color:{NAVY};
      white-space:nowrap;
    }}
    .h1-c b{{
      display:block;font-weight:800;color:{GOLD_SOLID};
    }}
    .sub-c{{
      margin:10px auto 0;max-width:940px;
      font-size:21px;font-weight:500;color:#1E293B;line-height:1.44;
    }}
    .sub-c b{{color:{GOLD_SOLID};font-weight:800}}

    .mac-center{{
      position:absolute;left:{mac_left}px;top:{mac_top}px;width:{mac_width}px;z-index:4;
    }}
    .mac-center img{{display:block;width:100%;height:auto}}

    .pos-callout-c{{
      position:absolute;{callout_pos_css}z-index:8;
    }}
    .callout-leader{{
      position:absolute;left:0;top:0;width:1080px;height:1080px;pointer-events:none;z-index:7;
    }}
    .ctarow{{
      position:absolute;left:56px;right:56px;top:914px;z-index:9;
      display:flex;justify-content:center;align-items:center;gap:26px;
    }}
    .ctarow .note{{
      font-size:19px;font-weight:600;color:#1E293B;line-height:1.35;
    }}
    """
    if thumb_img:
        thumb_html = f'<div class="c-thumb"><img src="file://{ASSETS / thumb_img}"></div>'
    else:
        thumb_html = f'<div class="c-thumb-ic">{icon(thumb_icon or callout_tag_icon, GOLD_BRIGHT, "2.2")}</div>'

    rows_html = ""
    for r_cls, r_lbl, r_val in rows:
        if r_cls == "stock":
            rows_html += f'<div class="c-row stock"><i>{r_lbl}</i><b>{icon("check","#059669","2.8")} {r_val}</b></div>'
        else:
            rows_html += f'<div class="c-row {r_cls}"><i>{r_lbl}</i><b class="tnum">{r_val}</b></div>'

    leader_svg = f"""
    <svg class="callout-leader" viewBox="0 0 1080 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="{leader_path}" stroke="#F59E0B" stroke-width="2.2" stroke-dasharray="5 4"/>
      <circle cx="{dx}" cy="{dy}" r="9" fill="#F59E0B" fill-opacity="0.24"/>
      <circle cx="{dx}" cy="{dy}" r="4.5" fill="#F59E0B" stroke="#FFFFFF" stroke-width="1.5"/>
    </svg>
    """
    return f"""<!doctype html><html><head><meta charset="utf-8">
{GOOGLE_FONTS_LINK}<style>{css}</style></head><body>
{STUDIO_DECOR_SVG}
<div class="stage-desk"></div>

<div class="topbar">
  <div class="logo"><img src="file://{LOGO}">GoERP <span>Vàng Bạc</span></div>
  <div class="price-badge tnum">{price_badge_html}</div>
</div>

<div class="hero-center">
  <div class="eyebrow-c">{eyebrow}</div>
  <h1 class="h1-c">{h1_line1}<b>{h1_line2}</b></h1>
  <p class="sub-c">{subtitle_html}</p>
</div>

<div class="mac-center">
  <img src="file://{ASSETS / mac_asset}">
</div>

{leader_svg}

<div class="callout pos-callout-c">
  <div class="c-tag">{icon(callout_tag_icon, GOLD_BRIGHT, "2.4")} {callout_tag_text}</div>
  <div class="c-prod">
    {thumb_html}
    <div>
      <div class="c-brand">{callout_brand}</div>
      <div class="c-name">{callout_name}</div>
    </div>
  </div>
  {rows_html}
</div>

<div class="ctarow">
  <div class="cta-btn">Dùng thử 14 ngày <span class="arr-circle">{icon("arrow", GOLD_BRIGHT, "2.6")}</span></div>
  <div class="note">{cta_note_html}</div>
</div>

<div class="foot">
  <span>{icon("chat", GOLD_BRIGHT, "2.2")} Zalo <b class="tnum">{ZALO}</b></span>
  <span class="sep"></span>
  <span>{icon("globe", "#CBD5E1", "2")} {SITE}</span>
</div>
</body></html>"""


# ==============================================================================
# BỘ 7 MẪU CHÍNH DIỆN ĐỒNG BỘ (1080×1080)
# ==============================================================================
def html_mau_1_centered():
    return render_centered_poster(
        eyebrow="Phần mềm cho đại lý bạc tích trữ &amp; tiệm vàng",
        h1_line1="Giá bạc nhảy liên tục,",
        h1_line2="chốt đơn không lo trượt giá",
        h1_size=50.0,
        subtitle_html=(
            "Lên đơn là giữ nguyên giá lúc chốt khi khách chờ chuyển khoản,<br>"
            "theo dõi rõ đơn hẹn giao Phú&nbsp;Quý và tự gửi bảng giá vào nhóm Zalo."
        ),
        mac_asset="macbook-pro-full.png",
        thumb_img="bac-thanh-long-clean.png",
        callout_tag_icon="lock",
        callout_tag_text="Giữ nguyên giá lúc lên đơn",
        callout_brand="Bạc Thanh Long Phú Quý",
        callout_name="999 – 1 lượng",
        rows=[
            ("buy", "Giá mua vào", "54.399.864đ"),
            ("sell", "Giá chốt bán ra", "56.079.860đ"),
            ("stock", "Trạng thái", "Giữ giá chờ chuyển khoản"),
        ],
        callout_pos_css="right:44px;top:524px;width:376px;",
        leader_path="M660 564H617",
        leader_dot=(616, 564),
    )


def html_mau_2_in_tem():
    return render_centered_poster(
        eyebrow="Phần mềm cho tiệm vàng kim hoàn &amp; trang sức",
        h1_line1="Cắm máy là in tem 2 cánh,",
        h1_line2="đúng chuẩn Thông tư 22",
        h1_size=50.5,
        subtitle_html=(
            "Tự trừ trọng lượng đá để ra vàng tịnh, ghi đủ tuổi vàng và tiền công,<br>"
            "in thẳng từ trình duyệt ra máy TSC, Godex, Bixolon không cần cài đặt rắc rối."
        ),
        mac_asset="macbook-in-tem.png",
        thumb_icon="tag",
        callout_tag_icon="tag",
        callout_tag_text="Tem 2 cánh chuẩn 40×10mm",
        callout_brand="Mã tem VT-KC5 · Vàng 9999",
        callout_name="Kiềng cưới chạm rồng phượng",
        rows=[
            ("navy", "Vàng tịnh / Đá", "5,0000c · Đá 0,0c"),
            ("gold", "Tiền công trên tem", "1.200.000đ"),
            ("stock", "Máy in tem", "In thẳng qua cổng USB"),
        ],
        callout_pos_css="right:44px;top:566px;width:380px;",
        leader_path="M656 604H622V549",
        leader_dot=(622, 548),
    )


def html_mau_3_thu_mua():
    return render_centered_poster(
        eyebrow="Phần mềm bán vàng theo tuổi &amp; thu đổi tại quầy",
        h1_line1="Thu mua vàng cũ trừ đá, trừ dơ,",
        h1_line2="không sợ nhân viên tính nhầm",
        h1_size=46.5,
        subtitle_html=(
            "Nhập số cân thực tế là tự trừ đá, trừ hao hụt theo đúng giá từng tuổi vàng<br>"
            "(9999, 18K, 610) và cấn trừ thẳng sang món mới khách đổi ngay trên một đơn."
        ),
        mac_asset="macbook-thu-mua.png",
        mac_left=160,
        thumb_icon="scale",
        callout_tag_icon="scale",
        callout_tag_text="Tự động trừ đá · trừ dơ",
        callout_brand="Thu mua tại quầy · Vàng 18K (75%)",
        callout_name="Dây chuyền 18K mắt xích Ý",
        rows=[
            ("navy", "Cân 3,25c · Trừ 0,22c", "3,03 chỉ tịnh"),
            ("buy", "Giá thu vào 18K", "9.650.000đ/chỉ"),
            ("sell", "Tiền trả cho khách", "29.239.500đ"),
        ],
        callout_pos_css="left:44px;top:534px;width:386px;",
        leader_path="M430 578H694V525H727",
        leader_dot=(728, 525),
    )


def html_mau_4_dat_hang():
    return render_centered_poster(
        eyebrow="Phần mềm cho đại lý bạc Phú Quý · Ancarat · BTMH",
        h1_line1="Nhiều đơn khách cọc hẹn giao,",
        h1_line2="đối soát với hãng không lệch sổ",
        h1_size=47.5,
        subtitle_html=(
            "Đồng bộ mã đơn đặt hàng Phú&nbsp;Quý (YD…K), nhìn rõ đơn nào hàng đã về kho,<br>"
            "đơn nào đang giao và tính sẵn chiết khấu đại lý trên từng giao dịch."
        ),
        mac_asset="macbook-dat-hang.png",
        thumb_icon="box",
        callout_tag_icon="sync",
        callout_tag_text="Đồng bộ mã đơn đặt hãng",
        callout_brand="Tập đoàn Phú Quý · YD2610130815K",
        callout_name="Mã đơn PO-AU-260927-0001",
        rows=[
            ("navy", "Tổng tiền đơn hàng", "2.423.128.000đ"),
            ("sell", "Chiết khấu đại lý", "+34.405.000đ"),
            ("stock", "Tiến độ hàng về", "Đã nhận đủ hàng về kho"),
        ],
        callout_pos_css="right:44px;top:558px;width:384px;",
        leader_path="M652 596H638V538",
        leader_dot=(638, 537),
    )


def html_mau_5_bang_gia_zalo():
    return render_centered_poster(
        eyebrow="Tự động báo giá vàng bạc vào nhóm Zalo",
        h1_line1="Giá đổi chục lần trong ngày,",
        h1_line2="không cần ngồi sửa ảnh gửi Zalo",
        h1_size=47.0,
        subtitle_html=(
            "Giá tại quầy vừa cập nhật là tự xuất tấm ảnh bảng giá có sẵn tên tiệm, hotline<br>"
            "và gửi cùng lúc vào tất cả nhóm Zalo khách sỉ, khách lẻ chỉ trong vài giây."
        ),
        mac_asset="macbook-zalo-bot.png",
        mac_left=52,
        thumb_icon="chat",
        callout_tag_icon="chat",
        callout_tag_text="Tự xuất ảnh gửi mọi nhóm",
        callout_brand="Bạc Phú Quý · Tự gửi 4 nhóm Zalo",
        callout_name="Bạc miếng 999 – 1 lượng",
        rows=[
            ("buy", "Giá mua vào mới", "3.165.000đ/lượng"),
            ("sell", "Giá bán ra mới", "3.262.000đ/lượng"),
            ("stock", "Báo giá nhóm", "Đã gửi ảnh gắn tên tiệm"),
        ],
        callout_pos_css="right:40px;top:534px;width:382px;",
        leader_path="M658 636H643",
        leader_dot=(642, 636),
    )


def html_mau_6_hieu_cam_do():
    return render_centered_poster(
        eyebrow="Phần mềm cho tiệm vàng kết hợp hiệu cầm đồ",
        h1_line1="Nhận cầm đúng giá tuổi vàng,",
        h1_line2="đến kỳ tự nhắc khách đóng lãi",
        h1_size=48.5,
        subtitle_html=(
            "Định giá món cầm sát bảng giá vàng hôm nay, gắn rõ vị trí két – ngăn – khay<br>"
            "lưu giữ và tự nhắn Zalo nhắc khách trước ngày đóng lãi, hạn chuộc đồ."
        ),
        mac_asset="macbook-cam-do.png",
        thumb_icon="shield",
        callout_tag_icon="shield",
        callout_tag_text="Theo dõi lãi &amp; hạn chuộc đồ",
        callout_brand="Hợp đồng CD-261011-0001 · Két A-01",
        callout_name="Cầm 1 món trang sức vàng",
        rows=[
            ("navy", "Định giá theo tuổi vàng", "26.800.000đ"),
            ("gold", "Số tiền khách cầm", "21.400.000đ"),
            ("stock", "Lãi &amp; nhắc hạn", "1,5%/tháng · Tự nhắc Zalo"),
        ],
        callout_pos_css="right:44px;top:542px;width:384px;",
        leader_path="M652 580H592V499",
        leader_dot=(592, 498),
    )


def html_mau_7_chu_tiem_lai_lo():
    return render_centered_poster(
        eyebrow="Dành cho chủ tiệm vàng bạc quản lý từ xa",
        h1_line1="Không cần ngồi trực tại quầy,",
        h1_line2="vẫn nắm rõ tiền lời từng đơn",
        h1_size=48.5,
        subtitle_html=(
            "Mở điện thoại là thấy ngay doanh thu, giá vốn và lãi gộp trên mỗi giao dịch,<br>"
            "cuối ca nhân viên đếm tiền theo từng mệnh giá khớp sổ quỹ không lo thất thoát."
        ),
        mac_asset="macbook-lai-lo.png",
        thumb_icon="trend",
        callout_tag_icon="trend",
        callout_tag_text="Lãi gộp thực tế từng đơn",
        callout_brand="Đơn SO-AG-261014-0002 · Chi nhánh 2",
        callout_name="Giao dịch bán bạc tại quầy",
        rows=[
            ("navy", "Doanh thu đơn bán", "12.708.000đ"),
            ("buy", "Giá vốn thực tế", "12.248.000đ"),
            ("stock", "Tiền lời chốt đơn", "+460.000đ (Lãi 3,6%)"),
        ],
        callout_pos_css="right:44px;top:552px;width:384px;",
        leader_path="M652 588H640V513H699",
        leader_dot=(700, 513),
    )


def html_mau_8_bang_gia():
    css = SHARED_BASE_CSS + f"""
    .topbar{{
      position:relative;z-index:5;
      display:flex;align-items:center;justify-content:space-between;
      padding:42px 56px 0;
    }}
    .hero-center{{
      position:relative;z-index:5;
      text-align:center;padding:16px 44px 0;
    }}
    .eyebrow-c{{
      display:inline-flex;align-items:center;gap:12px;
      font-size:15.5px;font-weight:800;letter-spacing:0.115em;
      color:{GOLD_SOLID};text-transform:uppercase;
    }}
    .eyebrow-c:before,.eyebrow-c:after{{
      content:"";width:28px;height:2.5px;background:{GOLD_SOLID};border-radius:2px;
    }}
    .h1-c{{
      margin-top:8px;
      font-size:49px;line-height:1.13;font-weight:800;
      text-transform:uppercase;letter-spacing:-0.022em;color:{NAVY};
      white-space:nowrap;
    }}
    .h1-c b{{display:block;font-weight:800;color:{GOLD_SOLID}}}
    .sub-c{{
      margin:9px auto 0;max-width:940px;
      font-size:20.5px;font-weight:500;color:#1E293B;line-height:1.42;
    }}

    .plan-grid{{
      position:absolute;left:56px;right:56px;top:334px;z-index:6;
      display:grid;grid-template-columns:1fr 1fr;gap:22px 22px;
    }}
    .p-card{{
      position:relative;
      background:#FFFFFF;
      border:1.5px solid #D5E1F2;
      border-radius:20px;
      padding:19px 23px 17px;
      box-shadow:0 14px 30px -14px rgba(10,33,107,0.16);
      display:flex;flex-direction:column;justify-content:space-between;
      height:254px;
    }}
    .p-card.ent{{
      background:linear-gradient(180deg,#F8FAFF 0%,#EFF4FC 100%);
      border-color:#C3D4EE;
    }}
    .p-card.feat{{
      background:linear-gradient(155deg,#12329A 0%,{NAVY} 62%,#071852 100%);
      border:2px solid {GOLD_BORDER};
      color:#FFFFFF;
      box-shadow:
        0 0 0 5px rgba(245,158,11,0.16),
        0 22px 44px -12px rgba(10,33,107,0.36);
    }}
    .p-pop{{
      position:absolute;right:20px;top:-14px;
      background:linear-gradient(180deg,#FFD84D 0%,#F59300 100%);
      color:{NAVY_DEEP};
      font-size:12px;font-weight:800;letter-spacing:0.05em;text-transform:uppercase;
      padding:5px 13px;border-radius:999px;
      display:inline-flex;align-items:center;gap:5px;
      box-shadow:0 6px 14px -4px rgba(242,133,0,0.48);
    }}
    .p-pop svg{{width:12px;height:12px;fill:{NAVY_DEEP}}}
    .p-head{{
      display:flex;align-items:center;justify-content:space-between;gap:8px;
    }}
    .p-name{{
      font-size:21px;font-weight:800;letter-spacing:0.02em;text-transform:uppercase;color:{NAVY};
    }}
    .p-card.feat .p-name{{color:#FFFFFF}}
    .p-tag{{
      font-size:12px;font-weight:700;letter-spacing:0.03em;text-transform:uppercase;
      color:#475569;background:#EEF3FB;padding:5px 11px;border-radius:999px;white-space:nowrap;
    }}
    .p-card.feat .p-tag{{
      color:{GOLD_BRIGHT};background:rgba(255,255,255,0.12);border:1px solid rgba(250,204,21,0.35);
    }}
    .p-price{{
      margin-top:6px;padding-bottom:10px;border-bottom:1px solid #E6ECF5;
      display:flex;align-items:baseline;gap:5px;
    }}
    .p-card.feat .p-price{{border-bottom-color:rgba(255,255,255,0.16)}}
    .p-price b{{
      font-size:34px;font-weight:800;letter-spacing:-0.025em;color:{NAVY};line-height:1.05;
    }}
    .p-card.ent .p-price b{{font-size:31px}}
    .p-card.feat .p-price b{{color:{GOLD_BRIGHT}}}
    .p-price span{{font-size:15.5px;font-weight:600;color:#64748B}}
    .p-card.feat .p-price span{{color:#CBD5E1}}
    .p-desc{{font-size:13.8px;font-weight:500;color:#64748B;margin-top:7px}}
    .p-card.feat .p-desc{{color:#CBD5E1}}
    .p-list{{
      list-style:none;display:flex;flex-direction:column;gap:6.5px;margin-top:8px;
    }}
    .p-list li{{
      display:flex;align-items:center;gap:8px;
      font-size:15.3px;font-weight:600;color:#1E293B;line-height:1.26;white-space:nowrap;
    }}
    .p-card.feat .p-list li{{color:#F8FAFC}}
    .p-list li svg{{width:16px;height:16px;flex:none}}

    .ctarow{{
      position:absolute;left:56px;right:56px;top:912px;z-index:9;
      display:flex;justify-content:center;align-items:center;gap:26px;
    }}
    .ctarow .note{{font-size:18.5px;font-weight:600;color:#1E293B;line-height:1.35}}
    """
    ck_green = icon("check", "#059669", "2.8")
    ck_gold = icon("check", GOLD_BRIGHT, "2.8")
    return f"""<!doctype html><html><head><meta charset="utf-8">
{GOOGLE_FONTS_LINK}<style>{css}</style></head><body>
{STUDIO_DECOR_SVG}
<div class="topbar">
  <div class="logo"><img src="file://{LOGO}">GoERP <span>Vàng Bạc</span></div>
  <div class="price-badge tnum">Dùng thử miễn phí <b>14 ngày</b></div>
</div>

<div class="hero-center">
  <div class="eyebrow-c">Bảng giá thuê theo đúng phân hệ tại quầy</div>
  <h1 class="h1-c">Chi phí rõ ràng từng gói,<b>chọn đúng theo quầy nhà mình</b></h1>
  <p class="sub-c">Không ép mua kèm phân hệ không dùng — mở tài khoản chạy thử miễn phí 14 ngày<br>trước khi đăng ký và kỹ thuật hướng dẫn trực tiếp suốt quá trình bán.</p>
</div>

<div class="plan-grid">
  <div class="p-card">
    <div>
      <div class="p-head"><span class="p-name">Standard</span><span class="p-tag">Tiệm 1 quầy / Cầm đồ</span></div>
      <div class="p-price tnum"><b>790.000đ</b><span>/tháng</span></div>
      <div class="p-desc">Cho tiệm vàng 1 quầy hoặc hiệu cầm đồ độc lập.</div>
    </div>
    <ul class="p-list">
      <li>{ck_green} Chọn 1 mảng: Vàng truyền thống hoặc Cầm đồ</li>
      <li>{ck_green} In tem 2 cánh TT22 / Sơ đồ két &amp; nhắc Zalo</li>
      <li>{ck_green} Sổ quỹ, kiểm quỹ mệnh giá &amp; lãi từng đơn</li>
    </ul>
  </div>

  <div class="p-card feat">
    <div class="p-pop">{icon("star", NAVY_DEEP, "2.2")} Được chọn nhiều nhất</div>
    <div>
      <div class="p-head"><span class="p-name">Professional</span><span class="p-tag">Đại lý Bạc &amp; Vàng</span></div>
      <div class="p-price tnum"><b>1.990.000đ</b><span>/tháng</span></div>
      <div class="p-desc">Trọn bộ Đại lý Bạc tích trữ &amp; Vàng kim hoàn.</div>
    </div>
    <ul class="p-list">
      <li>{ck_gold} Bạc tích trữ (Phú Quý, BTMH, Ancarat) &amp; Vàng</li>
      <li>{ck_gold} Vàng tuổi: cân trừ đá dơ, in tem 2 cánh TT22</li>
      <li>{ck_gold} Giữ giá chống trượt, sổ hẹn giao &amp; Bot Zalo</li>
    </ul>
  </div>

  <div class="p-card">
    <div>
      <div class="p-head"><span class="p-name">Business</span><span class="p-tag">Vàng bạc + Cầm đồ</span></div>
      <div class="p-price tnum"><b>2.990.000đ</b><span>/tháng</span></div>
      <div class="p-desc">Gộp trọn bộ Vàng bạc, Đại lý bạc &amp; Cầm đồ.</div>
    </div>
    <ul class="p-list">
      <li>{ck_green} Gồm trọn bộ tính năng của gói Professional</li>
      <li>{ck_green} Hợp đồng cầm đồ vàng bạc, tự tính lãi ngày</li>
      <li>{ck_green} Sơ đồ két – khay giữ đồ &amp; tự nhắc hạn Zalo</li>
    </ul>
  </div>

  <div class="p-card ent">
    <div>
      <div class="p-head"><span class="p-name">Enterprise</span><span class="p-tag">Chuỗi đa chi nhánh</span></div>
      <div class="p-price tnum"><b>Liên hệ báo giá</b></div>
      <div class="p-desc">Vận hành chuỗi nhiều cửa hàng, may đo theo yêu cầu.</div>
    </div>
    <ul class="p-list">
      <li>{ck_green} Quản lý chuỗi nhiều cửa hàng chung hệ thống</li>
      <li>{ck_green} Điều chuyển kho có biên bản &amp; đồng bộ MISA</li>
      <li>{ck_green} Máy chủ riêng, tuỳ chỉnh báo cáo theo chuỗi</li>
    </ul>
  </div>
</div>

<div class="ctarow">
  <div class="cta-btn">Dùng thử 14 ngày <span class="arr-circle">{icon("arrow", GOLD_BRIGHT, "2.6")}</span></div>
  <div class="note">Nhắn Zalo mở tài khoản chạy thử miễn phí,<br>cài xong nhân viên quen việc ngay trong 1 buổi.</div>
</div>

<div class="foot">
  <span>{icon("chat", GOLD_BRIGHT, "2.2")} Zalo <b class="tnum">{ZALO}</b></span>
  <span class="sep"></span>
  <span>{icon("globe", "#CBD5E1", "2")} {SITE}</span>
</div>
</body></html>"""


# ==============================================================================
# ẢNH BÌA FANPAGE FACEBOOK (1640×624) & ẢNH BÌA ZALO OA (1280×720)
# ==============================================================================
def html_bia_fanpage():
    """Kích thước 1640×624 (2× chuẩn 820×312).
    Vùng an toàn Mobile nằm trong x = 156..1484; góc trái dưới x < 380, y > 440 để trống
    cho Avatar tròn của Fanpage không che mất bất kỳ chữ hay số điện thoại nào."""
    ck = icon("check", "#059669", "2.8")
    return f"""<!doctype html><html><head><meta charset="utf-8">
{GOOGLE_FONTS_LINK}<style>
*{{box-sizing:border-box;margin:0;padding:0}}
html,body{{
  width:1640px;height:624px;overflow:hidden;position:relative;
  font-family:"Be Vietnam Pro",-apple-system,BlinkMacSystemFont,sans-serif;
  color:{NAVY};
  background:linear-gradient(180deg,#FFFFFF 0%,#FFFFFF 42%,#F2F6FD 72%,#E7EEF9 100%);
  -webkit-font-smoothing:antialiased;text-rendering:geometricPrecision;
}}
.tnum{{font-variant-numeric:tabular-nums;font-feature-settings:"tnum" 1}}
.desk{{
  position:absolute;left:0;right:0;top:486px;bottom:0;z-index:2;
  background:linear-gradient(180deg,#FFFFFF 0%,#F4F8FE 55%,#E9F0FA 100%);
  border-top:1px solid #D5E0F2;
}}
.decor{{position:absolute;inset:0;width:1640px;height:624px;pointer-events:none;z-index:1}}
.left-col{{
  position:absolute;left:168px;top:44px;width:670px;z-index:6;
}}
.brand-row{{display:flex;align-items:center;gap:18px}}
.logo{{
  display:inline-flex;align-items:center;gap:11px;
  font-weight:800;font-size:27px;letter-spacing:-0.025em;color:{NAVY};
}}
.logo img{{width:42px;height:42px;object-fit:contain}}
.logo span{{color:{GOLD_SOLID}}}
.p-pill{{
  background:linear-gradient(180deg,#102C88 0%,{NAVY} 100%);
  color:#FFFFFF;font-size:15.5px;font-weight:600;
  padding:8px 18px;border-radius:999px;
  box-shadow:0 8px 18px -8px rgba(10,33,107,0.35);
}}
.p-pill b{{color:{GOLD_BRIGHT};font-weight:800}}
.eyebrow{{
  margin-top:20px;display:flex;align-items:center;gap:10px;
  font-size:14px;font-weight:800;letter-spacing:0.105em;color:{GOLD_SOLID};text-transform:uppercase;
}}
.eyebrow:before{{content:"";width:32px;height:2.5px;background:{GOLD_SOLID};border-radius:2px}}
.h1{{
  margin-top:8px;font-size:38px;line-height:1.15;font-weight:800;
  text-transform:uppercase;letter-spacing:-0.022em;color:{NAVY};white-space:nowrap;
}}
.h1 b{{display:block;color:{GOLD_SOLID};font-weight:800}}
.sub{{
  margin-top:10px;font-size:17.2px;font-weight:500;color:#1E293B;line-height:1.42;max-width:610px;
}}
.badges{{
  margin-top:18px;display:grid;grid-template-columns:1fr 1fr;gap:10px 11px;width:592px;
}}
.b-item{{
  display:flex;align-items:center;gap:7px;
  background:#FFFFFF;border:1px solid #D5E1F2;border-radius:12px;
  padding:9px 12px;font-size:14.8px;font-weight:700;color:{NAVY};
  box-shadow:0 8px 16px -10px rgba(10,33,107,0.16);white-space:nowrap;
}}
.b-item svg{{width:16px;height:16px;flex:none}}

.mac-wrap{{
  position:absolute;left:876px;top:76px;width:632px;z-index:4;
}}
.mac-wrap img{{display:block;width:100%;height:auto}}

.mini-callout{{
  position:absolute;left:786px;top:316px;width:298px;z-index:8;
  background:#FFFFFF;border:2px solid {GOLD_BORDER};border-radius:16px;
  padding:20px 16px 12px;
  box-shadow:0 0 0 4px rgba(245,158,11,0.15),0 20px 38px -12px rgba(10,33,107,0.28);
}}
.mini-callout .mc-tag{{
  position:absolute;left:14px;top:-13px;
  background:{NAVY};color:#FFFFFF;border:1.5px solid {GOLD_BORDER};
  font-size:11px;font-weight:800;letter-spacing:0.05em;text-transform:uppercase;
  padding:4px 11px;border-radius:999px;display:inline-flex;align-items:center;gap:5px;
}}
.mini-callout .mc-tag svg{{width:11px;height:11px}}
.mini-callout .mc-title{{font-size:15.5px;font-weight:800;color:{NAVY};padding-bottom:7px;border-bottom:1px solid #E5EAF2}}
.mini-callout .mc-row{{display:flex;justify-content:space-between;align-items:baseline;padding-top:6px;font-size:14px;font-weight:600;color:#475569}}
.mini-callout .mc-row b{{font-size:17px;font-weight:800;color:#059669}}

/* Thanh liên hệ đặt từ x=392..1476 để tránh hoàn toàn vùng Avatar tròn góc trái dưới của Facebook */
.contact-bar{{
  position:absolute;left:392px;width:1084px;bottom:22px;height:56px;z-index:10;
  background:{NAVY};color:#FFFFFF;border-radius:999px;
  border:2px solid #F59E0B;
  display:flex;align-items:center;justify-content:space-between;
  padding:0 12px 0 28px;
  box-shadow:0 14px 28px -10px rgba(10,33,107,0.38);
}}
.contact-bar .cb-items{{display:flex;align-items:center;gap:28px;font-size:17.5px;font-weight:600}}
.contact-bar .cb-items span{{display:inline-flex;align-items:center;gap:8px}}
.contact-bar .cb-items svg{{width:19px;height:19px}}
.contact-bar .cb-items b{{color:{GOLD_BRIGHT};font-weight:800}}
.contact-bar .cb-cta{{
  background:linear-gradient(180deg,#FFD84D 0%,#F59300 100%);
  color:{NAVY_DEEP};font-size:15.5px;font-weight:800;text-transform:uppercase;
  padding:9px 22px;border-radius:999px;letter-spacing:0.02em;white-space:nowrap;
}}
</style></head><body>
<svg class="decor" viewBox="0 0 1640 624" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="1160" cy="310" r="260" stroke="#DCE5F4" stroke-width="1.2" stroke-dasharray="5 7"/>
  <circle cx="1160" cy="310" r="325" stroke="#E5ECF7" stroke-width="1"/>
  <path d="M140 36L164 14H360" stroke="#D5DFEE" stroke-width="1.25"/>
  <path d="M1500 36L1476 14H1280" stroke="#D5DFEE" stroke-width="1.25"/>
  <circle cx="360" cy="14" r="2.5" fill="#F59E0B"/>
  <circle cx="1280" cy="14" r="2.5" fill="#F59E0B"/>
</svg>
<div class="desk"></div>

<div class="left-col">
  <div class="brand-row">
    <div class="logo"><img src="file://{LOGO}">GoERP <span>Vàng Bạc</span></div>
    <div class="p-pill tnum">Dùng thử miễn phí <b>14 ngày</b></div>
  </div>
  <div class="eyebrow">Phần mềm tiệm vàng · đại lý bạc tích trữ · cầm đồ</div>
  <h1 class="h1">Quản gọn quầy vàng bạc,<b>chốt đơn không lo trượt giá</b></h1>
  <p class="sub">Thiết kế sát nghiệp vụ thực tế tại quầy Việt Nam — nhân viên quen việc ngay trong 1 buổi.</p>
  <div class="badges">
    <div class="b-item">{ck} Giữ nguyên giá lúc lên đơn</div>
    <div class="b-item">{ck} In tem 2 cánh Thông tư 22</div>
    <div class="b-item">{ck} Cân thu mua trừ đá, trừ dơ</div>
    <div class="b-item">{ck} Tự gửi bảng giá nhóm Zalo</div>
  </div>
</div>

<div class="mac-wrap"><img src="file://{ASSETS/'macbook-pro-full.png'}"></div>

<div class="mini-callout">
  <div class="mc-tag">{icon("lock", GOLD_BRIGHT, "2.4")} Giữ nguyên giá lúc chốt</div>
  <div class="mc-title">Bạc Thanh Long Phú Quý · 1 lượng</div>
  <div class="mc-row"><span>Giá chốt bán ra</span><b class="tnum">56.079.860đ</b></div>
  <div class="mc-row"><span>Trạng thái</span><b style="font-size:13.5px">✓ Chờ chuyển khoản</b></div>
</div>

<div class="contact-bar">
  <div class="cb-items">
    <span>{icon("chat", GOLD_BRIGHT, "2.2")} Zalo tư vấn: <b class="tnum">{ZALO}</b></span>
    <span>•</span>
    <span>{icon("globe", "#CBD5E1", "2")} {SITE}</span>
  </div>
  <div class="cb-cta">Dùng thử 14 ngày tận quầy →</div>
</div>
</body></html>"""


def html_bia_zalo_oa():
    """Kích thước 1280×720 (chuẩn 16:9 HD cho Hồ sơ Zalo Official Account)."""
    ck = icon("check", "#059669", "2.8")
    return f"""<!doctype html><html><head><meta charset="utf-8">
{GOOGLE_FONTS_LINK}<style>
*{{box-sizing:border-box;margin:0;padding:0}}
html,body{{
  width:1280px;height:720px;overflow:hidden;position:relative;
  font-family:"Be Vietnam Pro",-apple-system,BlinkMacSystemFont,sans-serif;
  color:{NAVY};
  background:linear-gradient(180deg,#FFFFFF 0%,#FFFFFF 40%,#F2F6FD 72%,#E7EEF9 100%);
  -webkit-font-smoothing:antialiased;text-rendering:geometricPrecision;
}}
.tnum{{font-variant-numeric:tabular-nums;font-feature-settings:"tnum" 1}}
.desk{{
  position:absolute;left:0;right:0;top:548px;bottom:56px;z-index:2;
  background:linear-gradient(180deg,#FFFFFF 0%,#EDF3FC 100%);
  border-top:1px solid #D5E0F2;
}}
.left-col{{position:absolute;left:60px;top:48px;width:548px;z-index:6}}
.logo{{
  display:inline-flex;align-items:center;gap:11px;
  font-weight:800;font-size:28px;letter-spacing:-0.025em;color:{NAVY};
}}
.logo img{{width:44px;height:44px;object-fit:contain}}
.logo span{{color:{GOLD_SOLID}}}
.eyebrow{{
  margin-top:26px;display:flex;align-items:center;gap:10px;
  font-size:14px;font-weight:800;letter-spacing:0.105em;color:{GOLD_SOLID};text-transform:uppercase;
}}
.eyebrow:before{{content:"";width:30px;height:2.5px;background:{GOLD_SOLID};border-radius:2px}}
.h1{{
  margin-top:10px;font-size:33.5px;line-height:1.16;font-weight:800;
  text-transform:uppercase;letter-spacing:-0.022em;color:{NAVY};white-space:nowrap;
}}
.h1 b{{display:block;color:{GOLD_SOLID};font-weight:800}}
.sub{{margin-top:12px;font-size:17.5px;font-weight:500;color:#1E293B;line-height:1.44}}
.list{{margin-top:22px;display:flex;flex-direction:column;gap:10px;width:524px}}
.l-item{{
  display:flex;align-items:center;gap:10px;
  background:#FFFFFF;border:1px solid #D5E1F2;border-radius:13px;
  padding:11px 15px;font-size:16px;font-weight:700;color:{NAVY};
  box-shadow:0 8px 18px -10px rgba(10,33,107,0.16);white-space:nowrap;
}}
.l-item svg{{width:18px;height:18px;flex:none}}

.mac-wrap{{position:absolute;left:628px;top:186px;width:612px;z-index:4}}
.mac-wrap img{{display:block;width:100%;height:auto}}
.top-pill{{
  position:absolute;right:56px;top:48px;z-index:6;
  background:linear-gradient(180deg,#102C88 0%,{NAVY} 100%);
  color:#FFFFFF;font-size:17px;font-weight:600;padding:10px 22px;border-radius:999px;
  box-shadow:0 10px 20px -8px rgba(10,33,107,0.35);
}}
.top-pill b{{color:{GOLD_BRIGHT};font-weight:800}}

.foot{{
  position:absolute;left:0;right:0;bottom:0;height:56px;z-index:10;
  background:{NAVY};color:#FFFFFF;border-top:3px solid #F59E0B;
  display:flex;align-items:center;justify-content:flex-end;gap:36px;
  padding:0 64px;font-size:19px;font-weight:600;
}}
.foot span{{display:inline-flex;align-items:center;gap:8px}}
.foot svg{{width:20px;height:20px}}
.foot b{{color:{GOLD_BRIGHT};font-weight:800}}
</style></head><body>
<div class="desk"></div>
<div class="top-pill tnum">Dùng thử <b>14 ngày</b> · Cài đặt tận quầy</div>

<div class="left-col">
  <div class="logo"><img src="file://{LOGO}">GoERP <span>Vàng Bạc</span></div>
  <div class="eyebrow">Tiệm vàng · đại lý bạc tích trữ · cầm đồ</div>
  <h1 class="h1">Giá nhảy liên tục,<b>chốt đơn không lo trượt giá</b></h1>
  <p class="sub">Giữ nguyên giá lúc lên đơn, in tem 2 cánh Thông tư 22,<br>cân thu mua trừ đá dơ và tự gửi bảng giá nhóm Zalo.</p>
  <div class="list">
    <div class="l-item">{ck} Chống trượt giá đơn bạc Phú Quý, BTMH, Ancarat</div>
    <div class="l-item">{ck} In tem trang sức 2 cánh &amp; thu cũ đổi mới tại quầy</div>
    <div class="l-item">{ck} Hợp đồng cầm đồ, sơ đồ két &amp; tự nhắc hạn qua Zalo</div>
  </div>
</div>

<div class="mac-wrap"><img src="file://{ASSETS/'macbook-pro-full.png'}"></div>

<div class="foot">
  <span>{icon("chat", GOLD_BRIGHT, "2.2")} Zalo tư vấn: <b class="tnum">{ZALO}</b></span>
  <span>•</span>
  <span>{icon("globe", "#CBD5E1", "2")} {SITE}</span>
</div>
</body></html>"""


CENTERED_NAMES = [
    "mau-1-dai-ly-bac-fb",
    "mau-2-in-tem-thong-tu-22-fb",
    "mau-3-thu-cu-doi-moi-fb",
    "mau-4-dat-hang-phu-quy-fb",
    "mau-5-bang-gia-zalo-fb",
    "mau-6-hieu-cam-do-fb",
    "mau-7-chu-tiem-lai-lo-fb",
    "mau-8-bang-gia-4-goi-fb",
]

BUILDERS = {
    "mau-1-dai-ly-bac-fb": html_mau_1_centered,
    "mau-2-in-tem-thong-tu-22-fb": html_mau_2_in_tem,
    "mau-3-thu-cu-doi-moi-fb": html_mau_3_thu_mua,
    "mau-4-dat-hang-phu-quy-fb": html_mau_4_dat_hang,
    "mau-5-bang-gia-zalo-fb": html_mau_5_bang_gia_zalo,
    "mau-6-hieu-cam-do-fb": html_mau_6_hieu_cam_do,
    "mau-7-chu-tiem-lai-lo-fb": html_mau_7_chu_tiem_lai_lo,
    "mau-8-bang-gia-4-goi-fb": html_mau_8_bang_gia,
}

COVER_BUILDERS = {
    "bia-fanpage-facebook": (html_bia_fanpage, (1640, 624)),
    "bia-zalo-oa": (html_bia_zalo_oa, (1280, 720)),
}


def _save_srgb(im: Image.Image, out_p: Path):
    save_kw = {"optimize": True}
    if _SRGB_BYTES:
        save_kw["icc_profile"] = _SRGB_BYTES
    im.save(out_p, **save_kw)


def build_sheets():
    if all((OUT / f"{n}.png").exists() for n in CENTERED_NAMES):
        # Bảng tổng quan đối xứng 4×2 gồm đủ 8 mẫu 1080×1080 (scale 720px/mẫu sắc nét)
        tile = 720
        pad = 32
        cols = 4
        w_sheet = cols * tile + (cols + 1) * pad
        h_sheet = 2 * tile + 3 * pad
        grid = Image.new("RGB", (w_sheet, h_sheet), (220, 229, 242))
        for idx, name in enumerate(CENTERED_NAMES):
            im = Image.open(OUT / f"{name}.png").convert("RGB").resize((tile, tile), Image.LANCZOS)
            r, c = divmod(idx, cols)
            x = pad + c * (tile + pad)
            y = pad + r * (tile + pad)
            grid.paste(im, (x, y))
        old_7 = OUT / "bo-7-mau-chinh-dien.png"
        if old_7.exists():
            old_7.unlink()
        out_grid = OUT / "bo-8-mau-chinh-dien.png"
        _save_srgb(grid, out_grid)
        print("Saved 8-poster sheet:", out_grid)


if __name__ == "__main__":
    only = sys.argv[1:]
    if only:
        sq_pages = {k: BUILDERS[k]() for k in only if k in BUILDERS}
        if sq_pages:
            render_pages_via_orca(sq_pages, OUT, (1080, 1080))
        for k in only:
            if k in COVER_BUILDERS:
                fn, sz = COVER_BUILDERS[k]
                render_pages_via_orca({k: fn()}, OUT, sz)
    else:
        render_pages_via_orca({k: BUILDERS[k]() for k in CENTERED_NAMES}, OUT, (1080, 1080))
        for k, (fn, sz) in COVER_BUILDERS.items():
            render_pages_via_orca({k: fn()}, OUT, sz)
    build_sheets()
