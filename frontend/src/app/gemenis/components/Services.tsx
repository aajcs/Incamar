import React from "react";

export default function Services() {
  return (
    <section id="servicios" className="py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="text-4xl font-extrabold text-primary text-center mb-12"
          data-aos="fade-up"
          data-aos-offset="150"
        >
          Nuestros Servicios Especializados
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div
            className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-secondary transition duration-300 hover:shadow-2xl"
            data-aos="fade-right"
            data-aos-offset="150"
          >
            <h3 className="text-2xl font-bold text-primary mb-4">
              Buceo Comercial e Industrial
            </h3>
            <p className="text-gray-600 mb-6">
              Servicios de inspecciones y mantenimiento subacuático con{" "}
              <strong>certificaciones de Clase</strong> (IWS ABS, Lloyd’s,
              Bureau Veritas).
            </p>
            <a
              href="#contacto"
              className="inline-block mt-6 text-secondary hover:text-primary font-semibold transition duration-150"
            >
              Leer Más &rarr;
            </a>
          </div>
          <div
            className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-secondary transition duration-300 hover:shadow-2xl"
            data-aos="fade-left"
            data-aos-offset="150"
          >
            <h3 className="text-2xl font-bold text-primary mb-4">
              Mantenimiento Acuático en Muelles y Estructuras
            </h3>
            <p className="text-gray-600 mb-6">
              Servicios enfocados en asegurar la integridad de su
              infraestructura portuaria.
            </p>
            <a
              href="#contacto"
              className="inline-block mt-6 text-secondary hover:text-primary font-semibold transition duration-150"
            >
              Leer Más &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
