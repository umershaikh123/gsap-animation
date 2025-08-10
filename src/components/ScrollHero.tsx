"use client"

import { useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

export default function ScrollHero() {
  const container = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const [showMarkers, setShowMarkers] = useState(false)

  useGSAP(
    () => {
      // Set initial state for SVG path
      const pathElement = document.querySelector(".draw-path") as SVGPathElement
      if (pathElement) {
        const pathLength = pathElement.getTotalLength()
        gsap.set(pathElement, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        })

        // SVG Draw animation - exactly like reference
        gsap.from(pathElement, {
          strokeDashoffset: pathLength,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".heading",
            start: "clamp(top center)",
            scrub: true,
            pin: pinRef.current,
            pinSpacing: false,
            markers: showMarkers,
            id: "svg-draw",
          },
        })
      }

      // Don't animate images manually - ScrollSmoother handles data-speed attributes
      // when effects: true is enabled

      // Debug info
      console.log("ScrollHero animations initialized")
      console.log("Container height:", container.current?.offsetHeight)
      console.log("Path element:", pathElement)
      console.log(
        "Images with data-speed:",
        document.querySelectorAll("[data-speed]")
      )
    },
    { scope: container }
  )

  return (
    <section
      ref={container}
      id="hero"
      className="hero min-h-[150vh] relative bg-gradient-to-b from-gray-900 to-gray-800"
    >
      {/* Debug Controls */}
      <div className="fixed top-16 right-4 z-50 bg-gray-800 p-4 rounded-lg">
        <button
          onClick={() => setShowMarkers(!showMarkers)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {showMarkers ? "Hide" : "Show"} Markers
        </button>
      </div>

      <div className="container mx-auto px-6 pt-32">
        <div
          className="heading relative z-[2] mix-blend-mode-difference perspective-[1000px] backface-visibility-visible"
          style={{ transform: "rotate(0.1deg)" }}
        >
          <div ref={pinRef} className="pin">
            <h1 className="text-center relative uppercase text-6xl md:text-8xl font-bold text-white">
              <span className="clamp relative -z-[1] inline-block">
                Clamp
                <svg
                  className="absolute w-[112%] top-1/2 left-[-6%] -translate-y-1/2 rotate-[2deg]"
                  viewBox="0 0 842.14 500"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="draw-path"
                    d="M336.2,130.05C261.69,118,16.52,122,20.65,244.29c4.17,123,484.3,299.8,734.57,108.37,244-186.65-337.91-311-546.54-268.47"
                    fill="none"
                    stroke="#8486aa"
                    strokeMiterlimit="10"
                    strokeWidth="8"
                  />
                </svg>
              </span>
              <span className="yt z-[3] relative"> your triggers</span>
            </h1>
          </div>
        </div>

        <div className="images grid grid-cols-4 gap-4 mt-8 relative  ">
          <img
            data-speed="clamp(2.4)"
            src="https://images.unsplash.com/photo-1530569673472-307dc017a82d?w=400&q=80"
            alt="Mountain landscape"
            className="w-full h-[60vh] object-cover rounded-lg"
          />
          <img
            data-speed="clamp(1.8)"
            src="https://images.unsplash.com/photo-1439853949127-fa647821eba0?w=400&q=80"
            alt="Nature scene"
            className="w-full h-[60vh] object-cover rounded-lg"
          />
          <img
            data-speed="clamp(2.2)"
            src="https://images.unsplash.com/photo-1551376347-075b0121a65b?w=400&q=80"
            alt="Forest path"
            className="w-full h-[60vh] object-cover rounded-lg"
          />
          <img
            data-speed="clamp(1.5)"
            src="https://images.unsplash.com/photo-1500817487388-039e623edc21?w=400&q=80"
            alt="Ocean view"
            className="w-full   h-[60vh] object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>
    </section>
  )
}
