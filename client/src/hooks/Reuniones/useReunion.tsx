"use client";

import HandleServerResponse from "@/lib/handle-response";
import { fetcherLocal } from "@/server/fetch/client-side";
import { Reunion, ReunionDTO } from "@/types/proyecto/Reunion";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useReunion() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  function getReunionesByProyectIdQuery(id: number){
    return useQuery<Reunion[]>({
        queryKey: ["reuniones", id],
        queryFn: async () => {
          const response = await fetcherLocal(`/reuniones/proyecto/${id}`);
          if (!response.ok) {
            throw new Error("Error fetching reuniones");
          }
          const data = await response.json();
          return data as Reunion[];
        }
      });
  }

  async function createReunionByProyectoId(reunion : ReunionDTO, proyectId : number){
    const toastId = toast.loading("Creando reunión");
    try{
      const response = await fetcherLocal(`/reuniones/proyecto/${proyectId}`, {
        method: "POST",
        body: JSON.stringify(reunion),
      });
      const ok = HandleServerResponse(response, undefined, toastId);
      if(!ok) return;
      toast.success("Reunión creada correctamente", {
        id: toastId,
      });
    }catch(error){
      console.error(error);
      toast.error("Error al crear reunión", {
        id: toastId,
      });
    }
  }

  return {
    getReunionesByProyectIdQuery,
    createReunionByProyectoId
  };
}
