'use client';

import { useRef } from 'react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function ScrollNav() {
  const navRef = useRef<HTMLElement>(null);
  const { scrollTo, scrollToTop } = useSmoothScroll();

  const navItems = [
    { label: 'Hero', target: '#hero' },
    { label: 'Parallax', target: '#parallax' },
    { label: 'Pin', target: '#pin' },
    { label: 'Reveal', target: '#reveal' },
  ];

  // Pin the navbar and add scroll effects
  useGSAP(() => {
    if (!navRef.current) return;

    // Pin the navbar at the top
    ScrollTrigger.create({
      trigger: navRef.current,
      start: 'top top',
      end: 'max',
      pin: true,
      pinSpacing: false,
      anticipatePin: 1,
    });

    // Add background opacity based on scroll
    gsap.to(navRef.current, {
      backgroundColor: 'rgba(17, 24, 39, 0.95)',
      backdropFilter: 'blur(12px)',
      scrollTrigger: {
        trigger: document.body,
        start: 'top -50px',
        end: 'top -51px',
        toggleActions: 'play none none reverse'
      }
    });

  }, { scope: navRef });

  return (
    <nav 
      ref={navRef} 
      className="w-full z-[1000] bg-gray-900/80 border-b border-gray-700/50"
      style={{ 
        position: 'relative', // Let GSAP handle the pinning
        backdropFilter: 'blur(8px)',
        willChange: 'transform'
      }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => scrollToTop()}
            className="flex items-center gap-3 text-white hover:text-green-400 transition-colors group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg group-hover:scale-105 transition-transform"></div>
            <span className="text-xl font-bold">Scroll Studio</span>
          </button>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <ul className="flex gap-6">
              {navItems.map((item) => (
                <li key={item.target}>
                  <button
                    onClick={() => scrollTo(item.target)}
                    className="text-gray-300 hover:text-white transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-white/10 relative group"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 transition-all duration-200 group-hover:w-full"></span>
                  </button>
                </li>
              ))}
            </ul>

            {/* Divider */}
            <div className="w-px h-6 bg-gray-600"></div>

            {/* External Link */}
            <Link
              href="/"
              className="text-gray-300 hover:text-white transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-white/10 border border-gray-600 hover:border-green-400"
            >
              Basic Animations
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}