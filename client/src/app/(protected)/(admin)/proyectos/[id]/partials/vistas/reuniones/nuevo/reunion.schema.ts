import { isBefore } from "date-fns";
import { z } from "zod";

export const reunionSchema = z.object({
    idReunion: z.string().optional(),
    titulo: z.string().min(2).max(100),
    descripcion: z.string().optional(),
    fechaInicio: z.date({
      required_error: "La fecha de inicio es requerida",
    }),
    fechaFin: z.date({
      required_error: "La fecha de finalización es requerida",
    }),
    invitados: z.array(
      z.object({
        email : z.string().email(),
        opcional : z.boolean(),
      })
    ),
    enlace: z.string().optional(),
    crearEvento : z.boolean().optional(),
    enviarUpdates : z.boolean().optional(),
  }).superRefine((data, ctx) => {
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
