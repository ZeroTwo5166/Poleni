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
      const top = outer.getBoundingClientRect().top
      const p = Math.max(0, Math.min(1, -top / vh))
      setProgress(p)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()

    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const whyX = `${(1 - progress) * -100}vw`

  return (
    <div style={{ height: "200vh" }}>
      <div ref={outerRef} style={{ position: "relative", height: "200vh" }}>

        {/* STICKY STAGE */}
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
          }}
        >

          {/* Solution fades out */}
       {/* Solution — fades out */}
<div
  style={{
    position: "absolute",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    zIndex: 1,

    opacity: 1 - progress,
    transition: "opacity 0.05s linear",
  }}
>
  <Solution />
</div>

{/* WhyPoleni — slides in + fades in */}
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

    opacity: progress,
    transition: "opacity 0.05s linear",
  }}
>
  <WhyPoleni />
</div>

        </div>
      </div>
    </div>
  )
}