"use client"
import HandleServerResponse from "@/lib/handle-response";
import { fetcherLocal } from "@/server/fetch/client-side";
import { HitoDTO } from "@/types/proyecto/Hito/dto/HitoDTO";
import { toast } from "sonner";

export async function saveHito(projectId: number, hito : HitoDTO) : Promise<boolean>{
    console.log("saving hito", JSON.stringify(hito))
    try{
        const response = await fetcherLocal(`/hitos/${projectId}/save`, {
            method: "POST",
            body: JSON.stringify(hito)
        })
       const ok = await HandleServerResponse(response)
       if(!ok) {
         throw new Error("Error al guardar hito")
       }
        toast.success("Hito guardado")
        return ok
    }catch(e){
        console.error(e)
        throw new Error("Error al guardar hito")    
    }
}