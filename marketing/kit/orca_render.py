"""Render HTML (1080×1080 hoặc 1080×1350) sang PNG độ nét Retina 2.0× nguyên bản
trực tiếp bằng trình duyệt tích hợp của Orca (`orca` CLI) — tuyệt đối không mở Google Chrome ngoài.

Khắc phục hoàn toàn lỗi nhòe subpixel: khi chiều ngang viewport >= chiều ngang thiết kế (`1238 >= 1080`),
giữ nguyên tỉ lệ CSS 1:1 (`transform: none`), chụp từng dải dọc ở đúng mật độ Retina 2× (`2160px` ngang),
ghép chính xác theo pixel vật lý rồi downsample chuẩn nguyên 2:1 (`2160 → 1080`)."""
import base64
import functools
import http.server
import json
import subprocess
import threading
import time
from io import BytesIO
from pathlib import Path
from PIL import Image, ImageCms, ImageFilter

ROOT = Path(__file__).resolve().parents[2]
_SRGB_ICC_PATH = Path("/System/Library/ColorSync/Profiles/sRGB Profile.icc")
_SRGB_BYTES = _SRGB_ICC_PATH.read_bytes() if _SRGB_ICC_PATH.exists() else None
_SRGB_PROF = ImageCms.ImageCmsProfile(BytesIO(_SRGB_BYTES)) if _SRGB_BYTES else ImageCms.createProfile("sRGB")


def _orca(*args) -> dict:
    out = subprocess.check_output(["orca", *args, "--json"], text=True)
    return json.loads(out)


def get_or_create_orca_tab() -> tuple[str, bool]:
    tabs = _orca("tab", "list").get("result", {}).get("tabs", [])
    for t in reversed(tabs):
        u = t.get("url") or ""
        if "127.0.0.1" in u or u in ("about:blank", ""):
            return t["browserPageId"], False
    created = _orca("tab", "create", "--url", "about:blank")
    return created["result"]["browserPageId"], True


class _QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass


def _take_png(page_id: str) -> Image.Image:
    shot = _orca("screenshot", "--page", page_id, "--format", "png")
    b64 = shot["result"]["data"].split(",", 1)[-1]
    raw = Image.open(BytesIO(base64.b64decode(b64)))
    icc = raw.info.get("icc_profile")
    rgb = raw.convert("RGB")
    if icc:
        try:
            src_prof = ImageCms.ImageCmsProfile(BytesIO(icc))
            rgb = ImageCms.profileToProfile(rgb, src_prof, _SRGB_PROF, outputMode="RGB")
        except Exception:
            pass
    return rgb


