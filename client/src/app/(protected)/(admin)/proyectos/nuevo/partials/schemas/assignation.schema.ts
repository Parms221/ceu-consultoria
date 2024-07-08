import { z } from "zod";

export const assignationSchema = z.array(
  z.object({
    idConsultor: z.number(),
    nombres: z.string(),
    apellidos: z.string(),
    cargo: z.string(),
  })
)