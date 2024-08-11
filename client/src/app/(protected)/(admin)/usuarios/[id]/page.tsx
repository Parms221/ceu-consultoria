import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import Link from "next/link";
import { getUsuarioById } from "@/actions/Usuario";
import UserDetails from "./partials/user/details";
import { Card } from "@/components/ui/card";

export default async function UserDetail({ params } : { params: { id: number } }) {
  const {id} = params
  const usuario = await getUsuarioById(id)

    return (
      <section className="mx-auto">
        <Breadcrumb pageName={"Perfil de usuario"} slug={usuario?.name}>
            <Link href="/usuarios">Usuarios / </Link>
        </Breadcrumb>
        
        <Card>
          {/* TOP COVER */}
          {
            usuario && <UserDetails usuario={usuario} />
          }
        </Card>
      </section>
    );
}