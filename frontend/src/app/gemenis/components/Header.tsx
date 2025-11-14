import React from "react";
import Image from "next/image";

type Props = {
  isMenuOpen: boolean;
  toggleMenu: () => void;
};

export default function Header({ isMenuOpen, toggleMenu }: Props) {
  return (
    <header id="inicio" className="sticky top-0 z-50 bg-primary shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <a
            href="#inicio"
            className="flex-shrink-0 flex items-center space-x-3"
          >
            <Image
              src="https://placehold.co/40x40/ff4500/ffffff?text=IC"
              alt="Logo INCAMAR C.A."
              width={40}
              height={40}
              className="h-10 w-auto rounded-full shadow-md"
              unoptimized
            />
            <div>
              <span className="text-xl font-bold text-white tracking-wider">
                INCAMAR C.A.
              </span>
              <span className="block text-xs font-light text-gray-300">
                Ingeniería y Calidad Marina
              </span>
            </div>
          </a>

          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            <a
              href="#inicio"
              className="text-white hover:text-gray-300 font-medium transition duration-150 ease-in-out"
            >
              INICIO
            </a>
            <a
              href="#servicios"
              className="text-white hover:text-gray-300 font-medium transition duration-150 ease-in-out"
            >
              SERVICIOS
            </a>
            <a
              href="#proyectos"
              className="text-white hover:text-gray-300 font-medium transition duration-150 ease-in-out"
            >
              PROYECTOS
            </a>
            <a
              href="#certificaciones"
              className="text-white hover:text-gray-300 font-medium transition duration-150 ease-in-out"
            >
              CERTIFICACIONES
            </a>
            <a
              href="#recursos"
              className="text-white hover:text-gray-300 font-medium transition duration-150 ease-in-out"
            >
              RECURSOS
            </a>
            <a
              href="#contacto"
              className="text-white hover:text-gray-300 font-medium transition duration-150 ease-in-out"
            >
              CONTACTO
            </a>
            <div className="text-sm font-semibold text-gray-200 ml-4">
              <span className="cursor-pointer hover:text-white transition">
                Español
              </span>{" "}
              |
              <span className="cursor-pointer hover:text-white transition">
                {" "}
                English
              </span>
            </div>
          </div>

          <button
            id="menu-button"
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-md text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-expanded={isMenuOpen}
          >
            <svg
              className="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>

      <div
        className={`lg:hidden ${isMenuOpen ? "block" : "hidden"}`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {[
            { href: "#inicio", label: "INICIO" },
            { href: "#servicios", label: "SERVICIOS" },
            { href: "#proyectos", label: "PROYECTOS" },
            { href: "#certificaciones", label: "CERTIFICACIONES" },
            { href: "#recursos", label: "RECURSOS" },
            { href: "#contacto", label: "CONTACTO" },
          ].map((i) => (
            <a
              key={i.href}
              href={i.href}
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              {i.label}
            </a>
          ))}
          <div className="px-3 py-2 text-sm font-semibold text-gray-400">
            <span className="cursor-pointer hover:text-white transition">
              Español
            </span>{" "}
            |
            <span className="cursor-pointer hover:text-white transition">
              {" "}
              English
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
