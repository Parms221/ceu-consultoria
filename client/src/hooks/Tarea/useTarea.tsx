"use client";

import { Badge } from "@/components/ui/badge";
import { TAREA_ESTADOS } from "@/constants/proyectos/estados";
import HandleServerResponse from "@/lib/handle-response";
import { fetcherLocal } from "@/server/fetch/client-side";
import { Estado } from "@/types/estado";
import { Tarea } from "@/types/proyecto/Tarea";
import { FeedbackTareaDTO } from "@/types/proyecto/Tarea/dto/FeedbackTareaDTO";
import { TareaDTO } from "@/types/proyecto/Tarea/dto/TareaDTO";
import { toast } from "sonner";

export default function useTarea() {
  async function updateTarea(
    tarea: TareaDTO,
    idTarea: number | string,
  ): Promise<boolean> {
    const toastId = toast.loading("Guardando ...");
    // Si el idHito existe, se actualiza el registro
    try {
      console.log("tarea updating", JSON.stringify(tarea));
      const response = await fetcherLocal(`/tareas/${idTarea}`, {
        method: "PUT",
        body: JSON.stringify(tarea),
      });
      const ok = await HandleServerResponse(response, undefined, toastId);
      if (!ok) {
        throw new Error("Error al actualizar tarea");
      }
      toast.success("Tarea actualizada", {
        id: toastId,
      });
      return ok;
    } catch (e) {
      console.error(e);
      toast.error("Error al actualizar la tarea", {
        id: toastId,
      });
      return false;
    }
  }

  async function deleteTarea(id: number | string) {
    const toastId = toast.loading("Eliminado ...");

    try {
      const response = await fetcherLocal(`/tareas/${id}`, {
        method: "DELETE",
      });
      const ok = await HandleServerResponse(response, undefined, toastId);
      if (!ok) {
        throw new Error("Error al eliminar el registro");
      }
      toast.success("Tarea eliminada", {
        id: toastId,
      });
      return ok;
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar el registro", {
        id: toastId,
      });
      // throw new Error("Error al eliminar tarea");
    }
  }

  async function addFeedback(idTarea: number, feedback: FeedbackTareaDTO) {
    // const toastId = toast.loading("Guardando ...");
    // Si el idHito existe, se actualiza el registro
    try {
      const response = await fetcherLocal(`/tareas/${idTarea}/feedback`, {
        method: "POST",
        body: JSON.stringify(feedback),
      });
      const ok = await HandleServerResponse(response, undefined, undefined);
      if (!ok) {
        throw new Error("Error al enviar feedback sobre esta tarea");
      }
      return ok;
    } catch (e) {
      console.error(e);
      return false;
    }
  }


  function getBadgeByStatus(estado: Estado) {
    return (
      <Badge
        className="text-nowrap whitespace-nowrap"
        variant={
          estado.idEstado === TAREA_ESTADOS.por_hacer ? "ghost" : 
          estado.idEstado === TAREA_ESTADOS.en_progreso ? "default" :
          estado.idEstado === TAREA_ESTADOS.hecho ? "success" : "destructive"
        }
      > 
        {estado.descripcion}
      </Badge>
    )
  }

  return {
    updateTarea,
    deleteTarea,
    addFeedback,
    getBadgeByStatus
  };
}
