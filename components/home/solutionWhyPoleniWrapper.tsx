"use client"

import { useRef, useEffect, useState } from "react"
import Solution from "@/components/home/solution"
import WhyPoleni from "@/components/home/whyPoleni"
import { useIsCompactViewport } from "@/lib/useIsCompactViewport"

// Cubic ease-in-out: makes motion feel physical, not mechanical
function easeInOut(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

// Clamp + remap a value from [inMin,inMax] → [outMin,outMax]
function remap(v: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  const t = Math.max(0, Math.min(1, (v - inMin) / (inMax - inMin)))
  return outMin + easeInOut(t) * (outMax - outMin)
}

export default function SolutionWhyPoleniWrapper() {
  const outerRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const isCompact = useIsCompactViewport()

  useEffect(() => {
    const outer = outerRef.current
    if (!outer) return

    const onScroll = () => {
      const vh = window.innerHeight
      const top = outer.getBoundingClientRect().top
      // progress 0→1 over the second 100vh of the 200vh scroll space
      const p = Math.max(0, Math.min(1, -top / vh))
      setProgress(p)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // ── Solution: push back, dim, blur ──────────────────────────────────────
  // Starts moving at p=0.1 so there's a beat before anything happens
  const solutionScale   = remap(progress, 0.05, 0.7, 1,    0.88)
  const solutionOpacity = remap(progress, 0.05, 0.65, 1,   0)
  const solutionBlur    = remap(progress, 0.05, 0.65, 0,   14)
  const solutionY       = remap(progress, 0.05, 0.7,  0,   60)

  // ── WhyPoleni: slam in from the left with overshoot feel ────────────────
  // Starts at -110vw so there's real distance. Easing curve does the heavy lifting.
  const whyXPct   = remap(progress, 0.2,  1,   -110, 0)
  const whyScale  = remap(progress, 0.2,  0.85, 0.92, 1)
  const whyOpacity= remap(progress, 0.15, 0.55,  0,   1)

  // ── Sweep overlay: a dark curtain that crosses the screen mid-transition ─
  // Peaks at progress=0.5 and fades out, giving a cinematic "wipe" weight
  const overlayOpacity = progress < 0.5
    ? remap(progress, 0.1, 0.5,  0, 0.55)
    : remap(progress, 0.5, 0.85, 0.55, 0)

  // Below laptop/tablet size the pin technique doesn't fit reliably —
  // fall back to normal stacked flow (each section handles its own reveal).
  if (isCompact) {
    return (
      <>
        <Solution />
        <WhyPoleni />
      </>
    )
  }

  return (
    <div style={{ height: "200vh" }}>
      <div ref={outerRef} style={{ position: "relative", height: "200vh" }}>

        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
          }}
        >

          {/* ── Solution — pushes away into depth ── */}
          <div
            style={{
              position: "absolute",
              top: 0, left: 0,
              width: "100vw", height: "100vh",
              zIndex: 1,
              opacity: solutionOpacity,
              transform: `scale(${solutionScale}) translateY(${solutionY}px)`,
              filter: `blur(${solutionBlur}px)`,
              willChange: "transform, opacity, filter",
              pointerEvents: progress > 0.45 ? "none" : "auto",
            }}
          >
            <Solution />
          </div>

          {/* ── WhyPoleni — slams in from left with mass ── */}
          <div
            style={{
              position: "absolute",
              top: 0, left: 0,
              width: "100vw", height: "100vh",
              zIndex: 2,
              transform: `translateX(${whyXPct}vw) scale(${whyScale})`,
              opacity: whyOpacity,
              willChange: "transform, opacity",
              // Box shadow gives it mass: the arriving panel casts a shadow left
              boxShadow: progress > 0.2
                ? `-32px 0 80px rgba(0,0,0,${remap(progress, 0.2, 0.9, 0, 0.5)})`
                : "none",
              pointerEvents: progress > 0.55 ? "auto" : "none",
            }}
          >
            <WhyPoleni />
          </div>

          {/* ── Sweep overlay — cinematic dark wipe ── */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 3,
              background: "linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 100%)",
              opacity: overlayOpacity,
              pointerEvents: "none",
              willChange: "opacity",
            }}
          />

        </div>
      </div>
    </div>
  )
}