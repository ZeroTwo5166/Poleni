"use client"

import { useEffect, useState } from "react"
import Hero from "@/components/home/hero"
import Calculator from "@/components/home/calculator"
import WhyPoleni from "@/components/home/whyPoleni"
import TrustSignals from "@/components/home/trustSignals"
import Problem from "@/components/home/problem"
import TheStory from "@/components/home/theStory"
import Guarantee from "@/components/home/guarantee"
import SolutionWhyPoleniWrapper from "@/components/home/solutionWhyPoleniWrapper"
import Solution from "@/components/home/solution"
import ScrollFade from "@/components/shared/scrolleFade"

import { useTheme } from "@/components/shared/themeProvider"

const CALENDLY_URL = "https://calendly.com/eubishbayadi/30min"

export default function HomePage() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Plain iframe embed instead of Calendly's inline-widget JS. The JS
  // widget (`initInlineWidget`) throws an internal null-reference error
  // from its own postMessage handler in SPA/remount scenarios and requires
  // a non-static-position container — both are bugs in widget.js itself,
  // not something fixable from our side. An iframe sidesteps that whole
  // class of bug since widget.js never runs.
  const [calendlySrc, setCalendlySrc] = useState<string | null>(null)
  const [calendlyLoaded, setCalendlyLoaded] = useState(false)
  const [calendlyKey, setCalendlyKey] = useState(0)

  useEffect(() => {
    setCalendlyLoaded(false)
    const domain = window.location.hostname
    setCalendlySrc(
      `${CALENDLY_URL}?embed_domain=${domain}&embed_type=Inline&hide_gdpr_banner=1`
    )
  }, [calendlyKey])

  function refreshCalendly() {
    setCalendlyLoaded(false)
    setCalendlyKey((k) => k + 1)
  }

  return (
    <>
      {/* HERO STACK */}
      <Hero />

      {/* Hero scroll distance */}
      <div style={{ height: "100vh" }} />

      <div style={{ position: "relative", zIndex: 20 }}>
        {/* NORMAL STACK OVER HERO */}
        <Problem />

        {/* SOLUTION → WHY POLENI scroll-lock slide */}
        <SolutionWhyPoleniWrapper />

        <TheStory />
        <Calculator />

        {/* Guarantee + Calendar section */}
        <div className="w-full px-6 py-16">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

            {/* Guarantee card */}
            <div
              className="relative text-center rounded-2xl border px-8 py-10 overflow-hidden"
              style={{ borderColor: "var(--border)" }}
            >
              <div
                className="absolute inset-0 -z-10"
                style={
                  isDark
                    ? {
                      background:
                        "linear-gradient(135deg, #052e1b 0%, #064e3b 50%, #052014 100%)",
                      opacity: 1,
                    }
                    : {
                      background:
                        "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 45%, #ecfdf5 100%)",
                      opacity: 1,
                    }
                }
              />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-500 text-xs font-medium mb-6">
                  <span className="w-1 h-1 rounded-full bg-emerald-500" />
                  Vores garanti
                </div>

                <h2
                  className="text-3xl md:text-4xl font-bold mb-4"
                  style={{ color: "var(--text-primary)" }}
                >
                  90 dage.{" "}
                  <span className="text-emerald-500">Eller vi arbejder gratis.</span>
                </h2>

                <p
                  className="text-base md:text-lg leading-relaxed mx-auto"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Vi opsætter din hjemmeside og lancerer dine annoncer. I de første 90
                  dage arbejder vi hårdt for at skabe resultater. Hvis du ikke ser en
                  tydelig forbedring i dine kampagner eller din synlighed efter 90 dage,{" "}
                  <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>
                    fortsætter vi uden ekstra betaling
                  </span>{" "}
                  indtil du er tilfreds. Ingen binding. Du har kontrollen.
                </p>
              </div>
            </div>

            {/* Calendar card */}
            <div
              className={`
                relative rounded-2xl border overflow-hidden flex flex-col
                ${isDark
                  ? "border-white/[0.08] bg-white/[0.03]"
                  : "border-indigo-500/[0.1] bg-indigo-500/[0.03]"}
              `}
            >
              <div
                className={`
                  flex items-center justify-between gap-3 px-6 py-5 border-b
                  ${isDark ? "border-white/[0.08]" : "border-indigo-500/[0.1]"}
                `}
              >
                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Book et gratis møde
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    30 minutter, ingen forpligtelse.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={refreshCalendly}
                  disabled={!calendlyLoaded}
                  title="Genindlæs kalenderen"
                  aria-label="Genindlæs kalenderen"
                  className={`
                    shrink-0 w-8 h-8 rounded-lg flex items-center justify-center border
                    transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                    ${isDark
                      ? "border-white/10 text-gray-400 hover:text-white hover:border-white/20"
                      : "border-black/10 text-gray-500 hover:text-gray-900 hover:border-black/20"}
                  `}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`w-4 h-4 ${!calendlyLoaded ? "animate-spin" : ""}`}
                  >
                    <path d="M21 12a9 9 0 1 1-2.64-6.36" />
                    <path d="M21 4v6h-6" />
                  </svg>
                </button>
              </div>

              <div className="relative" style={{ height: "480px" }}>
                {!calendlyLoaded && (
                  <div
                    className="absolute inset-0 flex items-center justify-center z-10"
                    style={{
                      background: isDark
                        ? "rgba(0,0,0,0.15)"
                        : "rgba(255,255,255,0.5)",
                    }}
                  >
                    <span
                      className="block w-6 h-6 border-2 rounded-full animate-spin"
                      style={{
                        borderColor: isDark
                          ? "rgba(255,255,255,0.15)"
                          : "rgba(99,102,241,0.15)",
                        borderTopColor: isDark ? "#818cf8" : "#6366f1",
                      }}
                    />
                  </div>
                )}
                {calendlySrc && (
                  <iframe
                    key={calendlyKey}
                    src={calendlySrc}
                    onLoad={() => setCalendlyLoaded(true)}
                    title="Book et gratis møde"
                    style={{ width: "100%", height: "100%", border: "none", display: "block" }}
                  />
                )}
              </div>
            </div>

          </div>
        </div>

        <ScrollFade />
      </div>
    </>
  )
}