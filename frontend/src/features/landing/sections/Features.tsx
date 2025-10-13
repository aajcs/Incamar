import React from "react";
import { Card } from "@/shared/ui/molecules/Card";

const features = [
  {
    title: "Usuarios y Roles",
    desc: "Control de acceso granular para cada módulo.",
    icon: "pi pi-shield",
  },
  {
    title: "Inventario",
    desc: "Stock en tiempo real y alertas automáticas.",
    icon: "pi pi-box",
  },
  {
    title: "Mantenimiento",
    desc: "Órdenes de servicio y planificación preventiva.",
    icon: "pi pi-wrench",
  },
  {
    title: "Finanzas",
    desc: "Cuentas por pagar/cobrar y reportes avanzados.",
    icon: "pi pi-chart-line",
  },
  {
    title: "Operaciones",
    desc: "Boletas de servicio y control de consumibles.",
    icon: "pi pi-compass",
  },
  {
    title: "Certificados",
    desc: "Alertas de vencimientos y repositorio digital.",
    icon: "pi pi-calendar-times",
  },
];

export default function Features() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((f) => (
        <Card
          key={f.title}
          title={
            <div className="flex items-center gap-2">
              <i className={`${f.icon} text-[var(--primary)]`} />
              {f.title}
            </div>
          }
        >
          <p>{f.desc}</p>
        </Card>
      ))}
    </section>
  );
}
