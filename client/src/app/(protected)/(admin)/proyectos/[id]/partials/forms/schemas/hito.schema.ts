import { z } from "zod";
import { tareaSchema } from "./tarea.schema";

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
  