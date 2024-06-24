"use client"
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getReadableRole } from "@/lib/rol";
import { Usuario } from "@/types/usuario";
import { AvatarFallback } from "@radix-ui/react-avatar";
import UserDetailsForm from "./form";
import UserPasswordReset from "./password-form";

export default function UserDetails({ usuario } : { usuario : Usuario}) {
    return (
        <div className="px-4 pb-6 lg:pb-8 xl:pb-11.5">
        <header>
            <div className="grid place-content-center relative z-9 -mt-22 h-30 w-full max-w-30 rounded-full bg-ceu-celeste sm:h-44 sm:max-w-44">
              <div className="relative drop-shadow-2 w-full h-full">
                <Avatar className="w-full h-full">
                  <AvatarImage 
                    src="/images/user/user-05.png"
                    className="object-cover object-center w-full h-full"
                    alt="profile image"
                    width={320}
                    height={320}
                  />
                  <AvatarFallback className="text-white font-bold text-xl">
                    {usuario.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
            {/* User name and rol */}
            <div className="mt-2">
              <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                {usuario.name}
              </h3>
              <p className="font-medium">
                {getReadableRole(usuario.roles[0].rol)}
              </p>     
            </div>
        </header>
        <div className="space-y-4 mt-4 [&>article>h4]:text-ceu-celeste">
          <article>
              <h4 className="text-xl">Datos de usuario</h4>
              <UserDetailsForm  usuario={usuario}/>
            </article>
            <article>
              <h4 className="text-xl">Contraseña</h4>
              <UserPasswordReset  usuario={usuario}/>
            </article>  
        </div> 
      </div>
    );
}