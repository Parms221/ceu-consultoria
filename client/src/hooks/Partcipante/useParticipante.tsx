"use client";
import HandleServerResponse from "@/lib/handle-response";
import { fetcherLocal } from "@/server/fetch/client-side";
import { Participante } from "@/types/proyecto/Participante";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useParticipante() {
  const queryClient = useQueryClient();

  function getParticipantesDeProyectoQuery(projectId: number) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useQuery<Participante[]>({
      queryKey: [projectId, "participantes"],
      queryFn: async () => {
        const response = await fetcherLocal(
          `/proyectos/${projectId}/participantes`,
        );
        const ok = await HandleServerResponse(response);
        if (!ok) {
          throw new Error("Error al obtener participantes");
        }
        const participantes: Participante[] = await response.json();
        return participantes;
      },
    });
  }
  //"{id}/participantes/add

  async function añadirParticipante({
    idConsultor,
    idProyecto,
  }: {
    idConsultor: number | string;
    idProyecto: number | string;
  }): Promise<boolean> {
    const toastId = toast.loading("Añadiendo ...");
    try {
      const response = await fetcherLocal(
        `/proyectos/${idProyecto}/participantes/add`,
        {
          method: "POST",
          body: idConsultor.toString(),
        },
      );
      const ok = await HandleServerResponse(response, undefined, toastId);
      if (!ok) {
        throw new Error("Error al añadir participante");
      }
      toast.success("Parcipante añadido", {
        id: toastId,
      });
      return ok;
    } catch (e) {
      console.error(e);
      toast.error("Error al añadir participante", {
        id: toastId,
      });
      throw new Error("Error al añadir participante");
    }
  }

  return {
    getParticipantesDeProyectoQuery,
    añadirParticipante,
  };
}
