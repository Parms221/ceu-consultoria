"use client";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { clienteSchema } from "@/app/(protected)/(admin)/proy/partials/schemas/client.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { projectCompleteSchema } from "@/app/(protected)/(admin)/proy/partials/schemas/project.schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { useProjectForm } from "@/app/(protected)/(admin)/proy/partials/multi-step-form/context";

export default function ProjectFormPage1() {
  const formClient = useForm<z.infer<typeof clienteSchema>>({
    resolver: zodResolver(clienteSchema),
    defaultValues: {
      tipo_documento: "DNI",
      nombre: "",
      apellido: "",
      dni: "",
      telefono: "",
      email: "",
      direccion: "",
      razonSocial: "",
      ruc: "",
    },
  });

  const { next } = useProjectForm();

  return (
    <Form {...formClient}>
      <div className={"space-y-3"}>
        <div className="flex">
          <FormField
            control={formClient.control}
            name="tipo_documento"
            render={({ field, formState }) => (
              <FormItem className="mt-3">
                <FormLabel>Tipo</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-1"
                  >
                    <FormItem className="flex w-[200px] items-center space-x-3 space-y-0 rounded-md border border-bodydark px-4 py-3">
                      <FormControl>
                        <RadioGroupItem value="DNI" />
                      </FormControl>
                      <FormLabel className="font-normal">Natural</FormLabel>
                    </FormItem>
                    <FormItem className="flex w-[200px] items-center space-x-3 space-y-0 rounded-md border border-bodydark px-4 py-3">
                      <FormControl>
                        <RadioGroupItem value="RUC" />
                      </FormControl>
                      <FormLabel className="font-normal">Jurídico</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <SearchById form={formClient} />
        <PrimaryDetailsByID form={formClient} />

        <div className={"flex gap-3"}>
          <FormField
            control={formClient.control}
            name="telefono"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Teléfono</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formClient.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Correo</FormLabel>
                <FormControl>
                  <Input {...field} type={"email"} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
      <div className="mt-3 flex justify-end border-t border-t-primary pt-3">
        <Button
          type={"button"}
          size={"sm"}
          variant="outline"
          onClick={() => next()}
        >
          Siguiente <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </Form>
  );
}

function SearchById({
  form,
}: {
  form: UseFormReturn<z.infer<typeof clienteSchema>, any, undefined>;
}) {
  const tipoDocumento = form.watch("tipo_documento");

  if (tipoDocumento == "DNI") {
    return (
      <div className="flex">
        <FormField
          control={form.control}
          name="dni"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>DNI</FormLabel>
              <div className="flex">
                <FormControl>
                  <Input className={"rounded-r-0 flex-1"} {...field} />
                </FormControl>
                <Button className={"rounded-l-0"}>Buscar</Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    );
  }

  return (
    <div className="flex">
      <FormField
        control={form.control}
        name="ruc"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>RUC</FormLabel>
            <div className="flex">
              <FormControl>
                <Input className={"rounded-r-0 flex-1"} {...field} />
              </FormControl>
              <Button className={"rounded-l-0"}>Buscar</Button>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

function PrimaryDetailsByID({
  form,
}: {
  form: UseFormReturn<z.infer<typeof clienteSchema>, any, undefined>;
}) {
  const tipoDocumento = form.watch("tipo_documento");
  if (tipoDocumento == "DNI") {
    return (
      <div className={"flex gap-3"}>
        <FormField
          control={form.control}
          name="nombre"
          render={({ field }) => (
            <FormItem className="flex-1">
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
            <FormItem className="flex-1">
              <FormLabel>Apellidos</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    );
  }

  return (
    <div className={"flex gap-3"}>
      <FormField
        control={form.control}
        name="razonSocial"
        render={({ field }) => (
          <FormItem className="flex-1">
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
          <FormItem className="flex-1">
            <FormLabel>Dirección</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
