"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useTheme } from "@/components/shared/themeProvider"

const websites = [
  {
    name:     "Static website",
    desc:     "Perfect for small businesses that need a clean, fast online presence.",
    price:    "4.000 kr",
    type:     "one-time",
    delivery: "3–5 days",
    color:    "border-indigo-500/20 bg-indigo-500/5",
    dot:      "bg-indigo-400",
    tag:      "text-indigo-400 border-indigo-500/20 bg-indigo-500/5",
    includes: [
      "3–5 pages",
      "Contact form",
      "Basic SEO",
      "Mobile responsive",
      "Fast loading",
    ],
  },
  {
    name:     "Dynamic / CMS website",
    desc:     "For businesses that need to update content themselves — blog, news, products.",
    price:    "10.000 kr",
    type:     "one-time",
    delivery: "10–14 days",
    color:    "border-purple-500/20 bg-purple-500/5",
    dot:      "bg-purple-400",
    tag:      "text-purple-400 border-purple-500/20 bg-purple-500/5",
    popular:  true,
    includes: [
      "5–10 pages",
      "Blog / news section",
      "Editable CMS",
      "Contact forms",
      "SEO optimised",
      "Mobile responsive",
    ],
  },
  {
    name:     "E-commerce website",
    desc:     "Full online shop with product catalog, cart, checkout and payment integration.",
    price:    "18.000 kr",
    type:     "one-time",
    delivery: "14–21 days",
    color:    "border-pink-500/20 bg-pink-500/5",
    dot:      "bg-pink-400",
    tag:      "text-pink-400 border-pink-500/20 bg-pink-500/5",
    includes: [
      "Product catalog",
      "Shopping cart",
      "Checkout flow",
      "Payment integration",
      "Order management",
      "Mobile responsive",
    ],
  },
]

const marketing = [
  {
    name:     "Google Ads",
    desc:     "Get in front of people actively searching for your product or service.",
    price:    "2.500 kr",
    type:     "per month",
    delivery: "Ongoing",
    color:    "border-blue-500/20 bg-blue-500/5",
    dot:      "bg-blue-400",
    tag:      "text-blue-400 border-blue-500/20 bg-blue-500/5",
    includes: [
      "Campaign setup",
      "Daily management",
      "A/B ad testing",
      "Monthly report",
      "No lock-in contract",
    ],
  },
  {
    name:     "Meta Ads",
    desc:     "Reach your ideal customers on Facebook and Instagram with targeted ads.",
    price:    "2.000 kr",
    type:     "per month",
    delivery: "Ongoing",
    color:    "border-pink-500/20 bg-pink-500/5",
    dot:      "bg-pink-400",
    tag:      "text-pink-400 border-pink-500/20 bg-pink-500/5",
    includes: [
      "Ad creatives",
      "Audience targeting",
      "Retargeting setup",
      "Monthly report",
      "No lock-in contract",
    ],
  },
  {
    name:     "SEO",
    desc:     "Rank higher on Google and get more organic traffic every month.",
    price:    "3.500 kr",
    type:     "per month",
    delivery: "Ongoing",
    color:    "border-green-500/20 bg-green-500/5",
    dot:      "bg-green-400",
    tag:      "text-green-400 border-green-500/20 bg-green-500/5",
    includes: [
      "Keyword research",
      "On-page SEO",
      "Technical SEO audit",
      "Monthly report",
      "No lock-in contract",
    ],
  },
]

type Tab = "websites" | "marketing"

