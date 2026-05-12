"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/components/shared/themeProvider"
import Link from "next/link"

export default function Guarantee() {
  const { theme } = useTheme()
  const isDark    = theme === "dark"

  return (
    <section className="relative py-32 px-6 overflow-hidden">

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.06) 0%, transparent 65%)" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`
            relative p-10 md:p-16 rounded-3xl border overflow-hidden text-center
            border-indigo-500/20 bg-indigo-500/5
          `}
        >
          {/* Glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.1) 0%, transparent 60%)" }}
          />

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl
                       bg-indigo-500/10 border border-indigo-500/20 mb-8 text-3xl"
          >
            🛡️
          </motion.div>

          <h2
            className="text-4xl md:text-6xl font-bold leading-tight mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            3 months. Results.
            <br />
            <span className="gradient-text">Or we don't get paid.</span>
          </h2>

          <p
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
            style={{ color: "var(--text-secondary)" }}
          >
            We work for 90 days. If you don't see more customers,
            you don't pay for our service.
          </p>

          {/* Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 text-left">
            {[
              { step: "01", title: "We start working", desc: "Full setup, strategy, and execution from day one." },
              { step: "02", title: "90 days of results", desc: "We track everything. You see the numbers every month." },
              { step: "03", title: "You decide", desc: "Seeing results? Continue. Not satisfied? You don't pay." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className={`
                  p-5 rounded-2xl border
                  ${isDark ? "border-white/[0.06] bg-white/[0.02]" : "border-black/[0.06] bg-black/[0.02]"}
                `}
              >
                <span
                  className="text-xs font-bold text-indigo-400 bg-indigo-500/10
                             border border-indigo-500/20 rounded-lg px-2 py-1 mb-3 inline-block"
                >
                  {item.step}
                </span>
                <p
                  className="text-sm font-semibold mb-1"
                  style={{ color: "var(--text-primary)" }}
                >
                  {item.title}
                </p>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 bg-indigo-500 hover:bg-indigo-400 text-white
                         font-semibold rounded-xl transition-colors duration-200
                         w-full sm:w-auto text-center"
            >
              Claim your free audit →
            </Link>
            <Link
              href="/partnership"
              className={`
                px-8 py-4 rounded-xl font-medium transition-all duration-300
                text-base w-full sm:w-auto text-center border
                ${isDark
                  ? "border-white/10 hover:border-white/20 text-gray-300 hover:text-white bg-white/[0.02] hover:bg-white/[0.05]"
                  : "border-black/10 hover:border-black/20 text-gray-600 hover:text-gray-900 bg-black/[0.02] hover:bg-black/[0.05]"}
              `}
            >
              No budget? See partnership →
            </Link>
          </div>

        </motion.div>
      </div>
    </section>
  )
}