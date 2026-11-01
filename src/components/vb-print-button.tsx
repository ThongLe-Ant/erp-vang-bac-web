"use client"

import { Printer } from "lucide-react"

export function VbPrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="border-vb-border-strong bg-vb-card text-vb-fg hover:border-vb-gold hover:text-vb-gold inline-flex items-center gap-1.5 rounded-md border px-4 py-2 text-xs font-semibold transition-[border-color,color,transform] duration-150 active:scale-[0.98]"
    >
      <Printer className="h-3.5 w-3.5" />
      In / Lưu PDF (A4)
    </button>
  )
}
