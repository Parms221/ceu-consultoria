"use client";
import DatePicker from "@/components/ui/datepicker/date-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  CalendarCheck,
  CheckCircle,
  Link,
  Loader,
  Pen,
  Target,
  User2,
} from "lucide-react";
import { useProjectDetail } from "../../../contexto/proyecto-detail.context";
import { tareaSchema } from "../../schemas/nuevo-hito.schema";
import { z } from "zod";
import { Combobox } from "@/components/ui/combobox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import SubTareasChecklist from "./partials/sub-tareas";
import { useState } from "react";
import { ParticipanteDTO } from "@/types/proyecto/Tarea";
import { toast } from "sonner";

export default function TareaForm() {
  const { selectedTask, tareaForm: form, hitoForm, appendSubtarea } = useProjectDetail();

  const [responsables, setResponsables ] = useState<ParticipanteDTO[]>([])


  async function onSubmit(values: z.infer<typeof tareaSchema>) {
    const currentTareas = hitoForm.getValues("tareas");
    if(currentTareas){
      hitoForm.setValue("tareas", [...currentTareas, values])
    }else {
      hitoForm.setValue("tareas", [values])
    }
    toast.success("Tarea añadida")
    form.reset();
  }

  return (
    <Form {...form}>
    <form className="grid grid-cols-3" 
       id="tarea-form"
       onSubmit={form.handleSubmit(onSubmit)}
    
    >
      <article className="col-span-2 p-2">
          <div
            className="space-y-4 [&>div>div>label]:w-[200px]"
          >
            <FormField
              control={form.control}
              name="titulo"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-1.5">
                    <Target size={24} />
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="participantesAsignados"
              render={({ field }) => (
                <FormItem className="pl-1">
                  <div className="flex items-center gap-1.5">
                    <FormLabel className="flex shrink-0 items-center gap-1 text-sm">
                      <User2 size={14} />
                      Responsable
                    </FormLabel>
                    <Combobox
                      placeholder="Seleccione un responsable"
                      options={[
                        {
                          label: "Consultor 1",
                          value: "1",
                        },
                        {
                          label: "Consultor 2",
                          value: "2",
                        },
                      ]}
                      onSelect={(value) => {
                        const participante = {} as ParticipanteDTO
                        participante.idConsultor = Number(value)
                        if(responsables.find((p) => p.idConsultor === participante.idConsultor) === undefined){
                          setResponsables([...responsables, participante])
                        }
                        field.onChange(responsables);
                      }}
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                      options={[
                        {
                          label: "En progreso",
                          value: "1",
                        },
                        {
                          label: "Terminado",
                          value: "2",
                        },
                      ]}
                      onSelect={(value) => {
                        field.onChange(Number(value));
                      }}
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fechaInicio"
              render={({ field }) => (
                <FormItem className="pl-1">
                  <div className="flex items-center justify-around gap-1.5">
                    <FormLabel className="flex shrink-0 items-center gap-1 text-sm">
                      <Calendar size={14} />
                      Fecha de inicio
                    </FormLabel>
                    <DatePicker field={field} useOpenState />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fechaFin"
              render={({ field }) => (
                <FormItem className="pl-1">
                  <div className="flex items-center gap-1.5">
                    <FormLabel className="flex shrink-0 items-center gap-1 text-sm">
                      <CalendarCheck size={14} />
                      Fecha de finalización
                    </FormLabel>
                    <DatePicker field={field} 
                      useOpenState
                      disable = {
                        (value) => {
                          const fechaInicio = form.getValues("fechaInicio")
                          if(fechaInicio){
                            return new Date(value) < new Date(fechaInicio)
                          }
                          return false
                        }
                      }
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="descripcion"
              render={({ field }) => (
                <FormItem className="pl-1">
                  <div className="flex flex-col items-start gap-1.5">
                    <FormLabel className="flex shrink-0 items-center gap-1 text-sm">
                      <Pen size={14} />
                      Descripción
                    </FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Lista de subtareas checklist */}
            <SubTareasChecklist />
          </div>
      </article>
      <aside className="rounded-md bg-[#EBEBEB] p-2 [&>div]:space-y-1.5">
        <div>
          <h4>Añadir a la tarea</h4>
          <Button
            type="button"
            className="w-full"
            size={"sm"}
            variant={"outline"}
          >
            <Link size={18} /> Adjuntos
          </Button>
          <Button
            type="button"
            className="w-full"
            size={"sm"}
            variant={"outline"}
            onClick={() => appendSubtarea({
              descripcion: "Nueva subtarea",
              completado: false,
            })}
          >
            <CheckCircle size={18} /> Subtareas
          </Button>
        </div>
        <div>
          <h4>Acciones</h4>
          <Button className="w-full" size={"sm"} form="tarea-form"
            type="button"
            onClick={() => form.handleSubmit(onSubmit)()}
          >
            Guardar
          </Button>
          <Button
            type="button"
            className="w-full"
            size={"sm"}
            variant={"destructive"}
          >
            Eliminar
          </Button>
        </div>
      </aside>
    </form>
    </Form>
  );
}