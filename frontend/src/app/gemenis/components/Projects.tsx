import React from "react";

export default function Projects() {
  return (
    <section id="proyectos" className="py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="text-4xl font-extrabold text-primary text-center mb-12"
          data-aos="fade-up"
        >
          Proyectos Destacados: Casos de Éxito
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div
            className="project-card rounded-xl shadow-xl"
            style={{
              backgroundImage:
                "url('https://placehold.co/600x400/003366/ffffff?text=INSPECCIÓN+IWS')",
            }}
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="project-overlay">{/* contenido */}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
