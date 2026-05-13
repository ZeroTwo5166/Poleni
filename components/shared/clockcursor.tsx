"use client"

import { useEffect } from "react"
import { useTheme } from "@/components/shared/themeProvider"

export default function ClockCursor() {
  const { theme } = useTheme()

  useEffect(() => {
    if (theme !== "light") return

    let effect: any

    import("cursor-effects").then(({ clockCursor }) => {
      effect = new (clockCursor as any)({
        date: () => new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Copenhagen" })),
      })
    })

    return () => {
      effect?.destroy?.()
    }
  }, [theme])

  return null
}