import Hero from "@/components/home/hero"
import Calculator from "@/components/home/calculator"
import HowWeHelp from "@/components/home/howWeHelp"
import WhyPoleni from "@/components/home/whyPoleni"
import TrustSignals from "@/components/home/trustSignals"
import Problem from "@/components/home/problem"
import Solution from "@/components/home/solution"
import TheStory from "@/components/home/theStory"
import Guarantee from "@/components/home/guarantee"

export default function HomePage() {
  return (
    <>
      {/* Hero is fixed - stays in place */}
      <Hero />
      
      {/* Spacer - creates scroll distance (100vh = full viewport height) */}
      <div style={{ height: "100vh" }} />
      
      {/* All other components - scroll over the hero */}
      <div style={{ position: "relative", zIndex: 20 }}>
        <Problem />
        <Solution />
        <WhyPoleni />
        <TheStory />
        <Calculator />
        <Guarantee />
        <TrustSignals />
      </div>
    </>
  )
}