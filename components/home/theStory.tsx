"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/components/shared/themeProvider"
import Link from "next/link"
import { fadeUp, staggerContainer, viewport } from "@/lib/animationVariants"

export default function TheStory() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <section
      className="relative py-32 px-6 overflow-hidden"
      style={!isDark ? { backgroundColor: "#fff1f2" } : undefined}
    >
      {/* Top glow — dark mode only */}
      {isDark && (
        <>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent, rgba(244,63,94,0.4), transparent)" }} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none"
            style={{ background: "radial-gradient(ellipse at top, rgba(244,63,94,0.14) 0%, transparent 70%)" }} />
        </>
      )}

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        {!isDark ? (
          <div className="absolute inset-0" style={{ backgroundColor: "#fff1f2" }}>
            <div
              className="absolute inset-0 opacity-[0.04] mix-blend-multiply"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
            />
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(135deg, rgba(244,63,94,0.10) 0%, rgba(251,113,133,0.06) 100%)" }} />
          </div>
        ) : (
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-60"
            style={{ background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)" }}
          />
        )}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">

        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={viewport}
          className="mb-12 text-center"
        >
          <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold mb-6
            ${isDark
              ? "border-rose-500/20 bg-rose-500/5 text-rose-400"
              : "border-rose-300 bg-rose-100 text-rose-600 shadow-sm"}`}>
            <span className={`w-1 h-1 rounded-full ${isDark ? "bg-rose-400" : "bg-rose-500"}`} />
            What separates Poleni
          </span>

          <h2 className="text-4xl md:text-6xl font-bold leading-tight" style={{ color: "var(--text-primary)" }}>
            You are not a number.
            <br />
            {isDark ? (
  <span style={{
    backgroundImage: "linear-gradient(135deg, #fb7185 0%, #fda4af 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  }}>
    You are our reputation.
  </span>
) : (
  <span style={{
    backgroundImage: "linear-gradient(135deg, #f43f5e 0%, #fb7185 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  }}>
    You are our reputation.
  </span>
)}
          </h2>
        </motion.div>

        {/* Quote box */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={viewport}
          className={`relative p-8 md:p-12 rounded-2xl border-2 mb-8 overflow-hidden
            ${isDark
              ? "border-white/[0.06] bg-white/[0.02]"
              : "border-rose-200 bg-white/80 shadow-xl shadow-rose-100/60"}`}
          style={!isDark ? { backdropFilter: "blur(12px)" } : undefined}
        >
          <span className={`absolute -top-2 left-4 text-9xl font-serif leading-none pointer-events-none select-none
            ${isDark ? "text-rose-500/40" : "text-rose-300"}`}>
            "
          </span>

          <p className="text-lg md:text-xl italic leading-relaxed mb-6 relative z-10 font-medium"
            style={{ color: isDark ? "var(--text-secondary)" : "#1e293b" }}>
            "Big agencies have 100+ clients. You are just another line in their spreadsheet.
            They lose sleep over nothing. We lose sleep over you."
          </p>

          <div className="w-12 h-1 mb-6 rounded-full"
            style={{ background: isDark ? "rgba(255,255,255,0.1)" : "linear-gradient(90deg, #f43f5e, #fb7185)" }} />

          <div className="flex flex-col gap-5 relative z-10">
            <p className="text-base leading-relaxed"
              style={{ color: isDark ? "var(--text-secondary)" : "#334155" }}>
              We don't have 100 clients. We have a small group of businesses we truly care about.
              Every single client is critical to us.{" "}
              <span className="font-bold" style={{ color: isDark ? "var(--text-primary)" : "#f43f5e" }}>
                If you don't grow, we don't grow.
              </span>{" "}
              Our reputation depends on you.
            </p>
            <p className="text-base leading-relaxed font-bold"
              style={{ color: isDark ? "var(--text-primary)" : "#0f172a" }}>
              Big agencies talk about results. We deliver them. Because our growth depends on yours.
            </p>
          </div>
        </motion.div>

        {/* Feature pills */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {[
            { icon: "⚡", label: "Response within hours" },
            { icon: "👥", label: "Small by choice" },
            { icon: "📞", label: "Direct team access" },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className={`flex items-center gap-3 p-4 rounded-xl border-2
                ${isDark
                  ? "border-white/[0.06] bg-white/[0.02]"
                  : "border-rose-200/60 bg-rose-50/80"}`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-sm font-bold"
                style={{ color: isDark ? "var(--text-secondary)" : "#9f1239" }}>
                {item.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="text-center"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 text-white font-bold rounded-xl
                       transition-all duration-200 shadow-lg active:scale-95 hover:scale-105"
            style={{ background: "linear-gradient(135deg, #f43f5e, #fb7185)", boxShadow: "0 8px 24px rgba(244,63,94,0.3)" }}
          >
            Talk to us →
          </Link>
        </motion.div>

      </div>
    </section>
  )
}