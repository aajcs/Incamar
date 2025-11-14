"use client";
import React from "react";
import { motion } from "framer-motion";
import { CalendarIcon, ArrowRightIcon } from "./icons";
import { useInView } from "./hooks/useInView";

// --- TYPES ---
interface Post {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  imageUrl: string;
  category: string;
}

// --- DATA ---
const postsData: Post[] = [
  {
    id: "b1",
    title:
      "La Importancia de la Limpieza de Casco para la Eficiencia del Combustible",
    excerpt:
      "Descubra cómo un casco limpio no solo mejora la velocidad, sino que también reduce significativamente el consumo de combustible y las emisiones de carbono.",
    date: "15 de Septiembre, 2025",
    imageUrl: "https://picsum.photos/seed/blog1/800/600",
    category: "Eficiencia",
  },
  {
    id: "b2",
    title: "Innovaciones en el Servicio de Lanchaje Portuario",
    excerpt:
      "Analizamos las nuevas tecnologías y procesos que están revolucionando el transporte de personal y carga, garantizando operaciones más rápidas y seguras.",
    date: "02 de Septiembre, 2025",
    imageUrl: "https://picsum.photos/seed/blog2/800/600",
    category: "Innovación",
  },
  {
    id: "b3",
    title: "Seguridad Primero: Protocolos Esenciales en Operaciones Marítimas",
    excerpt:
      "Un repaso a los estándares de seguridad críticos que implementamos en cada operación, desde el buceo comercial hasta el mantenimiento en muelles.",
    date: "28 de Agosto, 2025",
    imageUrl: "https://picsum.photos/seed/blog3/800/600",
    category: "Seguridad",
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

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <motion.article
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-blue-950/60 backdrop-blur-sm border border-white/10 rounded-2xl shadow-lg h-full overflow-hidden flex flex-col group"
    >
      <img
        src={post.imageUrl}
        alt={post.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-center text-sm text-gray-400 mb-3">
          <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-md text-xs font-semibold">
            {post.category}
          </span>
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4" />
            <span>{post.date}</span>
          </div>
        </div>
        <h3 className="font-bold text-xl text-gray-100 mb-2 flex-grow">
          {post.title}
        </h3>
        <p className="text-gray-400 text-sm mb-4">{post.excerpt}</p>
        <a
          href="#"
          className="mt-auto text-blue-400 font-semibold inline-flex items-center gap-2 group-hover:text-blue-300 transition-colors"
        >
          Leer Más
          <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </motion.article>
  );
};

// --- MAIN COMPONENT ---
export default function BlogSection() {
  return (
    <section id="blog" className="py-24 sm:py-32">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <AnimatedDiv>
            <h2 className="text-4xl font-extrabold text-gray-100 sm:text-5xl tracking-tight">
              Visión y Conocimiento Marítimo
            </h2>
          </AnimatedDiv>
          <AnimatedDiv delay={150}>
            <p className="mt-6 text-lg text-gray-300 leading-8">
              Mantente al día con las últimas noticias, innovaciones y análisis
              de la industria directamente de nuestros expertos.
            </p>
          </AnimatedDiv>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {postsData.map((post, index) => (
            <AnimatedDiv key={post.id} delay={index * 150}>
              <PostCard post={post} />
            </AnimatedDiv>
          ))}
        </div>
      </div>
    </section>
  );
}
