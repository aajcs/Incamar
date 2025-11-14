import React from "react";
import { Button } from "@/shared/ui/atoms/Button";

export default function Hero() {
  return (
    <section className="px-6 pt-16 pb-10 text-center bg-[var(--surface)] border-b border-[var(--border)] rounded-[var(--radius-2)]">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
        Sistema de Gestión Empresarial Incamar
      </h1>
      <p className="mt-3 text-[color:var(--muted)] max-w-2xl mx-auto">
        Optimiza operaciones marítimas, inventario, mantenimiento y finanzas en
        una sola plataforma.
      </p>
      <div className="mt-6 flex items-center justify-center gap-3">
        <Button size="lg">Comenzar</Button>
        <Button variant="ghost" size="lg">
          Ver Demo
        </Button>
      </div>
    </section>
  );
}
