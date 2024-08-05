"use client"

import { fetcherLocal } from "@/server/fetch/client-side"
import { GptCronogramaResponse, GptRequest } from "@/types/gpt"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

export default function useGPT() {
    function gptHitosMutation(idProyecto : number){
        return useMutation<GptCronogramaResponse, Error, unknown, unknown>({
            mutationKey: ["gptCronograma", idProyecto],
            mutationFn: async () => {
                const response = await fetcherLocal(`/ia/generateHitos/${idProyecto}`, {
                    method: "GET",
                })
                if (!response.ok) {
                    throw new Error("Error fetching test")
                }
                const data = await response.json()
                return data
            },
            onError: (error) => {
                console.error("Error fetching test", error)
                toast.error("Error al generar cronograma");
            },
        })
    }
    
    return {
        gptHitosMutation,
    }
}