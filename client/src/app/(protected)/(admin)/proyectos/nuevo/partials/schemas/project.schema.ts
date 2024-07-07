import { z } from "zod";
import { projectDetailSchema } from "@/app/(protected)/(admin)/proyectos/nuevo/partials/schemas/project-detail.schema";
import { clienteSchema } from "@/app/(protected)/(admin)/proyectos/nuevo/partials/schemas/client.schema";

export const projectCompleteSchema = z.object({
  clienteId: z.number().positive({ message: "El cliente es requerido" }),
  cliente: clienteSchema.optional(),
  project: projectDetailSchema,
});
