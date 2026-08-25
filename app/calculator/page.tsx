// app/calculator/page.tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Monitor, FileText, ShoppingCart, Lightning, Check, Plus } from "@phosphor-icons/react"
import {
  WEBSITE_TYPES,
  ADDONS,
  type WebsiteTypeId,
  type AddonId,
} from "@/lib/pricing"
import DeviceMockup from "@/components/home/deviceMockup"
import { useT } from "@/lib/i18n/useT"

const TYPE_ICONS: Record<WebsiteTypeId, typeof Monitor> = {
  static: Monitor,
  dynamic: FileText,
  ecommerce: ShoppingCart,
  custom: Lightning,
}

export default function CalculatorPage() {
  const t = useT()
  const [websiteType, setWebsiteType] = useState<WebsiteTypeId | null>(null)
  const [activeAddons, setActiveAddons] = useState<Set<AddonId>>(new Set())
  const [openFaq, setOpenFaq]           = useState<number | null>(null)

  const selectedSite = WEBSITE_TYPES.find((t) => t.id === websiteType) ?? null
  const monthlyTotal  = ADDONS
    .filter((a) => activeAddons.has(a.id))
    .reduce((sum, a) => sum + a.price, 0)
  const growthCount   = activeAddons.size
  const growthPct     = Math.round((growthCount / 3) * 100)
  const growthMessage = t.pricing.growthMessages[growthCount as 0 | 1 | 2 | 3]

  function toggleAddon(id: AddonId) {
    setActiveAddons((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <main className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-page mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: "var(--text-muted)" }}>
            {t.calculatorPage.eyebrow}
          </span>
          <h1 className="font-display font-medium tracking-tightest leading-[1.05] text-5xl md:text-6xl mt-5"
            style={{ color: "var(--text-primary)" }}>
            {t.calculatorPage.headline1}
            <br />
            <span style={{ color: "var(--accent)" }}>{t.calculatorPage.headlineAccent}</span>
          </h1>
          <p className="text-lg mt-6 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {t.calculatorPage.subtext}
          </p>
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">

          {/* ── LEFT: inputs + included ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            {/* Website type */}
            <div className="panel p-6">
              <p className="text-sm font-medium mb-1" style={{ color: "var(--text-primary)" }}>
                {t.calculatorPage.step1Title}
              </p>
              <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>
                {t.calculatorPage.step1Sub}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {WEBSITE_TYPES.map((type) => {
                  const isActive = websiteType === type.id
                  const Icon = TYPE_ICONS[type.id]
                  const copy = t.pricing.websiteTypes[type.id]
                  return (
                    <button
                      key={type.id}
                      onClick={() => setWebsiteType((prev) => (prev === type.id ? null : type.id))}
                      className="relative p-4 border text-left transition-colors duration-150"
                      style={{
                        borderColor: isActive ? "var(--accent-line)" : "var(--border)",
                        background: isActive ? "var(--accent-soft)" : "transparent",
                      }}
                    >
                      <span className="relative z-10 flex flex-col gap-2">
                        <Icon size={18} weight="light" style={{ color: isActive ? "var(--accent)" : "var(--text-muted)" }} />
                        <span className="text-sm font-medium" style={{
                          color: isActive ? "var(--accent)" : "var(--text-primary)",
                        }}>
                          {copy.label}
                        </span>
                        <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                          {copy.desc}
                        </span>
                        <span className="tabular text-sm font-semibold mt-1" style={{
                          color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                        }}>
                          {type.price ? `${type.price.toLocaleString("da-DK")} kr` : t.calculator.contactUs}
                        </span>
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Addons */}
            <div className="panel p-6">
              <p className="text-sm font-medium mb-1" style={{ color: "var(--text-primary)" }}>
                {t.calculatorPage.step2Title}
              </p>
              <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>
                {t.calculatorPage.step2Sub}
              </p>
              <div className="flex flex-col gap-3">
                {ADDONS.map((addon) => {
                  const isActive = activeAddons.has(addon.id)
                  const copy = t.pricing.addons[addon.id]
                  return (
                    <button
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className="flex items-center justify-between p-4 border transition-colors duration-150 text-left"
                      style={{
                        borderColor: isActive ? "var(--accent-line)" : "var(--border)",
                        background: isActive ? "var(--accent-soft)" : "transparent",
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-5 h-5 border flex items-center justify-center shrink-0"
                          style={{
                            borderColor: isActive ? "var(--accent)" : "var(--border-strong)",
                            backgroundColor: isActive ? "var(--accent)" : "transparent",
                          }}
                        >
                          {isActive && <Check size={12} weight="bold" style={{ color: "var(--bg)" }} />}
                        </div>
                        <div>
                          <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                            {copy.label}
                          </p>
                          <p className="text-xs" style={{ color: "var(--text-muted)" }}>{copy.desc}</p>
                        </div>
                      </div>
                      <span className="tabular text-sm font-semibold shrink-0 ml-4" style={{ color: "var(--text-secondary)" }}>
                        {addon.price.toLocaleString("da-DK")} {t.pricing.perMonth}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Growth meter */}
            <div className="panel p-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{t.calculator.growthPotential}</p>
                <motion.span key={growthPct} initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }} className="tabular text-2xl font-semibold"
                  style={{ color: "var(--text-primary)" }}>
                  {growthPct}%
                </motion.span>
              </div>
              <div className="h-1.5 overflow-hidden mb-3" style={{ background: "var(--border)" }}>
                <motion.div
                  className="h-full"
                  style={{ background: "var(--accent)" }}
                  initial={{ width: 0 }}
                  animate={{ width: `${growthPct}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </div>
              <AnimatePresence mode="wait">
                <motion.p key={growthMessage} initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }} className="text-xs"
                  style={{ color: "var(--text-secondary)" }}>
                  {growthMessage}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Everything included */}
            <div className="panel p-6">
              <p className="text-sm font-medium mb-4" style={{ color: "var(--text-primary)" }}>
                {t.calculatorPage.includedTitle}
              </p>
              <div className="grid grid-cols-1 gap-2.5">
                {t.calculatorPage.included.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <Check size={14} weight="bold" style={{ color: "var(--accent)" }} className="shrink-0" />
                    <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT: price summary + phone ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col gap-6 lg:sticky lg:top-28"
          >
            <div className="panel p-6">
              <p className="text-xs uppercase tracking-widest font-semibold mb-6" style={{ color: "var(--text-muted)" }}>
                {t.calculatorPage.estimateLabel}
              </p>

              <div className="flex items-start justify-between mb-4 pb-4 rule-bottom">
                <div>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{t.calculatorPage.websiteOnce}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                    {selectedSite ? t.pricing.websiteTypes[selectedSite.id].label : t.calculatorPage.noWebsiteSelected}
                  </p>
                </div>
                <AnimatePresence mode="wait">
                  <motion.p key={websiteType} initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                    className="tabular text-2xl font-semibold" style={{ color: "var(--text-primary)" }}>
                    {selectedSite
                      ? selectedSite.price
                        ? `${selectedSite.price.toLocaleString("da-DK")} kr`
                        : t.calculator.contactUs
                      : "0 kr"}
                  </motion.p>
                </AnimatePresence>
              </div>

              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{t.calculatorPage.monthlyMarketing}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                    {activeAddons.size === 0
                      ? t.calculatorPage.noServicesSelected
                      : [...activeAddons].map((id) => t.pricing.addons[id]?.label).join(" + ")}
                  </p>
                </div>
                <AnimatePresence mode="wait">
                  <motion.p key={monthlyTotal} initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                    className="tabular text-2xl font-semibold" style={{ color: "var(--text-primary)" }}>
                    {monthlyTotal > 0 ? `${monthlyTotal.toLocaleString("da-DK")} ${t.pricing.perMonth}` : `0 ${t.pricing.perMonth}`}
                  </motion.p>
                </AnimatePresence>
              </div>

              {(selectedSite?.price || monthlyTotal > 0) && (
                <div
                  className="flex items-center justify-between mb-6 px-4 py-3"
                  style={{ background: "var(--accent-soft)", border: "1px solid var(--accent-line)" }}
                >
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{t.calculatorPage.firstYearTotal}</p>
                  <p className="tabular font-semibold" style={{ color: "var(--accent)" }}>
                    {((selectedSite?.price ?? 0) + monthlyTotal * 12).toLocaleString("da-DK")} kr
                  </p>
                </div>
              )}

              <Link href="/contact"
                className="block w-full py-3.5 text-center font-semibold transition-opacity duration-200 hover:opacity-85 mb-3"
                style={{ background: "var(--accent)", color: "var(--bg)" }}>
                {t.calculatorPage.getQuote}
              </Link>
              <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
                {t.calculatorPage.priceNote}
              </p>
            </div>

            <DeviceMockup websiteType={websiteType} activeAddons={activeAddons} />
          </motion.div>
        </div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="font-display font-medium tracking-tightest text-3xl text-center mb-8" style={{ color: "var(--text-primary)" }}>
            {t.calculatorPage.faqHeading}
          </h2>

          <div className="panel">
            {t.calculatorPage.faqs.map((faq, i) => (
              <div key={faq.q} className={i !== 0 ? "rule-top" : ""}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left">
                  <span className="text-sm font-medium pr-4" style={{ color: "var(--text-primary)" }}>
                    {faq.q}
                  </span>
                  <motion.span animate={{ rotate: openFaq === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }} className="shrink-0"
                    style={{ color: "var(--text-muted)" }}>
                    <Plus size={16} weight="bold" />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden">
                      <p className="px-6 pb-5 text-sm leading-relaxed pt-4 rule-top"
                        style={{ color: "var(--text-secondary)" }}>
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mt-16">
            <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
              {t.calculatorPage.stillUnsure}
            </p>
            <Link href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 font-semibold transition-opacity duration-200 hover:opacity-85"
              style={{ background: "var(--accent)", color: "var(--bg)" }}>
              {t.calculatorPage.bookFree}
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </main>
  )
}
