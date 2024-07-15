"use client"
import HandleServerResponse from "@/lib/handle-response";
import { fetcherLocal } from "@/server/fetch/client-side";
import { HitoDTO } from "@/types/proyecto/Hito/dto/HitoDTO";
import { toast } from "sonner";

export async function saveHito(projectId: number, hito : HitoDTO) : Promise<boolean>{
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

export async function deleteHito(hitoId: number) {
    try {
        const response = await fetcherLocal(`/hitos/deleteHito/${hitoId}`, {
            method: "DELETE"    
        })
        const ok = await HandleServerResponse(response)
        if (!ok){
            throw new Error("Error al eliminar hito")
        }
        toast.success("Hito eliminado")
        return ok
    } catch (error) {
        console.error(error)
        throw new Error("Error al eliminar hito")
    }
}