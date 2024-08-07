import { z } from "zod";

export const recursoSchema = (esArchivo: boolean) => z.object({
    titulo: esArchivo ? z.string().optional() : z.string({message: "Campo necesario"}),
    tipo: z.string().default("1").refine(value => ["1","2"].includes(value), { message: "Valor incorrecto" }),
    file: esArchivo ? z.instanceof(File) : z.literal(""),
    enlace: esArchivo ? z.any() : z.string({message: "Campo necesario"}).url({message: "Formato de enlace no válido"})
})