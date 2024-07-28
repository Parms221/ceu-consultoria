import { z } from "zod";
import { tareaSchema } from "./tarea.schema";

export const hitoSchema = z.object({
    titulo: z.string().min(2).max(50),
    fechas : z.object(
      {
        from: z.date().optional(),
        to: z.date().optional(),
      },
      {
        required_error: "Seleccione un rango de fechas para el inicio y finalización del hito",
      }
    ),
    tareas: z.array(tareaSchema),
  }).superRefine((data, ctx) => {
    if(data.fechas.from === undefined || data.fechas.to === undefined){
      ctx.addIssue({
        message: "Seleccione un rango de fechas para el inicio y finalización del hito",
        code: z.ZodIssueCode.custom,
         path: ["fechas"],
      })
    }
  });
  