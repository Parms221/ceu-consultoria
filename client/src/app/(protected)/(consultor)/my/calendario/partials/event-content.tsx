import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import CalendarDetalleReunion from "./detalle-reunion";
import CalendarDetalleEvento from "./detalle-evento";
import { EventContentArg } from "@fullcalendar/core/index.js";
import { Reunion } from "@/types/proyecto/Reunion";
import { Event } from "@/types/calendar";
import CalendarDetalleTarea from "./detalle-tarea";
import { Tarea } from "@/types/proyecto/Tarea";
import { cn } from "@/lib/utils";

export function eventContent(e : EventContentArg) {
    return (
      <Popover>
        <PopoverTrigger className="overflow-hidden w-full">
          {e.event.title}
        </PopoverTrigger>
        <PopoverContent
          className={
            cn(
                "z-99999 px-2 py-0 max-h-[400px] overflow-y-auto w-[400px]",
                e.event.extendedProps.type === "tarea" && "w-full"
            )
          }
        >
          {
            e.event.extendedProps.type === "reunion" ? (
              <CalendarDetalleReunion reunion={e.event.extendedProps as Reunion} />
            ) : e.event.extendedProps.type === "tarea" ? (
                <CalendarDetalleTarea tarea={e.event.extendedProps as Tarea} />
            ) : (
              <CalendarDetalleEvento event={e.event.extendedProps as Event} />
            )
          }
        </PopoverContent>
      </Popover>
    )
}
