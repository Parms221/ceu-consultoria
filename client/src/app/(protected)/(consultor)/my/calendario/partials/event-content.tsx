"use client";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import CalendarDetalleReunion from "./detalle-reunion";
import CalendarDetalleEvento from "./detalle-evento";
import { EventContentArg } from "@fullcalendar/core/index.js";
import { Reunion } from "@/types/proyecto/Reunion";
import { Event } from "@/types/calendar";
import CalendarDetalleTarea from "./detalle-tarea";
import { cn } from "@/lib/utils";
import { useTareaForm } from "@/hooks/Tarea/useTareaForm.context";
import useTarea from "@/hooks/Tarea/useTarea";
import { Tarea } from "@/types/proyecto/Tarea";

interface EventContentProps {
    e : EventContentArg,
    triggerOnClick? : () => void
}

export default function EventContent(
  {e, triggerOnClick} : EventContentProps
) {
    const { setSelectedTask } = useTareaForm();
    const { convertFromTareaToDTO } = useTarea();
    
    return (
      <Popover>
        <PopoverTrigger className="overflow-hidden w-full"
          onClickCapture={() => {
            if(e.event.extendedProps.type === "tarea"){
            console.log("selected task", e.event.extendedProps)
              setSelectedTask(convertFromTareaToDTO(e.event.extendedProps as Tarea))
            }
            triggerOnClick && triggerOnClick()
          }}
        >
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
                <CalendarDetalleTarea />
            ) : (
              <CalendarDetalleEvento event={e.event.extendedProps as Event} />
            )
          }
        </PopoverContent>
      </Popover>
    )
}
