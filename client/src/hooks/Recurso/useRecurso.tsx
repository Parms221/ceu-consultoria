"use client"

import { fetcherLocal } from "@/server/fetch/client-side";
import { fetcherMultiPartLocal } from "@/server/fetch/multi-part-client-side";
import { Recurso } from "@/types/proyecto/Recurso";
import { RecursoDTO } from "@/types/proyecto/Recurso/Dto/recurso.dto";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useRecurso() {
    const queryClient = useQueryClient();

    function getRecursosEspacio(id: number){
        return useQuery<Recurso[]>({
            queryKey: ["recursos", "espacio", id],
            queryFn: async () => {
                const response = await fetcherLocal(`/recursos/project/${id}`);
                if (!response.ok) {
                    throw new Error("Error fetching recursos de zona de trabajo");
                }
                const data = await response.json();
                return data as Recurso[];
            }
        })
    }

    async function saveRecursoFileEspacio(
        recurso: RecursoDTO,
        file: File | string
    ): Promise<boolean>{
        const toastId = toast.loading("Guardando ...");

        try{
            const json = JSON.stringify(recurso);
            console.log(json);
            const formData = new FormData();
            const jsonBlob = new Blob([json], {
                type: 'application/json'
            });
            console.log(jsonBlob);
            formData.append("body", jsonBlob);
            formData.append("file", file);
            const response = await fetcherMultiPartLocal('/recursos/file', {
                method: "POST",
                body: formData,
            });

            if(!response.ok){
                throw new Error("Error al guardar recurso archivo");
            }

            toast.success("Recurso guardado", {
                id: toastId,
            });
            return true;

        }catch(e){
            console.error(e);
            toast.error("Error al guardar el recurso archivo", {
                id: toastId,
            });
            throw new Error("Error al guardar el recurso");
        }
    }

    async function saveRecursoLinkEspacio(
        recurso: RecursoDTO,
    ): Promise<boolean> {
        const toastId = toast.loading("Guardando ...");
        console.log(recurso);
        try {
            const response = await fetcherLocal('/recursos/link', {
                method: "POST",
                body: JSON.stringify(recurso),
            });

            if (!response.ok) {
                throw new Error("Error al guardar recurso enlace");
            }

            toast.success("Recurso guardado", {
                id: toastId,
            });
            return true;

        } catch (e) {
            console.error(e);
            toast.error("Error al guardar el recurso enlace", {
                id: toastId,
            });
            throw new Error("Error al guardar el recurso");
        }
    }

    async function descargarRecurso(recurso: Recurso, projectId: number){
        const toastId = toast.loading("Descargando ...");
        const response = await fetcherLocal(`/recursos/download/${recurso.idRecurso!}/project/${projectId}`);

        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = recurso.titulo;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);

            toast.success(`${recurso.titulo} guardado en el dispositivo`, {
                id: toastId,
            });
        } else {
            console.error('Error downloading file');
        }
    }

    function getRecursosCliente(){

    }

    function getRecursoEntregable(){

    }

    return {
        getRecursosEspacio,
        descargarRecurso,
        saveRecursoFileEspacio,
        saveRecursoLinkEspacio,
    }
}