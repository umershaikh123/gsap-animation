'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(progressRef.current, {
      scaleX: 1,
      transformOrigin: 'left center',
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true
      }
    });
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-1 bg-gray-800">
      <div 
        ref={progressRef}
        className="h-full bg-gradient-to-r from-green-400 to-blue-500 origin-left"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}