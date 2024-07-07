"use client";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { clienteSchema } from "@/app/(protected)/(admin)/proyectos/nuevo/partials/schemas/client.schema";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon, PlusIcon, TrashIcon } from "lucide-react";
import { useProjectForm } from "@/app/(protected)/(admin)/proyectos/nuevo/partials/multi-step-form/context";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { NavigationFooter, Next } from "../multi-step-form/navigation";

// Nueva función Objetivos importada desde tu primer código
function Documentos({
  form,
}: {
  form: UseFormReturn<z.infer<typeof clienteSchema>, any, undefined>;
}) {
  const documentos = form.watch("documentos");

  return (
    <div className={"space-y-3"}>
      <div className={"flex items-center gap-2"}>
        <h3 className="text-xl font-bold text-primary">Documentos Adjuntos</h3>
        <Button
          size={"icon"}
          className={"max-h-7 max-w-7"}
          onClick={() => {
            form.setValue("documentos", [...documentos, ""]);
          }}
        >
          <span className={"sr-only"}>Añadir Objetivo</span>
          <PlusIcon className={"max-h-4 max-w-4"} />
        </Button>
      </div>
      <ul className={"space-y-2"}>
        {documentos.map((obj, index) => (
          <div key={index}>
            <FormField
              control={form.control}
              name={`documentos.${index}`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <div className={"flex gap-2"}>
                    <FormControl>
                      <Input
                        {...field}
                        className={"flex-1"}
                        placeholder={`Objetivo del proyecto ${index + 1}`}
                      />
                    </FormControl>
                    {documentos.length > 1 && (
                      <Button
                        size={"icon"}
                        onClick={() => {
                          form.setValue(
                            "documentos",
                            documentos.filter((_, i) => i !== index),
                          );
                        }}
                      >
                        <span className={"sr-only"}>Eliminar Objetivo</span>
                        <TrashIcon className={"max-h-4 max-w-4"} />
                      </Button>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}
      </ul>
    </div>
  );
}

export default function ProjectFormPage1() {
  const { next, form: formProject } = useProjectForm();

  const formClient = useForm<z.infer<typeof clienteSchema>>({
    resolver: zodResolver(clienteSchema),
    defaultValues: formProject.getValues("cliente") || {
      clientId: 0,
      tipo_documento: "DNI",
      nombre: "",
      apellido: "",
      dni: "",
      telefono: "",
      email: "",
      direccion: "",
      razonSocial: "",
      ruc: "",
      documentos: [""], // Añadir un valor por defecto para objetivos
    },
  });

  async function handleSubmit(data: z.infer<typeof clienteSchema>) {
    const clientId = formClient.getValues("clientId");

    if (clientId == undefined || clientId == 0) {
      const toastId = toast.loading("Guardando cliente...");

      await new Promise((resolve) => setTimeout(resolve, 2000));
      const newClientId = 1;
      data.clientId = newClientId;

      toast.success("Cliente guardado", { id: toastId });
    }
    // TODO: también se debería actualizar la información del cliente en caso haya avanzado a otro página
    // luego regresado

    formProject.setValue(
      "clienteId",
      formClient.getValues("clientId") as number,
    );

    formProject.setValue("cliente", data);

    next();
  }

  return (
    <Form {...formClient}>
      <div className={"space-y-3"}>
        <div className="flex">
          <FormField
            control={formClient.control}
            name="tipo_documento"
            render={({ field, formState }) => (
              <FormItem className="mt-3">
                <h3 className="text-xl font-bold text-primary">Tipo</h3>
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
                <h3 className="text-xl font-bold text-primary">
                  Contacto Teléfono
                </h3>
                <FormControl>
                  <Input {...field} placeholder="Telefono" />
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
                <h3 className="text-xl font-bold text-primary">
                  Correo Electrónico
                </h3>
                <FormControl>
                  <Input {...field} type={"email"} placeholder="Correo" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Documentos form={formClient} />
      </div>
      <NavigationFooter>
        <Next
          disabled={formClient.formState.isSubmitting}
          onClick={() => formClient.handleSubmit(handleSubmit)()}
        />
      </NavigationFooter>
    </Form>
  );
}

function SearchById({
  form,
}: {
  form: UseFormReturn<z.infer<typeof clienteSchema>, any, undefined>;
}) {
  const tipoDocumento = form.watch("tipo_documento");

  const mutation = useMutation({
    mutationFn: async (type: "RUC" | "DNI") => {
      // Simular busqueda en el backend
      await new Promise((resolve) => setTimeout(resolve, 500));
      const newClientId = 1;
      form.setValue("clientId", newClientId);
      form.setValue("tipo_documento", "DNI");
      form.setValue("nombre", "John");
      form.setValue("apellido", "Doe");
      form.setValue("dni", "87654321");
      form.setValue("email", "john@gmail.com");
      form.setValue("telefono", "987654321");
      return "ok";
    },
    mutationKey: ["search", "client"],
  });

  if (tipoDocumento == "DNI") {
    return (
      <div className="flex">
        <FormField
          control={form.control}
          name="dni"
          render={({ field }) => (
            <FormItem className="flex-1">
              <h3 className="text-xl font-bold text-primary">DNI</h3>
              <div className="flex">
                <FormControl>
                  <Input
                    className={"rounded-r-0 flex-1"}
                    {...field}
                    placeholder="DNI del Representate"
                  />
                </FormControl>
                <Button
                  className={"rounded-l-0"}
                  type="button"
                  disabled={mutation.isPending}
                  onClick={() => mutation.mutate("DNI")}
                >
                  Buscar
                </Button>
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
            <h3 className="text-xl font-bold text-primary">RUC</h3>
            <div className="flex">
              <FormControl>
                <Input
                  className={"rounded-r-0 flex-1"}
                  {...field}
                  placeholder="RUC de la Empresa"
                />
              </FormControl>
              <Button
                className={"rounded-l-0"}
                type="button"
                disabled={mutation.isPending}
                onClick={() => mutation.mutate("RUC")}
              >
                Buscar
              </Button>
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
              <h3 className="text-xl font-bold text-primary">Nombres</h3>
              <FormControl>
                <Input {...field} placeholder="Nombre del Representante" />
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
              <h3 className="text-xl font-bold text-primary">Apellidos</h3>
              <FormControl>
                <Input {...field} placeholder="Apellido del Representate" />
              </FormControl>
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
        name="razonSocial"
        render={({ field }) => (
          <FormItem className="flex-1">
            <h3 className="text-xl font-bold text-primary">Razón Social</h3>
            <FormControl>
              <Input {...field} placeholder="Nombre de la Empresa" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
