"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

import { VbThemeToggle } from "./vb-theme-toggle"

/** Menu cho màn hình hẹp: thanh điều hướng ở đầu trang bị ẩn dưới md. */
export function VbMobileMenu({
  links,
  active,
}: {
  links: ReadonlyArray<{ href: string; label: string }>
  active?: string
}) {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="vb-mobile-menu"
        aria-label={open ? "Đóng menu" : "Mở menu"}
        onClick={() => setOpen((v) => !v)}
        className="text-vb-fg hover:bg-vb-surface inline-flex h-10 w-10 items-center justify-center rounded-md transition-[background-color,transform] duration-150 active:scale-95"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <nav
          id="vb-mobile-menu"
          aria-label="Điều hướng trang giới thiệu"
          className="border-vb-border bg-vb-card absolute inset-x-0 top-[calc(100%+8px)] rounded-2xl border px-4 pb-2 shadow-[0_12px_24px_-12px_rgba(11,18,32,0.25)]"
        >
          <ul className="divide-vb-border divide-y">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={close}
                  aria-current={active === l.label ? "page" : undefined}
                  className="text-vb-body aria-[current=page]:text-vb-gold block py-3 text-base font-medium aria-[current=page]:font-semibold"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/#dang-ky"
                onClick={close}
                className="text-vb-body block py-3 text-base font-medium"
              >
                Liên hệ tư vấn
              </Link>
            </li>
            <li className="flex items-center justify-between py-3">
              <span className="text-vb-body text-base font-medium">
                Giao diện
              </span>
              <VbThemeToggle />
            </li>
          </ul>
        </nav>
      )}
    </div>
  )
}
