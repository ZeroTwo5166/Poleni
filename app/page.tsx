"use client"

import { useEffect, useState } from "react"
import { ArrowClockwise, Check } from "@phosphor-icons/react"
import Hero from "@/components/home/hero"
import Calculator from "@/components/home/calculator"
import Problem from "@/components/home/problem"
import TheStory from "@/components/home/theStory"
import SolutionWhyPoleniWrapper from "@/components/home/solutionWhyPoleniWrapper"
import ScrollFade from "@/components/shared/scrolleFade"
import { useT } from "@/lib/i18n/useT"

const CALENDLY_URL = "https://calendly.com/eubishbayadi/30min"

export default function HomePage() {
  const t = useT()
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
      <Hero />

      <div style={{ position: "relative", zIndex: 20 }}>
        <Problem />

        {/* Solution → WhyPoleni scroll-lock slide */}
        <SolutionWhyPoleniWrapper />

        <TheStory />
        <Calculator />

      {/* Guarantee + Calendar section */}
      <section className="w-full px-6 py-28 lg:py-36">
        <div className="max-w-page mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* Guarantee panel */}
          <div className="panel p-8 lg:p-10">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent)" }} />
              <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: "var(--text-muted)" }}>
                {t.homeGuarantee.eyebrow}
              </span>
            </div>

            <h2 className="font-display font-medium tracking-tightest leading-[1.05] text-3xl md:text-4xl mb-4" style={{ color: "var(--text-primary)" }}>
              {t.homeGuarantee.headline1}{" "}
              <span style={{ color: "var(--accent)" }}>{t.homeGuarantee.headlineAccent}</span>
            </h2>

            <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {t.homeGuarantee.bodyPre}{" "}
              <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>
                {t.homeGuarantee.bodyHighlight}
              </span>{" "}
              {t.homeGuarantee.bodyPost}
            </p>

            <div className="mt-8 pt-6 rule-top">
              <p className="text-xs uppercase tracking-widest font-semibold mb-4" style={{ color: "var(--text-muted)" }}>
                {t.homeGuarantee.checksHeading}
              </p>
              <ul className="flex flex-col gap-3">
                {t.homeGuarantee.checks.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    <Check size={14} weight="bold" className="shrink-0 mt-1" style={{ color: "var(--accent)" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Calendar panel */}
          <div className="panel flex flex-col">
            <div className="flex items-center justify-between gap-3 px-6 py-5 rule-bottom">
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                  {t.homeGuarantee.bookMeeting}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>
                  {t.homeGuarantee.bookMeetingSub}
                </p>
              </div>
              <button
                type="button"
                onClick={refreshCalendly}
                disabled={!calendlyLoaded}
                title={t.homeGuarantee.reload}
                aria-label={t.homeGuarantee.reload}
                className="shrink-0 w-8 h-8 flex items-center justify-center border transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
              >
                <ArrowClockwise size={16} weight="light" className={!calendlyLoaded ? "animate-spin" : ""} />
              </button>
            </div>

            <div className="relative" style={{ height: "480px" }}>
              {!calendlyLoaded && (
                <div
                  className="absolute inset-0 flex items-center justify-center z-10"
                  style={{ background: "var(--bg)" }}
                >
                  <span
                    className="block w-6 h-6 border-2 rounded-full animate-spin"
                    style={{ borderColor: "var(--border)", borderTopColor: "var(--accent)" }}
                  />
                </div>
              )}
              {calendlySrc && (
                <iframe
                  key={calendlyKey}
                  src={calendlySrc}
                  onLoad={() => setCalendlyLoaded(true)}
                  title={t.homeGuarantee.bookMeeting}
                  style={{ width: "100%", height: "100%", border: "none", display: "block" }}
                />
              )}
            </div>
          </div>

        </div>
        </section>

        <ScrollFade />
      </div>
    </>
  )
}
