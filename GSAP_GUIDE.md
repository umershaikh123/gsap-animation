# GSAP Animation Guide for React

## Overview
GSAP (GreenSock Animation Platform) is a professional-grade animation library that's now 100% FREE (as of 2024), including all premium plugins like MorphSVG, DrawSVG, and SplitText.

## Installation
```bash
npm install gsap @gsap/react
```

## Core Concepts

### 1. useGSAP Hook
The `useGSAP()` hook from `@gsap/react` is the recommended way to use GSAP with React. It automatically handles cleanup when components unmount.

```javascript
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);
```

**Key Features:**
- Automatic cleanup of animations, ScrollTriggers, Draggables, and SplitText
- SSR-safe (works with Next.js)
- Drop-in replacement for useEffect/useLayoutEffect
- Scoped animations support

### 2. Basic Animation Methods

#### gsap.to()
Animates from current state to specified end state
```javascript
gsap.to('.box', { x: 200, rotation: 360, duration: 2 })
```

#### gsap.from()
Animates from specified state to current state
```javascript
gsap.from('.box', { opacity: 0, y: -50, duration: 1 })
```

#### gsap.fromTo()
Animates from one specified state to another
```javascript
gsap.fromTo('.box', 
  { opacity: 0, scale: 0.5 }, 
  { opacity: 1, scale: 1, duration: 1.5 }
)
```

### 3. Timeline Animations
Timelines allow sequential and overlapping animations without calculating delays

```javascript
const tl = gsap.timeline({ repeat: -1, yoyo: true });

tl.to('.box1', { x: 100, duration: 1 })
  .to('.box2', { y: 100, duration: 1 })
  .from('.box3', { opacity: 0, scale: 0.5 }, "-=0.5"); // Start 0.5s before previous ends
```

### 4. contextSafe() for Event Handlers
Animations created after useGSAP executes (like in event handlers) need contextSafe wrapper

```javascript
const { contextSafe } = useGSAP({ scope: container });

const handleClick = contextSafe(() => {
  gsap.to('.element', { rotation: 180 });
});
```

## Basic Examples

### Example 1: Simple Animation
```javascript
const SimpleAnimation = () => {
  const boxRef = useRef(null);
  
  useGSAP(() => {
    gsap.to(boxRef.current, {
      x: 200,
      rotation: 360,
      duration: 2,
      ease: "power2.inOut"
    });
  }, []);
  
  return <div ref={boxRef} className="box">Animated Box</div>;
};
```

### Example 2: Timeline with Multiple Elements
```javascript
const TimelineAnimation = () => {
  const container = useRef(null);
  
  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.from('.header', { opacity: 0, y: -50, duration: 1 })
      .to('.box', { x: 200, rotation: 360, duration: 2 })
      .from('.footer', { opacity: 0, scale: 0.5 }, "-=0.5");
  }, { scope: container });
  
  return (
    <div ref={container}>
      <h1 className="header">Welcome</h1>
      <div className="box">Box</div>
      <footer className="footer">Footer</footer>
    </div>
  );
};
```

### Example 3: Interactive Animation with contextSafe
```javascript
const InteractiveAnimation = () => {
  const container = useRef(null);
  
  const { contextSafe } = useGSAP({ scope: container });
  
  const animate = contextSafe((element) => {
    gsap.to(element, {
      scale: 1.2,
      rotation: 360,
      duration: 0.5
    });
  });
  
  return (
    <div ref={container}>
      <button onClick={(e) => animate(e.currentTarget)}>
        Click Me!
      </button>
    </div>
  );
};
```

## Advanced Features

### ScrollTrigger
Trigger animations based on scroll position

```javascript
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

useGSAP(() => {
  gsap.to('.box', {
    x: 500,
    scrollTrigger: {
      trigger: '.box',
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: 1, // Smooth scrubbing
      pin: true, // Pin element during scroll
      markers: true // Debug markers
    }
  });
});
```

