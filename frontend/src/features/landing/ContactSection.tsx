"use client";
import ContactForm from "@/features/contact/components/ContactForm";
import { useState } from "react";

const faqs = [
  {
    q: "¿Qué certificaciones tienen?",
    a: "Contamos con certificaciones de IWS ABS, Lloyd's y Bureau Veritas.",
  },
  {
    q: "¿Cuál es el tiempo de respuesta?",
    a: "Dependiendo del servicio, típicamente entre 24-72 horas para evaluación.",
  },
  {
    q: "¿Ofrecen contratos anuales?",
    a: "Sí, ofrecemos contratos de mantenimiento personalizados.",
  },
];

export default function ContactSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section
      id="contact"
      className="py-16 bg-[color-mix(in_oklab,var(--fg)2%,transparent)]"
    >
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-3xl font-semibold mb-4">Contáctanos</h2>
          <p className="mb-4">
            Para más información sobre nuestros servicios o para recibir una
            cotización, completa el formulario.
          </p>
          <div className="mt-6">
            <h3 className="text-xl font-medium mb-2">Preguntas Frecuentes</h3>
            <div className="space-y-2">
              {faqs.map((f, i) => (
                <details
                  key={i}
                  open={open === i}
                  onClick={() => setOpen(open === i ? null : i)}
                  className="p-3 border rounded"
                >
                  <summary className="font-medium">{f.q}</summary>
                  <p className="mt-2 text-sm">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>

        <div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
