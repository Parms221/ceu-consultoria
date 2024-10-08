"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  createClienteJuridico,
  createClienteNatural,
  udpateClienteJuridico,
  udpateClienteNatural,
} from "@/actions/Cliente";
import { Cliente } from "@/types/cliente";

type Props = {
  cliente?: Cliente;
};
export default function ClienteForm({ cliente = undefined }: Props) {
  const formSchema = z
    .object({
      tipo_documento: z.string().regex(/DNI|RUC/),
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
    })
    .superRefine((data, ctx) => {
      if (data.tipo_documento === "DNI") {
        console.log("nombre", data.nombre);
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      tipo_documento: cliente ? cliente.tipo_documento : "DNI",
      nombre: cliente && cliente.tipo_documento == "DNI" ? cliente.nombre : "",
      apellido:
        cliente && cliente.tipo_documento == "DNI" ? cliente.apellido : "",
      dni: cliente && cliente.tipo_documento == "DNI" ? cliente.dni : "",
      telefono: cliente ? cliente.telefono : "",
      email: cliente ? cliente.email : "",
      direccion:
        cliente && cliente.tipo_documento == "RUC" ? cliente.direccion : "",
      razonSocial:
        cliente && cliente.tipo_documento == "RUC" ? cliente.razonSocial : "",
      ruc: cliente && cliente.tipo_documento == "RUC" ? cliente.ruc : "",
    },
  });
  const watch = form.watch();

  const resetearAlCambiarDocumento = (tipo_documento: string) => {
    if (tipo_documento === "DNI") {
      form.setValue("razonSocial", "");
      form.setValue("ruc", "");
      form.setValue("direccion", "");
    } else {
      form.setValue("nombre", "");
      form.setValue("apellido", "");
      form.setValue("dni", "");
    }
  };
  const dialogClose = () => {
    document.getElementById("closeDialog")?.click();
  };
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const tipo_documento = values.tipo_documento;
      let res = undefined;
      if (tipo_documento === "RUC") {
        if (cliente) {
          res = await udpateClienteJuridico({
            idCliente: cliente.idCliente,
            tipo_documento: values.tipo_documento,
            ruc: values.ruc!,
            razonSocial: values.razonSocial!,
            direccion: values.direccion!,
            email: values.email!,
            telefono: values.telefono!,
          });
        } else {
          res = await createClienteJuridico({
            tipo_documento: values.tipo_documento,
            ruc: values.ruc!,
            razonSocial: values.razonSocial!,
            direccion: values.direccion!,
            email: values.email!,
            telefono: values.telefono!,
          });
        }
      } else {
        if (cliente) {
          res = await udpateClienteNatural({
            idCliente: cliente.idCliente,
            tipo_documento: values.tipo_documento,
            dni: values.dni!,
            nombre: values.nombre!,
            apellido: values.apellido!,
            email: values.email!,
            telefono: values.telefono!,
          });
        } else {
          res = await createClienteNatural({
            tipo_documento: values.tipo_documento,
            dni: values.dni!,
            nombre: values.nombre!,
            apellido: values.apellido!,
            email: values.email!,
            telefono: values.telefono!,
          });
        }
      }
      if (res.status === "success") {
        toast.success(res.message);
        dialogClose();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al crear cliente");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-2 md:grid-cols-2"
      >
        <FormField
          control={form.control}
          name="tipo_documento"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo De Documento</FormLabel>
              <Select
                disabled={cliente ? true : false}
                name="tipo_documento"
                onValueChange={(e) => {
                  field.onChange(e);
                  resetearAlCambiarDocumento(e);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un tipo de documento" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="RUC">RUC</SelectItem>
                  <SelectItem value="DNI">DNI</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {watch.tipo_documento === "DNI" && (
          <>
            <FormField
              control={form.control}
              name="dni"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>DNI</FormLabel>
                  <FormControl>
                    <Input maxLength={8} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="apellido"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellido</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {watch.tipo_documento === "RUC" && (
          <>
            <FormField
              control={form.control}
              name="ruc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RUC</FormLabel>
                  <FormControl>
                    <Input maxLength={11} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="razonSocial"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Razón Social</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="direccion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Direccion</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo Electrónico</FormLabel>
              <FormControl>
                <Input placeholder="example@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="telefono"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefono</FormLabel>
              <FormControl>
                <Input maxLength={9} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter className="col-span-full mt-4 flex justify-end gap-4">
          <Button type="submit">Guardar</Button>
          <DialogClose
            id="closeDialog"
            className="h-full rounded-md border px-4 py-2.5 hover:bg-neutral-300"
          >
            Cancelar
          </DialogClose>
        </DialogFooter>
      </form>
    </Form>
  );
}
