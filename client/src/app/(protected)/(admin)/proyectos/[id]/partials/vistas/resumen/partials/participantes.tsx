"use client"
import { projectCompleteSchema } from "@/app/(protected)/(admin)/proyectos/nuevo/partials/schemas/project.schema";
import { Button } from "@/components/ui/button";
import { Popover } from "@/components/ui/popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { PlusCircle } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";


export default function Participantes(
    {
        form,
      }: {
        form: UseFormReturn<z.infer<typeof projectCompleteSchema>, any, undefined>;
      }
) {

    return (
        <div>
            <h2>Roles y participantes</h2>
            <div >
                <BoxParticipante />

            </div>
        </div>
    );
}

export function BoxParticipante(){
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant={"outline"} className="flex items-center gap-x-2 py-6 w-46">
                    <PlusCircle className="w-6 h-6" />
                    <span>
                        Añadir miembro
                    </span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-46 p-4 bg-white shadow-xl z-99999 border border-neutral-300" align="start">
                <div>
                   Opciones
                </div>
            </PopoverContent>
        </Popover>
    )
}