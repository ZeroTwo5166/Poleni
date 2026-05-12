"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useTheme } from "@/components/shared/themeProvider"

const steps = [
  {
    number: "01",
    title:  "You tell us your goals",
    desc:   "Free consultation, no pressure. We listen, ask the right questions, and figure out exactly what your business needs to grow online.",
    tag:    "Free consultation",
    color:  "from-indigo-500/20 to-indigo-600/5",
    border: "border-indigo-500/20",
    dot:    "bg-indigo-400",
    glow:   "rgba(99,102,241,0.15)",
  },
  {
    number: "02",
    title:  "We build and launch",
    desc:   "Fixed price. Transparent timeline. We build your website or run your ads — no surprises, no scope creep, no moving goalposts.",
    tag:    "Fixed price",
    color:  "from-purple-500/20 to-purple-600/5",
    border: "border-purple-500/20",
    dot:    "bg-purple-400",
    glow:   "rgba(168,85,247,0.15)",
  },
  {
    number: "03",
    title:  "You get more customers",
    desc:   "We track results and report back every month. You see exactly what's working. You grow — or we fix it.",
    tag:    "Real results",
    color:  "from-pink-500/20 to-pink-600/5",
    border: "border-pink-500/20",
    dot:    "bg-pink-400",
    glow:   "rgba(236,72,153,0.15)",
  },
]

export default function HowWeHelp() {
  const containerRef      = useRef<HTMLDivElement>(null)
  const { theme }         = useTheme()
  const isDark            = theme === "dark"

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.8], ["0%", "100%"])

  return (
    <section ref={containerRef} className="relative py-32 px-6 overflow-hidden">

      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px]
                   h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                           border border-purple-500/20 bg-purple-500/5
                           text-purple-400 text-xs font-medium mb-4">
            <span className="w-1 h-1 rounded-full bg-purple-400" />
            How it works
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Three steps to more customers
          </h2>
          <p
            className="text-lg max-w-xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            No fluff. No 12-month traps. Just a clear process that gets results.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">

          {/* Animated line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px
                          bg-white/[0.04] -translate-x-1/2 hidden md:block">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-indigo-500
                         via-purple-500 to-pink-500"
            />
          </div>

          <div className="flex flex-col gap-16">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative flex flex-col ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-center gap-8 md:gap-16`}
              >
                {/* Card */}
                <div className="flex-1 w-full">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`
                      relative p-8 rounded-2xl border bg-gradient-to-br
                      ${step.color} ${step.border} overflow-hidden group cursor-default
                    `}
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100
                                 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at 50% 50%, ${step.glow} 0%, transparent 70%)`,
                      }}
                    />

                    <span className={`
                      inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full
                      border text-xs font-medium mb-4 ${step.border}
                    `}>
                      <span className={`w-1 h-1 rounded-full ${step.dot}`} />
                      <span style={{ color: "var(--text-secondary)" }}>
                        {step.tag}
                      </span>
                    </span>

                    <h3
                      className="text-xl font-semibold mb-3"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {step.desc}
                    </p>
                  </motion.div>
                </div>

                {/* Number bubble */}
                <motion.div
                  whileInView={{ scale: [0.5, 1.1, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 + 0.2 }}
                  className={`
                    shrink-0 w-14 h-14 rounded-full border flex items-center
                    justify-center z-10 shadow-lg
                    ${isDark
                      ? "border-white/10 bg-[#111] shadow-black/50"
                      : "border-black/10 bg-white shadow-black/10"}
                  `}
                >
                  <span
                    className="font-bold text-sm"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {step.number}
                  </span>
                </motion.div>

                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}