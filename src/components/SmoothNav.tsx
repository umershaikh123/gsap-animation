'use client';

import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import Link from 'next/link';

export default function SmoothNav() {
  const { scrollTo, scrollToTop } = useSmoothScroll();

  const navItems = [
    { label: 'Home', target: '#hero' },
    { label: 'Parallax', target: '#parallax' },
    { label: 'Pin', target: '#pin' },
    { label: 'Reveal', target: '#reveal' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-gray-900/95 backdrop-blur-md border-b border-gray-700">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => scrollToTop()}
            className="flex items-center gap-2 text-white hover:text-green-400 transition-colors"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg"></div>
            <span className="text-xl font-bold">Smooth Studio</span>
          </button>
        </div>
        
        <ul className="flex gap-6 text-gray-300">
          {navItems.map((item) => (
            <li key={item.target}>
              <button
                onClick={() => scrollTo(item.target)}
                className="hover:text-white transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-white/10"
              >
                {item.label}
              </button>
            </li>
          ))}
          <li>
            <Link
              href="/"
              className="hover:text-white transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-white/10"
            >
              Basic Animations
            </Link>
          </li>
        </ul>
        
        {/* Scroll Progress Indicator */}
        <div className="w-20 text-xs text-gray-400">
          <ScrollProgress />
        </div>
      </div>
    </nav>
  );
}

function ScrollProgress() {
  const { getScrollProgress } = useSmoothScroll();
  
  // This would need to be reactive in a real implementation
  // For now, it's just a placeholder
  return (
    <div className="text-right">
      <span>Scroll</span>
    </div>
  );
}