"use client"

import { fetcherLocal } from "@/server/fetch/client-side";
import { Recurso } from "@/types/proyecto/Recurso";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function useRecurso() {
    const queryClient = useQueryClient();

    function getRecursosEspacio(id: number){
        return useQuery<Recurso[]>({
            queryKey: ["recursos", "espacio", id],
            queryFn: async () => {
                const response = await fetcherLocal(`/recursos/${id}`);
                if (!response.ok) {
                    throw new Error("Error fetching recursos de zona de trabajo");
                }
                const data = await response.json();
                return data as Recurso[];
            }
        })
    }

    function getRecursosCliente(){

    }

    function getRecursoEntregable(){

    }

    return {
        getRecursosEspacio
    }
}