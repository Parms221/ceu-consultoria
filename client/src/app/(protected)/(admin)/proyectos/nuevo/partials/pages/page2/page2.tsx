"use client";
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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PlusIcon, TrashIcon } from "lucide-react";
import {
  NavigationFooter,
  Next,
  Previous,
} from "../../multi-step-form/navigation";
import DatePicker from "@/components/ui/datepicker/date-picker";
import { toast } from "sonner";
import { createProyectoIncompleto } from "@/services/proyecto";
import { ProyectoIncompletoJsonResponse } from "@/types/proyecto/Response";
import SelectServicio from "./select-servicio";
import { useForm, UseFormReturn } from "react-hook-form";
import { formatTime } from "@/lib/utils";
import { isBefore, startOfDay } from "date-fns";
import TimeInput from "@/components/ui/input-time";

export default function ProjectFormPage2() {
  const { next, prev, form: formProject } = useProjectForm();
  // console.log("Valor de cliente anterior: "+formProject.getValues("clienteId"));

  const formProjectDetail = useForm<z.infer<typeof projectDetailSchema>>({
    resolver: zodResolver(projectDetailSchema),
    defaultValues: formProject.getValues("project") || {
      title: "Proyecto 1",
      description: "Descripción de proyecto",
      fechaInicio: new Date(),
      fechaLimite: (function () {
        const date = new Date();
        date.setDate(new Date().getDate() + 1);
        return date;
      })(),
      objetivos: ["Objetivo1"],
      servicioId: 1,
    },
  });

  async function handleSubmit(data: z.infer<typeof projectDetailSchema>) {
    const clientId = formProject.getValues("cliente.clientId");
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
        hitos: data.hitos.map(hito => ({
          titulo: hito.titulo,
          fechaInicio: hito.fechas.from!,
          fechaFinalizacion: hito.fechas.to!,
          tareas: []
        })),
        indicaciones: "",
        precio: 100.0,
        requerimientos: "",
        idCliente: clientId as number,
      },
      formProjectDetail,
      toastId,
    );

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
                  <div className="flex gap-0.5">
                    <DatePicker
                        mode="single"
                        field={field}
                        disable={(date) => isBefore(startOfDay(date), startOfDay(new Date()))}
                        onChange={(date) => {
                          if (!date || date instanceof Date === false) {
                            return;
                          }

                          if (
                            date.getTime() >
                            formProjectDetail.getValues("fechaLimite").getTime()
                          ) {
                            const dateCopy = date;
                            dateCopy.setDate(date.getDate() + 1);

                            formProjectDetail.setValue("fechaLimite", dateCopy);
                          }
                        }}
                      />
                          <TimeInput {...field} className="w-fit px-0.5 py-0"/>
                  </div>
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
                  <div className="flex gap-0.5">
                    <DatePicker
                        mode="single"
                        field={field}
                        disable={(date) => {
                          return (
                            date.getTime() <
                            formProjectDetail.watch("fechaInicio").getTime()
                          );
                        }}
                      />
                      <TimeInput
                        className="w-fit px-0.5 py-0"
                        {...field}
                      />
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <SelectServicio form={formProjectDetail} />
        <Objetivos form={formProjectDetail} />
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
  form,
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
                              objetivos.filter((_, i) => i !== index),
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

