import { z } from "zod";

export const projectDetailSchema = z.object({
  title: z
    .string()
    .min(3, { message: "El título debe tener al menos 3 caracteres" }),
  description: z
    .string()
    .min(3, { message: "La descripción debe tener al menos 3 caracteres" })
    .optional()
    .or(z.literal("")),
  objetivos: z
    .array(
      z
        .string()
        .min(3, { message: "El objetivo debe tener al menos 3 caracteres" }),
    )
    .min(1, { message: "Debe tener al menos un objetivo" }),
});
