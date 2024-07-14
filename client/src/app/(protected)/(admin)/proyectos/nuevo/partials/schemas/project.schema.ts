import { z } from "zod";
import { projectDetailSchema } from "@/app/(protected)/(admin)/proyectos/nuevo/partials/schemas/project-detail.schema";
import { clienteSchema } from "@/app/(protected)/(admin)/proyectos/nuevo/partials/schemas/client.schema";
import { assignationSchema } from "@/app/(protected)/(admin)/proyectos/nuevo/partials/schemas/assignation.schema";

export const projectCompleteSchema = z.object({
  cliente: clienteSchema.optional(),
  project: projectDetailSchema.optional(),
  participantes: assignationSchema.optional(),
});
