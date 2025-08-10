'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export default function BasicAnimations() {
  const container = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Simple To Animation
  useGSAP(() => {
    gsap.from('.fade-in', {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.2,
      ease: 'power2.out'
    });
  }, { scope: container });

  // Timeline Animation
  const { contextSafe } = useGSAP({ scope: container });
  
  const playTimeline = contextSafe(() => {
    setIsPlaying(true);
    const tl = gsap.timeline({
      onComplete: () => setIsPlaying(false)
    });
    
    tl.to('.timeline-box', {
      x: 200,
      duration: 0.5,
      ease: 'power2.inOut'
    })
    .to('.timeline-box', {
      rotation: 360,
      duration: 0.5,
      ease: 'power2.inOut'
    })
    .to('.timeline-box', {
      scale: 1.5,
      duration: 0.5,
      ease: 'back.out(1.7)'
    })
    .to('.timeline-box', {
      scale: 1,
      x: 0,
      rotation: 0,
      duration: 0.5,
      ease: 'power2.inOut'
    });
  });

  // Hover Animation
  const handleHover = contextSafe((e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.1,
      rotation: 5,
      duration: 0.3,
      ease: 'power2.out'
    });
  });

  const handleHoverExit = contextSafe((e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      rotation: 0,
      duration: 0.3,
      ease: 'power2.out'
    });
  });

  // Stagger Animation
  const playStagger = contextSafe(() => {
    gsap.fromTo('.stagger-item',
      {
        y: 100,
        opacity: 0,
        scale: 0.5
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: {
          amount: 1,
          from: 'start',
          ease: 'power2.inOut'
        },
        ease: 'back.out(1.7)'
      }
    );
  });

  // Infinite Loop Animation
  useGSAP(() => {
    gsap.to('.rotating-gear', {
      rotation: 360,
      duration: 3,
      repeat: -1,
      ease: 'none'
    });

    gsap.to('.pulsing-circle', {
      scale: 1.2,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut'
    });
  }, { scope: container });

  return (
    <div ref={container} className="space-y-12">
      {/* Fade In Animation */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 fade-in">Fade In Animation</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="fade-in bg-green-500 p-4 rounded text-center">Item 1</div>
          <div className="fade-in bg-blue-500 p-4 rounded text-center">Item 2</div>
          <div className="fade-in bg-purple-500 p-4 rounded text-center">Item 3</div>
        </div>
      </div>

      {/* Timeline Animation */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Timeline Animation</h3>
        <button
          onClick={playTimeline}
          disabled={isPlaying}
          className="mb-4 px-4 py-2 bg-green-500 rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPlaying ? 'Playing...' : 'Play Timeline'}
        </button>
        <div className="relative h-20">
          <div className="timeline-box absolute w-20 h-20 bg-gradient-to-br from-pink-500 to-orange-500 rounded-lg"></div>
        </div>
      </div>

      {/* Hover Animation */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Hover Animation</h3>
        <div className="flex gap-4">
          <div
            onMouseEnter={handleHover}
            onMouseLeave={handleHoverExit}
            className="w-32 h-32 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center cursor-pointer"
          >
            Hover Me
          </div>
          <div
            onMouseEnter={handleHover}
            onMouseLeave={handleHoverExit}
            className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center cursor-pointer"
          >
            Hover Me Too
          </div>
        </div>
      </div>

      {/* Stagger Animation */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Stagger Animation</h3>
        <button
          onClick={playStagger}
          className="mb-4 px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
        >
          Play Stagger
        </button>
        <div className="grid grid-cols-5 gap-2">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="stagger-item w-full h-16 bg-gradient-to-br from-yellow-400 to-red-500 rounded flex items-center justify-center font-bold"
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Infinite Animations */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Infinite Animations</h3>
        <div className="flex gap-8 items-center">
          <div className="relative">
            <div className="rotating-gear w-24 h-24 bg-gradient-to-br from-gray-400 to-gray-600 rounded-lg flex items-center justify-center">
              <span className="text-4xl">⚙️</span>
            </div>
            <p className="text-sm text-center mt-2">Rotating</p>
          </div>
          <div className="relative">
            <div className="pulsing-circle w-24 h-24 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-2xl">❤️</span>
            </div>
            <p className="text-sm text-center mt-2">Pulsing</p>
          </div>
        </div>
      </div>
    </div>
  );
}