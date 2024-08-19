"use client";

import HandleServerResponse from "@/lib/handle-response";
import { fetcherLocal } from "@/server/fetch/client-side";
import { Reunion, ReunionDTO } from "@/types/proyecto/Reunion";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useReunion() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  function getReunionesByProyectIdQuery(id: number){
    // eslint-disable-next-line react-hooks/rules-of-hooks
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

  // eslint-disable-next-line react-hooks/rules-of-hooks
  async function createReunionByProyectoId(reunion : ReunionDTO, proyectId : number){
    const toastId = toast.loading("Creando reunión");
    console.log(JSON.stringify(reunion));
    try{
      const response = await fetcherLocal(`/reuniones/proyecto/${proyectId}`, {
        method: "POST",
        body: JSON.stringify(reunion),
      });
      const ok = await HandleServerResponse(response, undefined, toastId);
      if(ok){
        toast.success("Reunión creada correctamente", {
          id: toastId,
        });
      }
      return ok
    }catch(error){
      console.error(error);
      toast.error("Error al crear reunión", {
        id: toastId,
      });
      return false;
    }
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  async function deleteReunionById(id: number){
    const toastId = toast.loading("Eliminando reunión");
    try{
      const response = await fetcherLocal(`/reuniones/${id}`, {
        method: "DELETE",
      });
      const ok = HandleServerResponse(response, undefined, toastId);
      if(!ok) return;
      toast.success("Reunión eliminada correctamente", {
        id: toastId,
      });
    }catch(error){
      console.error(error);
      toast.error("Error al eliminar reunión", {
        id: toastId,
      });
    }
  }

  return {
    getReunionesByProyectIdQuery,
    createReunionByProyectoId,

    deleteReunionById,
  };
}
