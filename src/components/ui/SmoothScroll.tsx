"use client";

import { useEffect, useRef, ReactNode } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ============================================================
   GSAP Plugin Registration
   Must happen once at module level (client side).
   ============================================================ */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ============================================================
   Easing Function
   easeInOutQuart: smooth S-curve used by Lenis.
   ============================================================ */
function easeInOutQuart(t: number): number {
  return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
}

/* ============================================================
   SmoothScrollProvider
   Initialises Lenis and wires it into GSAP's ScrollTrigger so
   that all scroll-triggered animations stay in sync with the
   smooth-scrolled position rather than the native scroll pos.
   ============================================================ */
interface SmoothScrollProviderProps {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Create Lenis instance
    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      easing: easeInOutQuart,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
      orientation: "vertical",
    });

    lenisRef.current = lenis;

    // Keep ScrollTrigger in sync with Lenis scroll position
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis via GSAP ticker so requestAnimationFrame is
    // shared and never double-fires.
    const tickerHandler = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerHandler);

    // GSAP ticker runs at 60+ fps by default; disabling lag
    // smoothing gives Lenis full control over frame timing.
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerHandler);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <div id="smooth-scroll-root" className="contents">
      {children}
    </div>
  );
}
