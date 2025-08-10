'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ScrollPin() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Pin the entire section and animate content
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.pin-container',
        start: 'top top',
        end: '+=300%',
        pin: true,
        scrub: 1,
        markers: false
      }
    });

    // Animate slides
    tl.to('.slide-1', { xPercent: -100, opacity: 0 })
      .from('.slide-2', { xPercent: 100, opacity: 0 }, '<')
      .to('.slide-2', { xPercent: -100, opacity: 0 })
      .from('.slide-3', { xPercent: 100, opacity: 0 }, '<')
      .to('.slide-3', { xPercent: -100, opacity: 0 })
      .from('.slide-4', { scale: 0, opacity: 0 }, '<');

    // Pin side text with different animation
    gsap.to('.side-text', {
      y: -200,
      scrollTrigger: {
        trigger: '.pin-text-section',
        start: 'top center',
        end: 'bottom center',
        pin: '.side-text',
        scrub: true,
        pinSpacing: false
      }
    });

    // Horizontal scroll pin
    const sections = gsap.utils.toArray('.horizontal-section');
    
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: '.horizontal-container',
        start: 'top top',
        end: '+=300%',
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1)
      }
    });
  }, { scope: container });

  return (
    <section ref={container} id="pin" className="relative">
      {/* Pinned Slides Section */}
      <div className="pin-container relative h-screen bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="slide-1 absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900 to-blue-900">
            <div className="text-center">
              <h2 className="text-6xl font-bold text-white mb-4">Slide 1</h2>
              <p className="text-2xl text-gray-300">Scroll to transition</p>
            </div>
          </div>
          
          <div className="slide-2 absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-900 to-teal-900">
            <div className="text-center">
              <h2 className="text-6xl font-bold text-white mb-4">Slide 2</h2>
              <p className="text-2xl text-gray-300">Smooth transitions</p>
            </div>
          </div>
          
          <div className="slide-3 absolute inset-0 flex items-center justify-center bg-gradient-to-br from-orange-900 to-red-900">
            <div className="text-center">
              <h2 className="text-6xl font-bold text-white mb-4">Slide 3</h2>
              <p className="text-2xl text-gray-300">Pinned sections</p>
            </div>
          </div>
          
          <div className="slide-4 absolute inset-0 flex items-center justify-center bg-gradient-to-br from-pink-900 to-purple-900">
            <div className="text-center">
              <h2 className="text-6xl font-bold text-white mb-4">Final Slide</h2>
              <p className="text-2xl text-gray-300">Scroll-controlled animation</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pin Text Section */}
      <div className="pin-text-section relative min-h-[200vh] bg-gray-800">
        <div className="container mx-auto px-6 py-32">
          <div className="grid md:grid-cols-2 gap-16">
            <div className="side-text">
              <h3 className="text-4xl font-bold text-white mb-8 sticky top-32">
                Pinned Content
              </h3>
              <div className="space-y-4">
                <div className="bg-gray-700/50 p-6 rounded-lg">
                  <h4 className="text-xl font-semibold text-green-400 mb-2">Feature 1</h4>
                  <p className="text-gray-300">This text stays pinned while you scroll</p>
                </div>
                <div className="bg-gray-700/50 p-6 rounded-lg">
                  <h4 className="text-xl font-semibold text-blue-400 mb-2">Feature 2</h4>
                  <p className="text-gray-300">Creating engaging scroll experiences</p>
                </div>
                <div className="bg-gray-700/50 p-6 rounded-lg">
                  <h4 className="text-xl font-semibold text-purple-400 mb-2">Feature 3</h4>
                  <p className="text-gray-300">Smooth and performant animations</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-16">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-700/30 p-8 rounded-2xl">
                  <h4 className="text-2xl font-bold text-white mb-4">Section {i + 1}</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Section */}
      <div className="horizontal-container h-screen bg-gray-900 overflow-hidden">
        <div className="flex h-full">
          {['Discover', 'Create', 'Innovate', 'Transform'].map((text, i) => (
            <div key={i} className="horizontal-section flex-shrink-0 w-screen h-full flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-4">
                  {text}
                </h2>
                <p className="text-2xl text-gray-400">Horizontal scroll section {i + 1}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}