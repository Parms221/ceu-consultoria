"use client"
import GoogleLogo from "@/components/common/GoogleLogo";
import { Button } from "@/components/ui/button";
import { getGoogleAuthUrl } from "@/lib/google";
import { fetcherLocal } from "@/server/fetch/client-side";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

/* Componente para la  autorización de acceso a api de google en backend */
export default function GoogleAuth() {
  const path = usePathname();
  const  { data : isAuthorized } = useQuery({
    queryKey: ["google-auth", "verify"],
    queryFn: async () => {
      const response = await fetcherLocal("/authorize/verify")
      if (response.ok){
        const data = await response.json();
        return data.authorized === "true";
      }
      return null
    }
  })

  const handleAuthorization  = () => {
    const authUrl = getGoogleAuthUrl();
    authUrl.searchParams.append("state", path);
    window.location.href = authUrl.toString();
  }
  
  const handleRevokeAuthorization  = () => {
    confirm("¿Estás seguro de querer desconectar tu cuenta de google?");
  }

  function handleClick() {
    if (isAuthorized){
      handleRevokeAuthorization();
    }else {
      handleAuthorization();
    }
  }

  return (
      <Button
          onClick={handleClick}
          variant={isAuthorized ? "default" : "outline"}
          className="space-x-2"
      >
        <GoogleLogo className="h-6 w-6" />
        <span>
          {
            isAuthorized ? "Cuenta conectada" : "Enlazar cuenta con Google"
          }
        </span>
      </Button>
  );
}
