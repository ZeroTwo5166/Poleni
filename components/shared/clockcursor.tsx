"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "@/components/shared/themeProvider"
import { usePathname } from "next/navigation"

export default function ClockCursor() {
  const { theme }      = useTheme()
  const pathname       = usePathname()
  const isFirstMount   = useRef(true)

  useEffect(() => {
    if (theme !== "light") return

    let effect: any

    // Only delay on first mount on homepage (preloader is showing)
    // Theme switches and other pages get the cursor immediately
    const delay = isFirstMount.current && pathname === "/" ? 1400 : 0
    isFirstMount.current = false

    const timer = setTimeout(() => {
      import("cursor-effects").then(({ clockCursor }) => {
        effect = new (clockCursor as any)({
          date: () =>
            new Date(
              new Date().toLocaleString("en-US", {
                timeZone: "Europe/Copenhagen",
              })
            ),
        })

        setTimeout(() => {
          document.querySelectorAll("canvas").forEach((el) => {
            el.style.zIndex        = "99999"
            el.style.pointerEvents = "none"
            el.style.position      = "fixed"
          })
        }, 100)
      })
    }, delay)

    return () => {
      clearTimeout(timer)
      effect?.destroy?.()
    }
  }, [theme])

  return null
}