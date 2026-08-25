"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CurrencyDollar, CheckCircle, ChartBar, Confetti } from "@phosphor-icons/react"
import { useT } from "@/lib/i18n/useT"

const requirementIcons = [CurrencyDollar, CheckCircle, ChartBar]

export default function PartnershipPage() {
  const t = useT()
  const requirements = t.partnership.requirements.map((text, i) => ({ text, icon: requirementIcons[i] }))

  const [form, setForm]       = useState({
    business: "",
    revenue:  "",
    product:  "",
    tracking: "",
    email:    "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.MouseEvent) {
    e.preventDefault()
    setLoading(true)
    // Simulate submit — wire up to your email provider or API route
    await new Promise((r) => setTimeout(r, 1000))
    setLoading(false)
    setSubmitted(true)
  }

  const inputClass = `
    w-full px-4 py-3 border text-sm outline-none
    transition-colors duration-200
  `
  const inputStyle = { background: "var(--bg-elevated)", borderColor: "var(--border)", color: "var(--text-primary)" }

  return (
    <main className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-page mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-20"
        >
          <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: "var(--text-muted)" }}>
            {t.partnership.eyebrow}
          </span>
          <h1
            className="font-display font-medium tracking-tightest leading-[1.02] text-5xl md:text-7xl mt-5"
            style={{ color: "var(--text-primary)" }}
          >
            {t.partnership.headline1}
            <br />
            <span style={{ color: "var(--accent)" }}>{t.partnership.headlineAccent}</span>
          </h1>
          <p className="text-lg md:text-xl mt-6 leading-relaxed max-w-2xl" style={{ color: "var(--text-secondary)" }}>
            {t.partnership.subtext}
          </p>
        </motion.div>

        {/* Requirements */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="panel p-8 mb-8"
        >
          <p className="text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: "var(--text-muted)" }}>
            {t.partnership.requirementsLabel}
          </p>
          <div className="flex flex-col gap-4">
            {requirements.map((r) => {
              const Icon = r.icon
              return (
                <div key={r.text} className="flex items-center gap-4">
                  <Icon size={22} weight="light" style={{ color: "var(--accent)" }} className="shrink-0" />
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{r.text}</p>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-16"
        >
          <h2 className="font-display font-medium tracking-tightest text-2xl mb-8" style={{ color: "var(--text-primary)" }}>
            {t.partnership.howItWorksHeading}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: "var(--border)" }}>
            {t.partnership.steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                className="flex items-start gap-4 p-6"
                style={{ background: "var(--bg)" }}
              >
                <span className="tabular text-xs font-bold shrink-0 mt-0.5" style={{ color: "var(--accent)" }}>
                  {s.step}
                </span>
                <div>
                  <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>{s.title}</p>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="panel p-8 md:p-12"
        >
          <h2 className="font-display font-medium tracking-tightest text-2xl mb-2" style={{ color: "var(--text-primary)" }}>
            {t.partnership.applyHeading}
          </h2>
          <p className="text-sm mb-8" style={{ color: "var(--text-muted)" }}>
            {t.partnership.applySub}
          </p>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <Confetti size={44} weight="light" style={{ color: "var(--accent)" }} className="mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                  {t.partnership.successTitle}
                </h3>
                <p style={{ color: "var(--text-secondary)" }} className="text-sm">
                  {t.partnership.successTextPre}{" "}
                  <span style={{ color: "var(--text-primary)" }}>{form.email}</span>{" "}
                  {t.partnership.successTextPost}
                </p>
              </motion.div>
            ) : (
              <motion.div key="form" className="flex flex-col gap-5">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>{t.partnership.businessNameLabel}</label>
                    <input
                      name="business" value={form.business} onChange={handleChange}
                      placeholder={t.partnership.businessNamePlaceholder} className={inputClass} style={inputStyle}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>{t.partnership.revenueLabel}</label>
                    <select
                      name="revenue" value={form.revenue} onChange={handleChange}
                      className={inputClass} style={inputStyle}
                    >
                      <option value="">{t.partnership.revenueSelectPlaceholder}</option>
                      <option value="20-30k">{t.partnership.revenueOptions[0]}</option>
                      <option value="30-50k">{t.partnership.revenueOptions[1]}</option>
                      <option value="50-100k">{t.partnership.revenueOptions[2]}</option>
                      <option value="100k+">{t.partnership.revenueOptions[3]}</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>{t.partnership.productLabel}</label>
                  <input
                    name="product" value={form.product} onChange={handleChange}
                    placeholder={t.partnership.productPlaceholder} className={inputClass} style={inputStyle}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>{t.partnership.trackingLabel}</label>
                  <textarea
                    name="tracking" value={form.tracking} onChange={handleChange}
                    placeholder={t.partnership.trackingPlaceholder}
                    rows={3} className={inputClass} style={inputStyle}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>{t.partnership.emailLabel}</label>
                  <input
                    name="email" type="email" value={form.email} onChange={handleChange}
                    placeholder={t.partnership.emailPlaceholder} className={inputClass} style={inputStyle}
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading || !form.business || !form.revenue || !form.product || !form.tracking || !form.email}
                  className="w-full py-4 font-semibold mt-2 transition-opacity duration-200 hover:opacity-85 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ background: "var(--accent)", color: "var(--bg)" }}
                >
                  {loading ? t.partnership.sending : t.partnership.submit}
                </button>

                <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
                  {t.partnership.footNote}
                </p>

              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </main>
  )
}
