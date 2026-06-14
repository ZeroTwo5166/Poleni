// app/handelsbetingelser/page.tsx
"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/components/shared/themeProvider"
import { fadeUp, viewport } from "@/lib/animationVariants"

const SECTIONS = [
  {
    title: "1. Generelt",
    body: [
      "Disse handelsbetingelser gælder, når du som kunde køber ydelser fra Poleni (CVR: 46361571). Ved at benytte vores tjenester accepterer du de vilkår, der er beskrevet her.",
    ],
  },
  {
    title: "2. Tilbud og aftaler",
    body: [
      "En bindende aftale indgås først, når vi sender dig en skriftlig ordrebekræftelse via e-mail. Den pris, der fremgår af ordrebekræftelsen, er den gældende pris.",
      "Vores online prisberegner giver kun et estimat – det er ikke et bindende tilbud, før vi har bekræftet det skriftligt.",
    ],
  },
  {
    title: "3. Vores ydelser",
    body: ["Vi tilbyder:"],
    list: [
      "Hjemmesider (engangsbetaling til fast pris)",
      "Google Ads (månedligt abonnement)",
      "Meta Ads (månedligt abonnement)",
    ],
  },
  {
    title: "4. Betaling",
    list: [
      "Hjemmesider: 50 % forudbetaling inden arbejdet påbegyndes, og 50 % når arbejdet er færdigt og godkendt af dig.",
      "Annoncering (månedligt): Faktureres den 1. i hver måned. Du betaler forud for den kommende måned.",
    ],
  },
  {
    title: "5. Ingen binding",
    body: [
      "Du kan opsige dit månedlige marketingabonnement med 30 dages varsel ved at sende en e-mail til kontakt@poleni.dk. Der opkræves ingen ekstra gebyrer ved opsigelse.",
      "Forudbetaling for hjemmesider refunderes ikke, hvis du annullerer efter arbejdet er påbegyndt.",
    ],
  },
  {
    title: "6. Levering",
    body: [
      "Hjemmesider leveres inden for 3–14 dage (afhængigt af kompleksitet), når vi har modtaget alt nødvendigt materiale fra dig.",
      "Vi bestræber os på at overholde aftalte tidsfrister, men vi er ikke ansvarlige for forsinkelser, der skyldes dig (f.eks. manglende materiale) eller uforudsete tekniske problemer.",
    ],
  },
  {
    title: "7. Dit ansvar",
    body: [
      "Du er ansvarlig for at levere korrekte oplysninger (tekst, billeder, produktdata mv.) og for at have de nødvendige rettigheder til at anvende dette materiale.",
      "Du er også ansvarlig for at overholde gældende lovgivning (f.eks. markedsføringsregler samt cookie- og privatlivspolitikker på din egen hjemmeside).",
    ],
  },
  {
    title: "8. Force majeure",
    body: [
      "Vi er ikke ansvarlige for forsinkelser eller manglende opfyldelse af aftaler som følge af forhold uden for vores kontrol. Dette kan blandt andet omfatte strejker, IT-nedbrud, ny lovgivning eller ændringer på annonceplatforme som Google eller Meta.",
    ],
  },
  {
    title: "9. Reklamation og mangler",
    body: [
      "Hvis du opdager en fejl i det arbejde, vi har leveret, skal du gøre os opmærksomme på den inden for rimelig tid (normalt 30 dage). Vi vil herefter rette fejlen uden beregning.",
      "Efter dansk købelov har du op til 24 måneders reklamationsret, men kun hvis manglen var til stede på leveringstidspunktet.",
    ],
  },
  {
    title: "10. Ansvarsbegrænsning",
    body: [
      "Vores ansvar er begrænset til det beløb, du har betalt for den konkrete ydelse, som har forårsaget problemet.",
      "Vi er ikke ansvarlige for indirekte tab (f.eks. tabt fortjeneste), medmindre dette skyldes grov uagtsomhed fra vores side.",
    ],
  },
  {
    title: "11. Lovvalg og tvister",
    body: [
      "Disse handelsbetingelser er underlagt dansk ret. Eventuelle tvister afgøres ved de almindelige domstole i København (Københavns Byret).",
      "Hvis du er forbruger (og ikke erhvervskunde), kan du også benytte Nævnenes Hus – dog er vores ydelser primært rettet mod virksomheder.",
    ],
  },
  {
    title: "12. Ændringer",
    body: [
      "Vi forbeholder os retten til løbende at opdatere disse handelsbetingelser. Den version, der er offentliggjort på vores hjemmeside på tidspunktet for din bestilling, er den gældende version.",
    ],
  },
]

export default function TermsPage() {
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
            Handelsbetingelser
          </span>

          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Handelsbetingelser
          </h1>

          <p
            className="text-base max-w-xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            Disse handelsbetingelser gælder for alle ydelser leveret af Poleni.
            Læs dem venligst grundigt, så du ved, hvad du kan forvente af os –
            og hvad vi forventer af dig.
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
                  <ul className="flex flex-col gap-2 mt-1">
                    {section.list.map((item, j) => (
                      <li key={j} className="flex items-start gap-2.5">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 bg-indigo-500" />
                        <span
                          className="text-sm leading-relaxed"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
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
            Har du spørgsmål til disse handelsbetingelser?{" "}
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