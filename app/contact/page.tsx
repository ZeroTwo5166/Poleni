// app/contact/page.tsx
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@/components/shared/themeProvider"

type FormState = "idle" | "loading" | "success" | "error"

const contactInfo = [
  {
    icon:   "✉",
    label:  "E-mail",
    value:  "kontakt@poleni.dk",
    href:   "mailto:kontakt@poleni.dk",
    color:  "text-indigo-400",
    border: "border-indigo-500/20",
    bg:     "bg-indigo-500/5",
  },
  {
    icon:   "✆",
    label:  "Telefon",
    value:  "+45 42 33 39 95",
    href:   "tel:+4542333995",
    color:  "text-purple-400",
    border: "border-purple-500/20",
    bg:     "bg-purple-500/5",
  },
  {
    icon:   "◎",
    label:  "Lokation",
    value:  "København, Danmark",
    href:   "#",
    color:  "text-pink-400",
    border: "border-pink-500/20",
    bg:     "bg-pink-500/5",
  },
  {
    icon:   "◷",
    label:  "Svartid",
    value:  "Inden for 24 timer",
    href:   "#",
    color:  "text-green-400",
    border: "border-green-500/20",
    bg:     "bg-green-500/5",
  },
]

export default function ContactPage() {
  const [formState, setFormState] = useState<FormState>("idle")
  const [form, setForm] = useState({
    name:    "",
    email:   "",
    phone:   "",
    message: "",
  })
  const { theme } = useTheme()
  const isDark    = theme === "dark"

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormState("loading")
    try {
      const res = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      })
      if (res.ok) {
        setFormState("success")
        setForm({ name: "", email: "", phone: "", message: "" })
      } else {
        setFormState("error")
      }
    } catch {
      setFormState("error")
    }
  }

  // Reusable input class based on theme
  const inputClass = `
    w-full px-4 py-3 rounded-xl text-sm outline-none
    transition-all duration-200
    ${isDark
      ? "bg-white/[0.04] border border-white/[0.08] text-white placeholder-gray-600 focus:border-indigo-500/50 focus:bg-white/[0.06]"
      : "bg-indigo-500/[0.04] border border-indigo-500/[0.12] text-gray-900 placeholder-gray-400 focus:border-indigo-500/50 focus:bg-indigo-500/[0.07]"}
  `

  const labelClass = `
    text-xs font-medium uppercase tracking-wider mb-2 block
  `

  return (
    <main className="relative min-h-screen pt-32 pb-24 px-6 overflow-hidden">
      {!isDark && (
        <div
          className="absolute inset-0 pointer-events-none -z-10"
          style={{
            background: `
              radial-gradient(900px circle at 15% 10%, rgba(99,102,241,0.07), transparent 55%),
              radial-gradient(700px circle at 85% 90%, rgba(16,185,129,0.05), transparent 60%)
            `,
          }}
        />
      )}
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
            <span className="w-1 h-1 rounded-full bg-indigo-400 animate-pulse" />
            Gratis konsultation
          </span>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Lad os tale om
            <br />
            <span className="gradient-text">din virksomhed</span>
          </h1>
          <p
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Intet pres. Intet salgstrick. Bare en ærlig samtale om
            hvad din virksomhed har brug for, og hvad det koster.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* ── Left: form ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="glass rounded-2xl p-8">
              <h2
                className="text-xl font-semibold mb-6"
                style={{ color: "var(--text-primary)" }}
              >
                Send os en besked
              </h2>

              <AnimatePresence mode="wait">

                {/* Success */}
                {formState === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-500/10 border
                                    border-green-500/20 flex items-center justify-center
                                    text-green-400 text-2xl mb-4">
                      ✓
                    </div>
                    <h3
                      className="font-semibold text-lg mb-2"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Besked sendt!
                    </h3>
                    <p
                      className="text-sm max-w-xs"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Vi vender tilbage inden for 24 timer.
                    </p>
                    <button
                      onClick={() => setFormState("idle")}
                      className={`
                        mt-6 px-6 py-2.5 rounded-xl border text-sm
                        transition-colors duration-200
                        ${isDark
                          ? "border-white/10 text-gray-400 hover:text-white"
                          : "border-black/10 text-gray-500 hover:text-gray-900"}
                      `}
                    >
                      Send en ny besked
                    </button>
                  </motion.div>
                )}

                {/* Form */}
                {formState !== "success" && (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4"
                  >
                    {/* Name */}
                    <div>
                      <label
                        className={labelClass}
                        style={{ color: "var(--text-secondary)" }}
                      >
                        Navn *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Dit fulde navn"
                        className={inputClass}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        className={labelClass}
                        style={{ color: "var(--text-secondary)" }}
                      >
                        E-mail *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="you@company.dk"
                        className={inputClass}
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label
                        className={labelClass}
                        style={{ color: "var(--text-secondary)" }}
                      >
                        Telefon
                        <span
                          className="ml-1 normal-case font-normal"
                          style={{ color: "var(--text-muted)" }}
                        >
                          (valgfri)
                        </span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+45 00 00 00 00"
                        className={inputClass}
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        className={labelClass}
                        style={{ color: "var(--text-secondary)" }}
                      >
                        Besked *
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Fortæl os om din virksomhed og hvad du har brug for..."
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    {/* Error */}
                    {formState === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="px-4 py-3 rounded-xl bg-red-500/10
                                   border border-red-500/20"
                      >
                        <p className="text-red-400 text-sm">
                          Noget gik galt. Prøv igen eller skriv direkte til
                          os på kontakt@poleni.dk
                        </p>
                      </motion.div>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={formState === "loading"}
                      className="shimmer w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400
                                 disabled:opacity-50 disabled:cursor-not-allowed
                                 text-white font-semibold rounded-xl
                                 transition-colors duration-200 text-sm mt-2"
                    >
                      {formState === "loading" ? (
                        <span className="flex items-center justify-center gap-2">
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="block w-4 h-4 border-2 border-white/30
                                       border-t-white rounded-full"
                          />
                          Sender...
                        </span>
                      ) : (
                        "Send besked →"
                      )}
                    </button>

                    <p
                      className="text-xs text-center"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Vi svarer inden for 24 timer. Aldrig spam.
                    </p>

                  </motion.form>
                )}

              </AnimatePresence>
            </div>
          </motion.div>

          {/* ── Right: info ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col gap-4"
          >

            {/* Contact info cards */}
            {contactInfo.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.07 }}
                whileHover={{ scale: 1.02, x: 4 }}
                className={`
                  flex items-center gap-4 p-5 rounded-2xl border
                  ${item.border} ${item.bg} transition-colors duration-200
                  ${item.href === "#" ? "cursor-default" : "cursor-pointer"}
                `}
              >
                <div className={`
                  w-10 h-10 rounded-xl flex items-center justify-center
                  text-lg shrink-0 ${item.color} border ${item.border}
                `}>
                  {item.icon}
                </div>
                <div>
                  <p
                    className="text-xs mb-0.5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {item.label}
                  </p>
                  <p
                    className="text-sm font-medium"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {item.value}
                  </p>
                </div>
              </motion.a>
            ))}

            {/* What happens next */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="glass rounded-2xl p-6 mt-2"
            >
              <h3
                className="font-semibold mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                Hvad sker der nu?
              </h3>
              <div className="flex flex-col gap-4">
                {[
                  { step: "01", text: "Vi læser din besked og gennemgår dine behov" },
                  { step: "02", text: "Vi svarer inden for 24 timer med en ærlig vurdering" },
                  { step: "03", text: "Gratis 30-minutters opkald for at afstemme mål og pris" },
                  { step: "04", text: "Du får et fast tilbud — ingen overraskelser" },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3">
                    <span className="text-xs font-bold text-indigo-400
                                     bg-indigo-500/10 border border-indigo-500/20
                                     rounded-lg px-2 py-1 shrink-0 mt-0.5">
                      {item.step}
                    </span>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Trust note */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-3 px-5 py-4 rounded-2xl
                         border border-green-500/20 bg-green-500/5"
            >
              <div className="w-2 h-2 rounded-full bg-green-400
                              animate-pulse shrink-0" />
              <p
                className="text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                <span
                  className="font-medium"
                  style={{ color: "var(--text-primary)" }}
                >
                  Ingen forpligtelse.{" "}
                </span>
                Konsultationen er helt gratis. Du bestemmer selv,
                om vi er det rette match.
              </p>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </main>
  )
}