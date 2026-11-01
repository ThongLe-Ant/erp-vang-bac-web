"use client"

import { useEffect, useRef, useState } from "react"

import { FEATURE_MODULES } from "./vb-shared"

export function VbFeaturesNav() {
  const [activeId, setActiveId] = useState<string>(FEATURE_MODULES[0].id)
  const navListRef = useRef<HTMLUListElement | null>(null)

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return
    const sectionIds = [...FEATURE_MODULES.map((m) => m.id), "so-sanh"]
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id)
        }
      },
      {
        rootMargin: "-140px 0px -55% 0px",
        threshold: 0,
      },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const container = navListRef.current
    if (!container) return
    const activePill = container.querySelector<HTMLElement>(
      `[data-nav-id="${activeId}"]`,
    )
    if (!activePill) return
    const targetLeft =
      activePill.offsetLeft -
      container.clientWidth / 2 +
      activePill.clientWidth / 2
    container.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: "smooth",
    })
  }, [activeId])

  return (
    <nav
      aria-label="Các chức năng"
      className="border-vb-border bg-vb-bg/95 sysdark:bg-vb-surface/90 sticky top-[76px] z-20 border-b backdrop-blur-md"
    >
      <ul
        ref={navListRef}
        className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8 [&::-webkit-scrollbar]:hidden"
      >
        {FEATURE_MODULES.map((m, idx) => {
          const Icon = m.icon
          const isActive = activeId === m.id
          return (
            <li key={m.id} className="shrink-0">
              <a
                href={`#${m.id}`}
                data-nav-id={m.id}
                aria-current={isActive ? "location" : undefined}
                onClick={() => setActiveId(m.id)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm transition-[background-color,border-color,color,transform] duration-150 active:scale-[0.98] ${
                  isActive
                    ? "border-vb-gold-deep text-vb-gold-deep sysdark:border-[#C99A2E] sysdark:bg-[#231B0B] sysdark:text-vb-gold-bright bg-[#FAF6EC] font-semibold"
                    : "border-vb-border-strong text-vb-body hover:border-vb-gold-deep hover:text-vb-gold-deep sysdark:hover:border-[#C99A2E] sysdark:hover:text-vb-gold-bright font-medium"
                }`}
              >
                <Icon className="text-vb-gold-deep sysdark:text-vb-gold-bright h-4 w-4 shrink-0" />
                <span className="tnum text-vb-subtle font-mono text-[11px]">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span>{m.name}</span>
              </a>
            </li>
          )
        })}
        <li className="shrink-0">
          <a
            href="#so-sanh"
            data-nav-id="so-sanh"
            aria-current={activeId === "so-sanh" ? "location" : undefined}
            onClick={() => setActiveId("so-sanh")}
            className={`inline-flex items-center rounded-full border px-3.5 py-2 text-sm font-semibold transition-[background-color,border-color,color,transform] duration-150 active:scale-[0.98] ${
              activeId === "so-sanh"
                ? "border-vb-gold-deep text-vb-gold-deep sysdark:border-[#C99A2E] sysdark:bg-[#231B0B] sysdark:text-vb-gold-bright bg-[#FAF6EC]"
                : "text-vb-gold-deep sysdark:text-vb-gold-bright border-transparent hover:underline"
            }`}
          >
            So sánh gói
          </a>
        </li>
      </ul>
    </nav>
  )
}
