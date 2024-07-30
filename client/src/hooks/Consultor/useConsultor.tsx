"use client";
import { fetcherLocal } from "@/server/fetch/client-side";
import { Consultor } from "@/types/consultor";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function useConsultor() {
  const queryClient = useQueryClient();

  function getConsultoresQuery() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useQuery<Consultor[]>({
      queryKey: ["consultores"],
      queryFn: async () => {
        const response = await fetcherLocal(`/consultores`);

        if (!response.ok) {
          throw new Error("Error fetching projects");
        }

        const data = await response.json();

        return data;
      }
    });
  }


  return {
    getConsultoresQuery,
  };
}
