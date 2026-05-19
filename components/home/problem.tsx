"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/components/shared/themeProvider"
import { fadeUp, viewport } from "@/lib/animationVariants"

const painPoints = [
  {
    emoji: "😤",
    title: "Trapped in 12-month contracts",
    text: "You want out but you can't leave. You keep paying even when results don't come.",
  },
  {
    emoji: "🤷",
    title: "No idea what you're paying for",
    text: "Vague invoices. Zero transparency. You ask questions, you get buzzwords.",
  },
  {
    emoji: "📉",
    title: "Monthly retainers, zero results",
    text: "The agency is getting paid. Your business isn't growing. Something is wrong.",
  }, 
]

export default function Problem() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
<section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Dark mode glow */}
      {isDark && (
        <>
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-px pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(239,68,68,0.25), transparent)",
            }}
          />

          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[180px] pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at top, rgba(239,68,68,0.07) 0%, transparent 70%)",
            }}
          />
        </>
      )}

      {/* Background */}
      {isDark ? (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(239,68,68,0.04) 0%, transparent 70%)",
          }}
        />
      ) : (
        <>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, #fdf6ec 0%, #fef3f2 55%, #f4f3ff 100%)",
            }}
          />

          <div
            className="absolute -left-20 top-1/4 w-[260px] h-[260px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(251,146,60,0.08) 0%, transparent 70%)",
            }}
          />

          <div
            className="absolute -right-20 bottom-1/4 w-[220px] h-[220px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(239,68,68,0.06) 0%, transparent 70%)",
            }}
          />
        </>
      )}

      <div className="relative z-10 max-w-4xl mx-auto text-center">

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <span
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                       border border-red-500/20 bg-red-500/5
                       text-red-500 text-xs font-medium mb-8"
          >
            <span className="w-1 h-1 rounded-full bg-red-500" />
            Sound familiar?
          </span>

          <h2
            className="text-4xl md:text-6xl font-bold leading-tight mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            Most agencies take your money.
            <br />

            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
              Few deliver results.
            </span>
          </h2>

          <p
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-4"
            style={{ color: "var(--text-secondary)" }}
          >
            If you've worked with an agency before, you've probably felt this.
          </p>

          <p
            className="text-base max-w-xl mx-auto leading-relaxed mb-14"
            style={{ color: "var(--text-muted)" }}
          >
            Long contracts. Confusing reports. A new account manager every 6
            months. And somehow — still no real growth.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {painPoints.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.45,
                delay: i * 0.08,
                ease: "easeOut",
              }}
              className="relative p-6 rounded-2xl text-left overflow-hidden transform-gpu will-change-transform"
              style={
                isDark
                  ? {
                      border: "1px solid rgba(239,68,68,0.10)",
                      background: "linear-gradient(135deg,rgba(239,68,68,0.08),rgba(249,115,22,0.04))",
backdropFilter: "blur(14px)",
                    }
                  : {
                      border: "1px solid rgba(239,68,68,0.10)",
                      background: "rgba(255,255,255,0.96)",
                      boxShadow:
                        "0 2px 10px rgba(239,68,68,0.04)",
                    }
              }
            >
              <div
                className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                style={{
                  background:
                    "linear-gradient(90deg, #ef4444, #f97316)",
                }}
              />

              <span className="text-3xl mb-4 block">
                {item.emoji}
              </span>

              <h3
                className="text-sm font-bold mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                {item.title}
              </h3>

              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="mt-16 inline-flex flex-col items-center gap-3"
        >
          <p
            className="text-base font-semibold"
            style={{ color: "var(--text-secondary)" }}
          >
            Poleni is built differently.
          </p>

          <div
            className="flex items-center gap-2 text-sm flex-wrap justify-center"
            style={{ color: "var(--text-muted)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            Fixed prices

            <span className="w-1.5 h-1.5 rounded-full bg-green-500 ml-2" />
            No contracts

            <span className="w-1.5 h-1.5 rounded-full bg-green-500 ml-2" />
            Cancel anytime
          </div>

          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="mt-2 text-indigo-400 text-xl"
          >
            ↓
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}