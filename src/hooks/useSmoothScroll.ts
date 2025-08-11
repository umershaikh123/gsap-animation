'use client';

import { useCallback } from 'react';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

export function useSmoothScroll() {
  // Get the current ScrollSmoother instance
  const getSmoother = useCallback(() => {
    return ScrollSmoother.get();
  }, []);

  // Scroll to a specific element or position
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

  // Get scroll velocity
  const getVelocity = useCallback(() => {
    const smoother = getSmoother();
    return smoother ? smoother.getVelocity() : 0;
  }, [getSmoother]);

  // Check if scrolling is currently happening
  const isScrolling = useCallback(() => {
    return Math.abs(getVelocity()) > 0.1;
  }, [getVelocity]);

  return {
    scrollTo,
    scrollToTop,
    getScrollProgress,
    pauseScroll,
    resumeScroll,
    getVelocity,
    isScrolling,
    getSmoother,
  };
}