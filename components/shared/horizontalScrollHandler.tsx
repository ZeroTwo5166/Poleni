// components/shared/HorizontalScrollHandler.tsx
"use client"

import { useEffect, useRef } from "react"

export default function HorizontalScrollHandler() {
  const wrapperRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const wrapper = document.querySelector('.horizontal-wrapper') as HTMLElement
    if (!wrapper) return

    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY
          const startScroll = window.innerHeight * 2 // After Hero + Problem
          const progress = Math.min(Math.max((scrollY - startScroll) / window.innerHeight, 0), 1)
          
          // Move from 0% to -50% as scroll progresses
          const translateX = -(progress * 50)
          wrapper.style.transform = `translateX(${translateX}%)`
          
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return null
}