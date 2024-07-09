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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon, PlusIcon, TrashIcon } from "lucide-react";
import { useProjectForm } from "@/app/(protected)/(admin)/proyectos/nuevo/partials/multi-step-form/context";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { fetcherLocal } from "@/server/fetch/client-side";
import { Cliente } from "@/types/cliente";
import { NavigationFooter, Next } from "../multi-step-form/navigation";
import { createClienteNatural, createClienteJuridico } from "@/services/cliente";

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
        <FormLabel className="text-xl font-bold text-primary">
          Documentos Adjuntos
        </FormLabel>
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
  const { currentStep, next, form: formProject } = useProjectForm();

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
    const tipo_documento = data.tipo_documento;
    let res = false;
    const toastId = toast.loading("Guardando cliente...", {position: "top-center",});

    if (tipo_documento === "RUC") {
        res = await createClienteJuridico({
          tipo_documento: data.tipo_documento,
          ruc: data.ruc!,
          razonSocial: data.razonSocial!,
          direccion: data.direccion!,
          email: data.email!,
          telefono: data.telefono!,
        }, formClient, toastId);
    } else {
        res = await createClienteNatural({
          tipo_documento: data.tipo_documento,
          dni: data.dni!,
          nombre: data.nombre!,
          apellido: data.apellido!,
          email: data.email!,
          telefono: data.telefono!,
        }, formClient, toastId);
    }

    if (res) {
      next();
    }

    
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
                <FormLabel className="text-xl font-bold text-primary">
                  Tipo
                </FormLabel>
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
                <FormLabel className="text-xl font-bold text-primary">
                  Contacto Teléfono
                </FormLabel>
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
                <FormLabel className="text-xl font-bold text-primary">
                  Correo Electrónico
                </FormLabel>
                <FormControl>
                  <Input {...field} type={"email"} />
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
    mutationFn: async ({
      type,
      value,
    }: {
      type: "RUC" | "DNI";
      value: string;
    }) => {
      const toastId = toast.loading("Buscando cliente...");
      const response = await fetcherLocal(
        `/clientes/get?type=${type.toLowerCase()}&value=${value}`,
      );

      if (!response.ok) {
        toast.error("Cliente no encontrado", { id: toastId });
        form.setError(type.toLowerCase() as "dni" | "ruc", {
          message: "Cliente no encontrado",
        });
      }

      const cliente: Cliente = await response.json();

      const newClientId = cliente.idCliente;
      form.setValue("clientId", newClientId);
      form.setValue("tipo_documento", type);
      if (cliente.tipo_documento == "DNI") {
        form.setValue("nombre", cliente.nombre);
        form.setValue("apellido", cliente.apellido);
      } else {
        form.setValue("razonSocial", cliente.razonSocial);
        form.setValue("direccion", cliente.direccion);
      }

      form.setValue("email", cliente.email);
      form.setValue("telefono", cliente.telefono);
      toast.success("Cliente encontrado", { id: toastId });
      form.clearErrors(type.toLowerCase() as "dni" | "ruc");
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
              <FormLabel className="text-xl font-bold text-primary">
                DNI
              </FormLabel>
              <div className="flex">
                <FormControl>
                  <Input className={"rounded-r-0 flex-1"} {...field} />
                </FormControl>
                <Button
                  className={"rounded-l-0"}
                  type="button"
                  disabled={mutation.isPending}
                  onClick={() =>
                    mutation.mutate({
                      type: "DNI",
                      value: field.value as string,
                    })
                  }
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
            <FormLabel className="text-xl font-bold text-primary">
              RUC
            </FormLabel>
            <div className="flex">
              <FormControl>
                <Input className={"rounded-r-0 flex-1"} {...field} />
              </FormControl>
              <Button
                className={"rounded-l-0"}
                type="button"
                disabled={mutation.isPending}
                onClick={() =>
                  mutation.mutate({ type: "RUC", value: field.value as string })
                }
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
              <FormLabel className="text-xl font-bold text-primary">
                Nombres
              </FormLabel>
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
              <FormLabel className="text-xl font-bold text-primary">
                Apellidos
              </FormLabel>
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
    <div className="flex gap-3">
      <FormField
        control={form.control}
        name="razonSocial"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel className="text-xl font-bold text-primary">
              Razón Social
            </FormLabel>
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
            <FormLabel className="text-xl font-bold text-primary">
              Razón Social
            </FormLabel>
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
