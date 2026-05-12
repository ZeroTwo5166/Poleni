"use client"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { useTheme } from "@/components/shared/themeProvider"

const carousel = ["Websites.", "Google Ads.", "Meta Ads.", "Fixed prices.", "No lock-ins."]

const stats = [
  { value: "100%", label: "Transparent pricing" },
  { value: "0",    label: "Lock-in contracts"   },
  { value: "24h",  label: "Response time"        },
]

export default function Hero() {
  const containerRef  = useRef<HTMLDivElement>(null)
  const { theme }     = useTheme()
  const isDark        = theme === "dark"
  const [carouselIdx, setCarouselIdx] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale   = useTransform(scrollYProgress, [0, 1],   [1, 0.92])

  useEffect(() => {
    const t = setInterval(() => setCarouselIdx((i) => (i + 1) % carousel.length), 1800)
    return () => clearInterval(t)
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Orbs */}
      <div
        className="absolute -left-40 top-1/4 w-[500px] h-[500px] rounded-full pointer-events-none animate-pulse-glow"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)" }}
      />
      <div
        className="absolute -right-40 bottom-1/4 w-[400px] h-[400px] rounded-full pointer-events-none animate-pulse-glow"
        style={{ background: "radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)" }}
      />

      {isDark && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.03 }}
              transition={{ delay: i * 0.2, duration: 1 }}
              className="absolute left-0 right-0 border-t border-white"
              style={{ top: `${20 + i * 20}%` }}
            />
          ))}
        </div>
      )}

      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center py-32"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                     border border-indigo-500/20 bg-indigo-500/5 mb-8"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          <span className="text-indigo-400 text-sm font-medium">
            Digital marketing for Danish businesses
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-[1.0] mb-4"
          style={{ color: "var(--text-primary)" }}
        >
          Strategy.<br />
          <span className="gradient-text">Action.</span><br />
          Results.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg md:text-xl max-w-xl mx-auto mt-6 mb-4 leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          Poleni – Digital marketing for Danish businesses.
        </motion.p>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="h-8 flex items-center justify-center mb-10 overflow-hidden"
        >
          <motion.span
            key={carouselIdx}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="text-base font-medium"
            style={{ color: "var(--text-muted)" }}
          >
            {carousel[carouselIdx]}
          </motion.span>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <Link
            href="#calculator"
            className="group relative px-8 py-4 bg-indigo-500 hover:bg-indigo-400
                       text-white font-semibold rounded-xl transition-all duration-300
                       glow-indigo text-base w-full sm:w-auto text-center overflow-hidden"
          >
            <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%]
                             transition-transform duration-700 bg-gradient-to-r from-transparent
                             via-white/10 to-transparent skew-x-12" />
            <span className="relative">See pricing →</span>
          </Link>
          <Link
            href="/contact"
            className={`px-8 py-4 rounded-xl font-medium transition-all duration-300
              text-base w-full sm:w-auto text-center border
              ${isDark
                ? "border-white/10 hover:border-white/20 text-gray-300 hover:text-white bg-white/[0.02] hover:bg-white/[0.05]"
                : "border-black/10 hover:border-black/20 text-gray-600 hover:text-gray-900 bg-black/[0.02] hover:bg-black/[0.05]"}`}
          >
            Free audit →
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="grid grid-cols-3 gap-4 max-w-lg mx-auto"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 + i * 0.08 }}
              className="flex flex-col items-center gap-1 p-4 rounded-xl glass"
            >
              <span className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                {stat.value}
              </span>
              <span className="text-xs text-center leading-tight" style={{ color: "var(--text-muted)" }}>
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-xs tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className={`w-px h-8 bg-gradient-to-b ${isDark ? "from-gray-600 to-transparent" : "from-gray-400 to-transparent"}`}
        />
      </motion.div>
    </section>
  )
}