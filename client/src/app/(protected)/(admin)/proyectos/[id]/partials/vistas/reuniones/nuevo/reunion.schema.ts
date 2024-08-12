import { z } from "zod";

export const reunionSchema = z.object({
    idReunion: z.string().optional(),
    titulo: z.string().min(2).max(100),
    descripcion: z.string().min(2).max(100),
    fechaInicio: z.date({
      required_error: "La fecha de inicio es requerida",
    }),
    fechaFin: z.date({
      required_error: "La fecha de finalización es requerida",
    }),
    participantes: z.array(z.string()).optional(),
    enlace: z.string().url(),
  })
