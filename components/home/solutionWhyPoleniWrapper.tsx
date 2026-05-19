"use client"

import { useRef, useEffect, useState } from "react"
import Solution from "@/components/home/solution"
import WhyPoleni from "@/components/home/whyPoleni"

export default function SolutionWhyPoleniWrapper() {
  const outerRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const outer = outerRef.current
    if (!outer) return

    const onScroll = () => {
      const vh = window.innerHeight
      const outerTop = outer.getBoundingClientRect().top
      const p = Math.max(0, Math.min(1, -outerTop / vh))
      setProgress(p)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()

    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const whyX = `${(1 - progress) * -100}vw`

  return (
    // overflowX:clip on a separate wrapper — never interferes with sticky inside
    <div style={{ overflowX: "clip" }}>
      {/* outerRef: no overflow set, just height for scroll distance */}
      <div ref={outerRef} style={{ position: "relative", height: "200vh" }}>
        
        {/* Sticky pin: holds for outerHeight - stickyHeight = 200vh - 100vh = 100vh */}
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
          }}
        >
          {/* Solution */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              overflow: "hidden",
              zIndex: 1,
            }}
          >
            <Solution />
          </div>

          {/* WhyPoleni — slides in from left */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              overflow: "hidden",
              transform: `translateX(${whyX})`,
              zIndex: 2,
              willChange: "transform",
            }}
          >
            <WhyPoleni />
          </div>
        </div>
      </div>
    </div>
  )
}