"use client"
import { UseFormReturn } from "react-hook-form";
import { tareaSchema } from "../../schemas";
import { z } from "zod";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader } from "lucide-react";
import { Combobox } from "@/components/ui/combobox";
import { useAppContext } from "@/app/(protected)/app.context";

export default function SelectEstadoTarea({
    form,
  }: {
    form: UseFormReturn<z.infer<typeof tareaSchema>, any, undefined>;
  }) {
    const { estados } = useAppContext()
    return (
        <FormField
        control={form.control}
        name="estado"
        render={({ field }) => (
          <FormItem className="pl-1">
            <div className="flex items-center gap-1.5">
              {/* TODO: traer estados de backend */}
              <FormLabel className="flex shrink-0 items-center gap-1 text-sm">
                <Loader size={14} />
                Estado
              </FormLabel>
              <Combobox
                placeholder="Seleccione un estado"
                value={
                    field.value ? field.value.toString() : ""
                }
                options={
                    estados.filter(e => e.tipo === 2).map((estado) => ({
                        label: estado.descripcion,
                        value: estado.idEstado.toString()
                    })) ?? []
                }
                onSelect={(value) => {
                  field.onChange(Number(value));
                }}
              />
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    );
}