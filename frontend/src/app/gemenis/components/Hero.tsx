import React from "react";

export default function Hero() {
  return (
    <section className="hero-bg py-24 sm:py-32" aria-labelledby="hero-heading">
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        data-aos="fade-down"
        data-aos-duration="1500"
      >
        <h1
          id="hero-heading"
          className="text-5xl sm:text-6xl font-extrabold text-white mb-4 leading-tight"
        >
          Ingeniería y Calidad Marina C.A.
        </h1>
        <p className="text-xl sm:text-2xl text-gray-200 font-light max-w-3xl mx-auto mb-8">
          Soluciones Subacuáticas y Mantenimiento de Clase Mundial
        </p>
        <div className="inline-block px-6 py-2 bg-yellow-400 text-gray-900 font-bold rounded-full shadow-lg mb-10">
          9 AÑOS DE EXPERIENCIA (Octubre de 2012)
        </div>
        <p className="text-lg text-white max-w-4xl mx-auto mb-10">
          Somos un grupo de profesionales con un solo objetivo: aportar nuevos
          conocimientos y desarrollo al área de mantenimiento marino, con ética
          profesional y cultivando la búsqueda continua en la mejora.
        </p>
        <a
          href="#contacto"
          data-aos="zoom-in"
          data-aos-delay="500"
          className="inline-block bg-white text-primary px-10 py-4 text-xl font-bold rounded-xl shadow-2xl transition duration-300 transform hover:scale-105 hover-accent"
        >
          Solicite su Cotización Hoy
        </a>
      </div>
    </section>
  );
}
