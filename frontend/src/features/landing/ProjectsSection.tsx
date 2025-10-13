/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect, useRef } from "react";
import { getLenis } from "@/shared/lib/lenis";
import { useSpring, animated } from "@react-spring/web";

const mockProjects = Array.from({ length: 6 }).map((_, i) => ({
  id: `p${i + 1}`,
  title: `Proyecto Ejemplo ${i + 1}`,
  desc: "Descripción breve del proyecto mostrando resultados y alcance.",
}));

function ProjectCard({
  project,
  onOpen,
}: {
  project: any;
  onOpen: (id: string) => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [props, api] = useSpring(() => ({
    rotX: 0,
    rotY: 0,
    scale: 1,
    config: { mass: 1, tension: 170, friction: 26 },
  }));

  const isInteractive = () => {
    return !!(ref.current && ref.current.classList.contains("is-active"));
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!ref.current) return;
    // only run tilt if scroll-driven activation enabled
    if (!isInteractive()) return;

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotY = ((x - rect.width / 2) / rect.width) * 12; // horizontal tilt
    const rotX = -((y - rect.height / 2) / rect.height) * 8; // vertical tilt
    api.start({ rotX, rotY, scale: 1.03 });
  };

  const handlePointerLeave = () => {
    api.start({ rotX: 0, rotY: 0, scale: 1 });
  };

  return (
    <animated.figure
      ref={ref}
      className="cursor-pointer project-card will-change-transform"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={() => onOpen(project.id)}
      style={{
        transform: props.rotX
          .to((rx) => `perspective(800px) rotateX(${rx}deg)`)
          .toString(),
      }}
    >
      <animated.div
        style={{
          transform: props.rotY.to((ry) => `rotateY(${ry}deg)`).toString(),
          scale: props.scale,
        }}
        className="bg-white rounded shadow-sm"
      >
        <div className="h-40 bg-gray-200 rounded mb-2" />
        <figcaption className="px-2 pb-2">
          <h4 className="font-semibold">{project.title}</h4>
          <p className="text-sm text-muted">{project.desc}</p>
        </figcaption>
      </animated.div>
    </animated.figure>
  );
}

export default function ProjectsSection() {
  const [open, setOpen] = useState<string | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let ctx: any;
    let gsap: any;
    let ScrollTrigger: any;

    (async () => {
      try {
        const mods = await import("gsap");
        gsap = mods.default || mods;
        ScrollTrigger =
          (await import("gsap/dist/ScrollTrigger")).default ||
          (gsap as any).ScrollTrigger;
        if (gsap && ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

        const lenis = getLenis();
        const scroller =
          document.scrollingElement || document.documentElement || window;

        if (lenis && ScrollTrigger) {
          ScrollTrigger.scrollerProxy(scroller, {
            scrollTop(value: number) {
              if (arguments.length) {
                try {
                  lenis.scrollTo(value);
                } catch {
                  (scroller as any).scrollTop = value;
                }
              }
              return (
                (lenis &&
                  lenis.scroll &&
                  lenis.scroll.instance &&
                  lenis.scroll.instance.scroll) ||
                (scroller as any).scrollTop ||
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
            pinType: document.documentElement.style.transform
              ? "transform"
              : "fixed",
          });

          // ensure ScrollTrigger is aware of Lenis and refresh
          lenis.on("scroll", () => {
            ScrollTrigger.update();
          });
        }

        if (!containerRef.current) return;
        ctx = gsap.context(() => {
          gsap.utils.toArray(".project-card").forEach((el: any, i: number) => {
            // add scrollTrigger that toggles 'is-active' class based on visibility
            gsap.fromTo(
              el,
              { y: 30, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.7,
                delay: i * 0.06,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: el,
                  start: "top 85%",
                  end: "bottom 20%",
                  onEnter: () => el.classList.add("is-active"),
                  onEnterBack: () => el.classList.add("is-active"),
                  onLeave: () => el.classList.remove("is-active"),
                  onLeaveBack: () => el.classList.remove("is-active"),
                },
              }
            );
          });
        }, containerRef.current);

        // force refresh after setup to avoid initial jump
        try {
          ScrollTrigger.refresh();
        } catch {
          // ignore
        }
      } catch {
        // ignore
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
    <section id="projects" ref={containerRef} className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-6">Proyectos</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {mockProjects.map((p) => (
            <ProjectCard key={p.id} project={p} onOpen={(id) => setOpen(id)} />
          ))}
        </div>

        {open && (
          <div
            className="fixed inset-0 z-60 flex items-center justify-center bg-black/60"
            onClick={() => setOpen(null)}
          >
            <div className="bg-white rounded p-6 max-w-xl w-full">
              <div className="h-64 bg-gray-200 rounded mb-4" />
              <h3 className="text-xl font-semibold">
                {mockProjects.find((m) => m.id === open)?.title}
              </h3>
              <p className="text-sm mt-2">
                {mockProjects.find((m) => m.id === open)?.desc}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
