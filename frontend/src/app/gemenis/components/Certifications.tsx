import React from "react";
import Image from "next/image";

export default function Certifications() {
  return (
    <section
      id="certificaciones"
      className="bg-gray-100 py-12 border-b-4 border-accent"
    >
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        data-aos="fade-up"
      >
        <h2 className="text-3xl font-extrabold text-primary mb-8">
          Contamos con Certificaciones Internacionales
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-16 mb-6">
          <Image
            src="https://placehold.co/120x60/007FFF/ffffff?text=IWS+ABS"
            alt="Logo IWS ABS"
            width={120}
            height={60}
            className="h-10 sm:h-12 w-auto object-contain shadow-md rounded-lg"
            unoptimized
            data-aos="zoom-in"
            data-aos-delay="200"
          />
          <Image
            src="https://placehold.co/120x60/3CB371/ffffff?text=LLOYD'S"
            alt="Logo Lloyd’s Register"
            width={120}
            height={60}
            className="h-10 sm:h-12 w-auto object-contain shadow-md rounded-lg"
            unoptimized
            data-aos="zoom-in"
            data-aos-delay="400"
          />
          <Image
            src="https://placehold.co/120x60/008080/ffffff?text=BUREAU+VERITAS"
            alt="Logo Bureau Veritas"
            width={120}
            height={60}
            className="h-10 sm:h-12 w-auto object-contain shadow-md rounded-lg"
            unoptimized
            data-aos="zoom-in"
            data-aos-delay="600"
          />
        </div>
        <p
          className="text-xl font-semibold text-accent mt-6"
          data-aos="fade-up"
          data-aos-delay="800"
        >
          ¡SOMOS ÚNICOS EN LA ZONA CON PERMISO DE REPARACIONES SUBACUÁTICAS!
        </p>
      </div>
    </section>
  );
}
