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

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest("a, button, [data-cursor]")) setHovering(true)
    }
    const handleOut = (e: MouseEvent) => {
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

  if (!isDark) {
    // ---------------- LIGHT THEME: blend-difference circle ----------------
    const base = isCompact ? 64 : 100
    const hoverSize = isCompact ? 18 : 28

    return (
      <motion.div
        className="fixed top-0 left-0 z-[99999] pointer-events-none rounded-full bg-white mix-blend-difference"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          willChange: "transform",
        }}
        animate={{
          width: hovering ? hoverSize : base,
          height: hovering ? hoverSize : base,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    )
  }

  // ---------------- DARK THEME: glowing sun ----------------
  const ringBase = isCompact ? 46 : 70
  const ringHover = isCompact ? 14 : 20
  const glowBase = isCompact ? 76 : 110
  const glowHover = isCompact ? 22 : 32
  const coreBase = isCompact ? 26 : 40
  const coreHover = isCompact ? 10 : 14

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
      {/* Rotating dashed ring (rays) */}
      <motion.div
        className="absolute top-1/2 left-1/2 rounded-full"
        style={{
          translateX: "-50%",
          translateY: "-50%",
          border: "1.5px dashed rgba(255,205,110,0.55)",
        }}
        animate={{
          width: hovering ? ringHover : ringBase,
          height: hovering ? ringHover : ringBase,
          rotate: 360,
          opacity: hovering ? 0.8 : 0.45,
        }}
        transition={{
          width: { type: "spring", stiffness: 250, damping: 22 },
          height: { type: "spring", stiffness: 250, damping: 22 },
          opacity: { type: "spring", stiffness: 250, damping: 22 },
          rotate: { duration: 14, repeat: Infinity, ease: "linear" },
        }}
      />

      {/* Soft outer glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 rounded-full"
        style={{
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, rgba(255,214,120,0.5) 0%, rgba(255,170,60,0.2) 45%, transparent 75%)",
          filter: "blur(6px)",
        }}
        animate={{
          width: hovering ? glowHover : glowBase,
          height: hovering ? glowHover : glowBase,
          opacity: hovering ? 0.9 : 0.55,
        }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
      />

      {/* Bright sun core */}
      <motion.div
        className="absolute top-1/2 left-1/2 rounded-full"
        style={{
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, #fff7e0 0%, #ffd166 55%, #ff9f43 100%)",
        }}
        animate={{
          width: hovering ? coreHover : coreBase,
          height: hovering ? coreHover : coreBase,
          boxShadow: hovering
            ? "0 0 8px 2px rgba(255,209,102,0.95), 0 0 16px 4px rgba(255,159,67,0.55)"
            : "0 0 14px 3px rgba(255,209,102,0.8), 0 0 30px 8px rgba(255,159,67,0.35)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      />
    </motion.div>
  )
}