"use client";
import React, { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { useInView } from "./hooks/useInView";

// --- TYPES ---
interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  imageUrl: string;
}

// --- DATA ---
const mockProjects: Project[] = Array.from({ length: 6 }).map((_, i) => ({
  id: `p${i + 1}`,
  title: `Proyecto Marino ${i + 1}`,
  description: "Inspección y mantenimiento de plataforma offshore.",
  longDescription:
    "Este proyecto implicó una inspección submarina completa utilizando ROVs y buzos comerciales certificados. Se realizaron ensayos no destructivos, mediciones de espesores y reparaciones estructurales críticas para garantizar la integridad y seguridad de la plataforma según los estándares internacionales.",
  imageUrl: `https://picsum.photos/seed/project${i + 1}/800/600`,
}));

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

const ProjectCard: React.FC<{
  project: Project;
  onOpen: (id: string) => void;
}> = ({ project, onOpen }) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const rotateX = useTransform(springY, [-150, 150], [10, -10]);
  const rotateY = useTransform(springX, [-150, 150], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - (rect.left + rect.width / 2));
    y.set(e.clientY - (rect.top + rect.height / 2));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpen(project.id)}
      style={{ perspective: "1000px" }}
      className="cursor-pointer"
    >
      <motion.div
        style={{ rotateX, rotateY, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="bg-blue-950/60 backdrop-blur-sm border border-white/10 rounded-2xl shadow-lg h-full overflow-hidden"
      >
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h4 className="font-bold text-xl text-gray-100">{project.title}</h4>
          <p className="text-sm text-gray-400 mt-2">{project.description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- MAIN COMPONENT ---
export default function ProjectsSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedProject = selectedId
    ? mockProjects.find((p) => p.id === selectedId)
    : null;

  return (
    <section id="projects" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Parallax Background - Scoped to this section */}
      <div className="absolute inset-0 z-0">
        {/* Background image: avoid Tailwind's bg-fixed issues on non-body elements.
            If you still want the 'fixed' effect, backgroundAttachment is set inline
            (some browsers treat bg-attachment fixed differently on non-root elements). */}
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://png.pngtree.com/thumb_back/fh260/background/20241101/pngtree-tranquil-underwater-landscape-featuring-colorful-rocks-surrounded-by-diverse-aquatic-flora-image_16484128.jpg')",
            backgroundAttachment: "fixed", // optional; more reliable here than relying on bg-fixed utility
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a192f]/90 to-[#0d2a4c]/95 pointer-events-none"></div>
      </div>

      {/* Ensure the content sits above the background */}
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <AnimatedDiv>
            <h2 className="text-4xl font-extrabold text-gray-100 sm:text-5xl tracking-tight">
              Proyectos Destacados
            </h2>
          </AnimatedDiv>
          <AnimatedDiv delay={150}>
            <p className="mt-6 text-lg text-gray-300 leading-8">
              Explora algunos de nuestros trabajos más recientes y desafiantes.
              Cada proyecto refleja nuestro compromiso con la excelencia, la
              seguridad y la innovación en el sector marino.
            </p>
          </AnimatedDiv>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockProjects.map((project, index) => (
            <AnimatedDiv key={project.id} delay={index * 150}>
              <ProjectCard project={project} onOpen={setSelectedId} />
            </AnimatedDiv>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div
              layoutId={`card-${selectedProject.id}`}
              onClick={(e) => e.stopPropagation()}
              className="bg-blue-950/80 border border-white/10 rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={selectedProject.imageUrl}
                alt={selectedProject.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-100">
                  {selectedProject.title}
                </h3>
                <p className="text-gray-300 mt-4 leading-relaxed">
                  {selectedProject.longDescription}
                </p>
                <button
                  onClick={() => setSelectedId(null)}
                  className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
