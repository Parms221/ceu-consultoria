"use client"
import GoogleCalendarLink from "@/components/common/EventsCalendar/google-calendar-link"
import GoogleCalendarSVG from "@/components/common/Icons/GoogleCalendarLogo"
import { Button } from "@/components/ui/button"
import DeleteDialog from "@/components/ui/dialogs/delete-dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import useReunion from "@/hooks/Reuniones/useReunion"
import { Reunion } from "@/types/proyecto/Reunion"
import { Usuario } from "@/types/usuario"
import { InfoCircledIcon } from "@radix-ui/react-icons"
import { useQueryClient } from "@tanstack/react-query"
import { Edit, Info, LucideUsers2, Trash2Icon, User2Icon, Users } from "lucide-react"
import { useSession } from "next-auth/react"

export default function ItemOptions(
    { reunion }: { reunion: Reunion }
) {
    const { data : session } = useSession()
    const currentUser = session?.user as unknown as Usuario
    const { deleteReunionById } = useReunion()
    const queryclient = useQueryClient()

    function ItemDetail(
        { icon, title, value }: { icon?: React.ReactNode, title: string, value?: string }
    ){
        return (
            <div className="text-xs text-ceu-azul flex items-center gap-2">
              {icon}
              <div className="flex flex-col">
                <span>
                  {title}
                </span>
                <strong>
                {value}
                </strong>
              </div>
            </div>
        )
    }

    return (
        <aside className="space-y-2 relative">
            <div className="absolute top-0 right-0">
                {
                    reunion.eventHtmlLink && (
                        <GoogleCalendarLink reunion={reunion} />
                    )
                }
            </div>

            <ItemDetail
                icon={<User2Icon size={15}/>}
                title="Programada por"
                value={reunion.eventOrganizer ?? reunion.usuario.email}
            />
            <div className="flex flex-col gap-1">
                {
                    reunion.invitados.length > 0 && (
                        <ItemDetail
                            icon={<LucideUsers2 size={15}/>}
                            title={`${reunion.invitados.length} invitado(s)`}
                        />
                    )
                }
                <ul className="text-xs ml-6 text-ceu-azul font-semibold">
                    {
                        reunion.invitados.map(invitado => (
                            <li key={invitado.idInvitado}>
                                {invitado.email}
                            </li>
                        ))
                    }
                </ul>
            </div>

            {
             currentUser.id == reunion.usuario.id && (
                <div className="flex items-center w-full [&>button]:w-full [&>button]:h-fit [&>button]:p-0 [&>button]:rounded-none divide-x [&>button>svg]:w-4">
                  <Button>
                    <Edit />
                  </Button>
                  <DeleteDialog 
                        asChild
                        customTrigger={
                            <Button variant={"destructive"}>
                                <Trash2Icon />
                            </Button>
                        }                            title="Eliminar reunión"
                        description={<div className="flex flex-col gap-y-2">
                           <p>
                            Está seguro que quiere eliminar la reunión 
                            {<span className="font-bold"> {reunion.titulo}</span>}
                           </p>
                           {
                            reunion.eventId && (
                                <p className="text-sm text-red flex items-center gap-2">
                                    <InfoCircledIcon/>
                                    <span>
                                        Esta reunión está asociada a un evento de Google Calendar.
                                    </span>
                                </p>   
                            )
                           }
                        </div>}
                        onDelete={async () => {
                            await deleteReunionById(reunion.idReunion)
                            queryclient.invalidateQueries({
                                queryKey : ["reuniones"]
                            });
                        }}
                    />
                </div>
              )
            }
         </aside>
    )
}