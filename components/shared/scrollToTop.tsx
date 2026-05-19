"use client"

import { useEffect } from "react"

export default function ScrollToTop() {
  useEffect(() => {
    // Disable the browser's automatic scroll restoration
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual"
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior })
  }, [])

  return null
}