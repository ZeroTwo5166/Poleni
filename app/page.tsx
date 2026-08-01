"use client"

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




export default function HomePage() {
  const { theme } = useTheme()
  const isDark = theme === "dark"


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

        {/* Guarantee Banner */}
        <div className="w-full px-6 py-16 flex justify-center">
          <div
            className="relative max-w-3xl w-full mx-auto text-center rounded-2xl border px-8 py-12 overflow-hidden"
            style={{ borderColor: "var(--border)" }}
          >
            {/* Background - Confined inside the card */}
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
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-500 text-xs font-medium mb-6">
                <span className="w-1 h-1 rounded-full bg-emerald-500" />
                Vores garanti
              </div>

              {/* Heading */}
              <h2
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                90 dage.{" "}
                <span className="text-emerald-500">Eller vi arbejder gratis.</span>
              </h2>

              {/* Body */}
              <p
                className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8"
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
        </div>

        <ScrollFade />
      </div>
    </>
  )
}