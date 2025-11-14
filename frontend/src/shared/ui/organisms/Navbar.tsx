"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const links = [
  { href: "/#home", label: "Inicio" },
  { href: "/#about", label: "Sobre nosotros" },
  { href: "/#services", label: "Servicios" },
  { href: "/#projects", label: "Proyectos" },
  { href: "/#certifications", label: "Certificaciones" },
  { href: "/#blog", label: "Blog" },
  { href: "/#contact", label: "Contacto" },
];

export default function Navbar() {
  const [active, setActive] = useState<string>("#home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const ticking = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    setActive(window.location.hash || "#home");
    const onHashChange = () => setActive(window.location.hash || "#home");
    window.addEventListener("hashchange", onHashChange);

    const ids = links
      .map((l) => (l.href.includes("#") ? l.href.split("#")[1] : ""))
      .filter(Boolean);

    const getNavHeight = () => {
      const h = navRef.current?.getBoundingClientRect().height;
      return typeof h === "number" && !Number.isNaN(h) ? h : 56;
    };

    const computeActive = (): string => {
      const navHeight = getNavHeight();
      // prefer section that has top <= navHeight (scrolled past) and closest to nav
      const past: { id: string; top: number }[] = [];
      let closest: { id: string; diff: number } | null = null;

      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const top = rect.top;
        if (top <= navHeight + 8) {
          past.push({ id, top });
        }
        const targetPoint = navHeight + 20; // preferred anchor point
        const diff = Math.abs(top - targetPoint);
        if (!closest || diff < closest.diff) closest = { id, diff };
      });

      if (past.length) {
        const mostRecent = past.reduce((a, b) => (a.top > b.top ? a : b));
        return `#${mostRecent.id}`;
      }

      if (closest !== null) {
        const closestId = (closest as { id: string; diff: number }).id;
        return `#${closestId}`;
      }

      return "#home";
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      window.requestAnimationFrame(() => {
        const newActive = computeActive();
        setActive((curr) => (curr !== newActive ? newActive : curr));
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // initial check
    onScroll();

    return () => {
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // lock body scroll when mobile menu is open
  useEffect(() => {
    if (typeof document === "undefined") return;
    const original = document.body.style.overflow;
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = original || "";
    }
    return () => {
      document.body.style.overflow = original || "";
    };
  }, [mobileOpen]);

  const handleLinkClick = () => setMobileOpen(false);

  return (
    <nav
      ref={navRef}
      className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--surface)]/80"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/#home" className="font-semibold">
          Incamar
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-2 text-sm">
          {links.map((l) => {
            const isActive = active === l.href.replace("/", "");
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`px-3 py-1.5 rounded-[var(--radius-2)] transition-colors ${
                    isActive
                      ? "bg-[var(--primary)] text-[var(--primary-contrast)]"
                      : "hover:bg-[color-mix(in_oklab,var(--fg)10%,transparent)]"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile toggle */}
        <div className="md:hidden">
          <button
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((s) => !s)}
            className="p-2 rounded hover:bg-[color-mix(in_oklab,var(--fg)6%,transparent)]"
          >
            <i
              className={`pi ${mobileOpen ? "pi-times" : "pi-bars"} text-lg`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        className={`md:hidden ${
          mobileOpen ? "block" : "hidden"
        } border-t border-[var(--border)] bg-[var(--surface)]`}
      >
        <div className="px-4 py-4">
          <ul className="flex flex-col gap-2">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={handleLinkClick}
                  className="block px-3 py-2 rounded-[var(--radius-2)] hover:bg-[color-mix(in_oklab,var(--fg)6%,transparent)]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
