"use client";
import React from "react";
import { AwardIcon, HeartIcon, UsersIcon } from "./icons";
import { useInView } from "./hooks/useInView";

// --- TYPES ---
interface ValueItem {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  iconColorClass: string;
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  description: string;
  imageUrl: string;
}

// --- DATA ---
const valuesData: ValueItem[] = [
  {
    icon: UsersIcon,
    title: "Misión",
    description:
      "Prestar servicios especializados submarinos competitivos y de alta calidad, garantizando la seguridad, calidad y respeto al medio ambiente.",
    iconColorClass: "text-blue-600",
  },
  {
    icon: AwardIcon,
    title: "Visión",
    description:
      "Consolidarnos como una empresa líder en servicios submarinos, reconocida por su capacidad en prestaciones oportunas y de altos estándares.",
    iconColorClass: "text-green-600",
  },
  {
    icon: HeartIcon,
    title: "Valores",
    description:
      "Ética empresarial, excelencia y responsabilidad para cumplir compromisos de manera oportuna y eficaz.",
    iconColorClass: "text-red-600",
  },
];

const teamData: TeamMember[] = [
  {
    id: 1,
    name: "Carlos Rodríguez",
    role: "Director de Operaciones",
    description:
      "Experto en logística y supervisión de proyectos submarinos. Garantiza la eficiencia y seguridad en cada operación.",
    imageUrl: "https://picsum.photos/seed/person1/200/200",
  },
  {
    id: 2,
    name: "Ana Fernández",
    role: "Ingeniera Marina Principal",
    description:
      "Lidera el equipo de ingeniería con soluciones innovadoras para el mantenimiento y reparación de estructuras marinas.",
    imageUrl: "https://picsum.photos/seed/person2/200/200",
  },
  {
    id: 3,
    name: "Javier Morales",
    role: "Jefe de Buceo Comercial",
    description:
      "Responsable de la seguridad y ejecución de todas las operaciones de buceo, cumpliendo con los más altos estándares.",
    imageUrl: "https://picsum.photos/seed/person3/200/200",
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
export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-24 sm:py-32 bg-gradient-to-b from-blue-50 to-gray-50"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <AnimatedDiv>
            <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl tracking-tight">
              Nuestra Historia y Valores
            </h2>
          </AnimatedDiv>
          <AnimatedDiv delay={150}>
            <p className="mt-6 text-lg text-gray-600 leading-8">
              Fundada en octubre de 2012, Ingeniería y Calidad Marina C.A.
              surgió con el objetivo de aplicar nuevos conocimientos al
              mantenimiento marino, priorizando la ética profesional y la mejora
              continua. Somos un equipo de profesionales dedicados a enriquecer
              y expandir el sector de manera innovadora.
            </p>
          </AnimatedDiv>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {valuesData.map((item, index) => (
            <AnimatedDiv key={item.title} delay={index * 150}>
              <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col items-center">
                <div
                  className={`mb-5 w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center`}
                >
                  <item.icon className={`w-8 h-8 ${item.iconColorClass}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </AnimatedDiv>
          ))}
        </div>

        <div className="mt-28 text-center max-w-3xl mx-auto">
          <AnimatedDiv>
            <h3 className="text-4xl font-extrabold text-gray-900 sm:text-5xl tracking-tight">
              Conoce a Nuestro Equipo
            </h3>
          </AnimatedDiv>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {teamData.map((member, index) => (
            <AnimatedDiv key={member.id} delay={index * 150}>
              <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-full group">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-6 object-cover ring-4 ring-white group-hover:scale-105 transition-transform duration-300"
                />
                <h4 className="text-xl font-bold text-gray-900 mb-1">
                  {member.name}
                </h4>
                <p className="text-base font-semibold text-blue-600 mb-3">
                  {member.role}
                </p>
                <p className="text-sm text-gray-600">{member.description}</p>
              </div>
            </AnimatedDiv>
          ))}
        </div>
      </div>
    </section>
  );
}
