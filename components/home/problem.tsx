"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/components/shared/themeProvider"
import { fadeUp, viewport } from "@/lib/animationVariants"

const painPoints = [
  {
    emoji: "😤",
    title: "Trapped in 12-month contracts",
    text:  "You want out but you can't leave. You keep paying even when results don't come.",
  },
  {
    emoji: "🤷",
    title: "No idea what you're paying for",
    text:  "Vague invoices. Zero transparency. You ask questions, you get buzzwords.",
  },
  {
    emoji: "📉",
    title: "Monthly retainers, zero results",
    text:  "The agency is getting paid. Your business isn't growing. Something is wrong.",
  },
]

export default function Problem() {
  const { theme } = useTheme()
  const isDark    = theme === "dark"

  return (
    <section className="relative py-32 px-6 overflow-hidden">

      {/* Top glow — dark mode only */}
      {isDark && (
        <>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent, rgba(239,68,68,0.4), transparent)" }} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none"
            style={{ background: "radial-gradient(ellipse at top, rgba(239,68,68,0.10) 0%, transparent 70%)" }} />
        </>
      )}

      {/* Background: different per theme */}
      {isDark ? (
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(239,68,68,0.06) 0%, transparent 70%)" }} />
      ) : (
        <>
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(180deg, #fdf6ec 0%, #fef3f2 60%, #f4f3ff 100%)" }} />
          <div className="absolute -left-32 top-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(251,146,60,0.12) 0%, transparent 70%)" }} />
          <div className="absolute -right-32 bottom-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(239,68,68,0.10) 0%, transparent 70%)" }} />
        </>
      )}

      <div className="relative z-10 max-w-4xl mx-auto text-center">

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" exit="exit" viewport={viewport}>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                           border border-red-500/20 bg-red-500/5
                           text-red-500 text-xs font-medium mb-8">
            <span className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
            Sound familiar?
          </span>

          <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6"
            style={{ color: "var(--text-primary)" }}>
            Most agencies take your money.
            <br />
            <span style={{
              background: "linear-gradient(135deg, #ef4444 0%, #f97316 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Few deliver results.
            </span>
          </h2>

          <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-4"
            style={{ color: "var(--text-secondary)" }}>
            If you've worked with an agency before, you've probably felt this.
          </p>
          <p className="text-base max-w-xl mx-auto leading-relaxed mb-14"
            style={{ color: "var(--text-muted)" }}>
            Long contracts. Confusing reports. A new account manager every 6 months.
            And somehow — still no real growth.
          </p>
        </motion.div>

        {/* Pain point cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {painPoints.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className="relative p-6 rounded-2xl text-left overflow-hidden"
              style={isDark ? {
                border:     "1px solid rgba(239,68,68,0.12)",
                background: "rgba(239,68,68,0.04)",
              } : {
                border:         "1px solid rgba(239,68,68,0.14)",
                background:     "rgba(255,255,255,0.92)",
                backdropFilter: "blur(12px)",
                boxShadow:      "0 4px 24px rgba(239,68,68,0.07)",
              }}
            >
              {/* Red accent top line */}
              <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                style={{ background: "linear-gradient(90deg, #ef4444, #f97316)" }} />

              <span className="text-3xl mb-4 block">{item.emoji}</span>
              <h3 className="text-sm font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bridge to solution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 inline-flex flex-col items-center gap-3"
        >
          <p className="text-base font-semibold" style={{ color: "var(--text-secondary)" }}>
            Poleni is built differently.
          </p>
          <div className="flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            Fixed prices
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 ml-2" />
            No contracts
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 ml-2" />
            Cancel anytime
          </div>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="mt-2 text-indigo-400 text-xl"
          >
            ↓
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}