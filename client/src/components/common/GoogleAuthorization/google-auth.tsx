"use client"
import { useAppContext } from "@/app/(protected)/app.context";
import GoogleLogo from "@/components/common/Icons/GoogleLogo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { getGoogleAuthUrl } from "@/lib/google";
import { cn } from "@/lib/utils";
import { fetcherLocal } from "@/server/fetch/client-side";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

/* Componente para la  autorización de acceso a api de google en backend */
export default function GoogleAuth() {
  const path = usePathname();
  const { googleAccountQuery } = useAppContext()

  // Loagin query
  if (googleAccountQuery.isLoading || googleAccountQuery.isError){
      return (
        <div className="flex items-center w-[230px]">
            <Button variant={"outline"} className="rounded-s-[0px] p-0">
              <div className="h-full w-[216px] bg-neutral-200 animate-pulse">
              </div>
              <ChevronDown className="h-4 w-4" />
            </Button>
      </div>
      )
    }

  const { data : activeGoogleAccount } = googleAccountQuery
  const isAuthorized = activeGoogleAccount?.status === "Authorized";

  const revokeMutation = useMutation({
    mutationFn: async () => {
      const response = await fetcherLocal("/authorize/oauth2/google/revoke", {
        method: "POST"
      })
    },
    onSuccess: () =>{
      toast.success("Se ha revocado la autorización de Google")
      googleAccountQuery.refetch()
    },
    onError: (error) => {
      toast.error("Error al revocar la autorización de Google")
      console.log(error)
    }
  })

  const handleAuthorization  = () => {
    const authUrl = getGoogleAuthUrl();
    authUrl.searchParams.append("state", path);
    window.location.href = authUrl.toString();
  }
  
  const handleRevokeAuthorization  = () => {
    if(
      confirm("¿Estás seguro de querer desconectar tu cuenta de google?")
    ){
      revokeMutation.mutate();
    }
  }

  function handleClick() {
    if (!isAuthorized){
      handleAuthorization();
    }
  }

 
  return (
      <Popover>
        <PopoverTrigger asChild disabled={revokeMutation.isPending}>
           <div className="flex items-center w-[230px]">
            <Button
                onClick={handleClick}
                variant={isAuthorized ? "default" : "outline"}
                className={
                  cn(
                    "space-x-2",
                    isAuthorized && "rounded-s-md rounded-e-[0px] w-50"
                  )
                }
            >
              <GoogleLogo className="h-6 w-6" />
              <span>
                {
                  isAuthorized ? "Cuenta conectada" : "Enlazar cuenta con Google"
                }
              </span>
            </Button>
            {
              isAuthorized && (
                <Button variant={"outline"} className="rounded-s-[0px] px-2">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              )
            }
           </div>
        </PopoverTrigger>
        {
          isAuthorized && (
            <PopoverContent 
              alignOffset={0}
              sideOffset={0}
              side="bottom" align="start" className="w-[230px] p-0 rounded-md overflow-hidden"
              >
              <ul className="[&>li>button]:text-xs [&>li>button]:px-1.5 [&>li>button]:rounded-none [&>li>button]:w-full space-y-[1px]">
                <li>
                <Button
                  variant={"ghost"}
                  className="text-ceu-celeste hover:text-ceu-celeste flex items-center gap-2"
                >
                  <Avatar>
                    <AvatarFallback className="grid place-content-center">
                      {activeGoogleAccount.user?.email?.slice(0, 1).toUpperCase()}
                    </AvatarFallback>
                    <AvatarImage src={activeGoogleAccount.user?.picture} />
                  </Avatar>
                  <span>
                    {
                      activeGoogleAccount.user?.email
                    }
                  </span>
                </Button>
                </li>
                <li>
                <Button variant={"destructive"}
                  className="h-fit"
                  onClick={handleRevokeAuthorization}
                  disabled={revokeMutation.isPending}
                >
                  Desconectar cuenta de Google
                </Button>
                </li>
              </ul>
            </PopoverContent>
          )
        }
      </Popover>
  );
}
