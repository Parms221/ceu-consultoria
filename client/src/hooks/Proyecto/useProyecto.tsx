"use client"
import { fetcherLocal } from "@/server/fetch/client-side";
import { Proyecto } from "@/types/proyecto";
import { useQuery } from "@tanstack/react-query";

export default function useProyecto() {
    
    function getProyectoByIdQuery(id: number) {
        return useQuery<Proyecto>({
            queryKey: ["proyecto", id],
            queryFn: async () => {
              const response = await fetcherLocal(`/proyectos/getProyecto/${id}`);
    
                if (!response.ok) {
                  throw new Error("Error fetching project");
                }
    
                const data = await response.json();
    
                return data as Proyecto;
            },
          });
    }


    return {
        getProyectoByIdQuery
    }
}