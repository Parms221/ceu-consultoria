"use client";
import { useProjectDetail } from "../../../../../contexto/proyecto-detail.context";
import { recursoSchema } from "../schemas/recurso.schema";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DrawerClose, DrawerFooter } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Link as LinkIcon, Loader } from "lucide-react";
import DatePicker from "@/components/ui/datepicker/date-picker";
// import { HitosTable } from "../../vistas/lista/DataTable/data-table";
// import { tareasColumns } from "../Tareas/columns";
// import NewTaskModal from "../Tareas";
import {useState} from 'react';
import { Tarea, TareaDTO } from "@/types/proyecto/Tarea";
import useHito from "@/hooks/Hito/useHito";
import useRecurso from "@/hooks/Recurso/useRecurso";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RecursoDTO } from "@/types/proyecto/Recurso/Dto/recurso.dto";
import { Combobox } from "@/components/ui/combobox";

type TipoRecurso = {
    id: string
    description: string
}


export default function RecursoForm(
) {
    const { projectId } = useProjectDetail()
    const { saveRecursoEspacio } = useRecurso()
    const tiposRecurso = [{id: "1", description: "Archivo"}, {id: "2", description:"Enlace"}]
    const [tipoActual, setTipoActual] = useState<TipoRecurso>(tiposRecurso[0]);
    const recursoSchemaFinal = recursoSchema(tipoActual.id == "1");
    type FormData = z.infer<typeof recursoSchemaFinal>;
    const form = useForm<FormData>({resolver: zodResolver(recursoSchemaFinal)});

    async function onSubmit(values: FormData){
        const formattedData = {
            idProyecto: projectId,
            titulo: values.titulo,
            enlace: values.enlace,
            esArchivo: values.tipo === "1"
        } as RecursoDTO

        let file = values.tipo === "1" ? values.file : "";

        await saveRecursoEspacio(formattedData, file);
        
        form.reset();

        // Close drawer
        document.getElementById("closeDrawer")?.click()
    }
    
    return (
        <Form {...form}>
            <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 [&>div>div>label]:w-[200px]"
                encType="multipart/form-data"
            >
                <FormField
                    control={form.control}
                    name="tipo"
                    render={({ field }) => (
                        <FormItem className="pl-1">
                            <div className="flex items-center gap-1.5">
                                {/* TODO: traer estados de backend */}
                                <FormLabel className="flex shrink-0 items-center gap-1 text-sm">
                                    <Loader size={14} />
                                    Estado
                                </FormLabel>
                                <Combobox
                                    alwaysSelected={true}
                                    placeholder="Seleccione un tipo"
                                    value={
                                        field.value ? field.value.toString() : "1"
                                    }
                                    options={
                                        tiposRecurso.map((tipo) => ({
                                            label: tipo.description,
                                            value: tipo.id
                                        }))
                                    }
                                    onSelect={(value) => {
                                        field.onChange(value);
                                        setTipoActual(tiposRecurso.find((v => v.id == value))!);
                                        console.log(value);
                                    }}
                                />
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {tipoActual.id != "1" && 
                    <FormField
                        control={form.control}
                        name="titulo"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex items-center gap-1.5">
                                    <FormLabel className="flex items-center gap-1 shrink-0 text-sm">
                                        Título de recurso
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />}

                {tipoActual.id != "1" &&
                    <FormField
                        control={form.control}
                        name="enlace"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex items-center gap-1.5">
                                    <FormLabel className="flex items-center gap-1 shrink-0 text-sm">
                                        <LinkIcon size={14} />
                                        Enlace
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                />}

                {tipoActual.id == "1" && 
                    <FormField 
                        control={form.control}
                        name="file"
                        render={({field: {value, onChange, ...fieldProps}}) => (
                            <FormItem>
                                <div className="flex items-center gap-1.5">
                                    <FormLabel className="flex items-center gap-1 shrink-0 text-sm">
                                        Archivo
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...fieldProps} type="file" onChange={(event) =>
                                            onChange(event.target.files && event.target.files[0])
                                        } />
                                    </FormControl>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                }

                {/* <FormField 
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
                /> */}
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