# Complete Smooth Scroll Implementation Guide

## Overview
This guide shows how to implement buttery smooth scrolling across your entire Next.js application using GSAP's ScrollSmoother plugin, which creates native-like smooth scrolling with GPU acceleration and automatic parallax effects.

## Prerequisites
- Next.js 13+ with App Router
- GSAP 3.12+ (free version includes ScrollSmoother)
- @gsap/react package

## Installation

```bash
npm install gsap @gsap/react
```

## Core Concepts

### 1. ScrollSmoother Structure
ScrollSmoother requires a specific HTML structure:

```html
<div id="smooth-wrapper">
  <div id="smooth-content">
    <!-- Your entire app content goes here -->
  </div>
</div>
```

### 2. Key Features
- **Smooth Scrolling**: Interpolated scroll with configurable speed
- **Effects System**: Automatic parallax via `data-speed` attributes
- **Performance**: GPU acceleration and optimized rendering
- **Mobile Support**: Touch-friendly scrolling with momentum

## Implementation Steps

### Step 1: Create the Smooth Scroll Provider

Create a provider component to wrap your entire application:

```typescript
// src/components/SmoothScrollProvider.tsx
'use client';

import { ReactNode, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

interface SmoothScrollProviderProps {
  children: ReactNode;
}

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const smoother = useRef<ScrollSmoother>();
  
  useLayoutEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    // Create ScrollSmoother instance
    smoother.current = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 2,           // Smooth factor (0-3, higher = smoother but slower)
      normalizeScroll: true, // Normalize scroll across devices
      ignoreMobileResize: true, // Prevent iOS resize issues
      effects: true,       // Enable data-speed parallax effects
      smoothTouch: 0.1,    // Touch scrolling (0 = disabled, 0.1 = light touch)
    });
    
    // Cleanup on unmount
    return () => {
      if (smoother.current) {
        smoother.current.kill();
      }
    };
  }, []);
  
  return (
    <div id="smooth-wrapper" className="h-screen overflow-hidden">
      <div id="smooth-content">
        {children}
      </div>
    </div>
  );
}
```

### Step 2: Update Your Root Layout

Wrap your entire application with the smooth scroll provider:

```typescript
// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Smooth Scroll App',
  description: 'Next.js app with GSAP smooth scrolling',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
```

### Step 3: Update Global CSS

Add the required CSS for smooth scrolling:

```css
/* src/app/globals.css */
@import "tailwindcss";

/* Smooth scroll wrapper styles */
#smooth-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

#smooth-content {
  /* This will be dynamically sized by ScrollSmoother */
}

/* Prevent default scrollbar in wrapper */
#smooth-wrapper::-webkit-scrollbar {
  display: none;
}

/* Optional: Disable text selection during fast scrolling */
.scrolling * {
  user-select: none;
}

/* Pin spacers should not interfere with pointer events */
.pin-spacer {
  pointer-events: none;
}

/* Ensure ScrollTrigger pins work properly */
.gsap-pin-start {
  transform: none !important;
}
```

### Step 4: Create Smooth Scroll Hook

Create a custom hook for smooth scroll utilities:

```typescript
// src/hooks/useSmoothScroll.ts
'use client';

import { useCallback } from 'react';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

export function useSmoothScroll() {
  // Get the current ScrollSmoother instance
  const getSmoother = useCallback(() => {
    return ScrollSmoother.get();
  }, []);

  // Scroll to a specific element
  const scrollTo = useCallback((target: string | number, smooth = true) => {
    const smoother = getSmoother();
    if (smoother) {
      smoother.scrollTo(target, smooth);
    }
  }, [getSmoother]);

  // Scroll to top
  const scrollToTop = useCallback((smooth = true) => {
    scrollTo(0, smooth);
  }, [scrollTo]);

  // Get current scroll progress (0-1)
  const getScrollProgress = useCallback(() => {
    const smoother = getSmoother();
    return smoother ? smoother.progress() : 0;
  }, [getSmoother]);

  // Pause/resume smooth scrolling
  const pauseScroll = useCallback(() => {
    const smoother = getSmoother();
    if (smoother) smoother.paused(true);
  }, [getSmoother]);

  const resumeScroll = useCallback(() => {
    const smoother = getSmoother();
    if (smoother) smoother.paused(false);
  }, [getSmoother]);

  return {
    scrollTo,
    scrollToTop,
    getScrollProgress,
    pauseScroll,
    resumeScroll,
    getSmoother,
  };
}
```

### Step 5: Add Parallax Effects

Use `data-speed` attributes for automatic parallax effects:

```typescript
// Example component with parallax effects
export default function ParallaxSection() {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background moves slower */}
      <div 
        data-speed="0.5" 
        className="absolute inset-0 bg-gradient-to-b from-blue-900 to-purple-900"
      />
      
      {/* Images with different speeds */}
      <img 
        data-speed="clamp(1.2)" 
        src="/image1.jpg" 
        className="absolute top-20 left-10 w-64 h-64 object-cover"
      />
      <img 
        data-speed="clamp(1.8)" 
        src="/image2.jpg" 
        className="absolute bottom-20 right-10 w-72 h-48 object-cover"
      />
      
      {/* Text moves normally (no data-speed) */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <h2 className="text-6xl font-bold text-white">Parallax Magic</h2>
      </div>
    </section>
  );
}
```

