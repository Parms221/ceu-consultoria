"use client";

import HandleServerResponse from "@/lib/handle-response";
import { fetcherLocal } from "@/server/fetch/client-side";
import { Hito } from "@/types/proyecto/Hito";
import { HitoDTO } from "@/types/proyecto/Hito/dto/HitoDTO";
import { FeedbackTareaDTO } from "@/types/proyecto/Tarea/dto/FeedbackTareaDTO";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useHito() {

  function getHitosQuery(projectId: number) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useQuery<Hito[]>({
      queryKey: [projectId, "hitos"],
      queryFn: async () => {
        const response = await fetcherLocal(`/proyectos/${projectId}/hitos`);
        const ok = await HandleServerResponse(response);
        if (!ok) {
          throw new Error("Error al obtener hitos");
        }
        const hitos: Hito[] = await response.json();
        return hitos;
      }
    });
  }

  async function saveHito(projectId: number, hito: HitoDTO, idHito?:number): Promise<boolean> {
    const toastId = toast.loading("Guardando ...");
    // Si el idHito existe, se actualiza el registro
    const endpoint = idHito ? `/hitos/${projectId}/update/${idHito}` : `/hitos/${projectId}/save`;
    try {
      const response = await fetcherLocal(endpoint, {
        method: "POST",
        body: JSON.stringify(hito)
      });
      const ok = await HandleServerResponse(response, undefined, toastId);
      if (!ok) {
        throw new Error("Error al guardar hito");
      }
      toast.success("Hito guardado", {
        id: toastId
      });
      return ok;
    } catch (e) {
      console.error(e);
      toast.error("Error al guardar el hito", {
        id: toastId
      });
      throw new Error("Error al guardar hito");
    }
  }

  async function deleteHito(hitoId: number) {
    const toastId = toast.loading("Eliminado ...");

    try {
      const response = await fetcherLocal(`/hitos/deleteHito/${hitoId}`, {
        method: "DELETE"
      });
      const ok = await HandleServerResponse(response, undefined, toastId);
      if (!ok) {
        throw new Error("Error al eliminar el registro");
      }
      toast.success("Hito eliminado", {
        id: toastId
      });
      return ok;
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar el registro", {
        id: toastId
      });
      throw new Error("Error al eliminar hito");
    }
  }

  async function addFeedback(idHito : number, feedback : FeedbackTareaDTO){
    try {
      const response = await fetcherLocal(`/hitos/${idHito}/feedback`, {
        method: "POST",
        body: JSON.stringify(feedback)
      });
      const ok = await HandleServerResponse(response, undefined, undefined);
      if (!ok) {
        toast.error("Error al enviar feedback sobre esta tarea");
        throw new Error("Error al enviar feedback sobre esta tarea");
      }
      return ok;
    } catch (e) {
      console.error(e);
      throw new Error("Error al enviar feedback");
    }
  }

  return {
    getHitosQuery,
    saveHito,
    deleteHito,

    addFeedback
  };
}