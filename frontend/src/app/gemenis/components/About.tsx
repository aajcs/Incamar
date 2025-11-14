import React from "react";

export default function About() {
  return (
    <section className="bg-primary text-white py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="text-4xl font-extrabold text-center mb-16"
          data-aos="fade-up"
        >
          Nuestra Identidad
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div
            className="text-center p-6 bg-gray-700 bg-opacity-30 rounded-xl shadow-lg"
            data-aos="zoom-in"
            data-aos-delay="100"
          >
            <h3 className="text-2xl font-bold mb-4 border-b pb-2 border-accent">
              MISIÓN
            </h3>
            <p className="font-light">
              Prestar servicios especializados submarinos competitivos y de alta
              calidad...
            </p>
          </div>
          <div
            className="text-center p-6 bg-gray-700 bg-opacity-30 rounded-xl shadow-lg"
            data-aos="zoom-in"
            data-aos-delay="300"
          >
            <h3 className="text-2xl font-bold mb-4 border-b pb-2 border-accent">
              VISIÓN
            </h3>
            <p className="font-light">
              Consolidarnos como una empresa de servicios submarinos líder en el
              mercado nacional...
            </p>
          </div>
          <div
            className="text-center p-6 bg-gray-700 bg-opacity-30 rounded-xl shadow-lg"
            data-aos="zoom-in"
            data-aos-delay="500"
          >
            <h3 className="text-2xl font-bold mb-4 border-b pb-2 border-accent">
              VALORES
            </h3>
            <p className="font-light">
              Nos destacamos por nuestra{" "}
              <strong>ética empresarial, excelencia</strong> y{" "}
              <strong>sentido de responsabilidad</strong>...
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
