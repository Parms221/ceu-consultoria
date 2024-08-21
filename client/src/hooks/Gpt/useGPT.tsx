"use client"

import { fetcherLocal } from "@/server/fetch/client-side"
import { GptCronogramaResponse, GptRequest } from "@/types/gpt"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

export default function useGPT() {
    const gptHitosMutation = useMutation<GptCronogramaResponse, Error, number, unknown>({
        mutationKey: ["gptCronograma"],
        mutationFn: async (idProyecto : number) => {
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
    
    return {
        gptHitosMutation,
    }
}