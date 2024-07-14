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
  estado: z.string().optional(),
  participantesAsignados: z.array(
    z.object({
      idParticipante: z.number(),
      createdAt: z.string(),
      consultorParticipante: z.object({
        idConsultor: z.number(),
        nombres: z.string(),
        apellidos: z.string(),
        genero: z.string(),
        cargo: z.string(),
      }),
    }),
  ),
  subTareas: z.array(
    z.object({
      descripcion: z.string().min(2).max(50),
      completado: z.boolean(),
    }),
  ),
});

export const hitoSchema = z.object({
  titulo: z.string().min(2).max(50),
  fechaInicio: z.date({
    required_error: "La fecha de inicio es requerida",
  }),
  fechaFinalizacion: z.date({
    required_error: "La fecha de finalización es requerida",
  }),
  tareas: z.array(tareaSchema),
});
