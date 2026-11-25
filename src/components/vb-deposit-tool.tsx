"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import {
  AlertTriangle,
  ArrowRight,
  Check,
  CheckCircle2,
  Copy,
  FileSpreadsheet,
  Plus,
  RotateCcw,
  Trash2,
  Upload,
} from "lucide-react"

import { trackVbToolEvent } from "./vb-analytics"
import {
  BOOK_DEMO_HREF,
  BookDemoBand,
  CONTACT,
  Eyebrow,
  GuideRails,
  HEADING_STYLE,
  RailMarks,
  VbFooter,
  VbHeader,
} from "./vb-shared"

interface DepositOrder {
  id: string
  orderCode: string
  customer: string
  orderedQty: number // Lượng đặt
  unitPrice: number // Đơn giá chốt (VNĐ / lượng)
  depositPaid: number // Tiền cọc / đã thu (VNĐ)
  deliveredQty: number // Số lượng đã giao
  refundedQty: number // Số lượng đã hoàn / hủy
  refundedCash: number // Tiền đã hoàn lại khách (VNĐ)
  dueDate: string // YYYY-MM-DD
}

const SAMPLE_ORDERS: DepositOrder[] = [
  {
    id: "1",
    orderCode: "HD-001",
    customer: "KH-01 (Cọc 10 lượng, giao 4, hoàn 2)",
    orderedQty: 10,
    unitPrice: 1250000,
    depositPaid: 8000000,
    deliveredQty: 4,
    refundedQty: 2,
    refundedCash: 1000000,
    dueDate: "2026-11-30",
  },
  {
    id: "2",
    orderCode: "HD-002",
    customer: "KH-02 (Trễ hẹn giao)",
    orderedQty: 5,
    unitPrice: 1240000,
    depositPaid: 6200000,
    deliveredQty: 2,
    refundedQty: 0,
    refundedCash: 0,
    dueDate: "2026-11-20",
  },
  {
    id: "3",
    orderCode: "HD-003",
    customer: "KH-03 (Lỗi giao vượt số đặt)",
    orderedQty: 5,
    unitPrice: 1260000,
    depositPaid: 3000000,
    deliveredQty: 4,
    refundedQty: 2,
    refundedCash: 1000000,
    dueDate: "2026-11-28",
  },
  {
    id: "4",
    orderCode: "HD-004",
    customer: "KH-04 (Đã giao đủ, còn thiếu tiền)",
    orderedQty: 10,
    unitPrice: 1230000,
    depositPaid: 10000000,
    deliveredQty: 10,
    refundedQty: 0,
    refundedCash: 0,
    dueDate: "2026-11-24",
  },
]

const FORMULA_VERSION = "GoERP-DepositAudit-v1.0"

function fmtNum(n: number) {
  return new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 2 }).format(n)
}

function fmtVnd(n: number) {
  return `${new Intl.NumberFormat("vi-VN").format(Math.round(n))}đ`
}

function parseCsvText(raw: string): DepositOrder[] {
  const lines = raw
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
  if (lines.length === 0) return []

  // Bỏ dòng tiêu đề nếu cột 3 không phải số
  const startIdx = Number.isNaN(Number(lines[0].split(/[,\t;]/)[2])) ? 1 : 0
  const parsed: DepositOrder[] = []

  for (let i = startIdx; i < lines.length; i++) {
    const cols = lines[i].split(/[,\t;]/).map((c) => c.trim())
    if (cols.length < 4) continue
    parsed.push({
      id: `${Date.now()}-${i}`,
      orderCode: cols[0] || `HD-${i + 1}`,
      customer: cols[1] || `KH-${i + 1}`,
      orderedQty: Math.max(0, Number(cols[2]) || 0),
      unitPrice: Math.max(0, Number(cols[3]) || 0),
      depositPaid: Math.max(0, Number(cols[4]) || 0),
      deliveredQty: Math.max(0, Number(cols[5]) || 0),
      refundedQty: Math.max(0, Number(cols[6]) || 0),
      refundedCash: Math.max(0, Number(cols[7]) || 0),
      dueDate: cols[8] || "2026-12-05",
    })
  }
  return parsed
}

