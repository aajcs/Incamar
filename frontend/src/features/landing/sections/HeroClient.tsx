/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import usePrefersReducedMotion from "@/shared/hooks/usePrefersReducedMotion";
import { getLenis } from "@/shared/lib/lenis";
import { IncamarLogo } from "../components";

export default function HeroClient() {
  const ref = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const shapesRef = useRef<HTMLDivElement | null>(null);
  const particlesRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const [animationData, setAnimationData] = useState<any | null>(null);
  const [loaded, setLoaded] = useState(false);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/lottie/hero.json");
        if (!res.ok) return;
        const json = await res.json();
        if (!mounted) return;
        setAnimationData(json);
      } catch {
        // ignore
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let t: any;
    if (animationData) {
      t = setTimeout(() => setLoaded(true), 450);
    } else {
      t = setTimeout(() => setLoaded(true), 900);
    }
    return () => clearTimeout(t);
  }, [animationData]);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    const bg = bgRef.current;
    const shapes = shapesRef.current;
    const particles = particlesRef.current;
    const imgWrap = imageRef.current;
    if (!el || (!bg && !shapes && !particles && !imgWrap)) return;

    let rafId = 0;
    let running = true;
    let imgY = 0;
    let imgScale = 1;
    let imgOpacity = 1;
    const PARALLAX_MULTIPLIER = -140;
    const LERP_Y = 0.26;
    const LERP_SCALE = 0.18;
    const LERP_OPACITY = 0.14;
    const MAX_SCALE_DELTA = 0.18;
    const MIN_OPACITY = 0.6;

    const update = () => {
      if (!running) return;
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight || 1;
      const center = rect.top + rect.height / 2;
      const viewportCenter = viewportH / 2;
      const distance = center - viewportCenter;
      const progress = distance / viewportH;

      if (bg) {
        const y = progress * 20;
        bg.style.transform = `translateY(${y}px)`;
      }
      if (shapes) {
        const y2 = progress * -40;
        shapes.style.transform = `translateY(${y2}px)`;
      }
      if (particles) {
        const y3 = progress * -60;
        particles.style.transform = `translateY(${y3}px)`;
        particles.style.opacity = `${Math.min(
          1,
          0.6 + Math.abs(progress) * 0.4
        )}`;
      }

      const imgWrapEl = imageRef.current;
      if (imgWrapEl) {
        const targetImg = progress * PARALLAX_MULTIPLIER;
        imgY += (targetImg - imgY) * LERP_Y;

        const targetScale =
          1 + Math.min(MAX_SCALE_DELTA, Math.abs(progress) * MAX_SCALE_DELTA);
        const targetOpacity = Math.max(
          MIN_OPACITY,
          1 - Math.min(1 - MIN_OPACITY, Math.abs(progress))
        );
        imgScale += (targetScale - imgScale) * LERP_SCALE;
        imgOpacity += (targetOpacity - imgOpacity) * LERP_OPACITY;

        imgWrapEl.style.transform = `translateY(${imgY}px) scale(${imgScale})`;
        imgWrapEl.style.opacity = `${imgOpacity}`;
        imgWrapEl.style.willChange = "transform, opacity";
      }

      rafId = requestAnimationFrame(update);
    };

    const lenis = getLenis();
    if (lenis && typeof lenis.on === "function") {
      const handler = () => {
        if (!rafId) rafId = requestAnimationFrame(update);
      };
      lenis.on("scroll", handler);
      rafId = requestAnimationFrame(update);
      return () => {
        running = false;
        if (rafId) cancelAnimationFrame(rafId);
        try {
          lenis.off("scroll", handler);
        } catch {}
      };
    }

    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    rafId = requestAnimationFrame(update);

    return () => {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduce]);

  const heading = {
    hidden: { y: 26, opacity: 0 },
    enter: { y: 0, opacity: 1, transition: { duration: 0.7 } },
  } as any;

  const sub = {
    hidden: { y: 14, opacity: 0 },
    enter: { y: 0, opacity: 1, transition: { duration: 0.9, delay: 0.08 } },
  } as any;

  const animateLogoParts = useCallback(() => {
    if (reduce) return;
    try {
      const wrapper = document.querySelector(
        ".incamar-svg"
      ) as HTMLElement | null;
      if (!wrapper) return;
      const svgEl = wrapper.querySelector("svg") as SVGSVGElement | null;
      if (!svgEl) return;

      const lineaFill = svgEl.querySelector(
        "#lineaFill"
      ) as SVGPathElement | null;
      const lineaStroke = svgEl.querySelector(
        "#lineaStroke"
      ) as SVGPathElement | null;
      const contorno = svgEl.querySelector(
        "#contornoLetras"
      ) as SVGPathElement | null;
      const letras = svgEl.querySelector("#letras") as SVGPathElement | null;
      const barco = svgEl.querySelector("#barco") as SVGPathElement | null;

      if (lineaFill) {
        lineaFill.style.transition = "none";
        lineaFill.style.opacity = "0";
      }
      if (lineaStroke) {
        try {
          const lenS = (lineaStroke as any).getTotalLength
            ? (lineaStroke as any).getTotalLength()
            : 0;
          lineaStroke.style.strokeDasharray = `${lenS}`;
          lineaStroke.style.strokeDashoffset = `${lenS}`;
        } catch {}
        lineaStroke.style.transition = "none";
        lineaStroke.style.opacity = "0";
      }

      if (contorno) {
        try {
          const lenC = (contorno as any).getTotalLength
            ? (contorno as any).getTotalLength()
            : 0;
          contorno.style.strokeDasharray = `${lenC}`;
          contorno.style.strokeDashoffset = `${lenC}`;
        } catch {}
        contorno.style.transition = "none";
        contorno.style.opacity = "0";
      }

      if (barco) {
        barco.style.transition = "none";
        barco.style.opacity = "0";
        barco.style.transform = "translateX(24px) scale(0.96)";
      }

      if (letras) {
        letras.style.transition = "none";
        letras.style.opacity = "0";
        letras.style.transform = "translateY(8px)";
      }

      requestAnimationFrame(() => {
        const clipRect = svgEl.querySelector(
          "#clip-linea-rect"
        ) as SVGRectElement | null;
        if (clipRect) {
          clipRect.style.transformBox = "fill-box";
          clipRect.style.transformOrigin = "100% 50%";
          clipRect.style.transition =
            "transform 1400ms cubic-bezier(.2,.9,.3,1)";
          clipRect.style.transform = "scaleX(0)";
          setTimeout(() => {
            clipRect.style.transform = "scaleX(1)";
            if (lineaFill) {
              lineaFill.style.transition = "opacity 500ms ease-out 180ms";
              lineaFill.style.opacity = "1";
            }
          }, 240);
        }

        const strokeRevealDelay = 240 + 1400 + 80;
        setTimeout(() => {
          if (lineaStroke) {
            lineaStroke.style.transition =
              "opacity 600ms ease-out, stroke-dashoffset 900ms ease-out";
            lineaStroke.style.opacity = "1";
            lineaStroke.style.strokeDashoffset = "0";
          }
        }, strokeRevealDelay);

        setTimeout(() => {
          if (!contorno) return;
          contorno.style.transition =
            "stroke-dashoffset 700ms ease-out, opacity 500ms ease-out";
          contorno.style.opacity = "1";
          contorno.style.strokeDashoffset = "0";
        }, 220);

        setTimeout(() => {
          if (!barco) return;
          barco.style.transition =
            "transform 900ms cubic-bezier(.22,1,.36,1), opacity 900ms ease-out";
          barco.style.opacity = "1";
          barco.style.transform = "translateX(0px) scale(1.02)";
          setTimeout(() => {
            barco.style.transition = "transform 400ms ease-out";
            barco.style.transform = "translateX(0px) scale(1)";
          }, 900);
        }, 380);

        setTimeout(() => {
          if (!letras) return;
          letras.style.transition =
            "opacity 700ms ease-out, transform 700ms ease-out";
          letras.style.opacity = "1";
          letras.style.transform = "translateY(0)";
        }, 920);
      });
    } catch {
      // ignore
    }
  }, [reduce]);

  useEffect(() => {
    if (!loaded || reduce) return;
    let attempts = 0;
    const maxAttempts = 12;
    const waitForSvg = () => {
      const svg = document.querySelector(
        ".incamar-svg svg"
      ) as SVGSVGElement | null;
      if (svg) {
        animateLogoParts();
        return;
      }
      attempts += 1;
      if (attempts < maxAttempts) setTimeout(waitForSvg, 120);
    };
    waitForSvg();
  }, [loaded, reduce, animateLogoParts]);

  useEffect(() => {
    if (reduce) return;
    let observed = false;
    let hasLeft = false;
    const target = logoRef.current ?? document.querySelector(".incamar-svg");
    if (!target) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (hasLeft) {
              animateLogoParts();
              hasLeft = false;
            }
          } else {
            hasLeft = true;
          }
        }
      },
      { threshold: 0.2 }
    );

    io.observe(target as Element);
    observed = true;

    return () => {
      try {
        if (observed) io.disconnect();
      } catch {}
    };
  }, [reduce, animateLogoParts]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative overflow-hidden min-h-[76vh] flex items-center"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 -z-10 will-change-transform"
        aria-hidden
      >
        <div className="w-full h-full bg-gradient-to-br from-sky-800 via-cyan-600 to-emerald-400 opacity-90" />
      </div>

      <div
        ref={shapesRef}
        className="absolute right-0 top-8 -z-10 w-[40%] pointer-events-none will-change-transform"
        aria-hidden
      >
        <svg viewBox="0 0 600 400" className="w-full h-auto opacity-30">
          <defs>
            <linearGradient id="g1" x1="0" x2="1">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
          <circle cx="300" cy="200" r="180" fill="url(#g1)" />
        </svg>
      </div>

      <div
        ref={particlesRef}
        className="absolute left-4 bottom-8 -z-20 w-40 h-40 pointer-events-none will-change-transform opacity-60"
        aria-hidden
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="20" cy="30" r="4" fill="#fff" opacity="0.6" />
          <circle cx="60" cy="10" r="6" fill="#fff" opacity="0.45" />
          <circle cx="80" cy="70" r="3" fill="#fff" opacity="0.4" />
        </svg>
      </div>

      <div className="w-full px-4 py-2 max-w-none">
        <div className="w-full ml-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className=" lg:w-1/2">
            <div ref={logoRef} className="mb-6 ">
              <div
                className="incamar-svg"
                style={{
                  maxWidth: 520,
                }}
              >
                <IncamarLogo />
              </div>
            </div>

            <motion.h1
              initial={reduce ? false : "hidden"}
              animate={reduce ? false : "enter"}
              variants={heading}
              className="text-4xl sm:text-5xl font-extrabold mb-3 leading-tight lg:leading-snug text-white"
            >
              Ingeniería y calidad marina
            </motion.h1>

            <motion.p
              initial={reduce ? false : "hidden"}
              animate={reduce ? false : "enter"}
              variants={sub}
              className="text-lg text-white/90 mb-6 max-w-xl leading-relaxed"
            >
              Un equipo de profesionales que transforma el mantenimiento marino
              con prácticas innovadoras y éticas en buceo comercial,
              mantenimiento mecánico y logística integral.
            </motion.p>

            <motion.div
              initial={reduce ? false : "hidden"}
              animate={reduce ? false : "enter"}
              variants={{
                hidden: { y: 20, opacity: 0 },
                enter: {
                  y: 0,
                  opacity: 1,
                  transition: { duration: 1, ease: "easeOut" },
                },
              }}
              className="text-lg text-white/90 mt-8 max-w-xl leading-relaxed"
            >
              <p>
                Descubre cómo nuestra experiencia y dedicación pueden
                transformar tus proyectos marinos.
              </p>
            </motion.div>

            <div className="mt-4">
              <div className="inline-flex items-center gap-3 bg-white/10 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-sm">
                <span className="text-white">
                  <strong>9+ años</strong>
                </span>
                <span className="text-white/90 font-medium">
                  de experiencia en servicios marinos y buceo industrial
                </span>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
            <div
              ref={imageRef}
              className="relative w-full max-w-lg h-[72vh] flex items-center justify-center overflow-hidden rounded-xl"
              style={{ transformOrigin: "center center" }}
            >
              <Image
                src="/images/hero.png"
                alt="Incamar - mantenimiento marino"
                width={780}
                height={780}
                className="w-full h-full object-cover will-change-transform"
                priority
              />
              {/* subtle gradient overlay to blend image with section background */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-l from-transparent via-black/20 to-black/60" />
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center mt-10">
          <div className="flex gap-3">
            <motion.div
              whileHover={reduce ? undefined : { scale: 1.03 }}
              whileTap={reduce ? undefined : { scale: 0.98 }}
            >
              <Link
                href="#contact"
                className="inline-block rounded bg-white text-[var(--primary)] px-6 py-3 font-semibold shadow-lg text-lg"
              >
                Contáctanos Hoy
              </Link>
            </motion.div>

            <motion.div
              whileHover={reduce ? undefined : { scale: 1.02 }}
              whileTap={reduce ? undefined : { scale: 0.98 }}
            >
              <Link
                href="#services"
                className="inline-block rounded border border-white/40 px-5 py-3 font-medium text-white/95 hover:bg-white/5 transition-colors"
              >
                Nuestros Servicios
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
