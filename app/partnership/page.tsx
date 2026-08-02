"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@/components/shared/themeProvider"

const requirements = [
  { icon: "💰", text: "20,000 – 30,000 DKK monthly revenue minimum" },
  { icon: "✅", text: "Product or service ready to sell" },
  { icon: "📊", text: "Able to track sales (booking system, invoices, or accounting)" },
]

const steps = [
  { step: "01", title: "We screen your business", desc: "Quick call to understand your revenue, product, and tracking setup." },
  { step: "02", title: "We build your website", desc: "If needed — you pay only for domain and hosting. Our work is free." },
  { step: "03", title: "We run your ads", desc: "You pay for the ad clicks directly to Google or Meta. We manage everything." },
  { step: "04", title: "We measure extra revenue", desc: "Based on your actual data — booking system, sales figures, or accounting reports." },
  { step: "05", title: "Poleni takes 15%", desc: "Only on the extra revenue we help generate. If we don't grow you, we earn nothing." },
  { step: "06", title: "After 3 months", desc: "Continue the partnership or stop. No lock-in, no penalty." },
]

export default function PartnershipPage() {
  const { theme } = useTheme()
  const isDark    = theme === "dark"

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
    w-full px-4 py-3 rounded-xl border text-sm outline-none
    transition-colors duration-200
    ${isDark
      ? "bg-white/[0.04] border-white/[0.08] text-white placeholder-gray-600 focus:border-indigo-500/50"
      : "bg-black/[0.04] border-black/[0.08] text-gray-900 placeholder-gray-400 focus:border-indigo-500/50"}
  `

  return (
    <main className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                           border border-indigo-500/20 bg-indigo-500/5
                           text-indigo-400 text-xs font-medium mb-6">
            <span className="w-1 h-1 rounded-full bg-indigo-400" />
            Partnership model
          </span>
          <h1
            className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            Already have a business
            <br />
            <span className="gradient-text">with revenue?</span>
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            We help you scale. You pay only for ad clicks and hosting.
            Our work is free. In return, we take 15% of the extra revenue
            we help generate.
          </p>
        </motion.div>

        {/* Requirements */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass rounded-2xl p-8 mb-8"
        >
          <p
            className="text-sm font-semibold uppercase tracking-widest mb-6"
            style={{ color: "var(--text-muted)" }}
          >
            Requirements
          </p>
          <div className="flex flex-col gap-4">
            {requirements.map((r, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="text-2xl shrink-0">{r.icon}</span>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{r.text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-16"
        >
          <h2
            className="text-2xl font-bold mb-8"
            style={{ color: "var(--text-primary)" }}
          >
            How it works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.07 }}
                className={`
                  flex items-start gap-4 p-6 rounded-2xl border
                  ${isDark ? "border-white/[0.06] bg-white/[0.02]" : "border-black/[0.06] bg-black/[0.02]"}
                `}
              >
                <span
                  className="text-xs font-bold text-indigo-400 bg-indigo-500/10
                             border border-indigo-500/20 rounded-lg px-2 py-1 shrink-0 mt-0.5"
                >
                  {s.step}
                </span>
                <div>
                  <p
                    className="text-sm font-semibold mb-1"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {s.title}
                  </p>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {s.desc}
                  </p>
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
          className="glass rounded-2xl p-8 md:p-12"
        >
          <h2
            className="text-2xl font-bold mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            Apply for partnership
          </h2>
          <p
            className="text-sm mb-8"
            style={{ color: "var(--text-muted)" }}
          >
            We'll review your application and get back to you within 24 hours.
          </p>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="text-5xl mb-4">🎉</div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  Application received!
                </h3>
                <p style={{ color: "var(--text-secondary)" }} className="text-sm">
                  We'll review it and reply to{" "}
                  <span style={{ color: "var(--text-primary)" }}>{form.email}</span>{" "}
                  within 24 hours.
                </p>
              </motion.div>
            ) : (
              <motion.div key="form" className="flex flex-col gap-5">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-xs font-medium"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Business name *
                    </label>
                    <input
                      name="business"
                      value={form.business}
                      onChange={handleChange}
                      placeholder="Your company name"
                      className={inputClass}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      className="text-xs font-medium"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Monthly revenue *
                    </label>
<select
  name="revenue"
  value={form.revenue}
  onChange={handleChange}
  className={inputClass}
  style={{
    backgroundColor: isDark ? "#111111" : "#ffffff",
    color: isDark ? "#ffffff" : "#0a0a0a",
  }}
>
  <option value="">Select range</option>
                      <option value="20-30k">20,000 – 30,000 DKK</option>
                      <option value="30-50k">30,000 – 50,000 DKK</option>
                      <option value="50-100k">50,000 – 100,000 DKK</option>
                      <option value="100k+">100,000+ DKK</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    className="text-xs font-medium"
                    style={{ color: "var(--text-muted)" }}
                  >
                    What do you sell? *
                  </label>
                  <input
                    name="product"
                    value={form.product}
                    onChange={handleChange}
                    placeholder="Describe your product or service"
                    className={inputClass}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    className="text-xs font-medium"
                    style={{ color: "var(--text-muted)" }}
                  >
                    How do you track sales? *
                  </label>
                  <textarea
                    name="tracking"
                    value={form.tracking}
                    onChange={handleChange}
                    placeholder="e.g. booking system, Shopify, accountant reports, invoices..."
                    rows={3}
                    className={inputClass}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    className="text-xs font-medium"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Your email *
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@company.dk"
                    className={inputClass}
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading || !form.business || !form.revenue || !form.product || !form.tracking || !form.email}
                  className="shimmer w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400
                             disabled:opacity-40 disabled:cursor-not-allowed
                             text-white font-semibold rounded-xl
                             transition-colors duration-200 mt-2"
                >
                  {loading ? "Sending..." : "Send application →"}
                </button>

                <p
                  className="text-xs text-center"
                  style={{ color: "var(--text-muted)" }}
                >
                  Sent to kontakt@poleni.dk · We reply within 24 hours
                </p>

              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </main>
  )
}