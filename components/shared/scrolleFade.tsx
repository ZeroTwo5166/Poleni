"use client"

import { useRef, useEffect, useState } from "react"
import TrustSignals from "../home/trustSignals"
import OurWork from "../home/ourWork"

// Cubic ease-in-out
function easeInOut(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function remap(v: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  const t = Math.max(0, Math.min(1, (v - inMin) / (inMax - inMin)))
  return outMin + easeInOut(t) * (outMax - outMin)
}

export default function ScrollFade() {
  const outerRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const outer = outerRef.current
    if (!outer) return

    const onScroll = () => {
      const vh = window.innerHeight
      const top = outer.getBoundingClientRect().top
      const p = Math.max(0, Math.min(1, -top / vh))
      setProgress(p)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // ── OurWork: collapses away — scale down hard + drift up + blur ──────────
  const ourWorkScale   = remap(progress, 0.05, 0.65, 1,    0.82)
  const ourWorkOpacity = remap(progress, 0.05, 0.6,  1,    0)
  const ourWorkBlur    = remap(progress, 0.1,  0.65, 0,    18)
  const ourWorkY       = remap(progress, 0.05, 0.65, 0,   -80)  // drifts upward as it shrinks

  // ── TrustSignals: rises from below with gravity — starts far down ────────
  const trustY       = remap(progress, 0.25, 1,    120,   0)  // large distance = real weight
  const trustOpacity = remap(progress, 0.2,  0.7,   0,    1)
  const trustScale   = remap(progress, 0.25, 0.9,  0.9,   1)

  // ── Sweep overlay: flash of darkness at the crossover point ─────────────
  const overlayOpacity = progress < 0.5
    ? remap(progress, 0.1,  0.5,  0, 0.5)
    : remap(progress, 0.5,  0.82, 0.5, 0)

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

          {/* ── OurWork — collapses into the background ── */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 1,
              opacity: ourWorkOpacity,
              transform: `scale(${ourWorkScale}) translateY(${ourWorkY}px)`,
              filter: `blur(${ourWorkBlur}px)`,
              willChange: "transform, opacity, filter",
              transformOrigin: "center center",
              pointerEvents: progress > 0.45 ? "none" : "auto",
            }}
          >
            <OurWork />
          </div>

          {/* ── TrustSignals — rises up with gravity ── */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 2,
              opacity: trustOpacity,
              transform: `translateY(${trustY}px) scale(${trustScale})`,
              willChange: "transform, opacity",
              // Shadow underneath as it rises — like a panel lifting off the floor
              boxShadow: progress > 0.25
                ? `0 -24px 80px rgba(0,0,0,${remap(progress, 0.25, 0.9, 0, 0.45)})`
                : "none",
              pointerEvents: progress > 0.55 ? "auto" : "none",
            }}
          >
            <TrustSignals />
          </div>

          {/* ── Sweep overlay — cinematic flash at crossover ── */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 3,
              background: "radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.55) 100%)",
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