"use client"

import { fetcherLocal } from "@/server/fetch/client-side"
import { GptRequest } from "@/types/gpt"
import { useMutation } from "@tanstack/react-query"

export default function useGPT() {
    function testIaMutation(){
        return useMutation({
            mutationKey: ["gpt", "test"],
            mutationFn: async (request : GptRequest) => {
                const response = await fetcherLocal("/ia/test", {
                    method: "POST",
                    body: JSON.stringify(request),
                })
                if (!response.ok) {
                    throw new Error("Error fetching test")
                }
                const data = await response.json()
                return data
            }
        })
    }
    
    return {
        testIaMutation
    }
}