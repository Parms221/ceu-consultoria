import { z } from "zod";

export const tareaSchema = z.object({
    titulo: z.string().min(2).max(50),
    descripcion: z.string().min(2).max(50),
    fechaInicio: z.date({
      required_error: "La fecha de inicio es requerida",
    }),
    fechaFin: z.date({
      required_error: "La fecha de finalización es requerida",
    }),
    estado: z.number(),
    participantesAsignados: z.array(
      z.object({
        idConsultor: z.number(),
      }),
    ).optional(),
    subtareas: z.array(
      z.object({
        descripcion: z.string().min(2).max(50),
        completado: z.boolean(),
      }),
    ).optional(),
  });