def render_pages_via_orca(pages: dict[str, str], out_dir: Path, size: tuple[int, int] = (1080, 1080)):
    """`pages`: dict {name: html_string} với kích thước thiết kế `size` (mặc định 1080×1080)."""
    out_dir.mkdir(parents=True, exist_ok=True)
    tmp_dir = out_dir / ".orca_tmp"
    tmp_dir.mkdir(parents=True, exist_ok=True)

    w, h = size
    for name, raw_html in pages.items():
        http_html = raw_html.replace(f"file://{ROOT}/", "/")
        inject_css = (
            "<style>"
            "::-webkit-scrollbar{display:none!important}"
            f"html,body{{width:{w}px!important;height:{h}px!important;overflow:hidden!important;margin:0!important}}"
            "</style>"
        )
        if "</head>" in http_html:
            wrapper = http_html.replace("</head>", inject_css + "</head>", 1)
        else:
            wrapper = inject_css + http_html
        (tmp_dir / f"{name}.html").write_text(wrapper, encoding="utf-8")

    handler = functools.partial(_QuietHandler, directory=str(ROOT))
    httpd = http.server.ThreadingHTTPServer(("127.0.0.1", 0), handler)
    port = httpd.server_address[1]
    thread = threading.Thread(target=httpd.serve_forever, daemon=True)
    thread.start()

    page_id, created_temp = get_or_create_orca_tab()
    rel_tmp = tmp_dir.relative_to(ROOT).as_posix()

    try:
        for name in pages:
            url = f"http://127.0.0.1:{port}/{rel_tmp}/{name}.html"
            subprocess.run(["orca", "goto", "--page", page_id, "--url", url], check=True, stdout=subprocess.DEVNULL)

            info = None
            for _ in range(45):
                res = _orca(
                    "eval",
                    "--page",
                    page_id,
                    "--expression",
                    "(() => { window.scrollTo(0, 0); const imgs = [...document.images]; "
                    "const fontsOk = !document.fonts || (document.fonts.status === 'loaded' && document.fonts.check('800 40px \"Be Vietnam Pro\"')); "
                    "const ok = imgs.every(i => i.complete && i.naturalWidth > 0) && fontsOk; "
                    "return JSON.stringify({ok, dpr: window.devicePixelRatio || 1, vw: window.innerWidth, vh: window.innerHeight}); })()",
                )
                val = res.get("result", {}).get("result")
                info = json.loads(val) if isinstance(val, str) else val
                if info and info.get("ok"):
                    break
                time.sleep(0.15)
            time.sleep(0.15)

            vw, vh = info["vw"], info["vh"]
            im0 = _take_png(page_id)
            dpr = float(info.get("dpr") or 2.0)
            vis_w = int(im0.width / dpr)
            vis_h = int(im0.height / dpr)
            px_per_css = dpr

            if vis_w >= 200 and vis_h >= 200:
                # Chế độ Native Retina 2.0× nguyên bản cho mọi kích thước khung trình duyệt Orca (kể cả khi thu hẹp split-pane)
                # Dịch chuyển nguyên pixel 2 chiều bằng translate(-sx, -sy), tuyệt đối không bị cắt lề hay scale lẻ!
                full_w = round(w * px_per_css)
                full_h = round(h * px_per_css)
                canvas = Image.new("RGB", (full_w, full_h), (255, 255, 255))

                step_x = max(160, min(w, vis_w - 16))
                step_y = max(160, min(h, vis_h - 16))

                xs = [0]
                while xs[-1] + step_x < w:
                    xs.append(min(xs[-1] + step_x, max(0, w - step_x)))
                ys = [0]
                while ys[-1] + step_y < h:
                    ys.append(min(ys[-1] + step_y, max(0, h - step_y)))

                for sy in ys:
                    for sx in xs:
                        if sx == 0 and sy == 0:
                            im_tile = im0
                        else:
                            _orca(
                                "eval",
                                "--page",
                                page_id,
                                "--expression",
                                f"(() => {{ document.body.style.transform = 'translate(-{sx}px, -{sy}px)'; return true; }})()",
                            )
                            time.sleep(0.14)
                            im_tile = _take_png(page_id)
                        start_x = round(sx * px_per_css)
                        start_y = round(sy * px_per_css)
                        need_w = min(full_w - start_x, im_tile.width)
                        need_h = min(full_h - start_y, im_tile.height)
                        if need_w > 0 and need_h > 0:
                            canvas.paste(im_tile.crop((0, 0, need_w, need_h)), (start_x, start_y))

                final_im = canvas.resize((w, h), Image.LANCZOS)
                # Khử nhẹ độ mềm của downsampling 2:1 chuẩn print export (không tạo viền halo)
                final_im = final_im.filter(ImageFilter.UnsharpMask(radius=0.55, percent=38, threshold=2))
                src_label = f"native {full_w}x{full_h}px -> {w}x{h}px"
            else:
                # Fallback nếu cửa sổ trình duyệt hẹp hơn thiết kế
                s = min((vw - 16) / w, (vh - 16) / h)
                _orca(
                    "eval",
                    "--page",
                    page_id,
                    "--expression",
                    f"(() => {{ document.body.style.transformOrigin='0 0'; document.body.style.transform='scale({s})'; return true; }})()",
                )
                time.sleep(0.15)
                im_s = _take_png(page_id)
                cw = round(w * s * px_per_css)
                ch = round(h * s * px_per_css)
                final_im = im_s.crop((0, 0, cw, ch)).resize((w, h), Image.LANCZOS)
                src_label = f"scaled {cw}x{ch}px -> {w}x{h}px"

            out_path = out_dir / f"{name}.png"
            save_kw = {"optimize": True}
            if _SRGB_BYTES:
                save_kw["icc_profile"] = _SRGB_BYTES
            final_im.save(out_path, **save_kw)
            print(f"Rendered via Orca Browser: {out_path} ({src_label})")
    finally:
        if created_temp:
            subprocess.run(["orca", "tab", "close", "--page", page_id], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        httpd.shutdown()
        for f in tmp_dir.glob("*.html"):
            f.unlink()
        try:
            tmp_dir.rmdir()
        except OSError:
            pass
