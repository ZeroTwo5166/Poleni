// app/page.tsx

import Hero from "@/components/home/hero"
import Calculator from "@/components/home/calculator"
import WhyPoleni from "@/components/home/whyPoleni"
import TrustSignals from "@/components/home/trustSignals"
import Problem from "@/components/home/problem"
import TheStory from "@/components/home/theStory"
import Guarantee from "@/components/home/guarantee"
import SolutionWhyPoleniWrapper from "@/components/home/solutionWhyPoleniWrapper"
import Solution from "@/components/home/solution"

export default function HomePage() {
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
       <SolutionWhyPoleniWrapper/>
       {/* <Solution/>
       <WhyPoleni/> */}

        <TheStory />
        <Calculator />
        <Guarantee />
        <TrustSignals />
      </div>
    </>
  )
}