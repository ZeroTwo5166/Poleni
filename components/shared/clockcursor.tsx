// components/shared/clockcursor.tsx
"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import { useEffect, useState } from "react"
import { useTheme } from "@/components/shared/themeProvider"
import { useIsCompactViewport } from "@/lib/useIsCompactViewport"

export default function ClockCursor() {
  const { theme } = useTheme()
  const isCompact = useIsCompactViewport()
  const [hovering, setHovering] = useState(false)
  const [overIframe, setOverIframe] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const x = useSpring(mouseX, { stiffness: 500, damping: 40 })
  const y = useSpring(mouseY, { stiffness: 500, damping: 40 })

  useEffect(() => {
    let raf = 0

    const move = (e: MouseEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        mouseX.set(e.clientX)
        mouseY.set(e.clientY)
      })
    }

    // Cross-origin iframes (e.g. the Calendly embed) are a separate browsing
    // context — mousemove inside them never reaches this document, so our
    // cursor would otherwise freeze mid-screen while the real system cursor
    // (visible inside the iframe, since our `cursor: none` can't reach it)
    // shows up on top. Hide ours for as long as the pointer is over one.
    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === "IFRAME") {
        setOverIframe(true)
        return
      }
      setOverIframe(false)
      if (target.closest("a, button, [data-cursor]")) setHovering(true)
    }
    const handleOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === "IFRAME") setOverIframe(false)
      const related = e.relatedTarget as HTMLElement | null
      if (!related || !related.closest("a, button, [data-cursor]")) setHovering(false)
    }

    window.addEventListener("mousemove", move, { passive: true })
    document.addEventListener("mouseover", handleOver)
    document.addEventListener("mouseout", handleOut)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("mousemove", move)
      document.removeEventListener("mouseover", handleOver)
      document.removeEventListener("mouseout", handleOut)
    }
  }, [])

  const isDark = theme === "dark"

  if (overIframe) return null

  if (!isDark) {
    // ---------------- LIGHT THEME: orbit ring — accent halo + core dot ----------------
    const ringBase  = isCompact ? 20 : 30
    const ringHover = isCompact ? 34 : 48
    const dotBase   = isCompact ? 5  : 6
    const dotHover  = isCompact ? 2  : 2

    return (
      <motion.div
        className="fixed top-0 left-0 z-[99999] pointer-events-none"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          willChange: "transform",
        }}
      >
        {/* Halo ring */}
        <motion.div
          className="absolute top-1/2 left-1/2 rounded-full"
          style={{
            translateX: "-50%",
            translateY: "-50%",
            border: "1.5px solid var(--accent)",
          }}
          animate={{
            width: hovering ? ringHover : ringBase,
            height: hovering ? ringHover : ringBase,
            background: hovering ? "var(--accent-soft)" : "rgba(0,0,0,0)",
            boxShadow: hovering
              ? "0 0 18px 2px var(--accent-soft)"
              : "0 0 8px 0px rgba(0,0,0,0)",
            opacity: hovering ? 1 : 0.85,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
        />

        {/* Core dot */}
        <motion.div
          className="absolute top-1/2 left-1/2 rounded-full"
          style={{
            translateX: "-50%",
            translateY: "-50%",
            background: "var(--accent)",
          }}
          animate={{
            width: hovering ? dotHover : dotBase,
            height: hovering ? dotHover : dotBase,
            opacity: hovering ? 0 : 1,
          }}
          transition={{ type: "spring", stiffness: 320, damping: 24 }}
        />
      </motion.div>
    )
  }

  // ---------------- DARK THEME: black hole (EHT 2019 palette) ----------------
  const diskBase = isCompact ? 50 : 76
  const diskHover = isCompact ? 16 : 22
  const photonBase = isCompact ? 34 : 52
  const photonHover = isCompact ? 12 : 16
  const coreBase = isCompact ? 22 : 34
  const coreHover = isCompact ? 8 : 12

  return (
    <motion.div
      className="fixed top-0 left-0 z-[99999] pointer-events-none"
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
        willChange: "transform",
      }}
    >
      {/* Accretion disk — swirling conic gradient, fast spin */}
      <motion.div
        className="absolute top-1/2 left-1/2 rounded-full"
        style={{
          translateX: "-50%",
          translateY: "-50%",
          background:
            "conic-gradient(from 0deg, rgba(255,240,200,0.95), rgba(255,170,60,0.85) 15%, rgba(230,90,30,0.7) 35%, rgba(140,20,10,0.55) 55%, rgba(230,90,30,0.7) 75%, rgba(255,170,60,0.85) 90%, rgba(255,240,200,0.95) 100%)",
          WebkitMask: "radial-gradient(circle, transparent 55%, black 60%, black 100%)",
          mask: "radial-gradient(circle, transparent 55%, black 60%, black 100%)",
        }}
        animate={{
          width: hovering ? diskHover : diskBase,
          height: hovering ? diskHover : diskBase,
          rotate: 360,
          opacity: hovering ? 0.95 : 0.8,
        }}
        transition={{
          width: { type: "spring", stiffness: 250, damping: 22 },
          height: { type: "spring", stiffness: 250, damping: 22 },
          opacity: { type: "spring", stiffness: 250, damping: 22 },
          rotate: { duration: 2.5, repeat: Infinity, ease: "linear" },
        }}
      />

      {/* Photon ring — thin bright edge just outside the event horizon */}
      <motion.div
        className="absolute top-1/2 left-1/2 rounded-full"
        style={{
          translateX: "-50%",
          translateY: "-50%",
          border: "1px solid rgba(255,225,180,0.85)",
          boxShadow: "0 0 8px 1px rgba(255,180,90,0.55)",
        }}
        animate={{
          width: hovering ? photonHover : photonBase,
          height: hovering ? photonHover : photonBase,
          opacity: hovering ? 0.9 : 0.65,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      />

      {/* Event horizon — the black core, swallowing light */}
      <motion.div
        className="absolute top-1/2 left-1/2 rounded-full bg-black"
        style={{
          translateX: "-50%",
          translateY: "-50%",
          boxShadow: "inset 0 0 10px 2px rgba(0,0,0,0.95), 0 0 14px 5px rgba(0,0,0,0.6)",
        }}
        animate={{
          width: hovering ? coreHover : coreBase,
          height: hovering ? coreHover : coreBase,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      />
    </motion.div>
  )
}