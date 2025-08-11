"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function ScrollParallax() {
  const container = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      // Parallax layers with different speeds
      gsap.to(".parallax-bg", {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: ".parallax-section",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })

      gsap.to(".parallax-mid", {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: ".parallax-section",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })

      gsap.to(".parallax-front", {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: ".parallax-section",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })

      // Text parallax with scale
      gsap.fromTo(
        ".parallax-title",
        {
          scale: 0.5,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          scrollTrigger: {
            trigger: ".parallax-title",
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
          },
        }
      )

      // Cards with stagger parallax
      gsap.utils.toArray(".parallax-card").forEach((card: any, i) => {
        gsap.fromTo(
          card,
          {
            y: 100 * (i + 1),
            opacity: 0,
            scale: 0.8,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "top 60%",
              scrub: 1,
            },
          }
        )
      })
    },
    { scope: container }
  )

  return (
    <section
      ref={container}
      id="parallax"
      className="parallax-section relative min-h-[200vh] overflow-hidden"
    >
      {/* Background layers */}
      <div className="parallax-bg absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-blue-900/20"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="parallax-mid absolute inset-0 z-10 flex items-center justify-center">
        <div className="grid grid-cols-3 gap-8 opacity-20">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="w-32 h-32 bg-white/10 rounded-lg"></div>
          ))}
        </div>
      </div>

      <div className="parallax-front relative z-20 container mx-auto px-6 py-32">
        <h2 className="parallax-title text-6xl md:text-8xl font-bold text-center text-white mb-16">
          Parallax Layers
        </h2>

        {/* <div className="grid md:grid-cols-3 gap-8 mt-32">
          <div
            className="parallax-card bg-gray-800/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl"
            data-speed="1.5"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg mb-4"></div>
            <h3 className="text-2xl font-bold text-white mb-4">Layer One</h3>
            <p className="text-gray-300">
              Moves slowly, creating depth and dimension in your scroll
              experience.
            </p>
          </div>

          <div
            className="parallax-card bg-gray-800/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl"
            data-speed="2"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg mb-4"></div>
            <h3 className="text-2xl font-bold text-white mb-4">Layer Two</h3>
            <p className="text-gray-300">
              Medium speed parallax effect for engaging visual storytelling.
            </p>
          </div>

          <div
            className="parallax-card bg-gray-800/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl"
            data-speed="2.5"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg mb-4"></div>
            <h3 className="text-2xl font-bold text-white mb-4">Layer Three</h3>
            <p className="text-gray-300">
              Fastest moving layer, creating dynamic scroll interactions.
            </p>
          </div>
        </div> */}

        {/* Floating images with different parallax speeds */}
        <div className="relative mt-32 h-[100vh]">
          <img
            data-speed="auto"
            className="absolute top-0 left-0 w-64 h-64 object-cover rounded-2xl shadow-2xl"
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80"
            alt="Mountain"
          />
          <img
            data-speed="1.5"
            className="absolute top-32 right-0 w-72 h-48 object-cover rounded-2xl shadow-2xl"
            src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&q=80"
            alt="Valley"
          />
          <img
            data-speed="2"
            className="absolute bottom-32 left-1/4 w-56 h-72 object-cover rounded-2xl shadow-2xl"
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&q=80"
            alt="Nature"
          />
          <img
            data-speed="0.5"
            className="absolute bottom-0 right-1/4 w-80 h-56 object-cover rounded-2xl shadow-2xl"
            src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&q=80"
            alt="Forest"
          />
        </div>
      </div>
    </section>
  )
}
