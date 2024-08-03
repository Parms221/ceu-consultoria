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
import { useProjectDetail } from "../../contexto/proyecto-detail.context";
import { tareaSchema } from "../schemas";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import SubTareasChecklist from "./partials/sub-tareas";
import { toast } from "sonner";
import SelectEstadoTarea from "./partials/estados";
import useTarea from "@/hooks/Tarea/useTarea";
import SelectParticipantesTarea from "./partials/participantes";

export default function TareaForm() {
  const { updateTarea, getParticipantesDeProyectoQuery } = useTarea();
  const {
    selectedTask,
    tareaForm: form,
    hitoForm,
    appendSubtarea,
    projectId,
    queryClient,
  } = useProjectDetail();
  function saveTarea(values: z.infer<typeof tareaSchema>) {
    const currentTareas = hitoForm.getValues("tareas");
    values.idTarea = crypto.randomUUID();
    if (currentTareas) {
      hitoForm.setValue("tareas", [...currentTareas, values]);
    } else {
      hitoForm.setValue("tareas", [values]);
    }
  }

  async function update(values: z.infer<typeof tareaSchema>) {
    const currentTareas = hitoForm.getValues("tareas");
    if (currentTareas.length > 0) {
      // Editando tareas en memoria (cuando se crea un nuevo hito en el drawer) usando el id temporal
      console.log("Editando tarea en memoria", currentTareas);
      const tareaIndex = currentTareas.findIndex((t) => {
        const id = selectedTask?.idTarea;
        if (id) return t.idTarea === id.toString();
      });
      currentTareas[tareaIndex] = values;
      hitoForm.setValue("tareas", currentTareas);
      toast.success(`Tarea actualizada`);
    } else {
      // Editando tarea en la bd (cuando se seleccione en la tabla de hitos y tareas principal)
      console.log("Editando tarea en la bd", values);
      const idTarea = selectedTask?.idTarea;
      if (idTarea) await updateTarea(values, idTarea);
      queryClient.invalidateQueries({ queryKey: [projectId, "hitos"] });
    }
  }

  async function onSubmit(values: z.infer<typeof tareaSchema>) {
    if (selectedTask) {
      await update(values);
      // Close the modal
      document.getElementById("closeDialog")?.click();
    } else {
      saveTarea(values);
      toast.success(`Tarea guardada`);
    }
    form.reset();
  }

  return (
    <Form {...form}>
      <form
        className="grid grid-cols-3"
        id="tarea-form"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <article className="col-span-2 p-2">
          <div className="space-y-4 [&>div>div>label]:w-[200px]">
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
            <SelectParticipantesTarea />
            <SelectEstadoTarea form={form} />
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
                    <DatePicker mode="single" field={field} useOpenState />
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
                    <DatePicker
                      mode="single"
                      field={field}
                      useOpenState
                      disable={(value) => {
                        const fechaInicio = form.getValues("fechaInicio");
                        if (fechaInicio) {
                          return new Date(value) < new Date(fechaInicio);
                        }
                        return false;
                      }}
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
              onClick={() =>
                appendSubtarea({
                  descripcion: "Nueva subtarea",
                  completado: false,
                })
              }
            >
              <CheckCircle size={18} /> Subtareas
            </Button>
          </div>
          <div>
            <h4>Acciones</h4>
            <Button
              className="w-full"
              size={"sm"}
              form="tarea-form"
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
