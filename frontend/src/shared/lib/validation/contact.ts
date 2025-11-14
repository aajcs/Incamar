import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Nombre muy corto"),
  email: z.string().email("Email inválido"),
  message: z.string().min(10, "Mensaje muy corto"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
