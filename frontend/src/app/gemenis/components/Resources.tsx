import React, { FormEvent } from "react";

type Props = {
  handleCatalogSubmit: (e: FormEvent<HTMLFormElement>) => void;
  catalogMessage: string;
};

export default function Resources({
  handleCatalogSubmit,
  catalogMessage,
}: Props) {
  return (
    <section id="recursos" className="bg-gray-100 py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="text-4xl font-extrabold text-primary text-center mb-12"
          data-aos="fade-up"
        >
          Recursos y Actualizaciones
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div
            className="bg-white rounded-2xl shadow-lg p-8"
            data-aos="fade-right"
          >
            {/* Blog placeholder */}
          </div>
          <div
            className="bg-primary text-white rounded-2xl shadow-lg p-8"
            data-aos="fade-left"
          >
            <h3 className="text-2xl font-bold mb-4 border-b pb-2 border-accent">
              Descarga Nuestro Catálogo de Servicios
            </h3>
            <form
              id="catalog-form"
              className="space-y-4"
              onSubmit={handleCatalogSubmit}
            >
              <input
                type="text"
                name="name"
                placeholder="Nombre"
                required
                className="w-full px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <input
                type="email"
                name="email"
                placeholder="Correo Electrónico"
                required
                className="w-full px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                type="submit"
                className="w-full bg-accent text-white px-6 py-3 font-bold rounded-lg shadow-md hover:bg-red-700 transition"
              >
                Descargar Catálogo
              </button>
            </form>
            {catalogMessage && (
              <p className="mt-4 text-center text-sm text-gray-300">
                {catalogMessage}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
