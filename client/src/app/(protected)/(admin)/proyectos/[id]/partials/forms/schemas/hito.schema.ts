import { z } from "zod";
import { tareaSchema } from "./tarea.schema";
import { isBefore } from "date-fns";

export const hitoSchema = z.object({
    idHito: z.string().optional(),
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
        message: "Seleccione un rango de fechas para el inicio y finalización",
        code: z.ZodIssueCode.custom,
         path: ["fechas"],
      })
    }

    if(data.fechas.from && data.fechas.to){
      if(isBefore(data.fechas.to, data.fechas.from)){
        ctx.addIssue({
          message: "La fecha de finalización no puede ser anterior a la de inicio",
          code: z.ZodIssueCode.custom,
          path: ["fechas"],
        })
      }
    }
  });
  