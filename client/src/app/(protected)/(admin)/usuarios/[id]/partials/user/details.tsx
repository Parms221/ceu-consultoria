"use client"
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getReadableRole } from "@/lib/rol";
import { Usuario } from "@/types/usuario";
import { AvatarFallback } from "@radix-ui/react-avatar";
import UserDetailsForm from "./form";
import UserPasswordReset from "./password-form";
import GoogleAuth from "@/components/common/GoogleAuthorization/google-auth";

interface IUserDetailProps {
  usuario : Usuario;
  currentUser? : boolean;
}

export default function UserDetails({ usuario, currentUser = false } : IUserDetailProps) {
    return (
        <div className="px-4 pb-6 lg:pb-8 xl:pb-11.5">
        <header className="flex justify-between">
            <div className="flex items-center gap-4">
              <div className="max-w-20 rounded-full">
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
              {/* User name and rol */}
              <div className="mt-2">
                <h3 className="text-2xl font-semibold text-black dark:text-white">
                  {usuario.name}
                </h3>
                <p className="font-medium">
                  {getReadableRole(usuario.roles[0].rol)}
                </p>     
              </div>
            </div>
            <aside>
              {/* authorize user to google  */}
              {
                currentUser && <GoogleAuth />
              }
            </aside>
        </header>
        <div className="space-y-4 mt-4
        [&>article>h4]:text-ceu-celeste 
          [&>article>h4]:font-bold
          [&>article>h4]:text-lg
          ">
          <article>
              <h4>Datos de usuario</h4>
              <UserDetailsForm  usuario={usuario} currentUser={currentUser}/>
            </article>
            <article>
              <h4>Contraseña</h4>
              <UserPasswordReset  usuario={usuario}/>
            </article>  
        </div> 
      </div>
    );
}