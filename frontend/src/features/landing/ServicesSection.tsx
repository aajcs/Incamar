"use client";
import React from "react";
import { DiverIcon, WrenchIcon, AnchorIcon, TruckIcon } from "./icons";
import { useInView } from "./hooks/useInView";

// --- TYPES ---
interface ServiceItem {
  id: string;
  title: string;
  bullets: string[];
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconColorClass: string;
}

// --- DATA ---
const servicesData: ServiceItem[] = [
  {
    id: "buceo",
    title: "Buceo Comercial e Industrial",
    bullets: [
      "Inspecciones subacuáticas certificadas (IWS ABS, Lloyd's, Bureau Veritas)",
      "Ensayos no destructivos y medición de espesores",
      "Pulido de propelas y soldadura subacuática",
    ],
    icon: DiverIcon,
    iconColorClass: "text-cyan-400",
  },
  {
    id: "mecanico",
    title: "Mantenimiento y Reparaciones Mecánicas",
    bullets: [
      "Mantenimiento preventivo y correctivo",
      "Reparaciones eléctricas y mecánicas",
      "Diagnóstico y puesta a punto",
    ],
    icon: WrenchIcon,
    iconColorClass: "text-orange-400",
  },
  {
    id: "muelles",
    title: "Mantenimiento Acuático en Muelles",
    bullets: [
      "Limpieza de estructuras marinas",
      "Inspección de pilotes y defensas",
      "Rehabilitación superficial",
    ],
    icon: AnchorIcon,
    iconColorClass: "text-blue-400",
  },
  {
    id: "logistica",
    title: "Logística Marina y Terrestre",
    bullets: [
      "Flota de lanchas de pilotaje",
      "Transporte de personal y carga",
      "Planes de contingencia",
    ],
    icon: TruckIcon,
    iconColorClass: "text-green-400",
  },
];

// --- CHILD COMPONENTS ---
const AnimatedDiv: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className, delay = 0 }) => {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- MAIN COMPONENT ---
export default function ServicesSection() {
  return (
    <section id="services" className="py-24 sm:py-32">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <AnimatedDiv>
            <h2 className="text-4xl font-extrabold text-gray-100 sm:text-5xl tracking-tight">
              Nuestros Servicios
            </h2>
          </AnimatedDiv>
          <AnimatedDiv delay={150}>
            <p className="mt-6 text-lg text-gray-300 leading-8">
              Ofrecemos una gama completa de soluciones marinas y submarinas,
              respaldadas por un equipo de expertos y tecnología de punta para
              garantizar resultados de la más alta calidad.
            </p>
          </AnimatedDiv>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicesData.map((service, index) => (
            <AnimatedDiv key={service.id} delay={index * 150}>
              <div className="p-8 bg-blue-950/60 backdrop-blur-sm border border-white/10 rounded-2xl shadow-lg hover:bg-white/10 transition-all duration-300 h-full">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div
                      className={`w-14 h-14 rounded-xl bg-blue-900 flex items-center justify-center shadow-md`}
                    >
                      <service.icon
                        className={`w-8 h-8 ${service.iconColorClass}`}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-100 mb-3">
                      {service.title}
                    </h3>
                    <ul className="space-y-2">
                      {service.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start text-gray-300">
                          <svg
                            className="w-4 h-4 mr-3 mt-1 text-blue-400 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </AnimatedDiv>
          ))}
        </div>
      </div>
    </section>
  );
}
