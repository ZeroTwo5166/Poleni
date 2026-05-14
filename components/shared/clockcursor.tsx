"use client"

import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion"

import { useEffect, useState } from "react"
import { useTheme } from "@/components/shared/themeProvider"

export default function Cursor() {
  const { theme } = useTheme()

  const [hovering, setHovering] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const x = useSpring(mouseX, {
    stiffness: 600,
    damping: 35,
  })

  const y = useSpring(mouseY, {
    stiffness: 600,
    damping: 35,
  })

  useEffect(() => {
    if (theme !== "light") return

    let raf = 0

    const move = (e: MouseEvent) => {
      cancelAnimationFrame(raf)

      raf = requestAnimationFrame(() => {
        mouseX.set(e.clientX)
        mouseY.set(e.clientY)
      })
    }

    const addHoverEvents = () => {
      const targets = document.querySelectorAll(
        "a, button, [data-cursor]"
      )

      targets.forEach((el) => {
        el.addEventListener("mouseenter", handleEnter)
        el.addEventListener("mouseleave", handleLeave)
      })

      return () => {
        targets.forEach((el) => {
          el.removeEventListener("mouseenter", handleEnter)
          el.removeEventListener("mouseleave", handleLeave)
        })
      }
    }

    const handleEnter = () => setHovering(true)
    const handleLeave = () => setHovering(false)

    window.addEventListener("mousemove", move, {
      passive: true,
    })

    const cleanupHover = addHoverEvents()

    return () => {
      cancelAnimationFrame(raf)

      window.removeEventListener("mousemove", move)

      cleanupHover()
    }
  }, [theme])

  if (theme !== "light") return null

  return (
    <motion.div
      className="fixed top-0 left-0 z-[99999] pointer-events-none mix-blend-difference"
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
        willChange: "transform",
      }}
      animate={{
        width:  100,
        height:  100,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
      }}
    >
      <div className="w-full h-full rounded-full bg-white" />
    </motion.div>
  )
}