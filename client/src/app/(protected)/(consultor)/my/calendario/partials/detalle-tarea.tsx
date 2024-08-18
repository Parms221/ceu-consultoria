"use client";
import SelectEstadoTarea from "@/app/(protected)/(admin)/proyectos/[id]/partials/forms/Tareas/partials/estados";
import SelectParticipantesTarea from "@/app/(protected)/(admin)/proyectos/[id]/partials/forms/Tareas/partials/participantes";
import SubTareasChecklist from "@/app/(protected)/(admin)/proyectos/[id]/partials/forms/Tareas/partials/sub-tareas";
import DatePicker from "@/components/ui/datepicker/date-picker";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTareaForm } from "@/hooks/Tarea/useTareaForm.context";
import { Calendar, CalendarCheck, Pen, Target } from "lucide-react";

export default function CalendarDetalleTarea(){
    const { tareaForm : form } = useTareaForm();
    return (
    <Form {...form}>
      <form
        className="grid"
        id="tarea-form"
      >
        <article className="p-2">
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
            {/* <SelectParticipantesTarea /> */}
            <SelectEstadoTarea />
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
      </form>
    </Form>
    )
}