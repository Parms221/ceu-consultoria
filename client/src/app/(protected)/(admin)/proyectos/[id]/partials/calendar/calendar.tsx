"use client"
import { Calendar } from "@/components/ui/calendar";
import { Card} from "@/components/ui/card";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { fetcherLocal } from "@/server/fetch/client-side";
import { Event } from "@/types/calendar";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { useQuery } from "@tanstack/react-query";
import { es } from "date-fns/locale/es";
import { CalendarDaysIcon, CalendarFoldIcon } from "lucide-react";
import { useState } from "react";
import { DayContentProps, DayProps } from "react-day-picker";
import { toast } from "sonner";
import EventDetail from "./event-detail";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function EventsCalendar() {
  const [selectedEvents, setSelectedEvents] = useState<Event[] | null>(null);

  const { data : eventos, isLoading, isError} = useQuery({
    queryKey: ["eventos"],
    queryFn: async () => {
     try{
      const response = await fetcherLocal("/calendars/events")
      if (!response.ok){
        // if(response.status === 401){
        //   toast.warning("No ha autorizado el acceso a su calendario de eventos en Google Calendar")
        // }
        return null
      }
      const data = await response.json()
      return data
     }catch(e){
       toast.error("Error al obtener eventos" + e)
       return null
      }
  }})

  return (
    <div className="relative">
        <Popover>
            <PopoverTrigger className="bg-white p-2 rounded-full">
                <CalendarFoldIcon className="h-8 w-8 text-ceu-celeste hover:scale-105"  strokeWidth={1}/>
            </PopoverTrigger>
            <PopoverContent align="start" side="left" className="relative">
                <Calendar 
                mode="single"
                captionLayout="dropdown-buttons"
                fromDate={new Date(2021, 1)}
                toDate={new Date(new Date(2034, 11))}
                locale={es}
                modifiers={{
                    booked: eventos?.map((event : Event) => {
                        if (event.start?.dateTime)
                            return new Date(event.start.dateTime.value)
                        return null
                    })
                }}
                onDayClick={(date, modifiers, event) => {
                    event.preventDefault()
                    event.stopPropagation()
                    if (modifiers.booked) {
                        const newEvents = eventos?.filter(
                            (event : Event) => {
                                if (event.start?.dateTime)
                                    return new Date(event.start.dateTime.value).toDateString() !== date.toDateString()
                            }
                        );
                        setSelectedEvents([...newEvents]);
                        document.getElementById("event-details")?.click()
                    }
                }}
                modifiersClassNames={{
                    booked: "bg-red text-white hover:bg-red/50"
                }}
                />
            </PopoverContent>
        </Popover>

        <Dialog modal={false}>
            <DialogTrigger id="event-details">
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>
                    Detalles del evento {selectedEvents && selectedEvents[0].summary}
                </DialogTitle>
                {
                    JSON.stringify(selectedEvents && selectedEvents[0])
                }
            </DialogContent>
        </Dialog>
    </div>
  );
};