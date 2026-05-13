import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/shared/navbar"
import Footer from "@/components/shared/footer"
import ThemeProvider from "@/components/shared/themeProvider"
import Preloader from "@/components/shared/preloader"
import StarField from "@/components/shared/starField"
import ClockCursor from "@/components/shared/clockcursor"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
})

export const metadata: Metadata = {
  title: "Poleni – Transparent pricing. No contracts. More customers.",
  description:
    "We help Danish businesses grow through websites and marketing. Fixed prices, no hidden fees, no lock-in contracts.",
  keywords: ["webbureau", "hjemmeside", "Google Ads", "Meta Ads", "SEO", "København", "Danmark"],
  openGraph: {
    title: "Poleni – Transparent pricing. No contracts.",
    description: "Clear plan. Fixed price. Real results.",
    url: "https://poleni.dk",
    siteName: "Poleni",
    locale: "da_DK",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="da" suppressHydrationWarning>
      <body className={`${geist.variable} font-sans antialiased`}>
        <ThemeProvider>
          <Preloader />
          {/* Stars — dark mode only, sits behind everything */}
          <StarField />

          <ClockCursor />

          {/* Ambient glow top */}
          <div
            className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px]
                       h-[300px] z-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at top, rgba(99,102,241,0.12) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>

        </ThemeProvider>
      </body>
    </html>
  )
}