import { Event } from "@/types/calendar";
import ItemDetail from "@/components/common/EventsCalendar/partials/item-detail";
import { LucideUsers2, TextIcon, User2Icon, VideoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import GoogleCalendarSVG from "@/components/common/Icons/GoogleCalendarLogo";

export default function CalendarDetalleEvento(
    { event }: { event: Event }
){
    return (
        <div className="flex flex-col gap-2 overflow-hidden py-4 px-4">
            {/* Detalles de reunión */}
            <header className="space-y-1">
                <h1 className="trackin font-medium dark:text-white leading-none whitespace-break-spaces">
                    {event.summary}    
                </h1>    
                {/* <p className="text-xs text-neutral-600 leading-none">
                    {formatRange(event.start?.dateTime?.value.toString(), event.end?.dateTime?.value.toString())}
                </p> */}
            </header>  
            <ItemDetail
                icon={<User2Icon size={20}/>}
                title="Programada por"
                value={event.organizer?.email ?? "Sin organizador"}
            />

            <ItemDetail
                icon={<VideoIcon size={20}/>}
                title={
                    <Button size={"sm"} className="text-xs">
                        <a href={event.hangoutLink} target="_blank" rel="noreferrer">
                            Unirse con Google Meet
                        </a>
                    </Button>
                }
                value={event.hangoutLink}
            />

            {
                event.htmlLink && (
                    <ItemDetail
                        icon={ 
                            <GoogleCalendarSVG className="w-5 h-5" />
                        }
                        title={
                            <Button size={"sm"} className="text-xs">
                                <a href={event.htmlLink} target="_blank" rel="noreferrer">
                                    Ir al evento
                                </a>
                            </Button>
                        }
                        value={"Ver evento en Google Calendar"}
                    />
                )
            }

            <div className="flex flex-col gap-1">
                {   event.attendees && event.attendees.length > 0  && (
                    <>
                        <ItemDetail
                            icon={<LucideUsers2 size={20}/>}
                            title={`${event.attendees.length} invitado(s)`}
                        />
                    <ul className="text-xs ml-6 text-ceu-azul font-semibold">
                    {
                        event.attendees.map((invitado: any) => (
                            <li key={invitado.id}>
                                {invitado.email}
                            </li>
                        ))
                    }
                </ul>
                </>
                )
                }
               
            </div>
            {
                event.description && (
                    <ItemDetail
                        icon={<TextIcon size={20}/>}
                        title="Descripción"
                        value={<>
                            <div
                                className="text-xs text-neutral-600 leading-none"
                                dangerouslySetInnerHTML={{ __html: event.description }}
                            />
                        </>}
                    />
                )
            }
        </div>
    )
}