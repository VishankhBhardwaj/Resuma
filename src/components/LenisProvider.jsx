"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function LenisProvider({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,
      lerp: 0.08,          // jitna kam, utna smooth (0.05-0.12 best)
      smoothWheel: true,
      wheelMultiplier: 0.8, // wheel sensitivity
      touchMultiplier: 1.5,
      infinite: false,
      autoRaf: false,
    });

    let rafId;

    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}