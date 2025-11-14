"use client";
import { useEffect, useState } from "react";

export default function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handle = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    setPrefersReduced(mq.matches);
    try {
      if (mq.addEventListener) mq.addEventListener("change", handle);
      else mq.addListener(handle);
    } catch (e) {}
    return () => {
      try {
        if (mq.removeEventListener) mq.removeEventListener("change", handle);
        else mq.removeListener(handle);
      } catch (e) {}
    };
  }, []);
  return prefersReduced;
}
