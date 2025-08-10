'use client';

import BasicAnimations from '@/components/BasicAnimations';
import AdvancedAnimations from '@/components/AdvancedAnimations';
import SVGAnimations from '@/components/SVGAnimations';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          GSAP Animation Showcase
        </h1>
        
        <div className="text-center mb-12">
          <a 
            href="/scroll" 
            className="inline-block px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg text-white font-semibold text-lg hover:scale-105 transition-transform"
          >
            View Advanced Scroll Animations →
          </a>
        </div>
        
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-green-400">Basic Animations</h2>
          <BasicAnimations />
        </section>
        
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-blue-400">Advanced Animations</h2>
          <AdvancedAnimations />
        </section>
        
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-purple-400">SVG Animations</h2>
          <SVGAnimations />
        </section>
      </div>
    </main>
  );
}