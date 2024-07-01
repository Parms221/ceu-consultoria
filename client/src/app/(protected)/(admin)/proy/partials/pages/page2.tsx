"use client";

import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectDetailSchema } from "@/app/(protected)/(admin)/proy/partials/schemas/project-detail.schema";
import { useProjectForm } from "@/app/(protected)/(admin)/proy/partials/multi-step-form/context";
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

export default function ProjectFormPage2() {
  const { next, form: formProject } = useProjectForm();

  const formProjectDetail = useForm<z.infer<typeof projectDetailSchema>>({
    resolver: zodResolver(projectDetailSchema),
    defaultValues: formProject.getValues("project") || {
      title: "",
      description: "",
      objetivos: [""],
    },
  });

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
        <Objetivos form={formProjectDetail} />
      </div>
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
            <div>
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
