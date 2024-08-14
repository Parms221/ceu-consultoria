"use client";

import HandleServerResponse from "@/lib/handle-response";
import { fetcherLocal } from "@/server/fetch/client-side";
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

  function convertFromTareaToDTO(tarea : Tarea) : TareaDTO {
    return {
      ...tarea,
      idTarea : tarea.idTarea?.toString(),
      estado : tarea.estado?.idEstado,
      fechaInicio : new Date(tarea.fechaInicio),
      fechaFin : new Date(tarea.fechaFin),
      tareaAnterior : undefined, // Por el momento no se usa la tarea anterior
      participantesAsignados: tarea.participantesAsignados ?
        tarea.participantesAsignados.map(p => p.idParticipante) : undefined,
      subtareas: tarea.subTareas ? tarea.subTareas.map(t => ({
        descripcion: t.descripcion,
        completado: t.completado,
      })) : [],
    }
  }

  return {
    updateTarea,
    deleteTarea,
    addFeedback,
    convertFromTareaToDTO,
  };
}
