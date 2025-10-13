/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getLenis } from "@/shared/lib/lenis";
import { useEffect, useRef } from "react";

const services = [
  {
    id: "buceo",
    title: "Buceo Comercial e Industrial",
    bullets: [
      "Inspecciones subacuáticas certificadas (IWS ABS, Lloyd's, Bureau Veritas)",
      "Ensayos no destructivos y medición de espesores",
      "Pulido de propelas y soldadura subacuática",
    ],
  },
  {
    id: "mecanico",
    title: "Mantenimiento y Reparaciones Mecánicas",
    bullets: [
      "Mantenimiento preventivo y correctivo",
      "Reparaciones eléctricas y mecánicas",
      "Diagnóstico y puesta a punto",
    ],
  },
  {
    id: "muelles",
    title: "Mantenimiento Acuático en Muelles",
    bullets: [
      "Limpieza de estructuras marinas",
      "Inspección de pilotes y defensas",
      "Rehabilitación superficial",
    ],
  },
  {
    id: "logistica",
    title: "Logística Marina y Terrestre",
    bullets: [
      "Flota de lanchas de pilotaje",
      "Transporte de personal y carga",
      "Planes de contingencia",
    ],
  },
];

export default function ServicesSection() {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let ctx: any;
    let gsap: any;
    let ScrollTrigger: any;
    let registered = false;

    (async () => {
      try {
        const mods = await import("gsap");
        gsap = mods.default || mods;
        ScrollTrigger =
          (await import("gsap/dist/ScrollTrigger")).default ||
          (gsap as any).ScrollTrigger;
        if (gsap && ScrollTrigger && !registered) {
          gsap.registerPlugin(ScrollTrigger);
          registered = true;
        }

        // use helper to get Lenis instance
        const lenis = getLenis();
        if (lenis && ScrollTrigger) {
          ScrollTrigger.scrollerProxy(window, {
            scrollTop(value: number) {
              if (arguments.length) {
                try {
                  lenis.scrollTo(value);
                } catch {
                  // fallback
                  window.scrollTo(0, value);
                }
              }
              // try to return scroll value from lenis if available
              return (
                (lenis &&
                  lenis.scroll &&
                  lenis.scroll.instance &&
                  lenis.scroll.instance.scroll) ||
                window.scrollY
              );
            },
            getBoundingClientRect() {
              return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight,
              };
            },
            // pinType based on transform support
            pinType: document.documentElement.style.transform
              ? "transform"
              : "fixed",
          });

          lenis.on("scroll", () => {
            ScrollTrigger.update();
          });
        }

        if (!containerRef.current) return;
        ctx = gsap.context(() => {
          gsap.utils.toArray(".service-card").forEach((el: any, i: number) => {
            gsap.fromTo(
              el,
              { y: 30, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.7,
                delay: i * 0.08,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: el,
                  start: "top 80%",
                  end: "bottom 60%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          });
        }, containerRef.current);
      } catch {
        // ignore errors (gsap not available)
      }
    })();

    return () => {
      try {
        if (ctx) ctx.revert();
        if (ScrollTrigger) ScrollTrigger.kill();
      } catch {
        // ignore
      }
    };
  }, []);

  return (
    <section
      id="services"
      ref={containerRef}
      className="py-16 bg-[color-mix(in_oklab,var(--fg)2%,transparent)]"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-6">Servicios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((s) => (
            <article
              key={s.id}
              className="service-card p-6 border rounded-lg shadow-sm bg-[var(--surface)]"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-sky-400 to-cyan-600 flex items-center justify-center text-white font-bold">
                  {s.title.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{s.title}</h3>
                  <ul className="mt-3 list-disc list-inside text-sm">
                    {s.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
