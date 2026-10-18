"use client"

import Script from "next/script"
import { useEffect } from "react"

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || ""
const GADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || ""
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || ""

const PRIMARY_GTAG_ID = GA_ID || GADS_ID

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
  }
}

export function VbAnalytics() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest("a")
      if (!target) return
      const href = target.getAttribute("href") || ""

      let channel: "zalo" | "phone" | "email" | null = null
      if (href.includes("zalo.me")) channel = "zalo"
      else if (href.startsWith("tel:")) channel = "phone"
      else if (href.startsWith("mailto:")) channel = "email"

      if (!channel) return

      if (typeof window.gtag === "function") {
        window.gtag("event", "vb_contact_click", {
          event_category: "engagement",
          event_label: channel,
          contact_channel: channel,
        })
      }
      if (typeof window.fbq === "function") {
        window.fbq("track", "Contact", { content_name: channel })
      }
    }

    document.addEventListener("click", onClick, { passive: true })
    return () => document.removeEventListener("click", onClick)
  }, [])

  return (
    <>
      {PRIMARY_GTAG_ID ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${PRIMARY_GTAG_ID}`}
            strategy="afterInteractive"
          />
          <Script id="vb-gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              ${GA_ID ? `gtag('config', '${GA_ID}');` : ""}
              ${GADS_ID ? `gtag('config', '${GADS_ID}');` : ""}
            `}
          </Script>
        </>
      ) : null}

      {FB_PIXEL_ID ? (
        <Script id="vb-fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${FB_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      ) : null}
    </>
  )
}
