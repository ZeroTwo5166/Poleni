"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, MotionValue } from "framer-motion"
import Link from "next/link"
import { useTheme } from "@/components/shared/themeProvider"

interface Service {
  icon: string; title: string; desc: string; detail: string
  darkColor: string; lightColor: string
  darkTag: string; lightTag: string
  glow: string; href: string
  accent: string
}

const services: Service[] = [
  {
    icon:       "🖥️",
    title:      "Websites",
    desc:       "Responsive, mobile-friendly, ready in 3–14 days.",
    detail:     "Fixed one-time price. You own it forever. No monthly fee just to keep your site alive.",
    darkColor:  "border-violet-500/20 bg-violet-500/5",
    lightColor: "border-violet-400/30 bg-violet-50/80",
    darkTag:    "text-violet-400 border-violet-500/20 bg-violet-500/10",
    lightTag:   "text-violet-700 border-violet-400/30 bg-violet-50",
    glow:       "rgba(139,92,246,0.15)",
    accent:     "#7c3aed",
    href:       "/services",
  },
  {
    icon:       "🎯",
    title:      "Google Ads",
    desc:       "Daily monitoring. You pay only for real clicks.",
    detail:     "We set up, manage, and improve your campaigns every single day. No wasted spend.",
    darkColor:  "border-cyan-500/20 bg-cyan-500/5",
    lightColor: "border-cyan-400/30 bg-cyan-50/80",
    darkTag:    "text-cyan-400 border-cyan-500/20 bg-cyan-500/10",
    lightTag:   "text-cyan-700 border-cyan-400/30 bg-cyan-50",
    glow:       "rgba(6,182,212,0.15)",
    accent:     "#0891b2",
    href:       "/services",
  },
  {
    icon:       "📱",
    title:      "Meta Ads",
    desc:       "Facebook & Instagram ads. Cancel anytime.",
    detail:     "Targeting, testing, and daily optimisation. Reach your exact customer. No lock-in.",
    darkColor:  "border-rose-500/20 bg-rose-500/5",
    lightColor: "border-rose-400/30 bg-rose-50/80",
    darkTag:    "text-rose-400 border-rose-500/20 bg-rose-500/10",
    lightTag:   "text-rose-700 border-rose-400/30 bg-rose-50",
    glow:       "rgba(244,63,94,0.15)",
    accent:     "#e11d48",
    href:       "/services",
  },
]

const cardConfigs = [
  { x: -250, y: 80,  rotate: -12 },
  { x:    0, y: 160, rotate:   0 },
  { x:  250, y: 80,  rotate:  12 },
]

function ScrollCard({
  service, config, progress, index, isDark,
}: {
  service: Service
  config:  (typeof cardConfigs)[0]
  progress: MotionValue<number>
  index:   number
  isDark:  boolean
}) {
  const x       = useTransform(progress, [0, 0.45], [config.x,      0])
  const y       = useTransform(progress, [0, 0.45], [config.y,      0])
  const rotate  = useTransform(progress, [0, 0.45], [config.rotate, 0])
  const opacity = useTransform(progress, [0, 0.15, 0.45], [0, 0.7, 1])
  const scale   = useTransform(progress, [0, 0.45], [0.9, 1])

  const colorClass = isDark ? service.darkColor : service.lightColor
  const tagClass   = isDark ? service.darkTag   : service.lightTag

  return (
    <motion.div
    style={{
  x, y, rotate, opacity, scale,
  zIndex: 10 - index,
  willChange: "transform, opacity",
  transformPerspective: 1000,
  backdropFilter: "blur(12px)",
  boxShadow: isDark
    ? undefined
    : `0 8px 32px ${service.accent}18`,
}}
      
      className={`relative p-8 rounded-2xl border ${colorClass}
        group overflow-hidden flex flex-col gap-4 shadow-xl pointer-events-none`}
    >
      <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
        style={{ background: `linear-gradient(90deg, ${service.accent}88, ${service.accent}22)` }} />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 0%, ${service.glow} 0%, transparent 60%)` }} />
      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
        style={{ background: `${service.accent}14` }}>
        {service.icon}
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>{service.title}</h3>
        <p className="text-sm font-semibold mb-3" style={{ color: service.accent }}>{service.desc}</p>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{service.detail}</p>
      </div>
      <Link href={service.href}
        className={`mt-auto inline-flex items-center gap-1.5 text-xs font-semibold
          px-3 py-1.5 rounded-full border w-fit transition-all duration-200
          pointer-events-auto hover:opacity-80 ${tagClass}`}>
        Learn more →
      </Link>
    </motion.div>
  )
}

export default function Solution() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { theme }  = useTheme()
  const isDark     = theme === "dark"

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  return (
    <section
      className="relative  min-h-screen py-32 px-6 overflow-hidden"
      style={!isDark ? { backgroundColor: "#f5f0ff" } : undefined}
    >
      {/* Top glow — dark mode only */}
      {isDark && (
        <>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.4), transparent)" }} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none"
            style={{ background: "radial-gradient(ellipse at top, rgba(139,92,246,0.10) 0%, transparent 70%)" }} />
        </>
      )}

      {/* Background */}
      {isDark ? (
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.07) 0%, transparent 70%)" }} />
      ) : (
        <>
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(180deg, #f5f0ff 0%, #fdf0f7 100%)" }} />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-purple-600 to-pink-500"
            style={{ opacity: 0.08 }} />
        </>
      )}

      <div ref={sectionRef} className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-24">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                       border border-violet-500/20 bg-violet-500/20
                       text-violet-600 text-xs font-medium mb-4"
          >
            <span className="w-1 h-1 rounded-full bg-violet-600" />
            What we offer
          </motion.span>

          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Three services. One team.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-400 dark:to-pink-400">
              Zero fluff.
            </span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            Fixed prices. No lock-in. Pick what you need — or all three.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {services.map((service, index) => (
            <ScrollCard
              key={service.title}
              service={service}
              config={cardConfigs[index]}
              progress={scrollYProgress}
              index={index}
              isDark={isDark}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>
            Not sure what you need?
          </p>
          <Link href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm
                       text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            style={{ background: "linear-gradient(135deg, #7c3aed, #0891b2)" }}>
            Get a free consultation →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}