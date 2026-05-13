"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/components/shared/themeProvider"
import Link from "next/link"
import { fadeUp, staggerContainer, viewport } from "@/lib/animationVariants"

const testimonials = [
  {
    quote:    "Finally an agency that just tells you the price. No back and forth, no surprises. Our site was live in 4 days.",
    author:   "Mads K.",
    role:     "Owner, Maiya.dk",
    initials: "MK",
    color:    "bg-indigo-500",
  },
  {
    quote:    "We paused our ads for the summer and started again in September. No questions asked. That flexibility is rare.",
    author:   "Sarah L.",
    role:     "Founder, MightyLoyalty",
    initials: "SL",
    color:    "bg-purple-500",
  },
  {
    quote:    "The calculator on their site sold me before I even contacted them. Knew exactly what I was paying for.",
    author:   "Thomas B.",
    role:     "CEO, The Hideout Brunch",
    initials: "TB",
    color:    "bg-pink-500",
  },
]

export default function TrustSignals() {
  const { theme } = useTheme()
  const isDark    = theme === "dark"

  return (
    <section className="relative py-32 px-6 overflow-hidden">

      {/* Top glow — dark mode only */}
      {isDark && (
        <>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.4), transparent)" }} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none"
            style={{ background: "radial-gradient(ellipse at top, rgba(6,182,212,0.12) 0%, transparent 70%)" }} />
        </>
      )}

      <div className="relative z-10 max-w-6xl mx-auto">

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={viewport}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                           border border-cyan-500/20 bg-cyan-500/5
                           text-cyan-500 text-xs font-medium mb-4">
            <span className="w-1 h-1 rounded-full bg-cyan-500" />
            What clients say
          </span>
          <h2 className="text-4xl md:text-5xl font-bold" style={{ color: "var(--text-primary)" }}>
            Real feedback. No fluff.
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={viewport}
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.author}
              variants={fadeUp}
              whileHover={{ scale: 1.02, y: -4 }}
              className="relative p-6 rounded-2xl glass cursor-default"
            >
              <span className="text-4xl font-serif absolute top-4 right-5"
                style={{ color: "var(--text-primary)", opacity: 0.05 }}>
                &quot;
              </span>
              <p className="text-sm leading-relaxed mb-6 relative z-10"
                style={{ color: "var(--text-secondary)" }}>
                &quot;{t.quote}&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center shrink-0`}>
                  <span className="text-white text-xs font-bold">{t.initials}</span>
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{t.author}</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={viewport}
          className="text-center mt-16"
        >
          <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
            Ready to grow your business?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-500
                       hover:bg-indigo-400 text-white font-semibold rounded-xl
                       transition-colors duration-200"
          >
            Start for free →
          </Link>
        </motion.div>

      </div>
    </section>
  )
}