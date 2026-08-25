"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Monitor, Target, DeviceMobile, Check } from "@phosphor-icons/react/dist/ssr"
import { fadeUp, staggerContainer, viewport } from "@/lib/animationVariants"
import { useT } from "@/lib/i18n/useT"

const icons = [Monitor, Target, DeviceMobile]

export default function Solution() {
  const t = useT()
  const services = t.solution.services.map((s, i) => ({ ...s, icon: icons[i], href: "/services" }))

  return (
    <section className="relative py-28 lg:py-36 px-6">
      <div className="max-w-page mx-auto">
        {/* header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="max-w-2xl mb-16 lg:mb-20"
        >
          <motion.span
            variants={fadeUp}
            className="block text-xs uppercase tracking-widest font-semibold"
            style={{ color: "var(--text-muted)" }}
          >
            {t.solution.eyebrow}
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="font-display font-medium tracking-tightest leading-[1.05] text-4xl md:text-5xl mt-5"
            style={{ color: "var(--text-primary)" }}
          >
            {t.solution.headline1}{" "}
            <span style={{ color: "var(--accent)" }}>{t.solution.headlineAccent}</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-lg mt-5 leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {t.solution.subtext}
          </motion.p>
        </motion.div>

        {/* Full-width editorial rows — not equal cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                variants={fadeUp}
                whileHover="hover"
                className={`group grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 py-10 ${i !== 0 ? "rule-top" : ""}`}
              >
                <div className="lg:col-span-4 flex items-start gap-4">
                  <motion.span
                    variants={{ hover: { rotate: 8, scale: 1.12 } }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="shrink-0 mt-1 inline-flex"
                  >
                    <Icon size={28} weight="light" style={{ color: "var(--accent)" }} />
                  </motion.span>
                  <div>
                    <h3 className="text-2xl font-semibold" style={{ color: "var(--text-primary)" }}>
                      {service.title}
                    </h3>
                    <p className="text-sm font-medium mt-1" style={{ color: "var(--accent)" }}>
                      {service.desc}
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {service.detail}
                  </p>
                </div>

                <div className="lg:col-span-3 flex flex-col justify-between gap-4">
                  <ul className="flex flex-col gap-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                        <Check size={14} weight="bold" className="shrink-0 mt-1" style={{ color: "var(--accent)" }} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={service.href}
                    className="text-sm font-semibold w-fit"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {t.solution.learnMore}
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 pt-10 rule-top flex flex-col sm:flex-row sm:items-center justify-between gap-6"
        >
          <p className="text-base" style={{ color: "var(--text-secondary)" }}>
            {t.solution.ctaQuestion}
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 font-medium text-sm w-fit transition-all duration-200 hover:opacity-85 hover:scale-[1.02] active:scale-[0.97]"
            style={{ background: "var(--accent)", color: "var(--bg)" }}
          >
            {t.solution.ctaButton}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
