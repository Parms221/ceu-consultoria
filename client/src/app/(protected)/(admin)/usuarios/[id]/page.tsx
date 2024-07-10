import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import Link from "next/link";
import { getUsuarioById } from "@/actions/Usuario";
import UserDetails from "./partials/user/details";

export default async function UserDetail({ params } : { params: { id: number } }) {
  const {id} = params
  const usuario = await getUsuarioById(id)

    return (
      <section className="mx-auto">
        <Breadcrumb pageName={"Perfil de usuario"} slug={usuario?.name}>
            <Link href="/usuarios">Usuarios / </Link>
        </Breadcrumb>
        
        <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          {/* TOP COVER */}
          <div className="relative z-1 h-24 md:h-30">
            <Image
              src={"/images/cover/cover-01.png"}
              alt="profile cover"
              className="h-auto max-h-[160px] w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
              width={970}
              height={260}
            />
          </div>
          {
            usuario && <UserDetails usuario={usuario} />
          }
        </div>
      </section>
    );
}