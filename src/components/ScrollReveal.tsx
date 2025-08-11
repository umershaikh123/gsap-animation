'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ScrollReveal() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Batch reveal with stagger
    ScrollTrigger.batch('.reveal-card', {
      onEnter: (batch) => gsap.to(batch, {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        overwrite: true
      }),
      onLeave: (batch) => gsap.to(batch, {
        opacity: 0,
        y: 100,
        stagger: 0.15,
        overwrite: true
      }),
      onEnterBack: (batch) => gsap.to(batch, {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        overwrite: true
      }),
      onLeaveBack: (batch) => gsap.to(batch, {
        opacity: 0,
        y: -100,
        stagger: 0.15,
        overwrite: true
      }),
      start: 'top 80%',
      end: 'bottom 20%'
    });

    // Text reveal with split animation
    gsap.utils.toArray('.reveal-text').forEach((text: any) => {
      gsap.fromTo(text,
        {
          backgroundSize: '0% 100%'
        },
        {
          backgroundSize: '100% 100%',
          duration: 1,
          scrollTrigger: {
            trigger: text,
            start: 'top 80%',
            end: 'top 50%',
            scrub: true
          }
        }
      );
    });

    // Scale and fade reveal
    gsap.utils.toArray('.scale-reveal').forEach((element: any) => {
      gsap.fromTo(element,
        {
          scale: 0.5,
          opacity: 0,
          rotation: -10
        },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1,
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play pause resume reverse'
          }
        }
      );
    });

    // Counter animation
    gsap.utils.toArray('.counter').forEach((counter: any) => {
      const target = parseInt(counter.getAttribute('data-target'));
      
      gsap.to(counter, {
        textContent: target,
        duration: 2,
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: counter,
          start: 'top 80%'
        }
      });
    });

    // Line drawing animation
    gsap.utils.toArray('.line-draw').forEach((line: any) => {
      gsap.fromTo(line,
        {
          scaleX: 0,
          transformOrigin: 'left center'
        },
        {
          scaleX: 1,
          duration: 1,
          scrollTrigger: {
            trigger: line,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
  }, { scope: container });

  return (
    <section ref={container} id="reveal" className="min-h-[200vh] bg-gradient-to-b from-gray-800 to-gray-900 py-32">
      <div className="container mx-auto px-6">
        {/* Title with reveal effect */}
        <div className="text-center mb-32">
          <h2 className="reveal-text text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 bg-no-repeat inline-block">
            Reveal Magic
          </h2>
          <div className="line-draw h-1 bg-gradient-to-r from-green-400 to-blue-500 mt-8 mx-auto w-32"></div>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-32">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="reveal-card opacity-0 translate-y-20 bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700">
              <div className="scale-reveal">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mb-4"></div>
                <h3 className="text-2xl font-bold text-white mb-2">Feature {i + 1}</h3>
                <p className="text-gray-400">Scroll-triggered reveal animation with stagger effect.</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-8 mb-32">
          {[
            { label: 'Projects', value: 150 },
            { label: 'Clients', value: 85 },
            { label: 'Awards', value: 23 },
            { label: 'Years', value: 12 }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="counter text-5xl font-bold text-white mb-2" data-target={stat.value}>0</div>
              <div className="text-gray-400 text-lg">{stat.label}</div>
              <div className="line-draw h-0.5 bg-gradient-to-r from-green-400 to-blue-500 mt-4"></div>
            </div>
          ))}
        </div>

        {/* Image Gallery with Reveal */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80',
            'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80',
            'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=600&q=80',
            'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=600&q=80',
            'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&q=80',
            'https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=600&q=80'
          ].map((src, i) => (
            <div key={i} className="scale-reveal overflow-hidden rounded-2xl">
              <img 
                src={src} 
                alt={`Gallery ${i + 1}`}
                className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}