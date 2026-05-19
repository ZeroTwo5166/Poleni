"use client"

import { useRef, useEffect, useState } from "react"
import TheStory from "../home/theStory"
import Calculator from "../home/calculator"
import TrustSignals from "../home/trustSignals"
import Guarantee from "../home/guarantee"

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

  return (
    <div style={{ height: "200vh" }}>
      <div ref={outerRef} style={{ position: "relative", height: "200vh" }}>

        {/* sticky viewport */}
        <div
          style={{
            position: "sticky",
            top: 0,
            minHeight: "100vh", // 🔥 important: allow growth
          }}
        >

          {/* STORY */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 1,
              opacity: 1 - progress,
              transform: `scale(${1 - progress * 0.05})`,
              pointerEvents: progress > 0.5 ? "none" : "auto",
            }}
          >
            <div style={{ minHeight: "100vh" }}>
              <Guarantee />
            </div>
          </div>

          {/* CALCULATOR */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 2,
              opacity: progress,
              transform: `translateY(${(1 - progress) * 40}px)`,
              pointerEvents: progress > 0.5 ? "auto" : "none",
            }}
          >
            <div style={{ minHeight: "100vh" }}>
              <TrustSignals />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}