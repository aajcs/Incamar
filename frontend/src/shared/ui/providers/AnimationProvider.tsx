/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    __lenis?: any;
  }
}

export default function AnimationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<any | null>(null);
  useEffect(() => {
    let rafId = 0;
    let mounted = true;
    (async () => {
      try {
        const { default: Lenis } = await import("lenis");
        if (!mounted) return;

        // Configuración basada en recomendaciones de la librería Lenis
        lenisRef.current = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          // mejora la respuesta del wheel/touch
          wheelMultiplier: 1,
          touchMultiplier: 2,
        });

        // expose for other modules (GSAP ScrollTrigger integration)
        window.__lenis = lenisRef.current;

        function raf(time: number) {
          if (lenisRef.current) lenisRef.current.raf(time);
          rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);
      } catch {
        // ignore if Lenis not available
      }
    })();

    return () => {
      mounted = false;
      if (rafId) cancelAnimationFrame(rafId);
      if (lenisRef.current && typeof lenisRef.current.destroy === "function") {
        try {
          lenisRef.current.destroy();
        } catch {
          // ignore
        }
      }
      // cleanup global
      try {
        delete window.__lenis;
      } catch {}
    };
  }, []);

  return <>{children}</>;
}
