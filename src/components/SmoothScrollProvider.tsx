"use client"

import { ReactNode, useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollSmoother } from "gsap/ScrollSmoother"

interface SmoothScrollProviderProps {
  children: ReactNode
}

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
}

export default function SmoothScrollProvider({
  children,
}: SmoothScrollProviderProps) {
  const smoother = useRef<ScrollSmoother | null>(null)

  useLayoutEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return

    // Create ScrollSmoother instance
    smoother.current = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 2, // Smooth factor (0-3, higher = smoother but slower)
      normalizeScroll: true, // Normalize scroll across devices
      ignoreMobileResize: true, // Prevent iOS resize issues
      effects: true, // Enable data-speed parallax effects
      smoothTouch: 0.1, // Touch scrolling (0 = disabled, 0.1 = light touch)

      // Callbacks for debugging
      onUpdate: self => {
        // Optional: track scroll progress
        // console.log('Scroll progress:', self.progress());
      },
      onStop: () => {
        // console.log('Scrolling stopped');
      },
    })

    // Refresh ScrollTrigger after initialization
    ScrollTrigger.refresh()

    // Cleanup on unmount
    return () => {
      if (smoother.current) {
        smoother.current.kill()
      }
    }
  }, [])

  return (
    <div id="smooth-wrapper" className="fixed inset-0 overflow-hidden">
      <div id="smooth-content">{children}</div>
    </div>
  )
}
