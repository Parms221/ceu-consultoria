"use client";
import { useProjectDetail } from "../../contexto/proyecto-detail.context";
import { hitoSchema } from "../../forms/schemas";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DrawerClose, DrawerFooter } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Calendar, CalendarCheck, Target } from "lucide-react";
import DatePicker from "@/components/ui/datepicker/date-picker";
import { HitosTable } from "../../vistas/lista/DataTable/data-table";
import { tareasColumns } from "../Tareas/columns";
import NewTaskModal from "../Tareas";
import { Tarea, TareaDTO } from "@/types/proyecto/Tarea";
import { useQueryClient } from "@tanstack/react-query";
import useHito from "@/hooks/Hito/useHito";

export default function HitoForm(
) {
    const { selectedHito, projectId, hitoForm : form, resetForms, queryClient } = useProjectDetail()
    const { saveHito } = useHito()
    
    const tareasInForm = form.getValues("tareas") as unknown as Tarea[] ?? []

    async function onSubmit(values: z.infer<typeof hitoSchema>){
        const formatTareas : TareaDTO[] = values.tareas.map(tarea => ({
            ...tarea,
            participantesAsignados: tarea.participantesAsignados ?? [],
            subtareas: tarea.subtareas ?? []
        }))
        
        const formattedData = {
            titulo: values.titulo,
            fechaInicio: values.fechas.from!,
            fechaFinalizacion: values.fechas.to!,
            tareas: formatTareas
        }
   
        await saveHito(projectId, formattedData, selectedHito?.idHito)
        
        resetForms()

        // Close drawer
        document.getElementById("closeDrawer")?.click()

        queryClient.invalidateQueries({queryKey: [projectId, "hitos"]})
    }
    
    return (
        <Form {...form}>
            <form 
                onSubmit={form.handleSubmit(onSubmit)}
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
                    name="fechas.from"
                    render={({ field }) => (
                        <FormItem className="pl-1">
                            <div className="flex items-center justify-around gap-1.5">
                                <FormLabel className="flex items-center gap-1 shrink-0 text-sm">
                                    <Calendar size={14} />
                                    Fecha de inicio
                                </FormLabel>
                                    <DatePicker
                                        mode="single"
                                        field={field}
                                        useOpenState
                                    />
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField 
                    control={form.control}
                    name="fechas.to"
                    render={({ field }) => (
                        <FormItem className="pl-1">
                            <div className="flex items-center gap-1.5">
                                <FormLabel className="flex items-center gap-1 shrink-0 text-sm">
                                    <CalendarCheck size={14}/>
                                    Fecha de finalización
                                </FormLabel>
                                <DatePicker
                                    mode="single"
                                    field={field}
                                    useOpenState
                                />
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* Tareas del hito */}
                <HitosTable 
                    columns={tareasColumns}
                    data={tareasInForm}
                    subRowsField="subTareas"
                    newTask = {<NewTaskModal />}
                />
                <DrawerFooter>
                    <Button>Guardar</Button>
                    <DrawerClose asChild>
                        <Button variant="outline">Cancelar</Button>
                    </DrawerClose>
                </DrawerFooter>
            </form>
        </Form>
    );
}