"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import CountUp from "@/components/shared/countUp"
import { useT } from "@/lib/i18n/useT"

const statValues = [
  { value: 100, suffix: "%" },
  { value: 0,   suffix: ""  },
  { value: 24,  suffix: "h" },
]

export default function Hero() {
  const t = useT()
  const carousel = t.hero.carousel
  const stats = statValues.map((v, i) => ({ ...v, label: t.hero.stats[i].label }))
  const [carouselIdx, setCarouselIdx] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })
  const textY   = useTransform(scrollYProgress, [0, 1], [0, -90])
  const panelY  = useTransform(scrollYProgress, [0, 1], [0, -30])
  const fadeOut = useTransform(scrollYProgress, [0, 0.75, 1], [1, 1, 0])

  useEffect(() => {
    const t = setInterval(() => setCarouselIdx((i) => (i + 1) % carousel.length), 1800)
    return () => clearInterval(t)
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-[100dvh] flex items-center pt-28 pb-20 px-6 overflow-hidden">
      <motion.div
        style={{ opacity: fadeOut }}
        className="relative z-10 max-w-page mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
      >

        {/* LEFT — the hero moment */}
        <motion.div style={{ y: textY }} className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full animate-soft-pulse" style={{ background: "var(--accent)" }} />
            <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: "var(--text-muted)" }}>
              {t.hero.eyebrow}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-medium tracking-tightest leading-[0.98]
                       text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem]"
            style={{ color: "var(--text-primary)" }}
          >
            {t.hero.headline1}
            <br />
            {t.hero.headline2}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg lg:text-xl max-w-md mt-6 leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {t.hero.subtext}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-start gap-3 mt-10"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
              <Link
                href="/calculator"
                className="block px-7 py-3.5 font-medium text-sm text-center transition-opacity duration-200 hover:opacity-85"
                style={{ background: "var(--accent)", color: "var(--bg)" }}
              >
                {t.hero.ctaPrimary}
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
              <Link
                href="/contact"
                className="block px-7 py-3.5 font-medium text-sm text-center border transition-colors duration-200"
                style={{ borderColor: "var(--border-strong)", color: "var(--text-primary)" }}
              >
                {t.hero.ctaSecondary}
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* RIGHT — data panel: what we do, proof, scarcity note */}
        <motion.div
          style={{ y: panelY }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="lg:col-span-5 panel p-7"
        >
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: "var(--text-muted)" }}>
              {t.hero.building}
            </span>
            <div className="h-6 flex items-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={carouselIdx}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="tabular text-sm font-semibold"
                  style={{ color: "var(--accent)" }}
                >
                  {carousel[carouselIdx]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex flex-col">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex items-baseline justify-between py-4 ${i !== 0 ? "rule-top" : ""}`}
              >
                <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{stat.label}</span>
                <span className="tabular text-2xl font-semibold" style={{ color: "var(--text-primary)" }}>
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </span>
              </div>
            ))}
          </div>

          <div
            className="mt-6 pt-5 rule-top flex items-start gap-2.5"
          >
            <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 animate-soft-pulse" style={{ background: "var(--amber)" }} />
            <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
              {t.hero.promoText}{" "}
              <span className="font-semibold" style={{ color: "var(--amber)" }}>{t.hero.promoHighlight}</span>
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-6 lg:left-auto lg:right-6 flex items-center gap-2 cursor-pointer"
        onClick={() =>
          window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth",
          })
        }
      >
        <span className="text-xs tracking-widest uppercase font-medium" style={{ color: "var(--text-muted)" }}>
          {t.hero.scrollDown}
        </span>
        <div className="w-8 h-px" style={{ background: "var(--border-strong)" }} />
      </div>
    </section>
  )
}
