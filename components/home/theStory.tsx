"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Lightning, UsersThree, Phone } from "@phosphor-icons/react/dist/ssr"
import { fadeUp, staggerContainer, viewport } from "@/lib/animationVariants"
import { useT } from "@/lib/i18n/useT"

const pillIcons = [Lightning, UsersThree, Phone]

export default function TheStory() {
  const t = useT()
  const pills = t.theStory.pills.map((label, i) => ({ label, icon: pillIcons[i] }))

  return (
    <section className="relative py-28 lg:py-36 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mb-14"
        >
          <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: "var(--text-muted)" }}>
            {t.theStory.eyebrow}
          </span>

          <h2
            className="font-display font-medium tracking-tightest leading-[1.05] text-4xl md:text-6xl mt-5"
            style={{ color: "var(--text-primary)" }}
          >
            {t.theStory.headline1}
            <br />
            <span style={{ color: "var(--accent)" }}>{t.theStory.headlineAccent}</span>
          </h2>
        </motion.div>

        {/* Quote — wipes in from the left, a different reveal language than the fades elsewhere */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mb-14"
        >
          <motion.p
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
            className="font-display italic font-medium leading-[1.25] pb-1 text-2xl md:text-3xl mb-8"
            style={{ color: "var(--text-primary)" }}
          >
            &quot;{t.theStory.quote}&quot;
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-10 h-px mb-8 origin-left"
            style={{ background: "var(--accent)" }}
          />

          <div className="flex flex-col gap-5">
            <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {t.theStory.line1}{" "}
              <span className="font-semibold" style={{ color: "var(--accent)" }}>
                {t.theStory.line1Highlight}
              </span>
            </p>

            <p className="text-base leading-relaxed font-semibold" style={{ color: "var(--text-primary)" }}>
              {t.theStory.line2}
            </p>
          </div>
        </motion.div>

        {/* Pills */}
        <motion.div
          className="flex flex-wrap gap-6 mb-16 pb-10 rule-bottom"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {pills.map((item) => {
            const Icon = item.icon
            return (
              <motion.div key={item.label} variants={fadeUp} className="flex items-center gap-2.5">
                <Icon size={18} weight="light" style={{ color: "var(--accent)" }} />
                <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                  {item.label}
                </span>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Principles */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16"
        >
          {t.theStory.principles.map((p, i) => (
            <motion.div key={p.title} variants={fadeUp}>
              <span className="tabular text-sm" style={{ color: "var(--text-muted)" }}>0{i + 1}</span>
              <h3 className="text-lg font-semibold mt-2 mb-2" style={{ color: "var(--text-primary)" }}>
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {p.text}
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
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 font-medium text-sm transition-all duration-200 hover:opacity-85 hover:scale-[1.02] active:scale-[0.97]"
            style={{ background: "var(--accent)", color: "var(--bg)" }}
          >
            {t.theStory.cta}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
