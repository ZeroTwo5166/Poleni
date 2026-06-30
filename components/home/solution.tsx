"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, MotionValue } from "framer-motion"
import Link from "next/link"
import { useTheme } from "@/components/shared/themeProvider"

interface Service {
  icon: string
  title: string
  desc: string
  detail: string
  darkColor: string
  lightColor: string
  darkTag: string
  lightTag: string
  glow: string
  href: string
  accent: string
}

const services: Service[] = [
  {
    icon: "🖥️",
    title: "Websites",
    desc: "Responsivt, mobilvenligt, klar på 3–14 dage.",
    detail:
      "Fast engangspris. Du ejer det for altid. Ingen månedlig betaling bare for at holde din side kørende.",
    darkColor: "border-white/10 bg-zinc-950",
    lightColor:
      "border-violet-200 bg-white shadow-[0_12px_40px_rgba(124,58,237,0.10)]",
    darkTag: "text-violet-300 border-white/10 bg-zinc-900",
    lightTag: "text-violet-700 border-violet-200 bg-violet-50",
    glow: "rgba(124,58,237,0.10)",
    accent: "#7c3aed",
    href: "/services",
  },
  {
    icon: "🎯",
    title: "Google Ads",
    desc: "Daglig overvågning. Du betaler kun for reelle klik.",
    detail:
      "Vi opsætter, administrerer og forbedrer dine kampagner hver dag. Intet spildt budget.",
    darkColor: "border-white/10 bg-zinc-950",
    lightColor:
      "border-cyan-200 bg-white shadow-[0_12px_40px_rgba(6,182,212,0.10)]",
    darkTag: "text-cyan-300 border-white/10 bg-zinc-900",
    lightTag: "text-cyan-700 border-cyan-200 bg-cyan-50",
    glow: "rgba(6,182,212,0.10)",
    accent: "#0891b2",
    href: "/services",
  },
  {
    icon: "📱",
    title: "Meta Ads",
    desc: "Facebook & Instagram-annoncer. Opsig når som helst.",
    detail:
      "Målretning, test og daglig optimering. Ram præcis din kunde. Ingen binding.",
    darkColor: "border-white/10 bg-zinc-950",
    lightColor:
      "border-rose-200 bg-white shadow-[0_12px_40px_rgba(244,63,94,0.10)]",
    darkTag: "text-rose-300 border-white/10 bg-zinc-900",
    lightTag: "text-rose-700 border-rose-200 bg-rose-50",
    glow: "rgba(244,63,94,0.10)",
    accent: "#e11d48",
    href: "/services",
  },
]

const cardConfigs = [
  { x: -250, y: 80, rotate: -12 },
  { x: 0, y: 160, rotate: 0 },
  { x: 250, y: 80, rotate: 12 },
]

function ScrollCard({
  service,
  config,
  progress,
  index,
  isDark,
}: {
  service: Service
  config: (typeof cardConfigs)[0]
  progress: MotionValue<number>
  index: number
  isDark: boolean
}) {
  const x = useTransform(progress, [0, 0.45], [config.x, 0])
  const y = useTransform(progress, [0, 0.45], [config.y, 0])
  const rotate = useTransform(progress, [0, 0.45], [config.rotate, 0])
  const opacity = useTransform(progress, [0, 0.15, 0.45], [0, 0.7, 1])
  const scale = useTransform(progress, [0, 0.45], [0.92, 1])

  const colorClass = isDark ? service.darkColor : service.lightColor
  const tagClass = isDark ? service.darkTag : service.lightTag

  return (
    <motion.div
      style={{
        x,
        y,
        rotate,
        opacity,
        scale,
        zIndex: 10 - index,
        willChange: "transform",
      }}
      className={`relative p-8 rounded-2xl border ${colorClass}
        group overflow-hidden flex flex-col gap-4
        shadow-xl
        transition-all duration-300
        hover:translate-y-[-4px]
        hover:shadow-2xl
        pointer-events-none`}
    >
      {/* top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
        style={{
          background: `linear-gradient(90deg, ${service.accent}88, transparent)`,
        }}
      />

      {/* subtle glow (no glass effect) */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${service.accent}12 0%, transparent 60%)`,
        }}
      />

      {/* icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
        style={{ background: `${service.accent}14` }}
      >
        {service.icon}
      </div>

      {/* content */}
      <div>
        <h3
          className="text-xl font-bold mb-2"
          style={{ color: "var(--text-primary)" }}
        >
          {service.title}
        </h3>

        <p className="text-sm font-semibold mb-3" style={{ color: service.accent }}>
          {service.desc}
        </p>

        <p
          className="text-sm leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          {service.detail}
        </p>
      </div>

      <Link
        href={service.href}
        className={`mt-auto inline-flex items-center gap-1.5 text-xs font-semibold
          px-3 py-1.5 rounded-full border w-fit transition-all duration-200
          pointer-events-auto hover:opacity-80 ${tagClass}`}
      >
        Lær mere →
      </Link>
    </motion.div>
  )
}

export default function Solution() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-32 px-6 overflow-hidden"
      style={
        isDark
          ? {
              /* ORIGINAL DARK BACKGROUND LEFT UNTOUCHED */
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.07) 0%, transparent 70%)",
            }
          : {
              background: `
              radial-gradient(1200px circle at 10% 10%, #ede9fe 0%, transparent 55%),
              radial-gradient(900px circle at 90% 20%, #fae8ff 0%, transparent 60%),
              radial-gradient(700px circle at 50% 100%, #f5f3ff 0%, transparent 60%),
              linear-gradient(180deg, #ffffff 0%, #f8f5ff 100%)
            `,
            }
      }
    >
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* header */}
        <div className="text-center mb-24">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                       border border-violet-200 bg-violet-50
                       text-violet-700 text-xs font-medium mb-4"
          >
            <span className="w-1 h-1 rounded-full bg-violet-600" />
            Hvad vi tilbyder
          </motion.span>

          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Tre services. Ét team.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
              Ingen fyld.
            </span>
          </h2>

          <p
            className="text-lg max-w-xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            Faste priser. Ingen binding. Vælg det du har brug for — eller alle tre.
          </p>
        </div>

        {/* cards */}
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

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-center mt-16"
        >
          <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>
            Er du i tvivl om, hvad du har brug for?
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm
                       text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            style={{ background: "linear-gradient(135deg, #7c3aed, #0891b2)" }}
          >
            Få en gratis konsultation →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}