## Data-Speed Attribute Guide

### Basic Speed Values
```html
<!-- Slower than normal scroll -->
<div data-speed="0.5">Half speed</div>
<div data-speed="0.8">80% speed</div>

<!-- Faster than normal scroll -->
<div data-speed="1.2">120% speed</div>
<div data-speed="2">Double speed</div>

<!-- Clamp values (responsive) -->
<div data-speed="clamp(1.2)">Responsive speed</div>
<div data-speed="clamp(0.8, 1.2)">Speed range</div>
```

### Advanced Effects
```html
<!-- Lag effect (negative values) -->
<div data-speed="-0.5">Moves opposite direction</div>

<!-- Auto speed based on element size -->
<div data-speed="auto">Automatic calculation</div>

<!-- Clamp with breakpoints -->
<div data-speed="clamp(0.5, 2, 768px)">Responsive with breakpoint</div>
```

## ScrollTrigger Integration

ScrollSmoother works seamlessly with ScrollTrigger:

```typescript
useGSAP(() => {
  gsap.to('.fade-in', {
    opacity: 1,
    y: 0,
    scrollTrigger: {
      trigger: '.fade-in',
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: 1,
      // ScrollSmoother automatically handles the scrolling context
    }
  });
});
```

## Navigation Component Example

Create smooth scrolling navigation:

```typescript
// src/components/SmoothNav.tsx
'use client';

import { useSmoothScroll } from '@/hooks/useSmoothScroll';

export default function SmoothNav() {
  const { scrollTo } = useSmoothScroll();

  const navItems = [
    { label: 'Home', target: '#home' },
    { label: 'About', target: '#about' },
    { label: 'Services', target: '#services' },
    { label: 'Contact', target: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md">
      <div className="container mx-auto px-6 py-4">
        <ul className="flex gap-6">
          {navItems.map((item) => (
            <li key={item.target}>
              <button
                onClick={() => scrollTo(item.target)}
                className="text-white hover:text-blue-400 transition-colors"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
```

## Configuration Options

### ScrollSmoother.create() Options

```typescript
ScrollSmoother.create({
  wrapper: '#smooth-wrapper',     // Wrapper element selector
  content: '#smooth-content',     // Content element selector
  smooth: 2,                      // Smoothness (0-3)
  normalizeScroll: true,          // Normalize across devices
  ignoreMobileResize: true,       // Prevent mobile resize issues
  effects: true,                  // Enable data-speed effects
  smoothTouch: 0.1,              // Touch scroll intensity
  preventDefault: true,           // Prevent default scroll
  wheelMultiplier: 1,            // Mouse wheel sensitivity
  touchMultiplier: 1.5,          // Touch scroll sensitivity
  
  // Callbacks
  onUpdate: (self) => {
    console.log('Scroll progress:', self.progress());
  },
  onStop: () => {
    console.log('Scrolling stopped');
  },
  onStart: () => {
    console.log('Scrolling started');
  }
});
```

## Performance Tips

### 1. Hardware Acceleration
```css
/* Force hardware acceleration on animated elements */
.parallax-element {
  will-change: transform;
  transform: translateZ(0);
}
```

### 2. Optimize Images
```typescript
// Use next/image for optimized parallax images
import Image from 'next/image';

<Image
  data-speed="1.5"
  src="/hero-bg.jpg"
  alt="Background"
  width={1920}
  height={1080}
  priority
  className="absolute inset-0 object-cover"
/>
```

### 3. Reduce Layout Shifts
```typescript
// Set explicit heights to prevent layout shifts
<div className="h-screen" data-speed="0.8">
  <img className="h-full w-full object-cover" src="/bg.jpg" />
</div>
```

## Troubleshooting

### Common Issues & Solutions

**1. ScrollTrigger not working:**
```typescript
// Refresh ScrollTrigger after ScrollSmoother initialization
useLayoutEffect(() => {
  const smoother = ScrollSmoother.create({...});
  ScrollTrigger.refresh();
  return () => smoother.kill();
}, []);
```

**2. Mobile scrolling issues:**
```typescript
ScrollSmoother.create({
  smoothTouch: 0.1,        // Enable light touch scrolling
  normalizeScroll: true,   // Normalize across devices
  ignoreMobileResize: true // Prevent iOS issues
});
```

**3. Fixed elements not working:**
```css
/* Fix positioned elements */
.fixed-element {
  position: fixed;
  z-index: 1000;
  /* Ensure it's outside the smooth scroll context */
}
```

**4. Page refresh scroll position:**
```typescript
useLayoutEffect(() => {
  // Ensure page starts at top
  ScrollSmoother.create({
    // ... other options
  });
  
  // Scroll to top on page load
  window.scrollTo(0, 0);
}, []);
```

## Browser Support
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (some limitations on iOS)
- Mobile: Supported with smoothTouch option

## Next Steps
1. Test on different devices and browsers
2. Optimize performance with proper image loading
3. Add loading states for better UX
4. Consider reduced motion preferences
5. Implement smooth page transitions

This implementation provides professional-grade smooth scrolling that rivals native mobile apps while maintaining excellent performance and accessibility.