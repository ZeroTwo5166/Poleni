// layout.tsx - remove the HorizontalScrollHandler import and usage
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/shared/navbar"
import Footer from "@/components/shared/footer"
import ThemeProvider from "@/components/shared/themeProvider"
import Preloader from "@/components/shared/preloader"
import StarField from "@/components/shared/starField"
import ClockCursor from "@/components/shared/clockcursor"
import MeshBackground from "@/components/shared/meshBackground"
import ScrollToTop from "@/components/shared/scrollToTop"
import LegalBar from "@/components/shared/legalBar"
// REMOVE: import HorizontalScrollHandler from "@/components/shared/HorizontalScrollHandler"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
})

export const metadata: Metadata = {
  title: "Poleni – Transparent pricing. No contracts. More customers.",
  description:
    "We help Danish businesses grow through websites and marketing. Fixed prices, no hidden fees, no lock-in contracts.",
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
          
          {/* Background effects - lowest layer */}
          <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
            <StarField />
            <MeshBackground />
          </div>
          
          <ClockCursor />

          {/* Content wrapper */}
          <div style={{ position: "relative", zIndex: 5 }}>
            <Navbar />
            <main>
              <ScrollToTop/>
              {children}
              </main>
            <Footer />
          </div>
          <LegalBar />
        </ThemeProvider>
      </body>
    </html>
  )
}