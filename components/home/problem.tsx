"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/components/shared/themeProvider"

const painPoints = [
  { emoji: "😤", text: "Locked into 12-month contracts you can't escape" },
  { emoji: "🤷", text: "Agencies that don't explain what your money buys" },
  { emoji: "📉", text: "Paying monthly retainers with nothing to show for it" },
]

export default function Problem() {
  const { theme } = useTheme()
  const isDark    = theme === "dark"

  return (
    <section className="relative py-32 px-6">
      {/* Top glow line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.3), transparent)" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                           border border-red-500/20 bg-red-500/5
                           text-red-400 text-xs font-medium mb-8">
            <span className="w-1 h-1 rounded-full bg-red-400" />
            The problem
          </span>

          <h2
            className="text-4xl md:text-6xl font-bold leading-tight mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            Stop paying for clicks.
            <br />
            <span className="gradient-text">Start paying for customers.</span>
          </h2>

          <p
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12"
            style={{ color: "var(--text-secondary)" }}
          >
            No long contracts. No hidden fees. Just work that actually grows your business.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {painPoints.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.1 }}
              className={`p-6 rounded-2xl border text-left
                ${isDark ? "border-white/[0.06] bg-white/[0.02]" : "border-black/[0.06] bg-black/[0.02]"}`}
            >
              <span className="text-3xl mb-3 block">{item.emoji}</span>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}