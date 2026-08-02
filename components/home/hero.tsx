"use client"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@/components/shared/themeProvider"

const carousel = ["Hjemmesider.", "Google Ads.", "Meta Ads."]

const stats = [
  { value: "100%", label: "Gennemsigtige priser" },
  { value: "0", label: "Bindingsperioder" },
  { value: "24h", label: "Svartid" },
]

const tags = [
  { label: "Google Ads", x: "82%", y: "12%", delay: 0.4 },
  { label: "Meta Ads", x: "88%", y: "72%", delay: 0.6 },
  { label: "Webdesign", x: "10%", y: "50%", delay: 0.8 },
]

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [carouselIdx, setCarouselIdx] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setCarouselIdx((i) => (i + 1) % carousel.length), 1800)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrollProgress(Math.min(window.scrollY / window.innerHeight, 1))
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const opacity = Math.max(0, 1 - scrollProgress * 1.2)
  const scale = 1 - scrollProgress * 0.05

  const t = isDark
    ? {
        bg: "rgba(8, 8, 8, 0)",
        badge: "border-indigo-500/20 bg-indigo-500/5",
        badgeText: "text-indigo-400",
        badgeDot: "bg-indigo-400",
        h1: "text-white",
        body: "text-gray-400",
        carouselColor: ["text-emerald-400", "text-amber-400", "text-blue-400"],
        ctaPrimary: {
          background: "#6366f1",
          boxShadow: "0 8px 32px rgba(99,102,241,0.35)",
        },
        ctaSecondary:
          "border border-white/20 hover:border-indigo-400 text-gray-300 hover:text-white hover:bg-indigo-500/15 bg-white/[0.03]",
        statCard: "bg-white/[0.04] border-white/8",
        statValue: "text-white",
        statLabel: "text-indigo-400",
        tagBg: "rgba(255,255,255,0.06)",
        tagBorder: "rgba(99,102,241,0.25)",
        tagText: "#a5b4fc",
        scrollText: "text-gray-600",
        glow1: "rgba(99,102,241,0.08)",
        glow2: "rgba(167,139,250,0.06)",
        promoStyle: {
          background: "rgba(251,191,36,0.06)",
          borderColor: "rgba(251,191,36,0.2)",
          color: "#fbbf24",
        },
        promoSpot: "text-amber-300 font-bold",
      }
    : {
        bg: "rgba(248, 249, 255, 0)",
        badge: "border-indigo-400/30 bg-indigo-500/8 backdrop-blur-sm",
        badgeText: "text-indigo-600",
        badgeDot: "bg-indigo-500",
        h1: "text-[#0f0a2e]",
        body: "text-gray-500",
        carouselColor: ["text-emerald-700", "text-amber-700", "text-blue-700"],
        ctaPrimary: {
          background:
            "linear-gradient(135deg,#6366f1 0%,#8b5cf6 50%,#ec4899 100%)",
          boxShadow: "0 8px 32px rgba(99,102,241,0.35)",
        },
        ctaSecondary:
          "border-2 border-indigo-300 hover:border-indigo-500 text-indigo-700 hover:text-indigo-900 hover:bg-indigo-50/50 backdrop-blur-sm bg-white/60",
        statCard: "bg-white/65 border-indigo-100 backdrop-blur-sm",
        statValue: "text-[#1e1b4b]",
        statLabel: "text-indigo-600",
        tagBg: "rgba(255,255,255,0.85)",
        tagBorder: "rgba(99,102,241,0.35)",
        tagText: "#312e81",
        scrollText: "text-gray-400",
        glow1: "rgba(99,102,241,0.07)",
        glow2: "rgba(167,139,250,0.05)",
        promoStyle: {
          background: "rgba(255,255,255,0.75)",
          borderColor: "rgba(99,102,241,0.25)",
          color: "#1e1b4b",
        },
        promoSpot: "text-indigo-600 font-bold",
      }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{
        zIndex: 10,
        background: t.bg,
        opacity,
        transform: `scale(${scale})`,
        transition: "opacity 0.2s ease-out, transform 0.2s ease-out",
        pointerEvents: scrollProgress > 0.9 ? "none" : "auto",
      }}
    >
      {/* Ambient glows - Only visible in light mode, now moving much faster */}
      {!isDark && (
        <>
          <motion.div
            animate={{
              x: [0, 150, -100, 100, 0],
              y: [0, -100, 120, -60, 0],
              scale: [1, 1.2, 0.9, 1.1, 1],
            }}
            transition={{
              duration: 3, // Sped up
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -left-40 top-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${t.glow1} 0%, transparent 70%)`,
            }}
          />
          <motion.div
            animate={{
              x: [0, -180, 120, -100, 0],
              y: [0, 150, -100, 80, 0],
              scale: [1, 0.8, 1.2, 0.9, 1],
            }}
            transition={{
              duration: 4, // Sped up
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -right-40 bottom-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${t.glow2} 0%, transparent 70%)`,
            }}
          />
        </>
      )}

      {/* Floating tags */}
      {tags.map((tag, i) => (
        <motion.div
          key={tag.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
          transition={{
            opacity: { delay: tag.delay, duration: 0.5 },
            scale: { delay: tag.delay, duration: 0.5 },
            y: {
              delay: tag.delay + 0.5,
              duration: 6 + i * 0.8,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="absolute hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm border shadow-sm"
          style={{
            left: tag.x,
            top: tag.y,
            zIndex: 20,
            background: t.tagBg,
            borderColor: t.tagBorder,
            color: t.tagText,
            boxShadow: "0 2px 12px rgba(99,102,241,0.12)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: isDark ? "#818cf8" : "#4338ca" }}
          />
          {tag.label}
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-6 text-center py-10 lg:pt-16 lg:pb-32">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-4 md:mb-8 ${t.badge}`}
        >
          <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${t.badgeDot}`} />
          <span className={`text-sm font-semibold ${t.badgeText}`}>
            Digital markedsføring for danske virksomheder
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold tracking-tight leading-[1.1] lg:leading-[1.05] mb-3 md:mb-4 ${t.h1}`}
        >
          Hjemmesider og annoncer,
          <br />
          der skaffer kunder.
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`text-base md:text-lg lg:text-xl xl:text-2xl max-w-xl xl:max-w-2xl mx-auto mt-3 md:mt-6 mb-2 md:mb-4 leading-relaxed ${t.body}`}
        >
          Faste priser. Ingen binding. Opsig når som helst.
        </motion.p>

        {/* Carousel */}
        <div className="h-8 xl:h-10 flex items-center justify-center mb-4 md:mb-10 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={carouselIdx}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
              className={`text-base xl:text-lg font-bold ${t.carouselColor[carouselIdx]}`}
            >
              {carousel[carouselIdx]}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-4 md:mb-6">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
            <Link
              href="calculator"
              className="group relative px-6 py-3 md:px-8 md:py-4 xl:px-10 xl:py-5 text-white font-semibold rounded-xl transition-all duration-300 text-base xl:text-lg w-full text-center overflow-hidden block"
              style={t.ctaPrimary}
            >
              <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
              <span className="relative">Se priser →</span>
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
            <Link
              href="/contact"
              className={`px-6 py-3 md:px-8 md:py-4 xl:px-10 xl:py-5 rounded-xl font-medium transition-all duration-300 text-base xl:text-lg w-full text-center block ${t.ctaSecondary}`}
            >
              Gratis rådgivning →
            </Link>
          </motion.div>
        </div>

        {/* Promo notice */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center mb-4 md:mb-10"
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium border backdrop-blur-sm max-w-full flex-wrap justify-center text-center"
            style={t.promoStyle}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
            De første 3 kunder får en fast pris uden prisstigninger det første
            år.&nbsp;
            <span className={t.promoSpot}>Kun én plads tilbage.</span>
          </span>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-lg xl:max-w-xl mx-auto">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center gap-1 p-2.5 md:p-4 xl:p-5 rounded-xl border shadow-sm ${t.statCard}`}
            >
              <span className={`text-2xl xl:text-3xl font-bold tracking-tight ${t.statValue}`}>
                {stat.value}
              </span>
              <span className={`text-xs xl:text-sm text-center font-medium leading-tight ${t.statLabel}`}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        style={{ zIndex: 20 }}
        onClick={() =>
          window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth",
          })
        }
      >
        <span className={`text-xs tracking-widest uppercase font-medium ${t.scrollText}`}>
          Rul ned
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-indigo-400 to-transparent animate-bounce" />
      </div>
    </div>
  )
}