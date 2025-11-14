import React from "react";
import { Button } from "@/shared/ui/atoms/Button";

export default function CTA() {
  return (
    <section className="text-center py-10">
      <h2 className="text-2xl font-semibold">¿Listo para comenzar?</h2>
      <p className="mt-2 text-[color:var(--muted)]">
        Crea tu cuenta y acelera la digitalización de Incamar.
      </p>
      <div className="mt-5 flex items-center justify-center gap-3">
        <Button size="lg">Crear cuenta</Button>
        <Button variant="ghost" size="lg">
          Contactar ventas
        </Button>
      </div>
    </section>
  );
}
