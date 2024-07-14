"use client";
import { useForm } from "react-hook-form";
import { useProjectDetail } from "../../../contexto/proyecto-detail.context";
import { zodResolver } from "@hookform/resolvers/zod";
import { hitoSchema } from "../../schemas/nuevo-hito.schema";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DrawerClose, DrawerFooter } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Calendar, CalendarCheck, Target } from "lucide-react";
import { Tarea } from "@/types/proyecto/Tarea";
import DatePicker from "@/components/ui/datepicker/date-picker";
import { HitosTable } from "../../../vistas/lista/DataTable/data-table";
import { tareasColumns } from "./Tareas/columns";
import NewTaskModal from "./Tareas/nuevo-modal";

export default function HitoForm(
) {
    const { selectedHito, proyecto } = useProjectDetail()
    const form = useForm<z.infer<typeof hitoSchema>>({
        resolver: zodResolver(hitoSchema),
        defaultValues: {
            titulo: selectedHito ? selectedHito.titulo : "Nuevo hito",
            fechaFinalizacion: selectedHito ? new Date(selectedHito.fechaFinalizacion) : new Date(),
            fechaInicio: selectedHito ? new Date(selectedHito.fechaInicio) : new Date(),
        }
    })

    async function onSubmit(values: z.infer<typeof hitoSchema>){
        console.log(values)
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
                    name="fechaInicio"
                    render={({ field }) => (
                        <FormItem className="pl-1">
                            <div className="flex items-center justify-around gap-1.5">
                                <FormLabel className="flex items-center gap-1 shrink-0 text-sm">
                                    <Calendar size={14} />
                                    Fecha de inicio
                                </FormLabel>
                                    <DatePicker
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
                    name="fechaFinalizacion"
                    render={({ field }) => (
                        <FormItem className="pl-1">
                            <div className="flex items-center gap-1.5">
                                <FormLabel className="flex items-center gap-1 shrink-0 text-sm">
                                    <CalendarCheck size={14}/>
                                    Fecha de finalización
                                </FormLabel>
                                <DatePicker
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
                    data={selectedHito?.tareasDelHito || []}
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