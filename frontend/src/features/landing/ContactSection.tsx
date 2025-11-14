"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPinIcon, MailIcon, PhoneIcon, ChevronDownIcon } from "./icons";
import { useInView } from "./hooks/useInView";

// --- TYPES ---
interface FAQ {
  q: string;
  a: string;
}

// --- DATA ---
const faqs: FAQ[] = [
  {
    q: "¿Qué certificaciones de seguridad poseen?",
    a: "Contamos con certificaciones de reconocimiento internacional como IWS ABS, Lloyd's Register y Bureau Veritas, asegurando los más altos estándares en cada operación.",
  },
  {
    q: "¿Cuál es su área de cobertura geográfica?",
    a: "Ofrecemos nuestros servicios en todos los puertos principales de Venezuela y tenemos capacidad para movilizarnos a nivel internacional según los requerimientos del proyecto.",
  },
  {
    q: "¿Cómo puedo solicitar una cotización para un servicio?",
    a: "Puede completar el formulario de contacto en esta página, enviarnos un correo electrónico o llamarnos directamente. Nuestro equipo técnico evaluará su solicitud y le responderá a la brevedad.",
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

const AccordionItem: React.FC<{
  faq: FAQ;
  isOpen: boolean;
  onClick: () => void;
}> = ({ faq, isOpen, onClick }) => {
  return (
    <div className="border-b border-white/10">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center py-4 text-left text-gray-200 hover:text-white transition-colors"
      >
        <span className="font-semibold">{faq.q}</span>
        <ChevronDownIcon
          className={`w-5 h-5 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-gray-400">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- MAIN COMPONENT ---
export default function ContactSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section id="contact" className="py-24 sm:py-32 bg-[#0d2a4c]">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <AnimatedDiv>
            <h2 className="text-4xl font-extrabold text-gray-100 sm:text-5xl tracking-tight">
              Ponte en Contacto
            </h2>
          </AnimatedDiv>
          <AnimatedDiv delay={150}>
            <p className="mt-6 text-lg text-gray-300 leading-8">
              ¿Listo para empezar un proyecto o tienes alguna pregunta? Nuestro
              equipo está aquí para ayudarte.
            </p>
          </AnimatedDiv>
        </div>

        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <AnimatedDiv delay={300}>
            <h3 className="text-2xl font-bold text-white mb-6">
              Información Directa
            </h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPinIcon className="w-6 h-6 text-blue-400 mt-1" />
                <div>
                  <h4 className="text-lg font-semibold text-gray-200">
                    Oficina Principal
                  </h4>
                  <p className="text-gray-400">
                    Avenida Principal, Puerto La Cruz, Anzoátegui, Venezuela
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MailIcon className="w-6 h-6 text-blue-400 mt-1" />
                <div>
                  <h4 className="text-lg font-semibold text-gray-200">
                    Correo Electrónico
                  </h4>
                  <p className="text-gray-400 hover:text-blue-400 transition-colors">
                    <a href="mailto:info@icmarina.com">info@icmarina.com</a>
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <PhoneIcon className="w-6 h-6 text-blue-400 mt-1" />
                <div>
                  <h4 className="text-lg font-semibold text-gray-200">
                    Teléfono
                  </h4>
                  <p className="text-gray-400">+58 281-555-0101</p>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mt-12 mb-4">
              Preguntas Frecuentes
            </h3>
            <div className="space-y-2">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  faq={faq}
                  isOpen={openFaq === i}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                />
              ))}
            </div>
          </AnimatedDiv>
          <AnimatedDiv delay={450}>
            <div className="p-8 bg-blue-950/60 backdrop-blur-sm border border-white/10 rounded-2xl shadow-lg">
              <form action="#" method="POST" className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="mt-1 block w-full bg-blue-900/50 border border-white/20 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 block w-full bg-blue-900/50 border border-white/20 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="mt-1 block w-full bg-blue-900/50 border border-white/20 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    Enviar Mensaje
                  </button>
                </div>
              </form>
            </div>
          </AnimatedDiv>
        </div>
      </div>
    </section>
  );
}
