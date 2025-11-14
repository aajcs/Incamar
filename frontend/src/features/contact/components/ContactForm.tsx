"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactSchema,
  type ContactFormData,
} from "@/shared/lib/validation/contact";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button as PButton } from "primereact/button";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactFormData) => {
    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setSubmitted(true);
      reset();
    }
  };

  if (submitted) {
    return (
      <div className="p-6 border rounded">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-lg font-semibold">Mensaje enviado</h3>
          <p>Gracias. Nuestro equipo te contactará pronto.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm">Nombre</label>
        <InputText
          {...register("name")}
          className={`w-full ${errors.name ? "border-red-400" : ""}`}
        />
        {errors.name && (
          <span className="text-xs text-red-500">{errors.name.message}</span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm">Email</label>
        <InputText
          type="email"
          {...register("email")}
          className={`w-full ${errors.email ? "border-red-400" : ""}`}
        />
        {errors.email && (
          <span className="text-xs text-red-500">{errors.email.message}</span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm">Mensaje</label>
        <InputTextarea
          rows={5}
          autoResize
          {...register("message")}
          className={`w-full ${errors.message ? "border-red-400" : ""}`}
        />
        {errors.message && (
          <span className="text-xs text-red-500">{errors.message.message}</span>
        )}
      </div>
      <div className="flex items-center gap-3">
        <PButton
          type="submit"
          label={isSubmitting ? "Enviando..." : "Enviar"}
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 h-10 px-4 rounded-[var(--radius-2)] bg-[var(--primary)] text-[var(--primary-contrast)] hover:brightness-95"
        />
      </div>
    </form>
  );
}
