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
import { Target } from "lucide-react";

export default function HitoForm(
) {
    const { selectedHito, proyecto } = useProjectDetail()
    const form = useForm<z.infer<typeof hitoSchema>>({
        resolver: zodResolver(hitoSchema),
        defaultValues: {
            titulo: selectedHito ? selectedHito.titulo : "Nuevo hito"
        }
    })

    async function onSubmit(values: z.infer<typeof hitoSchema>){
        console.log(values)
    }
    
    return (
        <Form {...form}>
            <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
            >
                <FormField 
                    control={form.control}
                    name="titulo"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex items-center gap-1.5">
                                <FormLabel>
                                    <Target size={24} />
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
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