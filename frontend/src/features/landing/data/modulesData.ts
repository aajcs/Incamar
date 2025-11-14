export type ModuleDef = { title: string; items: string[] };

export const modules: ModuleDef[] = [
  {
    title: "Usuarios y Roles",
    items: ["Perfiles", "Roles y permisos", "Auditoría básica"],
  },
  {
    title: "Administración",
    items: ["Bancos y conciliación", "CxC/CxP", "Reportes"],
  },
  {
    title: "Facturación y Compras",
    items: ["Facturas", "Órdenes de compra", "Pagos"],
  },
  {
    title: "Embarcaciones",
    items: ["Registro detallado", "Componentes", "Historial"],
  },
  {
    title: "Inventario",
    items: ["Artículos", "Stock en tiempo real", "Alertas"],
  },
  {
    title: "Mantenimiento",
    items: ["Órdenes de servicio", "Integración con inventario", "Historial"],
  },
  {
    title: "Operaciones",
    items: ["Boletas de servicio", "Horas de uso", "Consumibles"],
  },
  {
    title: "Recursos Humanos",
    items: ["Personal", "Asistencias", "Vacaciones"],
  },
  {
    title: "Certificados",
    items: ["Repositorio", "Requerimientos", "Alertas"],
  },
  { title: "Buceo", items: ["Operaciones", "Horas de buceo", "Equipo"] },
];
