'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger, TextPlugin);

export default function AdvancedAnimations() {
  const container = useRef<HTMLDivElement>(null);
  const [text, setText] = useState('');
  
  // ScrollTrigger Animation
  useGSAP(() => {
    // Parallax effect
    gsap.to('.parallax-bg', {
      yPercent: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: '.parallax-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

    // Reveal on scroll
    gsap.utils.toArray('.scroll-reveal').forEach((element: any) => {
      gsap.fromTo(element, 
        {
          opacity: 0,
          y: 100,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Progress bar
    gsap.to('.progress-bar', {
      width: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.progress-section',
        start: 'top center',
        end: 'bottom center',
        scrub: 1
      }
    });
  }, { scope: container });

  // Text Animation
  const { contextSafe } = useGSAP({ scope: container });
  
  const typeWriter = contextSafe(() => {
    setText('');
    gsap.to({}, {
      duration: 3,
      onUpdate: function() {
        const progress = this.progress();
        const fullText = 'Welcome to GSAP Advanced Animations!';
        const currentLength = Math.floor(progress * fullText.length);
        setText(fullText.substring(0, currentLength));
      },
      ease: 'none'
    });
  });

  // Morphing Animation
  const morphBox = contextSafe(() => {
    const tl = gsap.timeline();
    
    tl.to('.morph-box', {
      borderRadius: '50%',
      backgroundColor: '#3B82F6',
      duration: 0.5
    })
    .to('.morph-box', {
      scaleX: 1.5,
      duration: 0.5
    })
    .to('.morph-box', {
      rotation: 180,
      backgroundColor: '#8B5CF6',
      duration: 0.5
    })
    .to('.morph-box', {
      borderRadius: '10px',
      scaleX: 1,
      rotation: 360,
      backgroundColor: '#10B981',
      duration: 0.5
    });
  });

  // Draggable-like Animation (simulated with mouse tracking)
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = contextSafe(() => {
    setIsDragging(true);
    gsap.to(dragRef.current, {
      scale: 1.1,
      duration: 0.2
    });
  });

  const handleMouseUp = contextSafe(() => {
    setIsDragging(false);
    gsap.to(dragRef.current, {
      scale: 1,
      duration: 0.2,
      ease: 'back.out(1.7)'
    });
  });

  const handleMouseMove = contextSafe((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !dragRef.current) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - 50;
    const y = e.clientY - rect.top - 50;
    
    gsap.to(dragRef.current, {
      x,
      y,
      duration: 0.1
    });
  });

  // Complex Timeline with Labels
  const playComplexTimeline = contextSafe(() => {
    const tl = gsap.timeline();
    
    tl.add('start')
      .to('.complex-1', { x: 100, duration: 0.5 }, 'start')
      .to('.complex-2', { y: 100, duration: 0.5 }, 'start')
      .to('.complex-3', { rotation: 360, duration: 0.5 }, 'start+=0.25')
      .add('middle')
      .to('.complex-1', { backgroundColor: '#EF4444', duration: 0.3 }, 'middle')
      .to('.complex-2', { backgroundColor: '#3B82F6', duration: 0.3 }, 'middle')
      .to('.complex-3', { backgroundColor: '#8B5CF6', duration: 0.3 }, 'middle')
      .add('end')
      .to('.complex-1, .complex-2, .complex-3', {
        x: 0,
        y: 0,
        rotation: 0,
        backgroundColor: '#10B981',
        duration: 0.5,
        stagger: 0.1
      }, 'end');
  });

  return (
    <div ref={container} className="space-y-12">
      {/* ScrollTrigger Parallax */}
      <div className="parallax-section relative h-96 overflow-hidden bg-gray-800 rounded-lg">
        <div className="parallax-bg absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-50"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <h3 className="text-3xl font-bold">Parallax Scroll Effect</h3>
        </div>
      </div>

      {/* Scroll Reveal */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Scroll Reveal Animation</h3>
        <div className="space-y-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="scroll-reveal bg-gradient-to-r from-teal-500 to-cyan-500 p-8 rounded-lg"
            >
              <h4 className="text-2xl font-bold">Reveal Item {i}</h4>
              <p>This item animates when scrolled into view</p>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-section bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Scroll Progress Bar</h3>
        <div className="relative h-4 bg-gray-700 rounded-full overflow-hidden">
          <div className="progress-bar absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 to-blue-500 w-0"></div>
        </div>
        <div className="mt-4 h-96 bg-gray-700 rounded-lg flex items-center justify-center">
          <p className="text-xl">Scroll to see progress</p>
        </div>
      </div>

      {/* Text Animation */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Typewriter Effect</h3>
        <button
          onClick={typeWriter}
          className="mb-4 px-4 py-2 bg-purple-500 rounded hover:bg-purple-600"
        >
          Start Typing
        </button>
        <div className="h-12 flex items-center">
          <p className="text-2xl font-mono text-green-400">{text}<span className="animate-pulse">|</span></p>
        </div>
      </div>

      {/* Morphing Animation */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Morphing Animation</h3>
        <button
          onClick={morphBox}
          className="mb-4 px-4 py-2 bg-indigo-500 rounded hover:bg-indigo-600"
        >
          Morph Shape
        </button>
        <div className="flex justify-center">
          <div className="morph-box w-32 h-32 bg-green-500 rounded-lg"></div>
        </div>
      </div>

      {/* Draggable Simulation */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Drag Simulation</h3>
        <div 
          className="relative h-64 bg-gray-700 rounded-lg cursor-move"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div
            ref={dragRef}
            onMouseDown={handleMouseDown}
            className="absolute w-24 h-24 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
          >
            Drag Me
          </div>
        </div>
      </div>

      {/* Complex Timeline */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Complex Timeline with Labels</h3>
        <button
          onClick={playComplexTimeline}
          className="mb-4 px-4 py-2 bg-pink-500 rounded hover:bg-pink-600"
        >
          Play Complex Timeline
        </button>
        <div className="relative h-48">
          <div className="complex-1 absolute top-0 left-0 w-16 h-16 bg-green-500 rounded"></div>
          <div className="complex-2 absolute top-0 left-24 w-16 h-16 bg-green-500 rounded"></div>
          <div className="complex-3 absolute top-0 left-48 w-16 h-16 bg-green-500 rounded"></div>
        </div>
      </div>
    </div>
  );
}