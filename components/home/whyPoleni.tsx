"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/components/shared/themeProvider"

const reasons = [
  {
    icon:    "◈",
    title:   "Fixed prices",
    desc:    "No hidden fees.",
    detail:  "You see the exact cost before you sign anything. No vague quotes, no surprise invoices, no \"it depends\".",
    color:   "text-indigo-400",
    border:  "border-indigo-500/20",
    bg:      "bg-indigo-500/5",
  },
  {
    icon:    "⬡",
    title:   "No lock-ins",
    desc:    "Cancel anytime.",
    detail:  "Ads run month to month. Pause anytime, cancel anytime. We keep clients because we deliver results — not because of paperwork.",
    color:   "text-purple-400",
    border:  "border-purple-500/20",
    bg:      "bg-purple-500/5",
  },
  {
    icon:    "○",
    title:   "You are not just a number",
    desc:    "We are small by choice. You get our full attention. Not a template.",
    detail:  "Big agencies have 100+ clients. We don't. Every client is critical to us — you get a real team, not an account manager who changes every 6 months.",
    color:   "text-pink-400",
    border:  "border-pink-500/20",
    bg:      "bg-pink-500/5",
  },
]

export default function WhyPoleni() {
  const { theme } = useTheme()
  const isDark    = theme === "dark"

  return (
    <section className="relative py-32 px-6 overflow-hidden">

      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px]
                   h-[500px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                           border border-blue-500/20 bg-blue-500/5
                           text-blue-400 text-xs font-medium mb-4">
            <span className="w-1 h-1 rounded-full bg-blue-400" />
            Why Poleni
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            No bullshit. Just results.
          </h2>
          <p
            className="text-lg max-w-xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            We built Poleni because small businesses deserve honest
            pricing and real results — not 12-month traps.
          </p>
        </motion.div>

        {/* 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.03, y: -6 }}
              className={`
                relative p-8 rounded-2xl border ${reason.border} ${reason.bg}
                group cursor-default overflow-hidden flex flex-col gap-3
              `}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100
                              transition-opacity duration-500 pointer-events-none
                              bg-gradient-to-br from-white/[0.02] to-transparent" />

              <span className={`text-3xl ${reason.color}`}>{reason.icon}</span>

              <div>
                <h3
                  className="text-xl font-bold mb-1"
                  style={{ color: "var(--text-primary)" }}
                >
                  {reason.title}
                </h3>
                <p
                  className="text-sm font-semibold mb-3"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {reason.desc}
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  {reason.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}