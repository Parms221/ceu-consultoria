import { Reunion } from "@/types/proyecto/Reunion";
import ItemDetail from "@/components/common/EventsCalendar/partials/item-detail";
import { LucideUsers2, TextIcon, User2Icon, VideoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import GoogleCalendarSVG from "@/components/common/Icons/GoogleCalendarLogo";
import { formatDateRange } from "@/lib/date-format";

export default function CalendarDetalleReunion(
    { reunion }: { reunion: Reunion }
){
    
    return (
        <div className="flex flex-col gap-2 overflow-hidden py-4 px-4">
            {/* Detalles de reunión */}
            <header className="space-y-1">
                <h1 className="trackin font-medium dark:text-white leading-none whitespace-break-spaces">
                    {reunion.titulo}    
                </h1>    
                <p className="text-xs text-neutral-600 leading-none">
                    {formatDateRange(reunion.fechaInicio, reunion.fechaFin)}
                </p>
            </header>  
            <ItemDetail
                icon={<User2Icon size={20}/>}
                title="Programada por"
                value={reunion.eventOrganizer ?? reunion.usuario.email}
            />

            <ItemDetail
                icon={<VideoIcon size={20}/>}
                title={
                    <Button size={"sm"} className="text-xs">
                        <a href={reunion.enlace} target="_blank" rel="noreferrer">
                            Unirse con Google Meet
                        </a>
                    </Button>
                }
                value={reunion.enlace}
            />
            {
                reunion.eventHtmlLink && (
                    <ItemDetail
                        icon={ 
                            <GoogleCalendarSVG className="w-5 h-5" />
                        }
                        title={
                            <Button size={"sm"} className="text-xs">
                                <a href={reunion.eventHtmlLink} target="_blank" rel="noreferrer">
                                    Ir al evento
                                </a>
                            </Button>
                        }
                        value={"Ver evento en Google Calendar"}
                    />
                )
            }

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
                reunion.descripcion && (
                    <ItemDetail
                        icon={<TextIcon size={20}/>}
                        title="Descripción"
                        value={reunion.descripcion}
                    />
                )
            }
        </div>
    )
}