"use client"

import { motion } from "framer-motion"
import { Bank, Lightning, HandHeart, ChatCircleText, Crosshair, ChartLineUp } from "@phosphor-icons/react/dist/ssr"
import { fadeUp, staggerContainer, viewport } from "@/lib/animationVariants"
import { useT } from "@/lib/i18n/useT"

const reasonIcons = [Bank, Lightning, HandHeart]
const stepIcons = [ChatCircleText, Crosshair, ChartLineUp]

export default function WhyPoleni() {
  const t = useT()
  const reasons = t.whyPoleni.reasons.map((r, i) => ({ ...r, icon: reasonIcons[i], large: i === 0 }))
  const steps = t.whyPoleni.steps.map((s, i) => ({ ...s, icon: stepIcons[i] }))

  return (
    <section className="relative py-28 lg:py-36 px-6">
      <div className="max-w-page mx-auto">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="max-w-2xl mb-16 lg:mb-20"
        >
          <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: "var(--text-muted)" }}>
            {t.whyPoleni.eyebrow}
          </span>

          <h2
            className="font-display font-medium tracking-tightest leading-[1.05] text-4xl md:text-5xl mt-5"
            style={{ color: "var(--text-primary)" }}
          >
            {t.whyPoleni.headline1}{" "}
            <span style={{ color: "var(--accent)" }}>{t.whyPoleni.headlineAccent}</span>
          </h2>

          <p className="text-lg mt-5 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {t.whyPoleni.subtext}
          </p>
        </motion.div>

        {/* Asymmetric 2fr / 1fr / 1fr grid — deliberately not equal cards */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-px"
          style={{ background: "var(--border)" }}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {reasons.map((reason) => {
            const Icon = reason.icon
            return (
              <motion.div
                key={reason.title}
                variants={fadeUp}
                whileHover="hover"
                className={`p-8 lg:p-10 flex flex-col gap-4 ${reason.large ? "lg:col-span-1" : ""}`}
                style={{ background: "var(--bg)" }}
              >
                <motion.span
                  variants={{ hover: { rotate: -8, scale: 1.15 } }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="inline-flex w-fit"
                >
                  <Icon size={26} weight="light" style={{ color: "var(--accent)" }} />
                </motion.span>
                <div>
                  <h3 className="text-xl font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
                    {reason.title}
                  </h3>
                  <p className="text-sm font-medium mb-3" style={{ color: "var(--accent)" }}>
                    {reason.desc}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {reason.detail}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Process */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mt-24 lg:mt-32"
        >
          <h3
            className="font-display font-medium tracking-tightest text-2xl md:text-3xl mb-12"
            style={{ color: "var(--text-primary)" }}
          >
            {t.whyPoleni.processHeading}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <div key={step.title} className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span className="tabular text-sm" style={{ color: "var(--text-muted)" }}>0{i + 1}</span>
                    <Icon size={20} weight="light" style={{ color: "var(--accent)" }} />
                  </div>
                  <h4 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
                    {step.title}
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {step.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
