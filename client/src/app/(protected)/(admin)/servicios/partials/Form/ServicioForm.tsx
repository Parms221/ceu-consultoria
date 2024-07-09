"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
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
import { toast } from "sonner";
import { createServicio, udpateServicio } from "@/actions/Servicio";
import { Entregable, Servicio } from "@/types/servicio";
import { Textarea } from "@/components/ui/textarea";
import { PlusIcon, Trash2Icon } from "lucide-react";

type Props = {
  servicio?: Servicio;
};
export default function ServicioForm({ servicio = undefined }: Props) {
  const formSchema = z.object({
    titulo: z.string({
      message: "El título es requerido",
    }),
    descripcion: z.string({
      message: "La descripción es requerida",
    }),
    entregablesDelServicio: z
      .array(
        z.object({
          titulo: z.string({
            message: "El título del entregable es requerido",
          }),
        }),
      )
      .min(1, "Debes agregar al menos un entregable"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      titulo: servicio ? servicio.titulo : "",
      descripcion: servicio ? servicio.descripcion : "",
      entregablesDelServicio: servicio ? servicio.entregablesDelServicio : [] as Entregable[],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "entregablesDelServicio",
  });
  const dialogClose = () => {
    document.getElementById("closeDialog")?.click();
  };
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      let res = undefined;
      if (servicio) {
        res = await udpateServicio({
          ...servicio,
          ...values,
        });
      } else {
        res = await createServicio(values);
      }

      if (res.status === "success") {
        toast.success(res.message);
        dialogClose();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al crear servicio");
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
          name="titulo"
          render={({ field }) => (
            <FormItem className="col-span-full">
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="descripcion"
          render={({ field }) => (
            <FormItem className="col-span-full">
              <FormLabel>Descripcion</FormLabel>
              <FormControl>
                <Textarea className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="col-span-full flex items-center gap-5 ">
          <h3 className="text-lg">Lista de Entregables</h3>
          <Button
            type="button"
            className="h-8"
            size={"icon"}
            onClick={() => {
              append({ titulo: "" });
            }}
          >
            <PlusIcon size={16} />
          </Button>
        </div>

        {fields.map((field, index) => (
          <div key={field.id} className="col-span-full">
            <FormField
              control={form.control}
              name={`entregablesDelServicio.${index}.titulo`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input maxLength={100} {...field} />
                      <Button
                        className="h-8"
                        size={"icon"}
                        type="button"
                        onClick={() => {
                          remove(index);
                        }}
                      >
                        <Trash2Icon size={16} />
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}
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
