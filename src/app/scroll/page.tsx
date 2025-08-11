"use client"

import ScrollHero from "@/components/ScrollHero"
import ScrollParallax from "@/components/ScrollParallax"
import ScrollPin from "@/components/ScrollPin"
import ScrollReveal from "@/components/ScrollReveal"
import ScrollProgress from "@/components/ScrollProgress"
import ScrollNav from "@/components/ScrollNav"
import NavDemo from "@/components/NavDemo"

export default function ScrollAnimations() {
  return (
    <>
      {/* Progress Bar */}
      <ScrollProgress />

      {/* Header */}
      <ScrollNav />

      {/* Hero Section with Clamp */}
      <ScrollHero />

      {/* Parallax Section */}
      {/* <ScrollParallax /> */}

      {/* Pin Section */}
      <ScrollPin />

      {/* Reveal Section */}
      <ScrollReveal />

      {/* Navigation Demo */}
      <NavDemo />

      {/* Footer Spacer */}
      <section
        id="end"
        className="h-screen bg-gradient-to-t from-gray-900 to-gray-800 flex items-center justify-center"
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-4">End of Journey</h2>
          <p className="text-gray-400">Scroll back up to replay animations</p>
        </div>
      </section>
    </>
  )
}
