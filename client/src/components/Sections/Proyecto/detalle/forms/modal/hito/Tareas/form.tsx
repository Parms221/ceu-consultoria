"use client"
import DatePicker from "@/components/ui/datepicker/date-picker";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, CalendarCheck, CheckCircle, Link, Loader, Pen, Target, User2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useProjectDetail } from "../../../../contexto/proyecto-detail.context";
import { tareaSchema } from "../../../schemas/nuevo-hito.schema";
import { z } from "zod";
import { Combobox } from "@/components/ui/combobox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function TareaForm() {
    const { selectedTask } = useProjectDetail() 
    const form = useForm<z.infer<typeof tareaSchema>>({
        resolver: zodResolver(tareaSchema),
        defaultValues: {
            titulo: selectedTask ? selectedTask.titulo : "Nueva tarea",
            fechaFin: selectedTask ? new Date(selectedTask.fechaFin) : new Date(),
            fechaInicio: selectedTask ? new Date(selectedTask.fechaInicio) : new Date(),
        }
    })

    async function onSubmit(values: z.infer<typeof tareaSchema>){
        console.log(values)
    }

    return (
        <div className="grid grid-cols-3">
            <div className="col-span-2 p-2">
           
    
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
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField 
                    control={form.control}
                    name="participantesAsignados"
                    render={({ field }) => (
                        <FormItem className="pl-1">
                            <div className="flex items-center gap-1.5">
                                <FormLabel className="flex items-center gap-1 shrink-0 text-sm">
                                    <User2 size={14}/>
                                    Responsable
                                </FormLabel>
                                <Combobox
                                    placeholder="Seleccione un responsable"
                                    options={[
                                        {
                                        label: "RUC",
                                        value: "RUC",
                                        },
                                        {
                                        label: "DNI",
                                        value: "DNI",
                                        },
                                    ]}
                                    onSelect={(value) => {
                                        field.onChange(value)
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
                                <FormLabel className="flex items-center gap-1 shrink-0 text-sm">
                                        <Loader size={14}/>
                                        Estado
                                    </FormLabel>
                                    <Combobox
                                        placeholder="Seleccione un estado"
                                        options={[
                                            {
                                            label: "En progreso",
                                            value: "En progreso",
                                            },
                                            {
                                            label: "Terminado",
                                            value: "Terminado",
                                            },
                                        ]}
                                        onSelect={(value) => {
                                            field.onChange(value)
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
                    name="fechaFin"
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
                <FormField 
                    control={form.control}
                    name="descripcion"
                    render={({ field }) => (
                        <FormItem className="pl-1">
                            <div className="flex flex-col items-start gap-1.5">
                                <FormLabel className="flex items-center gap-1 shrink-0 text-sm">
                                    <Pen size={14}/>
                                    Descripción
                                </FormLabel>
                                <FormControl>
                                    <Textarea {...field}/>
                                </FormControl>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* Lista de subtareas checklist */}
            </form>
        </Form>
            </div>
            <aside className="rounded-md bg-[#EBEBEB] p-2 [&>div]:space-y-1.5">
                <div>
                    <h4>Añadir a la tarea</h4>
                    <Button className="w-full" size={"sm"} variant={"outline"}>
                        <Link size={18}/> Adjuntos
                    </Button>
                    <Button className="w-full" size={"sm"} variant={"outline"}>
                        <CheckCircle size={18}/> Subtareas
                    </Button>
                </div>
                <div>
                    <h4>Acciones</h4>
                    <Button className="w-full" size={"sm"}>
                        Guardar
                    </Button>
                    <Button className="w-full" size={"sm"} variant={"destructive"}>
                        Eliminar
                    </Button>
                </div>
            </aside>
        </div>
    );
}