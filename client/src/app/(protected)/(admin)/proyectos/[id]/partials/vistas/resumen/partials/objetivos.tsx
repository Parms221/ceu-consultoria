"use client"
import { projectCompleteSchema } from "@/app/(protected)/(admin)/proyectos/nuevo/partials/schemas/project.schema";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Target } from "lucide-react";


export default function Objetivos(
    {
        form,
      }: {
        form: UseFormReturn<z.infer<typeof projectCompleteSchema>, any, undefined>;
      }
) {
    const objetivos = form.getValues("project.objetivos");
    return (
        <div>
            <h2>Objetivos</h2>
            <div className="border rounded-md p-2 sm:p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {objetivos.map((objetivo, index) => (
                    <div className="flex flex-col items-center justify-center">
                        <img
                            className="w-16 h-16"
                            src="https://d3ki9tyy5l5ruj.cloudfront.net/obj/98e78878c97c4d398e6265b92028d97dfb33043c/shooting_target.svg"
                            alt="target icon"
                        />
                        <p className="text-center">{objetivo}</p>
                    </div>
                ))}
                

            </div>
        </div>
    );
}