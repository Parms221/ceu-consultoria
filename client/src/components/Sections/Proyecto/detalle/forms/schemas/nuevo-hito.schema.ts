import { z } from "zod";

export const hitoSchema = z.object({
    titulo: z.string().min(2).max(50),
  });