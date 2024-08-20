"use client"
import { Usuario } from "@/types/usuario";
import { useSession } from "next-auth/react";
import UserDetails from "../usuarios/[id]/partials/user/details";
import { Card } from "@/components/ui/card";

export default function Profile() {
  const { data : session , status } = useSession()
  const user = session?.user as unknown as Usuario;
    
  if (status === "loading") {
    return <div></div>;
  }

  return <Card>
    <UserDetails usuario={user} currentUser />
  </Card>;
}