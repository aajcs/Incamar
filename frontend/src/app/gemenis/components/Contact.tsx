import React, { FormEvent } from "react";

type CaptchaState = { num1: number; num2: number; solution: number };

type Props = {
  captcha: CaptchaState;
  captchaError: boolean;
  contactMessage: string;
  handleContactSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

export default function Contact({
  captcha,
  captchaError,
  contactMessage,
  handleContactSubmit,
}: Props) {
  return (
    <section id="contacto" className="py-20 sm:py-24">
      <div
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-2xl shadow-2xl p-8 sm:p-12 border-t-8 border-secondary"
        data-aos="zoom-in-up"
      >
        <h2 className="text-4xl font-extrabold text-primary text-center mb-4">
          Hable con un Experto
        </h2>
        <p className="text-center text-lg text-gray-600 mb-10">
          Para más información, solicitar una inspección o recibir una
          cotización, complete el formulario.
        </p>
        <form
          id="contact-form"
          className="space-y-6"
          onSubmit={handleContactSubmit}
        >
          <input
            type="text"
            name="nombre"
            placeholder="1. Nombre Completo"
            required
            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
          />
          <input
            type="email"
            name="email"
            placeholder="2. Correo Electrónico"
            required
            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
          />
          <input
            type="tel"
            name="telefono"
            placeholder="3. Teléfono (Opcional)"
            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
          />
          <textarea
            name="mensaje"
            rows={4}
            placeholder="5. Mensaje / Detalle del Requerimiento"
            required
            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
          />
          <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg border">
            <label
              htmlFor="captcha-response"
              className="font-medium text-gray-700"
            >
              6. Captcha: {captcha.num1} + {captcha.num2} =
            </label>
            <input
              type="number"
              id="captcha-response"
              name="captcha-response"
              placeholder="Respuesta"
              required
              className={`w-24 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                captchaError ? "border-red-500 ring-red-500" : "border-gray-300"
              }`}
            />
          </div>
          {captchaError && (
            <p className="text-red-600 text-sm">
              Error en el cálculo. Por favor, inténtelo de nuevo.
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-secondary text-white px-6 py-4 text-xl font-bold rounded-xl shadow-lg hover:bg-primary transition duration-300"
          >
            Enviar Solicitud
          </button>
        </form>
        {contactMessage && (
          <p className="text-center mt-6 text-xl font-semibold text-green-600">
            {contactMessage}
          </p>
        )}
      </div>
    </section>
  );
}
