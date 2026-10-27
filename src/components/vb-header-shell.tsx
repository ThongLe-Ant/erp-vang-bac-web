"use client"

import { useEffect, useState } from "react"

import type { ReactNode } from "react"

/**
 * Khung thanh đầu trang dạng nổi bo tròn: nằm đè lên nội dung (cao 0 trong
 * luồng trang), cách mép trên 12px; cuộn xuống thì thu hẹp lại và đậm nền hơn.
 */
export function VbHeaderShell({
  wide,
  children,
}: {
  wide: boolean
  children: ReactNode
}) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const width = scrolled ? "max-w-5xl" : wide ? "max-w-[1400px]" : "max-w-6xl"

  return (
    <div className="sticky top-0 z-30 h-0">
      <div className="px-3 pt-3 sm:px-4">
        <header
          className={`relative mx-auto flex h-14 ${width} items-center justify-between gap-4 rounded-2xl border px-3 pl-4 transition-[max-width,background-color,border-color,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-4 sm:pl-5 ${
            scrolled
              ? "border-vb-border-strong sysdark:bg-[#0E1014]/90 sysdark:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.45)] bg-vb-card/94 shadow-[0_12px_32px_-12px_rgba(11,18,32,0.22)] backdrop-blur-md"
              : "sysdark:border-white/12 sysdark:bg-[#0E1014]/90 sysdark:shadow-[0_8px_24px_-14px_rgba(0,0,0,0.4)] border-white/70 bg-white/95 shadow-[0_8px_24px_-14px_rgba(11,18,32,0.28)] backdrop-blur-sm"
          }`}
        >
          {children}
        </header>
      </div>
    </div>
  )
}
