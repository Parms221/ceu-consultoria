"use client";
import useProyecto from "@/hooks/Proyecto/useProyecto";
import { useProjectDetail } from "../../contexto/proyecto-detail.context";
import Loader from "@/components/common/Loader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectCompleteSchema } from "../../../../nuevo/partials/schemas/project.schema";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";
import Objetivos from "./partials/objetivos";
import Participantes from "./partials/participantes";

export default function VistaResumen() {
  const { projectId, projectDetailForm : form } = useProjectDetail();
  const { getProyectoByIdQuery, getBadgeByStatus } = useProyecto();

  const { data, isLoading, isError } = getProyectoByIdQuery(projectId);


  useEffect(() => {
    if(!data) return
    form.reset(
      {
        project: {
          ...data,
          fechaInicio: new Date(data.fechaInicio),
          fechaLimite: new Date(data.fechaLimite),
          title: data.titulo,
          description: data.descripcion,
          servicioId: data.servicio.idServicio,
        },
        cliente: data.cliente,
        participantes: data.participantes?.map((participante) => {
          return {
            idConsultor: participante.consultorParticipante.idConsultor,
          };
        }),
      }
    );
  }, [data, projectId]);

  async function onSubmit(values: z.infer<typeof projectCompleteSchema>) {
    console.log(values);
  }

  if (isLoading) {
    return (
      <div className="h-[100px]">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return <div>Error al cargar detalles del proyecto</div>;
  }

  if (!data) {
    return <div>No se encontraron detalles del proyecto</div>;
  }


  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 [&>div>div>label]:w-[200px]"
      >
       <div className="flex  flex-col-reverse gap-y-4 sm:flex-row justify-between">
        <FormField
            control={form.control}
            name="project.title"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-1.5">
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col justify-center">
            <h3 className="text-xs">Estado de proyecto</h3>
            {getBadgeByStatus(data.estado)}
          </div>
       </div>
        <FormField
          control={form.control}
          name="project.description"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-1.5">
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Participantes participantes={data.participantes ?? []} form={form}/>
        <Objetivos form={form}/>
      </form>
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </Form>
  );
}
