"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/components/shared/themeProvider"
import Link from "next/link"

export default function TheStory() {
  const { theme } = useTheme()
  const isDark    = theme === "dark"

  return (
    <section className="relative py-32 px-6 overflow-hidden">

      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                           border border-purple-500/20 bg-purple-500/5
                           text-purple-400 text-xs font-medium mb-6">
            <span className="w-1 h-1 rounded-full bg-purple-400" />
            What separates Poleni
          </span>
          <h2
            className="text-4xl md:text-6xl font-bold leading-tight"
            style={{ color: "var(--text-primary)" }}
          >
            You are not a number.
            <br />
            <span className="gradient-text">You are our reputation.</span>
          </h2>
        </motion.div>

        {/* Quote block */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`
            relative p-8 md:p-12 rounded-2xl border mb-8 overflow-hidden
            ${isDark
              ? "border-white/[0.06] bg-white/[0.02]"
              : "border-black/[0.06] bg-black/[0.02]"}
          `}
        >
          {/* Large quote mark */}
          <span
            className="absolute top-4 left-6 text-8xl font-serif leading-none pointer-events-none select-none"
            style={{ color: "var(--text-primary)", opacity: 0.04 }}
          >
            "
          </span>

          <p
            className="text-lg md:text-xl italic leading-relaxed mb-6 relative z-10"
            style={{ color: "var(--text-secondary)" }}
          >
            "Big agencies have 100+ clients. You are just another line in their spreadsheet.
            They lose sleep over nothing. We lose sleep over you."
          </p>

          <div
            className="w-12 h-px mb-6"
            style={{ background: "var(--border)" }}
          />

          <div className="flex flex-col gap-5 relative z-10">
            <p style={{ color: "var(--text-secondary)" }} className="text-base leading-relaxed">
              We don't have 100 clients. We have a small group of businesses we truly care about.
              Every single client is critical to us.{" "}
              <span style={{ color: "var(--text-primary)" }} className="font-semibold">
                If you don't grow, we don't grow.
              </span>{" "}
              Our reputation depends on you.
            </p>
            <p style={{ color: "var(--text-secondary)" }} className="text-base leading-relaxed">
              You get direct access to our team. You get a response within hours — not days.
              You talk to real people, not bots or account managers who change every 6 months.
            </p>
            <p style={{ color: "var(--text-primary)" }} className="text-base leading-relaxed font-medium">
              Big agencies talk about results. We deliver them.
              Because our growth depends on yours.
            </p>
          </div>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
        >
          {[
            { icon: "⚡", label: "Response within hours" },
            { icon: "👥", label: "Small by choice" },
            { icon: "📞", label: "Direct team access" },
          ].map((item, i) => (
            <div
              key={i}
              className={`
                flex items-center gap-3 p-4 rounded-xl border
                ${isDark ? "border-white/[0.06] bg-white/[0.02]" : "border-black/[0.06] bg-black/[0.02]"}
              `}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-500
                       hover:bg-indigo-400 text-white font-semibold rounded-xl
                       transition-colors duration-200"
          >
            Talk to us →
          </Link>
        </motion.div>

      </div>
    </section>
  )
}