export function VbDepositToolPage() {
  const [orders, setOrders] = useState<DepositOrder[]>(SAMPLE_ORDERS)
  const [todayRef, setTodayRef] = useState("2026-11-25")
  const [showCsvBox, setShowCsvBox] = useState(false)
  const [csvText, setCsvText] = useState(
    "ma_don,khach_hang,so_luong_dat,don_gia,tien_coc,da_giao,da_hoan_sl,da_hoan_tien,han_giao\nHD-101,KH-A,10,1250000,8000000,4,2,1000000,2026-11-30\nHD-102,KH-B,5,1260000,6300000,0,0,0,2026-11-22",
  )
  const [copied, setCopied] = useState(false)

  const analyzed = useMemo(() => {
    const rows = orders.map((o) => {
      const effectiveQty = o.orderedQty - o.refundedQty
      const remainingQty = o.orderedQty - o.deliveredQty - o.refundedQty
      const netDepositHeld = o.depositPaid - o.refundedCash
      const effectiveValue = Math.max(0, effectiveQty) * o.unitPrice
      const remainingCash = effectiveValue - netDepositHeld

      const issues: Array<{ level: "error" | "warn"; text: string }> = []
      if (o.deliveredQty + o.refundedQty > o.orderedQty) {
        issues.push({
          level: "error",
          text: `Giao + hoàn (${fmtNum(o.deliveredQty + o.refundedQty)}) vượt số đặt (${fmtNum(o.orderedQty)})`,
        })
      }
      if (o.refundedCash > o.depositPaid) {
        issues.push({
          level: "error",
          text: `Hoàn tiền (${fmtVnd(o.refundedCash)}) vượt tiền cọc đã thu (${fmtVnd(o.depositPaid)})`,
        })
      }
      if (remainingQty > 0 && o.dueDate && o.dueDate < todayRef) {
        issues.push({
          level: "warn",
          text: `Quá hạn giao (${o.dueDate}), còn phải giao ${fmtNum(remainingQty)} lượng`,
        })
      }
      if (remainingQty === 0 && remainingCash > 0) {
        issues.push({
          level: "warn",
          text: `Đã giao hết hàng nhưng còn thiếu ${fmtVnd(remainingCash)} chưa thu`,
        })
      }
      if (remainingCash < 0) {
        issues.push({
          level: "warn",
          text: `Thu dư / cần hoàn lại khách ${fmtVnd(Math.abs(remainingCash))}`,
        })
      }

      return {
        ...o,
        effectiveQty,
        remainingQty,
        netDepositHeld,
        effectiveValue,
        remainingCash,
        issues,
      }
    })

    const totalOpenOrders = rows.filter(
      (r) => r.remainingQty > 0 || r.remainingCash !== 0,
    ).length
    const totalRemainingQty = rows.reduce(
      (acc, r) => acc + Math.max(0, r.remainingQty),
      0,
    )
    const totalRemainingReceivable = rows.reduce(
      (acc, r) => acc + Math.max(0, r.remainingCash),
      0,
    )
    const totalRefundDue = rows.reduce(
      (acc, r) => acc + Math.max(0, -r.remainingCash),
      0,
    )
    const issueOrderCount = rows.filter((r) => r.issues.length > 0).length

    return {
      rows,
      totalOpenOrders,
      totalRemainingQty,
      totalRemainingReceivable,
      totalRefundDue,
      issueOrderCount,
    }
  }, [orders, todayRef])

  function updateOrder<K extends keyof DepositOrder>(
    id: string,
    key: K,
    val: DepositOrder[K],
  ) {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, [key]: val } : o)),
    )
  }

  function addOrder() {
    const nextNum = orders.length + 1
    setOrders((prev) => [
      ...prev,
      {
        id: `${Date.now()}`,
        orderCode: `HD-00${nextNum}`,
        customer: `KH-0${nextNum}`,
        orderedQty: 5,
        unitPrice: 1250000,
        depositPaid: 2000000,
        deliveredQty: 0,
        refundedQty: 0,
        refundedCash: 0,
        dueDate: "2026-12-05",
      },
    ])
  }

  function removeOrder(id: string) {
    setOrders((prev) => prev.filter((o) => o.id !== id))
  }

  function applyCsv() {
    const imported = parseCsvText(csvText)
    if (imported.length > 0) {
      setOrders(imported)
      setShowCsvBox(false)
      trackVbToolEvent("deposit_ledger_checker", "import_csv")
    }
  }

  function handleCopyReport() {
    const lines = [
      `BIÊN BẢN RÀ SOÁT SỔ CỌC HẸN GIAO (${FORMULA_VERSION} · Ngày đối chiếu: ${todayRef})`,
      `Tổng đơn kiểm tra: ${analyzed.rows.length} | Đơn còn nghĩa vụ: ${analyzed.totalOpenOrders} | Đơn có cảnh báo: ${analyzed.issueOrderCount}`,
      `Tổng hàng còn phải giao: ${fmtNum(analyzed.totalRemainingQty)} lượng`,
      `Tổng tiền còn phải thu: ${fmtVnd(analyzed.totalRemainingReceivable)}` +
        (analyzed.totalRefundDue > 0
          ? ` | Cần hoàn lại khách: ${fmtVnd(analyzed.totalRefundDue)}`
          : ""),
      "--- Chi tiết từng đơn ---",
      ...analyzed.rows.map(
        (r) =>
          `- ${r.orderCode} (${r.customer}): Còn giao ${fmtNum(r.remainingQty)} lượng | ` +
          (r.remainingCash >= 0
            ? `Còn thu ${fmtVnd(r.remainingCash)}`
            : `Cần hoàn ${fmtVnd(Math.abs(r.remainingCash))}`) +
          (r.issues.length > 0
            ? ` [Cảnh báo: ${r.issues.map((i) => i.text).join("; ")}]`
            : " [Khớp]"),
      ),
      "Nguồn: https://vangbac.goplus.vn/cong-cu/kiem-tra-so-coc (xử lý 100% tại trình duyệt)",
    ].join("\n")

    void navigator.clipboard?.writeText(lines).then(() => {
      setCopied(true)
      trackVbToolEvent("deposit_ledger_checker", "copy_report")
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="bg-vb-bg text-vb-fg min-h-dvh antialiased">
      <VbHeader active="Cẩm nang" />

      <div>
        <div aria-hidden="true" className="h-[76px]" />
        <div className="relative overflow-x-clip">
          <GuideRails />

          {/* Header */}
          <section className="border-vb-border relative border-b pt-10 pb-8 lg:pt-14 lg:pb-10">
            <RailMarks />
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl">
                <Eyebrow index="01">Công cụ miễn phí cho Đại lý Bạc &amp; Tiệm Vàng</Eyebrow>
                <h1
                  className="text-vb-fg mt-2.5 font-semibold tracking-[-0.02em] [text-wrap:balance]"
                  style={HEADING_STYLE}
                >
                  Kiểm tra sổ cọc hẹn giao: Lọc nhanh đơn giao từng phần, hoàn cọc &amp; lệch công nợ
                </h1>
                <p className="text-vb-body mt-3 text-sm leading-relaxed sm:text-base">
                  Nhập trực tiếp hoặc dán bảng Excel/CSV đã ẩn danh để tính ngay
                  nghĩa vụ hàng còn phải giao, số tiền còn phải thu/hoàn lại và
                  phát hiện sớm các đơn quá hạn hoặc lỗi cộng trừ sổ tay.
                </p>
                <p className="text-vb-subtle mt-2 font-mono text-xs">
                  Bảo mật tuyệt đối: 100% tính toán chạy ngay trên trình duyệt,
                  không gửi số liệu sổ cọc lên máy chủ · Phiên bản{" "}
                  {FORMULA_VERSION}
                </p>
              </div>
            </div>
          </section>

          {/* Summary KPIs + Controls */}
          <section className="border-vb-border relative border-b py-8 lg:py-10">
            <RailMarks />
            <div className="mx-auto max-w-6xl space-y-6 px-4 sm:px-6 lg:px-8">
              {/* 4 KPI boxes */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="border-vb-border bg-vb-surface rounded-xl border p-4">
                  <p className="text-vb-subtle font-mono text-[11px] uppercase">
                    Đơn còn nghĩa vụ
                  </p>
                  <p className="tnum text-vb-fg mt-1 font-mono text-2xl font-bold">
                    {analyzed.totalOpenOrders} / {analyzed.rows.length}
                  </p>
                </div>
                <div className="border-vb-border bg-vb-surface rounded-xl border p-4">
                  <p className="text-vb-subtle font-mono text-[11px] uppercase">
                    Hàng còn phải giao
                  </p>
                  <p className="tnum text-vb-gold mt-1 font-mono text-2xl font-bold">
                    {fmtNum(analyzed.totalRemainingQty)} lượng
                  </p>
                </div>
                <div className="border-vb-border bg-vb-surface rounded-xl border p-4">
                  <p className="text-vb-subtle font-mono text-[11px] uppercase">
                    Tiền còn phải thu
                  </p>
                  <p className="tnum text-vb-fg mt-1 font-mono text-2xl font-bold">
                    {fmtVnd(analyzed.totalRemainingReceivable)}
                  </p>
                  {analyzed.totalRefundDue > 0 ? (
                    <p className="tnum font-mono text-[11px] text-[#D97706]">
                      Cần hoàn khách: {fmtVnd(analyzed.totalRefundDue)}
                    </p>
                  ) : null}
                </div>
                <div className="border-vb-border bg-vb-surface rounded-xl border p-4">
                  <p className="text-vb-subtle font-mono text-[11px] uppercase">
                    Đơn có cảnh báo
                  </p>
                  <p
                    className={`tnum mt-1 font-mono text-2xl font-bold ${
                      analyzed.issueOrderCount > 0
                        ? "text-[#DC2626]"
                        : "text-[#16A34A]"
                    }`}
                  >
                    {analyzed.issueOrderCount} đơn
                  </p>
                </div>
              </div>

              {/* Action bar */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={addOrder}
                    className="bg-vb-navy hover:bg-vb-navy-hover sysdark:bg-[#C99A2E] sysdark:text-[#0B1220] inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold text-white transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Thêm dòng đơn
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCsvBox((v) => !v)}
                    className="border-vb-border bg-vb-surface text-vb-fg hover:border-vb-gold inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-xs font-semibold transition-colors"
                  >
                    <Upload className="h-3.5 w-3.5" />
                    Dán nhanh từ Excel / CSV
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrders(SAMPLE_ORDERS)}
                    className="border-vb-border bg-vb-surface text-vb-body hover:text-vb-gold inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Dữ liệu mẫu
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <label className="text-vb-subtle flex items-center gap-2 font-mono text-xs">
                    Ngày đối chiếu:
                    <input
                      type="date"
                      value={todayRef}
                      onChange={(e) => setTodayRef(e.target.value)}
                      className="border-vb-border bg-vb-surface text-vb-fg rounded-md border px-2 py-1 font-mono text-xs"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={handleCopyReport}
                    className="border-vb-border bg-vb-surface text-vb-fg hover:border-vb-gold inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-xs font-semibold"
                  >
                    {copied ? (
                      <Check className="h-3.5 w-3.5 text-[#16A34A]" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                    {copied ? "Đã chép biên bản" : "Sao chép biên bản rà soát"}
                  </button>
                </div>
              </div>

              {/* CSV Paste Box */}
              {showCsvBox ? (
                <div className="border-vb-border bg-vb-surface rounded-xl border p-4">
                  <p className="text-vb-fg text-xs font-semibold">
                    Dán dữ liệu CSV hoặc copy từ Excel (9 cột cách nhau bằng dấu
                    phẩy hoặc Tab):
                  </p>
                  <p className="text-vb-subtle mt-0.5 font-mono text-[11px]">
                    ma_don, khach_hang, so_luong_dat, don_gia, tien_coc,
                    da_giao, da_hoan_sl, da_hoan_tien, han_giao (YYYY-MM-DD)
                  </p>
                  <textarea
                    rows={4}
                    value={csvText}
                    onChange={(e) => setCsvText(e.target.value)}
                    className="border-vb-border bg-vb-bg text-vb-fg mt-2 w-full rounded-lg border p-2.5 font-mono text-xs"
                  />
                  <div className="mt-2 flex gap-2">
                    <button
                      type="button"
                      onClick={applyCsv}
                      className="bg-vb-navy sysdark:bg-[#C99A2E] sysdark:text-[#0B1220] rounded-md px-3.5 py-1.5 text-xs font-semibold text-white"
                    >
                      Nạp vào bảng kiểm tra
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCsvBox(false)}
                      className="text-vb-subtle px-3 py-1.5 text-xs hover:underline"
                    >
                      Đóng
                    </button>
                  </div>
                </div>
              ) : null}

              {/* Editable Table */}
              <div className="border-vb-border overflow-x-auto rounded-xl border">
                <table className="w-full min-w-[960px] text-left text-xs">
                  <thead className="border-vb-border bg-vb-surface text-vb-subtle border-b font-mono text-[11px] uppercase">
                    <tr>
                      <th className="px-3 py-3">Mã đơn / Khách</th>
                      <th className="px-2 py-3 text-right">Đặt (lượng)</th>
                      <th className="px-2 py-3 text-right">Đơn giá chốt</th>
                      <th className="px-2 py-3 text-right">Đã cọc/thu</th>
                      <th className="px-2 py-3 text-right">Đã giao</th>
                      <th className="px-2 py-3 text-right">Hoàn SL</th>
                      <th className="px-2 py-3 text-right">Đã hoàn tiền</th>
                      <th className="px-2 py-3">Hạn giao</th>
                      <th className="px-3 py-3 text-right">
                        Kết quả còn phải giao / thu
                      </th>
                      <th className="px-2 py-3" />
                    </tr>
                  </thead>
                  <tbody className="divide-vb-border divide-y">
                    {analyzed.rows.map((r) => (
                      <tr key={r.id} className="align-top">
                        <td className="px-3 py-2.5">
                          <input
                            value={r.orderCode}
                            onChange={(e) =>
                              updateOrder(r.id, "orderCode", e.target.value)
                            }
                            className="border-vb-border bg-vb-bg text-vb-fg w-24 rounded border px-1.5 py-1 font-mono text-xs font-semibold"
                          />
                          <input
                            value={r.customer}
                            onChange={(e) =>
                              updateOrder(r.id, "customer", e.target.value)
                            }
                            className="border-vb-border bg-vb-bg text-vb-body mt-1 block w-44 rounded border px-1.5 py-1 text-xs"
                          />
                        </td>
                        <td className="px-2 py-2.5 text-right">
                          <input
                            type="number"
                            min={0}
                            step="0.5"
                            value={r.orderedQty}
                            onChange={(e) =>
                              updateOrder(
                                r.id,
                                "orderedQty",
                                Math.max(0, Number(e.target.value) || 0),
                              )
                            }
                            className="tnum border-vb-border bg-vb-bg text-vb-fg w-16 rounded border px-1.5 py-1 text-right font-mono"
                          />
                        </td>
                        <td className="px-2 py-2.5 text-right">
                          <input
                            type="number"
                            min={0}
                            step={10000}
                            value={r.unitPrice}
                            onChange={(e) =>
                              updateOrder(
                                r.id,
                                "unitPrice",
                                Math.max(0, Number(e.target.value) || 0),
                              )
                            }
                            className="tnum border-vb-border bg-vb-bg text-vb-fg w-24 rounded border px-1.5 py-1 text-right font-mono"
                          />
                        </td>
                        <td className="px-2 py-2.5 text-right">
                          <input
                            type="number"
                            min={0}
                            step={100000}
                            value={r.depositPaid}
                            onChange={(e) =>
                              updateOrder(
                                r.id,
                                "depositPaid",
                                Math.max(0, Number(e.target.value) || 0),
                              )
                            }
                            className="tnum border-vb-border bg-vb-bg text-vb-fg w-24 rounded border px-1.5 py-1 text-right font-mono"
                          />
                        </td>
                        <td className="px-2 py-2.5 text-right">
                          <input
                            type="number"
                            min={0}
                            step="0.5"
                            value={r.deliveredQty}
                            onChange={(e) =>
                              updateOrder(
                                r.id,
                                "deliveredQty",
                                Math.max(0, Number(e.target.value) || 0),
                              )
                            }
                            className="tnum border-vb-border bg-vb-bg text-vb-fg w-16 rounded border px-1.5 py-1 text-right font-mono"
                          />
                        </td>
                        <td className="px-2 py-2.5 text-right">
                          <input
                            type="number"
                            min={0}
                            step="0.5"
                            value={r.refundedQty}
                            onChange={(e) =>
                              updateOrder(
                                r.id,
                                "refundedQty",
                                Math.max(0, Number(e.target.value) || 0),
                              )
                            }
                            className="tnum border-vb-border bg-vb-bg text-vb-fg w-16 rounded border px-1.5 py-1 text-right font-mono"
                          />
                        </td>
                        <td className="px-2 py-2.5 text-right">
                          <input
                            type="number"
                            min={0}
                            step={100000}
                            value={r.refundedCash}
                            onChange={(e) =>
                              updateOrder(
                                r.id,
                                "refundedCash",
                                Math.max(0, Number(e.target.value) || 0),
                              )
                            }
                            className="tnum border-vb-border bg-vb-bg text-vb-fg w-24 rounded border px-1.5 py-1 text-right font-mono"
                          />
                        </td>
                        <td className="px-2 py-2.5">
                          <input
                            type="date"
                            value={r.dueDate}
                            onChange={(e) =>
                              updateOrder(r.id, "dueDate", e.target.value)
                            }
                            className="border-vb-border bg-vb-bg text-vb-fg rounded border px-1.5 py-1 font-mono text-[11px]"
                          />
                        </td>
                        <td className="px-3 py-2.5 text-right">
                          <div className="tnum text-vb-fg font-mono font-semibold">
                            Giao: {fmtNum(r.remainingQty)} lượng
                          </div>
                          <div
                            className={`tnum font-mono font-semibold ${
                              r.remainingCash < 0
                                ? "text-[#D97706]"
                                : "text-vb-gold"
                            }`}
                          >
                            {r.remainingCash >= 0
                              ? `Thu: ${fmtVnd(r.remainingCash)}`
                              : `Hoàn: ${fmtVnd(Math.abs(r.remainingCash))}`}
                          </div>
                          {r.issues.length > 0 ? (
                            <div className="mt-1 space-y-1 text-left">
                              {r.issues.map((iss) => (
                                <p
                                  key={iss.text}
                                  className={`flex items-start gap-1 text-[11px] font-medium ${
                                    iss.level === "error"
                                      ? "text-[#DC2626]"
                                      : "text-[#D97706]"
                                  }`}
                                >
                                  <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0" />
                                  <span>{iss.text}</span>
                                </p>
                              ))}
                            </div>
                          ) : (
                            <p className="mt-1 inline-flex items-center gap-1 text-[11px] text-[#16A34A]">
                              <CheckCircle2 className="h-3 w-3" />
                              Khớp số
                            </p>
                          )}
                        </td>
                        <td className="px-2 py-2.5 text-right">
                          <button
                            type="button"
                            onClick={() => removeOrder(r.id)}
                            aria-label={`Xoá ${r.orderCode}`}
                            className="text-vb-subtle p-1 hover:text-[#DC2626]"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Natural demo CTA */}
              <div className="border-vb-border bg-vb-surface flex flex-col gap-4 rounded-xl border p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-vb-fg text-sm font-semibold">
                    Muốn tự động theo dõi nhận cọc → hẹn giao → giao từng phần →
                    mua lại hợp đồng mà không cộng Excel tay?
                  </p>
                  <p className="text-vb-body mt-1 text-xs leading-relaxed">
                    Đặt buổi demo 15 phút (dùng số liệu mẫu, không cần gửi sổ
                    thật) để xem luồng khoá giá POS và đối chiếu nghĩa vụ cuối
                    ngày trên ERP Vàng Bạc.
                  </p>
                </div>
                <div className="flex shrink-0 flex-wrap gap-2">
                  <a
                    href={CONTACT.zalo}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackVbToolEvent("deposit_ledger_checker", "cta_zalo")
                    }
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#C99A2E] px-4 py-2.5 text-xs font-semibold text-[#0B1220] transition-colors hover:bg-[#D9B24E]"
                  >
                    Nhắn Zalo hẹn demo 15 phút
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                  <Link
                    href={BOOK_DEMO_HREF}
                    className="border-vb-border bg-vb-bg text-vb-fg hover:border-vb-gold inline-flex items-center gap-1.5 rounded-full border px-4 py-2.5 text-xs font-semibold"
                  >
                    Xem biểu phí &amp; dùng thử 14 ngày
                  </Link>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs">
                <Link
                  href="/cam-nang/van-hanh-dai-ly-bac-tich-tru-phu-quy-btmh-ancarat"
                  className="text-vb-gold inline-flex items-center gap-1.5 font-medium hover:underline"
                >
                  <FileSpreadsheet className="h-3.5 w-3.5" />
                  Đọc cẩm nang vận hành đại lý bạc tích trữ &amp; hợp đồng hẹn
                  giao
                </Link>
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
