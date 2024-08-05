import { isBefore } from "date-fns";
import { z } from "zod";

export const tareaSchema = z
  .object({
    idTarea: z.string().optional().default(crypto.randomUUID()),
    titulo: z.string().min(2).max(100),
    descripcion: z.string().min(2).max(100),
    fechaInicio: z.date({
      required_error: "La fecha de inicio es requerida",
    }),
    fechaFin: z.date({
      required_error: "La fecha de finalización es requerida",
    }),
    estado: z.number(),
    participantesAsignados: z.array(z.string()).optional(),
    subtareas: z
      .array(
        z.object({
          descripcion: z.string().min(2).max(100),
          completado: z.boolean(),
        }),
      )
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.fechaInicio && data.fechaFin) {
      if (isBefore(data.fechaFin, data.fechaInicio)) {
        ctx.addIssue({
          message:
            "La fecha de finalización no puede ser anterior a la de inicio",
          code: z.ZodIssueCode.custom,
          path: ["fechaInicio"],
        });
      }
    }
  });
