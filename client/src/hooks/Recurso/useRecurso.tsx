"use client"

import { fetcherLocal } from "@/server/fetch/client-side";
import { Recurso } from "@/types/proyecto/Recurso";
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

    async function saveRecursoEspacio(
        projectId: number,
        recurso: Recurso,
    ): Promise<boolean>{
        const toastId = toast.loading("Guardando ...");

        try{
            const response = await fetcherLocal('recursos', {
                method: "POST",
                body: JSON.stringify(recurso),
            });

            if(!response.ok){
                throw new Error("Error al guardar recurso");
            }

            toast.success("Recurso guardado", {
                id: toastId,
            });
            return true;

        }catch(e){
            console.error(e);
            toast.error("Error al guardar el recurso", {
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
    }
}