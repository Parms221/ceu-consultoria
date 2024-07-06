import { z } from "zod";

export const clienteSchema = z
  .object({
    clientId: z.coerce.number().optional(),
    tipo_documento: z.enum(["DNI", "RUC"]),
    nombre: z.string().optional(),
    apellido: z.string().optional(),
    dni: z
      .string()
      .optional()
      .refine((value) => value?.length === 8 || value?.length === 0, {
        message: "El DNI debe tener 8 dígitos",
      }),
    telefono: z
      .string()
      .refine(
        (value) => {
          return value.length === 9 || value.length === 0;
        },
        { message: "El teléfono debe tener 9 dígitos" },
      )
      .optional(),
    email: z
      .string()
      .email({ message: "El correo electrónico no es válido" })
      .optional(),
    direccion: z.string().optional(),
    razonSocial: z.string().optional(),
    ruc: z
      .string()
      .optional()
      .refine((value) => value?.length === 11 || value?.length === 0, {
        message: "El RUC debe tener 11 dígitos",
      }),
    documentos: z.array(z.string()).default([]), // Añadir esta línea
  })
  .superRefine((data, ctx) => {
    if (data.tipo_documento === "DNI") {
      if (!data.nombre) {
        ctx.addIssue({
          message: "El nombre es requerido",
          code: z.ZodIssueCode.custom,
          path: ["nombre"],
        });
      }
      if (!data.apellido) {
        ctx.addIssue({
          message: "El apellido es requerido",
          code: z.ZodIssueCode.custom,
          path: ["apellido"],
        });
      }
      if (!data.dni) {
        ctx.addIssue({
          message: "El DNI es requerido",
          code: z.ZodIssueCode.custom,
          path: ["dni"],
        });
      }
    }
    if (data.tipo_documento === "RUC") {
      if (!data.razonSocial) {
        ctx.addIssue({
          message: "La razón social es requerida",
          code: z.ZodIssueCode.custom,
          path: ["razonSocial"],
        });
      }
      if (!data.ruc) {
        ctx.addIssue({
          message: "El RUC es requerido",
          code: z.ZodIssueCode.custom,
          path: ["ruc"],
        });
      }
    }
  });