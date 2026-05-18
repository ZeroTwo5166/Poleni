"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import Solution from "@/components/home/solution"
import WhyPoleni from "@/components/home/whyPoleni"

/**
 * SolutionWhyPoleniWrapper
 *
 * Behavior:
 * 1. User scrolls down to this section — Solution is visible, sticky.
 * 2. As the user continues scrolling (scroll is locked to this section),
 *    WhyPoleni slides in from the right, covering Solution.
 * 3. Once WhyPoleni is fully in, scroll lock releases and normal scroll resumes.
 */
export default function SolutionWhyPoleniWrapper() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0) // 0 = Solution only, 1 = WhyPoleni fully in
  const [phase, setPhase] = useState<"before" | "active" | "after">("before")

  // Accumulated scroll delta while locked
  const accumulatedDelta = useRef(0)
  const isLocked = useRef(false)
  const touchStartY = useRef(0)

  // Total "virtual" scroll distance for the transition (px)
  const SCROLL_DISTANCE = 600

  const updateProgress = useCallback((delta: number) => {
    accumulatedDelta.current = Math.max(0, Math.min(SCROLL_DISTANCE, accumulatedDelta.current + delta))
    const p = accumulatedDelta.current / SCROLL_DISTANCE
    setProgress(p)

    if (p >= 1) {
      // Transition done → release lock
      isLocked.current = false
      setPhase("after")
    } else if (p <= 0) {
      // Scrolled back above → release lock
      isLocked.current = false
      setPhase("before")
    }
  }, [])

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    // ── Wheel handler ─────────────────────────────────────────────
    const handleWheel = (e: WheelEvent) => {
      if (!isLocked.current) return
      e.preventDefault()
      e.stopPropagation()
      updateProgress(e.deltaY)
    }

    // ── Touch handlers ────────────────────────────────────────────
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isLocked.current) return
      e.preventDefault()
      const delta = touchStartY.current - e.touches[0].clientY
      touchStartY.current = e.touches[0].clientY
      updateProgress(delta)
    }

    // ── Intersection Observer — activate lock when section enters viewport ──
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && phase === "before") {
          // Section scrolled into view from above
          const rect = wrapper.getBoundingClientRect()
          // Only lock when the section is near the top of the viewport
          if (rect.top <= 10 && rect.top >= -20) {
            isLocked.current = true
            setPhase("active")
          }
        }
      },
      { threshold: 0, rootMargin: "0px 0px -95% 0px" }
    )

    observer.observe(wrapper)

    // ── Scroll event to detect when to engage lock ────────────────
    const handleScroll = () => {
      if (!wrapper) return
      const rect = wrapper.getBoundingClientRect()

      if (phase === "before" && rect.top <= 1 && rect.top >= -50) {
        // User has scrolled the section to the top — engage lock
        isLocked.current = true
        accumulatedDelta.current = 0
        setPhase("active")
        // Snap scroll position so section sits exactly at top
        window.scrollTo({ top: wrapper.offsetTop, behavior: "instant" as ScrollBehavior })
      }

      if (phase === "after" && rect.top > 10) {
        // User scrolled back up past this section
        isLocked.current = false
        setPhase("before")
        accumulatedDelta.current = 0
        setProgress(0)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("wheel", handleWheel, { passive: false })
    window.addEventListener("touchstart", handleTouchStart, { passive: true })
    window.addEventListener("touchmove", handleTouchMove, { passive: false })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("wheel", handleWheel)
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchmove", handleTouchMove)
      observer.disconnect()
    }
  }, [phase, updateProgress])

  // WhyPoleni translateX: starts at 100% (off right), ends at 0%
  const whyX = `${(1 - progress) * 100}%`

  // Solution scales/fades slightly as WhyPoleni comes in
  const solutionScale = 1 - progress * 0.04
  const solutionBrightness = 1 - progress * 0.25

  return (
    <div
      ref={wrapperRef}
      style={{
        position: "relative",
        // Height: enough for the scroll lock to engage + the two sections
        height: phase === "after" ? "auto" : "100vh",
        overflow: "hidden",
      }}
    >
      {/* ── Solution (always rendered, slightly scales down) ─────── */}
      <div
        style={{
          position: phase === "after" ? "relative" : "sticky",
          top: 0,
          width: "100%",
          transform: `scale(${solutionScale})`,
          filter: `brightness(${solutionBrightness})`,
          transition: "transform 0.05s linear, filter 0.05s linear",
          transformOrigin: "center top",
          zIndex: 1,
          // Once after-phase, hide solution (WhyPoleni is on top)
          display: phase === "after" ? "none" : "block",
        }}
      >
        <Solution />
      </div>

      {/* ── WhyPoleni (slides in from right) ─────────────────────── */}
      {(phase === "active" || phase === "after") && (
        <div
          style={{
            position: phase === "after" ? "relative" : "fixed",
            top: phase === "after" ? "auto" : 0,
            left: 0,
            right: 0,
            bottom: phase === "after" ? "auto" : 0,
            transform: phase === "after" ? "none" : `translateX(${whyX})`,
            transition: "transform 0.05s linear",
            zIndex: 30,
            willChange: "transform",
            overflowX: "hidden",
          }}
        >
          <WhyPoleni />
        </div>
      )}
    </div>
  )
}