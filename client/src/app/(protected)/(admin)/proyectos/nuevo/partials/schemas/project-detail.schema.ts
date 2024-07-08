import { z } from "zod";

export const projectDetailSchema = z.object({
  proyectoId: z.number().optional(),
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
  servicioId: z.coerce.number().min(1, { message: "El servicio es requerido" }),
  fechaInicio: z.date({
    required_error: "La fecha de inicio es requerida",
  }),
  fechaLimite: z.date({
    required_error: "La fecha límite es requerida",
  }),
}).superRefine((data, ctx)=> {
  if (data.fechaInicio > data.fechaLimite) {
    ctx.addIssue({
      message: "La fecha de inicio debe ser menor a la fecha límite",
      code: z.ZodIssueCode.custom,
      path: ["fechaInicio"],
    });
  }
});
