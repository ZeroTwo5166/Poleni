"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useTheme } from "@/components/shared/themeProvider"
import { fadeUp, staggerContainer, viewport } from "@/lib/animationVariants"

const services = [
  {
    icon:    "🖥️",
    title:   "Websites",
    desc:    "Responsive, mobile-friendly, ready in 3–14 days.",
    detail:  "We build fast, converting websites with a fixed one-time price. You own it forever.",
    color:   "border-indigo-500/20 bg-indigo-500/5",
    tag:     "text-indigo-400 border-indigo-500/20 bg-indigo-500/10",
    glow:    "rgba(99,102,241,0.12)",
    href:    "/services",
  },
  {
    icon:    "🎯",
    title:   "Google Ads",
    desc:    "We monitor and optimise daily. You pay only for clicks.",
    detail:  "No wasted spend. We set up, manage, and improve your campaigns every single day.",
    color:   "border-blue-500/20 bg-blue-500/5",
    tag:     "text-blue-400 border-blue-500/20 bg-blue-500/10",
    glow:    "rgba(59,130,246,0.12)",
    href:    "/services",
  },
  {
    icon:    "📱",
    title:   "Meta Ads",
    desc:    "Targeting, testing, and daily optimisation. No wasted spend.",
    detail:  "Facebook and Instagram ads that reach your exact customer. Cancel anytime.",
    color:   "border-pink-500/20 bg-pink-500/5",
    tag:     "text-pink-400 border-pink-500/20 bg-pink-500/10",
    glow:    "rgba(236,72,153,0.12)",
    href:    "/services",
  },
]

export default function Solution() {
  const { theme } = useTheme()

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.05) 0%, transparent 60%)" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={viewport}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                           border border-indigo-500/20 bg-indigo-500/5
                           text-indigo-400 text-xs font-medium mb-4">
            <span className="w-1 h-1 rounded-full bg-indigo-400" />
            What we do
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Everything you need to grow online.
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            Three services. Fixed prices. No lock-in. Pick what you need.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={viewport}
        >
          {services.map((s) => (
            <motion.div
              key={s.title}
              variants={fadeUp}
              whileHover={{ scale: 1.03, y: -6 }}
              className={`relative p-8 rounded-2xl border ${s.color}
                group cursor-default overflow-hidden flex flex-col gap-4`}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100
                           transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 50%, ${s.glow} 0%, transparent 70%)` }}
              />
              <span className="text-4xl">{s.icon}</span>
              <div>
                <h3 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>{s.title}</h3>
                <p className="text-sm font-medium mb-3" style={{ color: "var(--text-secondary)" }}>{s.desc}</p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{s.detail}</p>
              </div>
              <Link
                href={s.href}
                className={`mt-auto inline-flex items-center gap-1.5 text-xs font-medium
                  px-3 py-1.5 rounded-full border w-fit transition-all duration-200
                  ${s.tag} hover:opacity-80`}
              >
                Learn more →
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}