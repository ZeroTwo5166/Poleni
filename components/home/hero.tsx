"use client"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useTheme } from "@/components/shared/themeProvider"

const carousel = ["Websites.", "Google Ads.", "Meta Ads.", "Fixed prices.", "No lock-ins."]
const carouselColors = [
  "text-emerald-500",
  "text-amber-500",
  "text-blue-600",
  "text-indigo-500",
  "text-rose-500",
]

const stats = [
  { value: "100%", label: "Transparent pricing" },
  { value: "0",    label: "Lock-in contracts"   },
  { value: "24h",  label: "Response time"        },
]

// Floating pill tags
const tags = [
  { label: "SEO",          x: "8%",  y: "18%", delay: 0.2  },
  { label: "Google Ads",   x: "82%", y: "12%", delay: 0.4  },
  { label: "Meta Ads",     x: "88%", y: "72%", delay: 0.6  },
  { label: "Web Design",   x: "5%",  y: "75%", delay: 0.8  },
  { label: "Analytics",    x: "75%", y: "38%", delay: 1.0  },
  { label: "Copywriting",  x: "12%", y: "45%", delay: 0.5  },
]

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const { theme }    = useTheme()
  const isDark       = theme === "dark"
  const [carouselIdx, setCarouselIdx] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)


 useEffect(() => {
    const t = setInterval(() => setCarouselIdx((i) => (i + 1) % carousel.length), 1800)
    return () => clearInterval(t)
  }, [])

   useEffect(() => {
    const handleScroll = () => {
      const progress = Math.min(window.scrollY / window.innerHeight, 1)
      setScrollProgress(progress)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const opacity = Math.max(0, 1 - scrollProgress * 1.2)
  const scale = 1 - scrollProgress * 0.05

  if (isDark) {
      return (
        <div
          ref={containerRef}
          className="fixed inset-0 flex items-center justify-center overflow-hidden"
          style={{
            zIndex: 10,
            background: "rgba(8, 8, 8, 0)",
            opacity,
            transform: `scale(${scale})`,
            transition: "opacity 0.2s ease-out, transform 0.2s ease-out",
            pointerEvents: scrollProgress > 0.9 ? "none" : "auto",
          }}
        >
          {/* YOUR ORIGINAL DARK MODE CONTENT - copy exactly from your hero.tsx */}
          <div className="absolute -left-40 top-1/4 w-[500px] h-[500px] rounded-full pointer-events-none animate-pulse-glow"
            style={{ background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)" }} />
          <div className="absolute -right-40 bottom-1/4 w-[400px] h-[400px] rounded-full pointer-events-none animate-pulse-glow"
            style={{ background: "radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)" }} />

          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center py-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              <span className="text-indigo-400 text-sm font-medium">Digital marketing for Danish businesses</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-[1.0] mb-4"
              style={{ color: "var(--text-primary)" }}>
              Strategy.<br /><span className="gradient-text">Action.</span><br />Results.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg md:text-xl max-w-xl mx-auto mt-6 mb-4 leading-relaxed"
              style={{ color: "var(--text-secondary)" }}>
              Poleni – Digital marketing for Danish businesses.
            </motion.p>

            <div className="h-8 flex items-center justify-center mb-10 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span key={carouselIdx} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.25 }}
                  className={`text-base font-semibold ${carouselColors[carouselIdx]}`}>
                  {carousel[carouselIdx]}
                </motion.span>
              </AnimatePresence>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
              <Link href="#calculator" className="group relative px-8 py-4 bg-indigo-500 hover:bg-indigo-400 text-white font-semibold rounded-xl transition-all duration-300 glow-indigo text-base w-full sm:w-auto text-center overflow-hidden">
                <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
                <span className="relative">See pricing →</span>
              </Link>
              <Link href="/contact" className="px-8 py-4 rounded-xl font-medium transition-all duration-300 text-base w-full sm:w-auto text-center border border-white/10 hover:border-white/20 text-gray-300 hover:text-white bg-white/[0.02] hover:bg-white/[0.05]">
                Free audit →
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center gap-1 p-4 rounded-xl glass bg-white/[0.10]">
                  <span className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>{stat.value}</span>
                  <span className="text-xs text-center leading-tight" style={{ color: "var(--text-muted)" }}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
            <span className="text-xs tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-gray-600 to-transparent animate-bounce" />
          </div>
        </div>
      )
    }

  // ── LIGHT MODE: rich, colorful, dynamic ───────────────────────
return (
    <div
      ref={containerRef}
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{
        zIndex: 10,
        background: "rgba(248, 249, 255, 0)",
        opacity,
        transform: `scale(${scale})`,
        transition: "opacity 0.2s ease-out, transform 0.2s ease-out",
        pointerEvents: scrollProgress > 0.9 ? "none" : "auto",
      }}
    >
      {/* YOUR ORIGINAL LIGHT MODE CONTENT - copy exactly from your hero.tsx */}
      {/* Keep all your floating tags, noise grain, glows, etc. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
          opacity: 0.5,
        }}
      />

      {tags.map((tag, i) => (
        <motion.div
          key={tag.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
          transition={{
            opacity: { delay: tag.delay, duration: 0.5 },
            scale: { delay: tag.delay, duration: 0.5 },
            y: { delay: tag.delay + 0.5, duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full
                     text-xs font-semibold backdrop-blur-sm border shadow-sm"
          style={{
            left: tag.x,
            top: tag.y,
            zIndex: 20,
            background: "rgba(255,255,255,0.65)",
            borderColor: "rgba(99,102,241,0.2)",
            color: "#4338ca",
            boxShadow: "0 2px 12px rgba(99,102,241,0.12)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
          {tag.label}
        </motion.div>
      ))}

      <div className="absolute -left-40 top-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)" }} />
      <div className="absolute -right-40 bottom-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)" }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8
                     border border-indigo-400/30 shadow-sm bg-white/70 backdrop-blur-sm"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
          <span className="text-indigo-600 text-sm font-semibold">
            Digital marketing for Danish businesses
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-[1.0] mb-4"
          style={{ color: "#0f0a2e" }}
        >
          Strategy.<br />
          <span className=" gradient-text">Action.</span><br />
          Results.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg md:text-xl max-w-xl mx-auto mt-6 mb-4 leading-relaxed font-medium"
          style={{ color: "#374151" }}
        >
          Poleni – Digital marketing for Danish businesses.
        </motion.p>

        <div className="h-8 flex items-center justify-center mb-10 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={carouselIdx}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
              className={`text-base font-bold ${carouselColors[carouselIdx]}`}
            >
              {carousel[carouselIdx]}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <Link
            href="#calculator"
            className="group relative px-8 py-4 text-white font-bold rounded-xl
                       transition-all duration-300 text-base w-full sm:w-auto
                       text-center overflow-hidden shadow-lg"
            style={{
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
              boxShadow: "0 8px 32px rgba(99,102,241,0.35)",
            }}
          >
            <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%]
                             transition-transform duration-700 bg-gradient-to-r from-transparent
                             via-white/20 to-transparent skew-x-12" />
            <span className="relative">See pricing →</span>
          </Link>
          <Link
            href="/contact"
            className="px-8 py-4 rounded-xl font-semibold transition-all duration-300
                       text-base w-full sm:w-auto text-center border-2 border-indigo-300
                       hover:border-indigo-500 text-indigo-700 hover:text-indigo-900
                       hover:bg-indigo-50/50 backdrop-blur-sm bg-white/60"
          >
            Free audit →
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1 p-4 rounded-xl border shadow-sm bg-white/65 backdrop-blur-sm"
              style={{
                borderColor: "rgba(99,102,241,0.18)",
                boxShadow: "0 2px 16px rgba(99,102,241,0.08)",
              }}
            >
              <span className="text-2xl font-bold tracking-tight" style={{ color: "#1e1b4b" }}>
                {stat.value}
              </span>
              <span className="text-xs text-center font-medium leading-tight" style={{ color: "#4338ca" }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        style={{ zIndex: 20 }}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
      >
        <span className="text-xs tracking-widest uppercase font-medium" style={{ color: "#9ca3af" }}>
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-indigo-400 to-transparent animate-bounce" />
      </div>
    </div>
  )
}