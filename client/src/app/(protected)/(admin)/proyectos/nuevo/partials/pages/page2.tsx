"use client";

import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectDetailSchema } from "@/app/(protected)/(admin)/proyectos/nuevo/partials/schemas/project-detail.schema";
import { useProjectForm } from "@/app/(protected)/(admin)/proyectos/nuevo/partials/multi-step-form/context";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Check,
  PlusIcon,
  TrashIcon
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetcherLocal } from "@/server/fetch/client-side";
import type { Servicio } from "@/types/servicio";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from "@/components/ui/command";
import { Cross2Icon } from "@radix-ui/react-icons";
import { NavigationFooter, Next, Previous } from "../multi-step-form/navigation";
import DatePicker from "@/components/ui/datepicker/date-picker";
import { toast } from "sonner";
import { createProyectoIncompleto } from "@/services/proyecto";
import { ProyectoIncompletoJsonResponse } from "@/types/proyecto/Response";

export default function ProjectFormPage2() {
  const { next, prev, form: formProject } = useProjectForm();
  // console.log("Valor de cliente anterior: "+formProject.getValues("clienteId"));

  const formProjectDetail = useForm<z.infer<typeof projectDetailSchema>>({
    resolver: zodResolver(projectDetailSchema),
    defaultValues: formProject.getValues("project") || {
      title: "Proyecto 1",
      description: "Descripción de proyecto",
      fechaInicio: new Date(),
      fechaLimite: function() {
        const date = new Date();
        date.setDate(
          new Date().getDate() + 1
        );
        return date;
      }(),
      objetivos: ["Objetivo1"],
      servicioId: 1
    }
  });

  async function handleSubmit(data: z.infer<typeof projectDetailSchema>) {
    const clientId = formProject.getValues("clienteId");
    let res = null as ProyectoIncompletoJsonResponse | null;
    const toastId = toast.loading("Guardando proyecto...");

    res = await createProyectoIncompleto(
      {
        titulo: data.title,
        descripcion: data.description,
        fechaInicio: data.fechaInicio,
        fechaLimite: data.fechaLimite,
        objetivos: data.objetivos.join("\n"),
        servicio: data.servicioId,
        indicaciones: "",
        precio: 100.0,
        requerimientos: "",
        idCliente: clientId
      }, formProjectDetail, toastId);

    if (res) {
      data.proyectoId = res.idProyecto;
      formProject.setValue("project", data);
      next();
    }
  }

  return (
    <Form {...formProjectDetail}>
      <div className="space-y-3">
        <FormField
          control={formProjectDetail.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Título del proyecto</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formProjectDetail.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Descripción del proyecto</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-wrap gap-4">
          <FormField
            control={formProjectDetail.control}
            name="fechaInicio"
            render={({ field }) => (
              <FormItem className="flex-1">
                <div className="flex flex-col gap-2">
                  <FormLabel>Fecha de inicio</FormLabel>
                  <DatePicker field={field} onChange={(date) => {
                    if (!date) {
                      return;
                    }

                    if (date.getTime() > formProjectDetail.getValues("fechaLimite").getTime()) {
                      const dateCopy = date;
                      dateCopy.setDate(
                        date.getDate() + 1
                      );

                      formProjectDetail.setValue("fechaLimite", dateCopy);
                    }

                  }} />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formProjectDetail.control}
            name="fechaLimite"
            render={({ field }) => (
              <FormItem className="flex-1">
                <div className="flex flex-col gap-2">
                  <FormLabel>Fecha Límite</FormLabel>
                  <DatePicker field={field} disable={(date) => {
                    return date.getTime() < formProjectDetail.watch("fechaInicio").getTime();
                  }} />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Objetivos form={formProjectDetail} />
        <SelectServicio form={formProjectDetail} />
      </div>
      <NavigationFooter>
        <Previous onClick={prev} />
        <Next
          disabled={formProjectDetail.formState.isSubmitting}
          onClick={formProjectDetail.handleSubmit(handleSubmit)}
        />
      </NavigationFooter>
    </Form>
  );
}

function Objetivos({
                     form
                   }: {
  form: UseFormReturn<z.infer<typeof projectDetailSchema>, any, undefined>;
}) {
  const objetivos = form.watch("objetivos");

  return (
    <div className={"space-y-3"}>
      <div className={"flex items-center gap-2"}>
        <h3 className="text-xl font-bold text-primary">Objetivos</h3>
        <Button
          size={"icon"}
          className={"max-h-7 max-w-7"}
          onClick={() => {
            form.setValue("objetivos", [...objetivos, ""]);
          }}
        >
          <span className={"sr-only"}>Añadir Objetivo</span>
          <PlusIcon className={"max-h-4 max-w-4"} />
        </Button>
      </div>
      <ul className={"space-y-2"}>
        {objetivos.map((obj, index) => {
          return (
            <div key={index}>
              <FormField
                control={form.control}
                name={`objetivos.${index}`}
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
                      {objetivos.length > 1 && (
                        <Button
                          size={"icon"}
                          onClick={() => {
                            form.setValue(
                              "objetivos",
                              objetivos.filter((_, i) => i !== index)
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
          );
        })}
      </ul>
    </div>
  );
}

function SelectServicio({
                          form
                        }: {
  form: UseFormReturn<z.infer<typeof projectDetailSchema>, any, undefined>;
}) {
  const dataQuery = useQuery<Servicio[]>({
    queryKey: ["servicios"],
    queryFn: async () => {
      const response = await fetcherLocal("/servicios");

      if (!response.ok) {
        throw new Error("Error fetching services");
      }

      return response.json();
    }
  });
  return (
    <div className={"space-y-3"}>
      <h3 className="text-xl font-bold text-primary">Servicio</h3>
      <FormField
        control={form.control}
        name="servicioId"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center gap-3">
            <Popover>
              {dataQuery.isLoading ? (
                <Button
                  variant="ghost"
                  role="combobox"
                  size={"sm"}
                  disabled={true}
                  className={cn("w-full justify-between border border-input")}
                >
                  Cargando...
                </Button>
              ) : dataQuery.isError || !dataQuery.data ? (
                <Button
                  variant="ghost"
                  role="combobox"
                  size={"sm"}
                  disabled={true}
                  className={cn("w-full justify-between border border-input")}
                >
                  Error!!
                </Button>
              ) : (
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="ghost"
                      size={"sm"}
                      role="combobox"
                      className={cn(
                        "w-full justify-between border border-input",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? (function() {
                          const servicio = dataQuery.data.find(
                            (servicio) => servicio.idServicio === field.value
                          );

                          if (servicio) {
                            return servicio.titulo;
                          }

                          return "algo";
                        })()
                        : "Selecciona un servicio"}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
              )}
              <PopoverContent className="w-[200px] p-0" align={"start"}>
                <Command>
                  <CommandInput placeholder="Buscar servicio..." />
                  <CommandEmpty>Servicio no encontrado</CommandEmpty>
                  <CommandGroup>
                    {dataQuery.data && dataQuery.data.length == 0 ? (
                      <CommandItem value={String(0)} key={0}>
                        No hay servicios
                      </CommandItem>
                    ) : (
                      dataQuery.data?.map((servicio) => (
                        <CommandItem
                          value={String(servicio.idServicio)}
                          key={servicio.titulo}
                          onSelect={() => {
                            form.setValue("servicioId", servicio.idServicio);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              servicio.idServicio === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {servicio.titulo}
                        </CommandItem>
                      ))
                    )}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            {field.value != 0 && (
              <Button
                type={"button"}
                variant={"ghost"}
                className={"h-6 w-6 p-0"}
                onClick={() => {
                  field.onChange(0);
                }}
              >
                <Cross2Icon className={"h-4"} />
              </Button>
            )}

            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
