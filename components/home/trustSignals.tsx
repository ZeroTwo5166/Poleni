"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import CountUp from "@/components/shared/countUp"
import { fadeUp, staggerContainer, viewport } from "@/lib/animationVariants"
import { useT } from "@/lib/i18n/useT"

const statValues = [
  { value: 6, suffix: "+" },
  { value: 100, suffix: "%" },
  { value: 24, suffix: "h" },
  { value: 0, suffix: "" },
]

export default function TrustSignals() {
  const t = useT()
  const trustStats = statValues.map((v, i) => ({ ...v, label: t.trustSignals.stats[i].label }))

  return (
    <section className="relative py-28 lg:py-36 px-6">
      <div className="max-w-page mx-auto">

        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="max-w-2xl mb-16"
        >
          <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: "var(--text-muted)" }}>
            {t.trustSignals.eyebrow}
          </span>

          <h2
            className="font-display font-medium tracking-tightest text-4xl md:text-5xl mt-5"
            style={{ color: "var(--text-primary)" }}
          >
            {t.trustSignals.heading}
          </h2>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-px mb-16"
          style={{ background: "var(--border)" }}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {t.trustSignals.testimonials.map((tm) => (
            <motion.div key={tm.author} variants={fadeUp} className="p-7 flex flex-col justify-between gap-6" style={{ background: "var(--bg)" }}>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                &quot;{tm.quote}&quot;
              </p>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 flex items-center justify-center shrink-0" style={{ background: "var(--accent)" }}>
                  <span className="text-xs font-bold" style={{ color: "var(--bg)" }}>
                    {tm.author.split(" ").map((w) => w[0]).join("")}
                  </span>
                </div>

                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                    {tm.author}
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {tm.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-px mb-16"
          style={{ background: "var(--border)" }}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {trustStats.map((stat) => (
            <motion.div key={stat.label} variants={fadeUp} className="p-6 text-center" style={{ background: "var(--bg)" }}>
              <p className="tabular text-3xl font-semibold mb-1 tracking-tight" style={{ color: "var(--text-primary)" }}>
                <CountUp value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: "var(--text-muted)" }}>
                {stat.label}
              </p>
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
          <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
            {t.trustSignals.ctaText}
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 font-semibold transition-all duration-200 hover:opacity-85 hover:scale-[1.02] active:scale-[0.97]"
            style={{ background: "var(--accent)", color: "var(--bg)" }}
          >
            {t.trustSignals.ctaButton}
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
