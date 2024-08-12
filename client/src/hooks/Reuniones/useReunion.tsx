"use client";

import { fetcherLocal } from "@/server/fetch/client-side";
import { Reunion } from "@/types/proyecto/Reunion";
import { useQuery } from "@tanstack/react-query";

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

  return {
    getReunionesByProyectIdQuery
  };
}
