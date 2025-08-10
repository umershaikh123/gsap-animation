'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export default function SVGAnimations() {
  const container = useRef<HTMLDivElement>(null);
  
  // SVG Path Drawing Animation
  useGSAP(() => {
    // Animate stroke dashoffset for drawing effect
    const paths = gsap.utils.toArray('.draw-path');
    paths.forEach((path: any) => {
      const length = path.getTotalLength();
      
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length
      });
      
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 2,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: path,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    // Morph Animation
    gsap.to('.morph-circle', {
      attr: {
        r: 60,
        fill: '#8B5CF6'
      },
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut'
    });

    // Motion Path Animation
    gsap.to('.motion-element', {
      rotation: 360,
      duration: 5,
      repeat: -1,
      ease: 'none',
      transformOrigin: 'center'
    });

    // Complex SVG Animation
    const tl = gsap.timeline({ repeat: -1 });
    
    tl.to('.star-path', {
      scale: 1.2,
      rotation: 360,
      transformOrigin: 'center',
      duration: 2,
      ease: 'power2.inOut'
    })
    .to('.star-path', {
      fill: '#EF4444',
      duration: 0.5
    })
    .to('.star-path', {
      scale: 1,
      fill: '#FCD34D',
      duration: 1,
      ease: 'back.out(1.7)'
    });
  }, { scope: container });

  const { contextSafe } = useGSAP({ scope: container });

  // Interactive SVG Animation
  const animateSVGClick = contextSafe((e: React.MouseEvent<SVGElement>) => {
    const target = e.currentTarget;
    
    gsap.to(target, {
      scale: 1.2,
      rotation: 360,
      duration: 0.5,
      ease: 'back.out(1.7)',
      transformOrigin: 'center',
      onComplete: () => {
        gsap.to(target, {
          scale: 1,
          duration: 0.3
        });
      }
    });
  });

  // Wave Animation
  const animateWave = contextSafe(() => {
    gsap.to('.wave-path', {
      attr: {
        d: 'M0,50 Q25,30 50,50 T100,50 T150,50 T200,50'
      },
      duration: 1,
      repeat: 3,
      yoyo: true,
      ease: 'power2.inOut'
    });
  });

  return (
    <div ref={container} className="space-y-12">
      {/* SVG Path Drawing */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">SVG Path Drawing Animation</h3>
        <svg width="100%" height="200" viewBox="0 0 400 200">
          <path
            className="draw-path"
            d="M50,100 Q150,50 250,100 T350,100"
            stroke="#10B981"
            strokeWidth="3"
            fill="none"
          />
          <circle
            className="draw-path"
            cx="200"
            cy="100"
            r="40"
            stroke="#3B82F6"
            strokeWidth="3"
            fill="none"
          />
          <rect
            className="draw-path"
            x="150"
            y="130"
            width="100"
            height="50"
            stroke="#EF4444"
            strokeWidth="3"
            fill="none"
          />
        </svg>
      </div>

      {/* Morphing Shapes */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Shape Morphing</h3>
        <svg width="100%" height="200" viewBox="0 0 400 200">
          <circle
            className="morph-circle"
            cx="200"
            cy="100"
            r="30"
            fill="#10B981"
          />
        </svg>
      </div>

      {/* Motion Path */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Circular Motion</h3>
        <svg width="100%" height="200" viewBox="0 0 400 200">
          <g className="motion-element">
            <rect
              x="180"
              y="80"
              width="40"
              height="40"
              fill="#F59E0B"
              rx="5"
            />
            <circle cx="200" cy="100" r="5" fill="#1F2937"/>
          </g>
        </svg>
      </div>

      {/* Interactive SVG */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Interactive SVG (Click the shapes)</h3>
        <svg width="100%" height="200" viewBox="0 0 400 200">
          <polygon
            points="100,100 120,60 160,60 130,90 140,130 100,110 60,130 70,90 40,60 80,60"
            fill="#FCD34D"
            className="cursor-pointer"
            onClick={animateSVGClick}
          />
          <rect
            x="200"
            y="70"
            width="60"
            height="60"
            fill="#3B82F6"
            className="cursor-pointer"
            rx="10"
            onClick={animateSVGClick}
          />
          <circle
            cx="320"
            cy="100"
            r="35"
            fill="#10B981"
            className="cursor-pointer"
            onClick={animateSVGClick}
          />
        </svg>
      </div>

      {/* Complex Star Animation */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Animated Star</h3>
        <svg width="100%" height="200" viewBox="0 0 400 200">
          <path
            className="star-path"
            d="M200,50 L220,90 L265,90 L230,120 L245,165 L200,135 L155,165 L170,120 L135,90 L180,90 Z"
            fill="#FCD34D"
          />
        </svg>
      </div>

      {/* Wave Animation */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Wave Animation</h3>
        <button
          onClick={animateWave}
          className="mb-4 px-4 py-2 bg-cyan-500 rounded hover:bg-cyan-600"
        >
          Animate Wave
        </button>
        <svg width="100%" height="150" viewBox="0 0 200 100">
          <path
            className="wave-path"
            d="M0,50 Q25,50 50,50 T100,50 T150,50 T200,50"
            stroke="#06B6D4"
            strokeWidth="3"
            fill="none"
          />
        </svg>
      </div>

      {/* Gradient Animation */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Animated Gradient</h3>
        <svg width="100%" height="200" viewBox="0 0 400 200">
          <defs>
            <linearGradient id="animatedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6">
                <animate attributeName="stop-color" values="#8B5CF6;#3B82F6;#10B981;#8B5CF6" dur="3s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="#EC4899">
                <animate attributeName="stop-color" values="#EC4899;#EF4444;#F59E0B;#EC4899" dur="3s" repeatCount="indefinite" />
              </stop>
            </linearGradient>
          </defs>
          <rect x="50" y="50" width="300" height="100" fill="url(#animatedGradient)" rx="20" />
        </svg>
      </div>

      {/* Path Following Text */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Text on Path</h3>
        <svg width="100%" height="200" viewBox="0 0 400 200">
          <defs>
            <path id="textPath" d="M50,100 Q200,50 350,100" />
          </defs>
          <text fill="#10B981" fontSize="20">
            <textPath href="#textPath">
              <animate attributeName="startOffset" from="0%" to="100%" dur="5s" repeatCount="indefinite" />
              GSAP + SVG = Amazing Animations! 
            </textPath>
          </text>
          <path d="M50,100 Q200,50 350,100" stroke="#374151" strokeWidth="1" fill="none" />
        </svg>
      </div>
    </div>
  );
}