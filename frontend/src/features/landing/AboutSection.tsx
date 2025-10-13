"use client";

export default function AboutSection() {
  return (
    <section id="about" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-4">
          Nuestra Historia y Valores
        </h2>
        <p className="mb-6 text-muted">
          Fundada en octubre de 2012, Ingeniería y Calidad Marina C.A. surgió
          con el objetivo de aplicar nuevos conocimientos al mantenimiento
          marino, priorizando la ética profesional y la mejora continua. Somos
          un equipo de profesionales dedicados a enriquecer y expandir el sector
          de manera innovadora.
        </p>

        <h3 className="text-2xl font-medium mb-3">Conoce a Nuestro Equipo</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <article key={i} className="p-4 border rounded shadow-sm">
              <div className="h-32 bg-gray-200 rounded mb-3" />
              <h4 className="font-semibold">Nombre Ejemplo {i + 1}</h4>
              <p className="text-sm text-muted">Cargo / Especialidad</p>
              <p className="mt-2 text-sm">
                Profesional con experiencia en operaciones marinas y
                mantenimiento.
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
