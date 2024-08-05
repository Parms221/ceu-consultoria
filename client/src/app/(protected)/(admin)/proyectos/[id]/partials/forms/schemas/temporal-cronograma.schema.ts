import { z } from "zod";
import { hitoSchema } from "./hito.schema";

export const temporalCronogramaSchema = z.object({
    hitos : z.array(
        hitoSchema
    )
})