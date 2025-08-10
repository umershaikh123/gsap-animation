'use client';

import ScrollHero from '@/components/ScrollHero';
import ScrollParallax from '@/components/ScrollParallax';
import ScrollPin from '@/components/ScrollPin';
import ScrollReveal from '@/components/ScrollReveal';
import ScrollProgress from '@/components/ScrollProgress';
import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useGSAP } from '@gsap/react';

// Register plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP);
}

export default function ScrollAnimations() {
  const smoothWrapper = useRef<HTMLDivElement>(null);
  const smoothContent = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    // Create ScrollSmoother
    let smoother = ScrollSmoother.create({
      wrapper: smoothWrapper.current,
      content: smoothContent.current,
      smooth: 2,
      smoothTouch: 0.1,
      effects: true,
      normalizeScroll: true
    });

    return () => {
      smoother.kill();
    };
  }, []);

  return (
    <div ref={smoothWrapper} id="smooth-wrapper" className="h-screen overflow-hidden">
      <div ref={smoothContent} id="smooth-content">
        {/* Progress Bar */}
        <ScrollProgress />
        
        {/* Header */}
        <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-700">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg"></div>
              <span className="text-xl font-bold text-white">Scroll Studio</span>
            </div>
            <nav>
              <ul className="flex gap-6 text-gray-300">
                <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#hero" className="hover:text-white transition-colors">Hero</a></li>
                <li><a href="#parallax" className="hover:text-white transition-colors">Parallax</a></li>
                <li><a href="#pin" className="hover:text-white transition-colors">Pin</a></li>
              </ul>
            </nav>
          </div>
        </header>

        {/* Hero Section with Clamp */}
        <ScrollHero />

        {/* Parallax Section */}
        <ScrollParallax />

        {/* Pin Section */}
        <ScrollPin />

        {/* Reveal Section */}
        <ScrollReveal />

        {/* Footer Spacer */}
        <section className="h-screen bg-gradient-to-t from-gray-900 to-gray-800 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-4">End of Journey</h2>
            <p className="text-gray-400">Scroll back up to replay animations</p>
          </div>
        </section>
      </div>
    </div>
  );
}