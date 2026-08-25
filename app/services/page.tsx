"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Sparkle, Check } from "@phosphor-icons/react"
import { useT } from "@/lib/i18n/useT"

type Tab = "websites" | "marketing"

export default function ServicesPage() {
  const t = useT()
  const [tab, setTab] = useState<Tab>("websites")
  const list = tab === "websites" ? t.services.websites : t.services.marketing

  return (
    <main className="relative min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-page mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-14"
        >
          <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: "var(--text-muted)" }}>
            {t.services.eyebrow}
          </span>
          <h1
            className="font-display font-medium tracking-tightest leading-[1.05] text-5xl md:text-6xl mt-5"
            style={{ color: "var(--text-primary)" }}
          >
            {t.services.headline1}
            <br />
            <span style={{ color: "var(--accent)" }}>{t.services.headlineAccent}</span>
          </h1>
          <p className="text-lg mt-6 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {t.services.subtext}
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-6 mb-14 rule-bottom"
        >
          {(["websites", "marketing"] as Tab[]).map((tabKey) => (
            <button
              key={tabKey}
              onClick={() => setTab(tabKey)}
              className="relative pb-4 text-sm font-medium transition-colors duration-200"
              style={{ color: tab === tabKey ? "var(--text-primary)" : "var(--text-muted)" }}
            >
              {t.services.tabs[tabKey]}
              <span
                className="absolute left-0 -bottom-px h-0.5 transition-all duration-300"
                style={{ width: tab === tabKey ? "100%" : "0%", background: "var(--accent)" }}
              />
            </button>
          ))}
        </motion.div>

        {/* Cards */}
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px mb-16"
          style={{ background: "var(--border)" }}
        >
          {list.map((service) => (
            <div
              key={service.name}
              className="relative flex flex-col p-7"
              style={{ background: "var(--bg)" }}
            >
              {(service as { popular?: boolean }).popular && (
                <span
                  className="absolute top-0 right-0 px-3 py-1.5 text-xs font-semibold"
                  style={{ background: "var(--accent)", color: "var(--bg)" }}
                >
                  {t.services.popularBadge}
                </span>
              )}

              <span className="text-xs uppercase tracking-widest font-semibold mb-4" style={{ color: "var(--text-muted)" }}>
                {service.delivery}
              </span>

              <h3 className="font-semibold text-lg mb-2" style={{ color: "var(--text-primary)" }}>
                {service.name}
              </h3>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
                {service.desc}
              </p>

              <ul className="flex flex-col gap-2 mb-8 flex-1">
                {service.includes.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                    <Check size={14} weight="bold" style={{ color: "var(--accent)" }} className="shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="pt-5 rule-top">
                <div className="mb-4">
                  <p className="tabular text-3xl font-semibold" style={{ color: "var(--text-primary)" }}>
                    {service.price}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--accent)" }}>
                    {service.type}
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="block w-full py-3 text-center font-medium text-sm border transition-colors duration-200"
                  style={{ borderColor: "var(--border-strong)", color: "var(--text-primary)" }}
                >
                  {t.services.getStarted}
                </Link>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Weekly update banner */}
        {tab === "marketing" && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-16 p-6 flex items-start gap-4"
            style={{ background: "var(--accent-soft)", border: "1px dashed var(--accent-line)" }}
          >
            <Sparkle size={20} weight="light" style={{ color: "var(--accent)" }} className="shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
                {t.services.weeklyUpdateTitle}
              </h4>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {t.services.weeklyUpdateText}
              </p>
            </div>
          </motion.div>
        )}

        {/* Full table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="panel mb-16"
        >
          <div className="p-6 rule-bottom">
            <h2 className="text-xl font-semibold" style={{ color: "var(--text-primary)" }}>
              {t.services.tableTitle}
            </h2>
            <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
              {t.services.tableSubtitle}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="rule-bottom">
                  {t.services.tableHeaders.map((h) => (
                    <th
                      key={h}
                      className="text-left px-6 py-4 text-xs uppercase tracking-wider font-medium"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...t.services.websites, ...t.services.marketing].map((service, i, arr) => (
                  <tr key={service.name} className={i !== arr.length - 1 ? "rule-bottom" : ""}>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                        {service.name}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                        {service.includes.slice(0, 3).join(", ")}
                        {service.includes.length > 3 && "…"}
                      </p>
                    </td>
                    <td className="tabular px-6 py-4">
                      <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                        {service.price}
                      </span>
                      <span className="text-xs ml-1" style={{ color: "var(--text-muted)" }}>
                        {service.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                        {service.delivery}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="panel p-10 text-center"
        >
          <h2 className="font-display font-medium tracking-tightest text-3xl mb-4" style={{ color: "var(--text-primary)" }}>
            {t.services.ctaHeading}
          </h2>
          <p className="mb-8 max-w-md mx-auto" style={{ color: "var(--text-secondary)" }}>
            {t.services.ctaText}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 font-semibold transition-opacity duration-200 hover:opacity-85 text-center"
              style={{ background: "var(--accent)", color: "var(--bg)" }}
            >
              {t.services.ctaPrimary}
            </Link>
            <Link
              href="/calculator"
              className="px-8 py-4 font-medium border transition-colors duration-200 text-center"
              style={{ borderColor: "var(--border-strong)", color: "var(--text-primary)" }}
            >
              {t.services.ctaSecondary}
            </Link>
          </div>
        </motion.div>

      </div>
    </main>
  )
}
