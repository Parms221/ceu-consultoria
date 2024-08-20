"use client"
import Loader from "@/components/common/Loader";
import { fetcherLocal } from "@/server/fetch/client-side";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export default function GoogleCallback(
    { searchParams } : { searchParams : { code : string, state : string, error : string } },
) {
    const code = searchParams.code ?? null;
    const state = searchParams.state ?? null;
    const error = searchParams.error ?? null;

    const router = useRouter();
    const firstRender = useRef(true);
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (code : string) => {
            const response = await fetcherLocal("/authorize/oauth2/code/google", {
                method: "POST",
                body: JSON.stringify({
                    "code": code,
                })
            }) 
            console.log(response.status);
        },
        onError: (error) => {
            toast.error("Error al autorizar cuenta en google: " + error);
            router.push(state);
        },
        onSuccess: (data) => {
            toast.success("Cuenta autorizada");
            queryClient.invalidateQueries({
                queryKey: ["google-auth", "verify"]
            })
            router.push(state);
        }
    })

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        if (code && state) {
            mutation.mutate(code);
        }else{
            toast.error("Error al autorizar cuenta en google");
            router.push(state ?? "/");
        }
    }, [code, error, state])

    return <div className="grid h-screen place-content-center w-[100vw] bg-white">
        {
            mutation.isPending && <Loader />
        }
    </div>
}