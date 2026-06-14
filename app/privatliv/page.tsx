// app/privacy/page.tsx
"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/components/shared/themeProvider"
import { fadeUp, viewport } from "@/lib/animationVariants"

const SECTIONS = [
  {
    title: "1. Dataansvarlig",
    body: ["Poleni er dataansvarlig for de personoplysninger, der er beskrevet i denne politik."],
    list: [
      "Poleni (CVR: 46361571)",
      "Høje Gladsaxe 33, 11. tv, 2860 Søborg",
      "kontakt@poleni.dk",
      "+45 42 33 39 95",
    ],
  },
  {
    title: "2. Personoplysninger",
    body: [
      "Vi opbevarer kun de oplysninger, du selv giver os (f.eks. navn, e-mailadresse og telefonnummer). Vi anvender oplysningerne til at besvare dine henvendelser, sende tilbud og levere vores ydelser.",
      "Vi sælger ikke dine oplysninger til tredjeparter.",
    ],
  },
  {
    title: "3. Dine rettigheder",
    body: [
      "Du har ret til indsigt i de oplysninger, vi har registreret om dig. Du kan til enhver tid få dem rettet eller slettet.",
      "Hvis du ønsker at gøre brug af dine rettigheder, kan du kontakte os på kontakt@poleni.dk.",
    ],
  },
  {
    title: "4. Cookies",
    body: [
      "Vi anvender i øjeblikket kun cookies, der er nødvendige for hjemmesidens funktionalitet (f.eks. til vores prisberegner). Vi anvender ikke cookies til markedsføring eller analyse.",
      "Hvis vi på et senere tidspunkt tilføjer værktøjer som Google Analytics eller Facebook Pixel, vil vi indhente dit samtykke via et cookiebanner, inden de tages i brug.",
    ],
  },
  {
    title: "5. Klager",
    body: [
      "Hvis du mener, at vi behandler dine personoplysninger forkert, har du ret til at indgive en klage til Datatilsynet på www.datatilsynet.dk.",
    ],
  },
]

export default function PrivacyPolicyPage() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <main className="relative py-32 px-6 overflow-hidden">
      {/* Ambient background, consistent with rest of site */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                   w-[800px] h-[400px] pointer-events-none -z-10"
        style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.06) 0%, transparent 70%)" }}
      />

      {isDark && (
        <>
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px pointer-events-none -z-10"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(16,185,129,0.4), transparent)",
            }}
          />
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none -z-10"
            style={{
              background:
                "radial-gradient(ellipse at top, rgba(16,185,129,0.12) 0%, transparent 70%)",
            }}
          />
        </>
      )}

      <div className="relative z-10 max-w-3xl mx-auto">

        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-12"
        >
          <span
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                           border border-emerald-500/20 bg-emerald-500/10
                           text-emerald-500 text-xs font-medium mb-4"
          >
            <span className="w-1 h-1 rounded-full bg-emerald-500" />
            Privatliv &amp; cookies
          </span>

          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Cookie- og privatlivspolitik
          </h1>

          <p
            className="text-base max-w-xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            Vi tager dit privatliv alvorligt. Her får du et klart overblik over,
            hvilke oplysninger vi indsamler, hvordan vi bruger dem, og hvilke
            rettigheder du har.
          </p>
        </motion.div>

        {/* Sections */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="glass rounded-2xl p-6 md:p-10"
        >
          <div className="flex flex-col gap-8">
            {SECTIONS.map((section, i) => (
              <div
                key={section.title}
                className={i !== 0 ? "pt-8" : ""}
                style={
                  i !== 0
                    ? { borderTop: "1px solid var(--border)" }
                    : undefined
                }
              >
                <h2
                  className="text-lg font-bold mb-3"
                  style={{ color: "var(--text-primary)" }}
                >
                  {section.title}
                </h2>

                {section.body?.map((paragraph, j) => (
                  <p
                    key={j}
                    className="text-sm leading-relaxed mb-3 last:mb-0"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {paragraph}
                  </p>
                ))}

                {section.list && (
                  <div
                    className="flex flex-col gap-1.5 mt-3 rounded-xl p-4"
                    style={{
                      background: isDark
                        ? "rgba(255,255,255,0.03)"
                        : "rgba(0,0,0,0.02)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    {section.list.map((item, j) => (
                      <span
                        key={j}
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Footer note */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mt-8 text-center"
        >
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Sidst opdateret: 21. juni 2026
          </p>

          <p
            className="text-xs mt-2"
            style={{ color: "var(--text-muted)" }}
          >
            Har du spørgsmål om, hvordan vi håndterer dine oplysninger?{" "}
            <a
              href="mailto:kontakt@poleni.dk"
              className="text-indigo-500 hover:text-indigo-400 transition-colors duration-150 font-medium"
            >
              kontakt@poleni.dk
            </a>
          </p>
        </motion.div>
      </div>
    </main>
  )
}
