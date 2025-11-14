"use client";
import React from "react";
import { ShieldCheckIcon, BadgeCheckIcon, StampIcon } from "./icons";
import { useInView } from "./hooks/useInView";

// --- TYPES ---
interface Certification {
  id: string;
  name: string;
  provider: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

// --- DATA ---
const certificationsData: Certification[] = [
  {
    id: "abs",
    name: "IWS Certified",
    provider: "American Bureau of Shipping",
    icon: ShieldCheckIcon,
  },
  {
    id: "lloyd",
    name: "Approved Service Supplier",
    provider: "Lloyd's Register",
    icon: BadgeCheckIcon,
  },
  {
    id: "bv",
    name: "Recognition Mode II",
    provider: "Bureau Veritas",
    icon: StampIcon,
  },
  {
    id: "iso1",
    name: "ISO 9001:2015",
    provider: "Quality Management",
    icon: ShieldCheckIcon,
  },
  {
    id: "iso2",
    name: "ISO 14001:2015",
    provider: "Environmental Management",
    icon: BadgeCheckIcon,
  },
  {
    id: "iso3",
    name: "ISO 45001:2018",
    provider: "Occupational Health & Safety",
    icon: StampIcon,
  },
];

// Double the data for a seamless loop
const marqueeCerts = [...certificationsData, ...certificationsData];

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

// --- STYLES FOR ANIMATION ---
const marqueeStyles = `
  @keyframes scroll-x {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
  @keyframes scroll-x-reverse {
    from { transform: translateX(-50%); }
    to { transform: translateX(0); }
  }
  .animate-marquee {
    animation: scroll-x 40s linear infinite;
  }
  .animate-marquee-reverse {
      animation: scroll-x-reverse 40s linear infinite;
  }
`;

// --- MAIN COMPONENT ---
export default function CertificationsSection() {
  return (
    <section
      id="certifications"
      className="py-24 sm:py-32 bg-[#0d2a4c] overflow-hidden"
    >
      <style>{marqueeStyles}</style>
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <AnimatedDiv>
            <h2 className="text-4xl font-extrabold text-gray-100 sm:text-5xl tracking-tight">
              Certificaciones de Calidad Global
            </h2>
          </AnimatedDiv>
          <AnimatedDiv delay={150}>
            <p className="mt-6 text-lg text-gray-300 leading-8">
              Nuestro compromiso con la excelencia está respaldado por
              certificaciones reconocidas internacionalmente, garantizando los
              más altos estándares de seguridad y calidad en cada operación.
            </p>
          </AnimatedDiv>
        </div>
      </div>

      <div className="mt-20 relative">
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0d2a4c] via-transparent to-[#0d2a4c]"></div>
        <div className="flex flex-col gap-6">
          {/* First Row */}
          <div className="flex w-max animate-marquee">
            {marqueeCerts.map((cert, index) => (
              <div
                key={`fwd-${cert.id}-${index}`}
                className="flex-shrink-0 w-80 mx-3 p-6 bg-blue-950/60 backdrop-blur-sm border border-white/10 rounded-2xl shadow-lg flex items-center gap-5"
              >
                <cert.icon className="w-12 h-12 text-blue-400 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-lg text-gray-100">
                    {cert.name}
                  </h4>
                  <p className="text-sm text-gray-400">{cert.provider}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Second Row (Reverse) */}
          <div className="flex w-max animate-marquee-reverse">
            {marqueeCerts.map((cert, index) => (
              <div
                key={`rev-${cert.id}-${index}`}
                className="flex-shrink-0 w-80 mx-3 p-6 bg-blue-950/60 backdrop-blur-sm border border-white/10 rounded-2xl shadow-lg flex items-center gap-5"
              >
                <cert.icon className="w-12 h-12 text-green-400 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-lg text-gray-100">
                    {cert.name}
                  </h4>
                  <p className="text-sm text-gray-400">{cert.provider}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