### SplitText
Animate text character by character or word by word

```javascript
import { SplitText } from 'gsap/SplitText';
gsap.registerPlugin(SplitText);

useGSAP(() => {
  const split = new SplitText('.text', { type: 'chars, words' });
  
  gsap.from(split.chars, {
    opacity: 0,
    y: 20,
    stagger: 0.02,
    duration: 1
  });
});
```

### Draggable
Make elements draggable with physics

```javascript
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
gsap.registerPlugin(Draggable, InertiaPlugin);

useGSAP(() => {
  Draggable.create('.draggable', {
    type: 'x,y',
    inertia: true,
    bounds: container.current
  });
});
```

## SVG Animations

### DrawSVG
Create drawing effects for SVG paths

```javascript
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
gsap.registerPlugin(DrawSVGPlugin);

useGSAP(() => {
  gsap.from('.svg-path', {
    drawSVG: 0,
    duration: 2,
    ease: 'power2.inOut'
  });
});
```

### MorphSVG
Morph between different SVG shapes

```javascript
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
gsap.registerPlugin(MorphSVGPlugin);

useGSAP(() => {
  gsap.to('#circle', {
    morphSVG: '#square',
    duration: 2,
    yoyo: true,
    repeat: -1
  });
});
```

### MotionPath
Animate along SVG paths

```javascript
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
gsap.registerPlugin(MotionPathPlugin);

useGSAP(() => {
  gsap.to('.element', {
    motionPath: {
      path: '#myPath',
      align: '#myPath',
      autoRotate: true,
      start: 0,
      end: 1
    },
    duration: 5
  });
});
```

## Best Practices

### 1. Always Use Cleanup
```javascript
useGSAP(() => {
  // Animations here are automatically cleaned up
}, { scope: container }); // Scope for better selector performance
```

### 2. Use useLayoutEffect for DOM Mutations
```javascript
useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    // Animations after DOM is ready
  }, container);
  
  return () => ctx.revert();
}, []);
```

### 3. Responsive Animations
```javascript
useGSAP(() => {
  const mm = gsap.matchMedia();
  
  mm.add("(min-width: 768px)", () => {
    // Desktop animations
    gsap.to('.box', { x: 400 });
  });
  
  mm.add("(max-width: 767px)", () => {
    // Mobile animations
    gsap.to('.box', { x: 100 });
  });
});
```

### 4. Performance Tips
- Use `will-change: transform` for animated elements
- Animate `transform` and `opacity` for best performance
- Use `force3D: true` for hardware acceleration
- Batch DOM reads/writes

## Common Patterns

### Stagger Animations
```javascript
gsap.to('.item', {
  y: -20,
  opacity: 1,
  stagger: {
    each: 0.1,
    from: 'center',
    grid: 'auto'
  }
});
```

### Infinite Loop
```javascript
gsap.to('.element', {
  rotation: 360,
  duration: 2,
  repeat: -1, // Infinite
  ease: 'none'
});
```

### Yoyo Effect
```javascript
gsap.to('.element', {
  x: 100,
  duration: 1,
  yoyo: true,
  repeat: -1
});
```

## Easing Functions
- `power1`, `power2`, `power3`, `power4` - Acceleration curves
- `back` - Overshoots target
- `elastic` - Spring-like motion
- `bounce` - Bouncing effect
- `steps(n)` - Stepped animation
- `none` - Linear, no easing

## Resources
- [GSAP Documentation](https://gsap.com/docs/)
- [GSAP React Guide](https://gsap.com/resources/React/)
- [GSAP Ease Visualizer](https://gsap.com/docs/v3/Eases/)
- [GSAP Forums](https://gsap.com/community/forums/)

## Next Steps
1. Build basic animations (fade, slide, rotate)
2. Create timeline sequences
3. Implement scroll-triggered animations
4. Add interactive animations with mouse/touch
5. Create SVG animations and morphing effects