export default function ServicesPage() {
  const [tab, setTab]     = useState<Tab>("websites")
  const { theme }         = useTheme()
  const isDark            = theme === "dark"

  return (
    <main className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                           border border-indigo-500/20 bg-indigo-500/5
                           text-indigo-400 text-xs font-medium mb-6">
            <span className="w-1 h-1 rounded-full bg-indigo-400" />
            What we offer
          </span>
          <h1
            className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Services &
            <br />
            <span className="gradient-text">transparent pricing</span>
          </h1>
          <p
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Fixed prices. No hidden fees. No surprises.
            You know exactly what you're getting before you pay.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center justify-center mb-12"
        >
          <div className="flex items-center gap-1 p-1 rounded-xl glass">
            {(["websites", "marketing"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`
                  px-6 py-2.5 rounded-lg text-sm font-medium
                  transition-all duration-200
                  ${tab === t ? "bg-indigo-500 text-white" : ""}
                `}
                style={tab !== t ? { color: "var(--text-secondary)" } : {}}
              >
                {t === "websites" ? "Websites" : "Marketing"}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Website cards */}
        {tab === "websites" && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          >
            {websites.map((service, i) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className={`
                  relative flex flex-col p-6 rounded-2xl border
                  ${service.color} cursor-default
                  ${service.popular ? "ring-1 ring-purple-500/30" : ""}
                `}
              >
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 rounded-full bg-purple-500
                                     text-white text-xs font-semibold">
                      Most popular
                    </span>
                  </div>
                )}

                <span className={`
                  inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full
                  border text-xs font-medium w-fit mb-4 ${service.tag}
                `}>
                  <span className={`w-1 h-1 rounded-full ${service.dot}`} />
                  {service.delivery}
                </span>

                <h3
                  className="font-semibold text-lg mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  {service.name}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {service.desc}
                </p>

                <ul className="flex flex-col gap-2 mb-8 flex-1">
                  {service.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${service.dot}`} />
                      {item}
                    </li>
                  ))}
                </ul>

                <div
                  className="pt-4"
                  style={{ borderTop: "1px solid var(--border)" }}
                >
                  <div className="flex items-end justify-between mb-4">
                    <div>
                      <p
                        className="text-3xl font-bold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {service.price}
                      </p>
                      <p
                        className="text-xs mt-0.5"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {service.type}
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/contact"
                    className={`
                      block w-full py-3 text-center font-medium rounded-xl
                      transition-colors duration-200 text-sm
                      ${isDark
                        ? "bg-white/[0.06] hover:bg-white/10 text-white"
                        : "bg-black/[0.06] hover:bg-black/10 text-gray-900"}
                    `}
                  >
                    Get started →
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Marketing cards */}
        {tab === "marketing" && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          >
            {marketing.map((service, i) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className={`
                  flex flex-col p-6 rounded-2xl border
                  ${service.color} cursor-default
                `}
              >
                <span className={`
                  inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full
                  border text-xs font-medium w-fit mb-4 ${service.tag}
                `}>
                  <span className={`w-1 h-1 rounded-full ${service.dot}`} />
                  No lock-in
                </span>

                <h3
                  className="font-semibold text-lg mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  {service.name}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {service.desc}
                </p>

                <ul className="flex flex-col gap-2 mb-8 flex-1">
                  {service.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${service.dot}`} />
                      {item}
                    </li>
                  ))}
                </ul>

                <div
                  className="pt-4"
                  style={{ borderTop: "1px solid var(--border)" }}
                >
                  <div className="flex items-end justify-between mb-4">
                    <div>
                      <p
                        className="text-3xl font-bold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {service.price}
                      </p>
                      <p
                        className="text-xs mt-0.5"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {service.type}
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/contact"
                    className={`
                      block w-full py-3 text-center font-medium rounded-xl
                      transition-colors duration-200 text-sm
                      ${isDark
                        ? "bg-white/[0.06] hover:bg-white/10 text-white"
                        : "bg-black/[0.06] hover:bg-black/10 text-gray-900"}
                    `}
                  >
                    Get started →
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Full table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl overflow-hidden mb-16"
        >
          <div
            className="p-6"
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            <h2
              className="text-xl font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              Full price overview
            </h2>
            <p
              className="text-sm mt-1"
              style={{ color: "var(--text-muted)" }}
            >
              All prices in DKK. Ads budget not included.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  {["Service", "What's included", "Price", "Delivery"].map((h) => (
                    <th
                      key={h}
                      className="text-left px-6 py-4 text-xs uppercase
                                 tracking-wider font-medium"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...websites, ...marketing].map((service, i) => (
                  <tr
                    key={service.name}
                    className="transition-colors duration-150"
                    style={{
                      borderBottom: i === websites.length + marketing.length - 1
                        ? "none"
                        : `1px solid var(--border)`,
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = isDark
                        ? "rgba(255,255,255,0.02)"
                        : "rgba(0,0,0,0.02)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent"
                    }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${service.dot}`} />
                        <span
                          className="text-sm font-medium"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {service.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p
                        className="text-sm"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {service.includes.slice(0, 3).join(", ")}
                        {service.includes.length > 3 && "…"}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="text-sm font-semibold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {service.price}
                      </span>
                      <span
                        className="text-xs ml-1"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {service.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="text-sm"
                        style={{ color: "var(--text-secondary)" }}
                      >
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
          className="glass rounded-2xl p-10 text-center"
        >
          <h2
            className="text-3xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Not sure what you need?
          </h2>
          <p
            className="mb-8 max-w-md mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            Book a free 30-minute consultation. We'll tell you exactly
            what your business needs — no pressure, no upselling.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-indigo-500 hover:bg-indigo-400 text-white
                         font-semibold rounded-xl transition-colors duration-200
                         text-center"
            >
              Book free consultation →
            </Link>
            <Link
              href="/calculator"
              className={`
                px-8 py-4 rounded-xl font-medium transition-colors duration-200
                text-center border
                ${isDark
                  ? "border-white/10 hover:border-white/20 text-gray-300 hover:text-white bg-white/[0.02] hover:bg-white/[0.05]"
                  : "border-black/10 hover:border-black/20 text-gray-600 hover:text-gray-900 bg-black/[0.02] hover:bg-black/[0.05]"}
              `}
            >
              Try the calculator
            </Link>
          </div>
        </motion.div>

      </div>
    </main>
  )
}