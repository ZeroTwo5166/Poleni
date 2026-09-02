"use client"

import { motion } from "framer-motion"
import { Bank, Lightning, HandHeart, ChatCircleText, Crosshair, ChartLineUp } from "@phosphor-icons/react/dist/ssr"
import { fadeUp, staggerContainer, viewport } from "@/lib/animationVariants"
import { useT } from "@/lib/i18n/useT"

const reasonIcons = [Bank, Lightning, HandHeart]
const stepIcons = [ChatCircleText, Crosshair, ChartLineUp]

function spotlightMove(e: React.MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty("--spot-x", `${e.clientX - rect.left}px`)
  e.currentTarget.style.setProperty("--spot-y", `${e.clientY - rect.top}px`)
}

// Shared by the inline "Process" block below and the standalone
// WhyPoleniProcess export used once WhyPoleni is pinned/slammed in by
// SolutionWhyPoleniWrapper — that wrapper is too tall to fit the reason
// cards AND the process steps in one 100vh pin box, so the steps continue
// in normal flow right after it.
function ProcessSteps() {
  const t = useT()
  const steps = t.whyPoleni.steps.map((s, i) => ({ ...s, icon: stepIcons[i] }))

  return (
    <>
      <h3
        className="font-display font-medium tracking-tightest text-2xl md:text-3xl mb-12"
        style={{ color: "var(--text-primary)" }}
      >
        {t.whyPoleni.processHeading}
      </h3>

      <div
        className="grid grid-cols-1 sm:grid-cols-3 gap-px"
        style={{ background: "var(--border)" }}
      >
        {steps.map((step, i) => {
          const Icon = step.icon
          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover="hover"
              onMouseMove={spotlightMove}
              className="spotlight p-8 lg:p-10 flex flex-col gap-4"
              style={{ background: "var(--bg-elevated)" }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  variants={{ hover: { rotate: -8, scale: 1.1 } }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="w-11 h-11 flex items-center justify-center shrink-0"
                  style={{ background: "var(--accent-soft)", border: "1px solid var(--accent-line)" }}
                >
                  <Icon size={20} weight="light" style={{ color: "var(--accent)" }} />
                </motion.div>
                <span className="tabular text-sm" style={{ color: "var(--text-muted)" }}>0{i + 1}</span>
              </div>
              <h4 className="text-lg font-semibold mt-3" style={{ color: "var(--text-primary)" }}>
                {step.title}
              </h4>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {step.desc}
              </p>
            </motion.div>
          )
        })}
      </div>
    </>
  )
}

export default function WhyPoleni({ hideProcess = false }: { hideProcess?: boolean }) {
  const t = useT()
  const reasons = t.whyPoleni.reasons.map((r, i) => ({ ...r, icon: reasonIcons[i], large: i === 0 }))

  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-center py-20 px-6">
      <div className="max-w-page mx-auto w-full">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="max-w-2xl mb-14 lg:mb-16"
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

        {/* Genuinely asymmetric — the first reason gets real extra width, not just a label */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr_1fr] gap-px"
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
                onMouseMove={spotlightMove}
                className="spotlight p-8 lg:p-10 flex flex-col gap-5"
                style={{ background: "var(--bg-elevated)" }}
              >
                <motion.div
                  variants={{ hover: { rotate: -8, scale: 1.1 } }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="w-14 h-14 flex items-center justify-center shrink-0"
                  style={{ background: "var(--accent-soft)", border: "1px solid var(--accent-line)" }}
                >
                  <Icon size={26} weight="light" style={{ color: "var(--accent)" }} />
                </motion.div>
                <div>
                  <h3
                    className={`font-semibold mb-1.5 ${reason.large ? "text-2xl" : "text-xl"}`}
                    style={{ color: "var(--text-primary)" }}
                  >
                    {reason.title}
                  </h3>
                  <p className="text-sm font-medium mb-3" style={{ color: "var(--accent)" }}>
                    {reason.desc}
                  </p>
                  <p
                    className={`leading-relaxed ${reason.large ? "text-base" : "text-sm"}`}
                    style={{ color: "var(--text-muted)" }}
                  >
                    {reason.detail}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Process */}
        {!hideProcess && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mt-16 lg:mt-20"
          >
            <ProcessSteps />
          </motion.div>
        )}
      </div>
    </section>
  )
}

// Rendered in normal document flow after the pinned WhyPoleni slam-in
// animation finishes, since this section is too tall to fit the 100vh
// pin box alongside the reason cards without shrinking text unreadably.
export function WhyPoleniProcess() {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-page mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <ProcessSteps />
        </motion.div>
      </div>
    </section>
  )
}
