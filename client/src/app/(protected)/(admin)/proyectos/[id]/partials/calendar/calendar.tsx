"use client"
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { fetcherLocal } from "@/server/fetch/client-side";
import { Event } from "@/types/calendar";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { useQuery } from "@tanstack/react-query";
import { es } from "date-fns/locale/es";
import { CalendarFoldIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { AllEventsResponse } from "@/types/calendar/dto";
import { Reunion } from "@/types/proyecto/Reunion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function EventsCalendar() {
  const [selectedEvents, setSelectedEvents] = useState<Event[]>([]);
  const [selectedReunions, setSelectedReunions] = useState<Reunion[]>([]);
  const [bookedEvents, setBookedEvents ] = useState<Event[]>([]);
  const [bookedReunions, setBookedReunions ] = useState<Reunion[]>([]);

  const [bookedDates, setBookedDates] = useState<Date[]>([]);

  const { data : eventos, isLoading, isError} = useQuery<AllEventsResponse>({
    queryKey: ["eventos"],
    queryFn: async () => {
     try{
      const response = await fetcherLocal("/calendars/events/all")
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

  useEffect(() => {
    if(eventos){
       setBookedEvents([...eventos.events])
       setBookedReunions([...eventos.reuniones])
       let bookedDates : Date[] = []
       eventos.events.forEach(e => {
        if (e.start?.dateTime)
          bookedDates.push(new Date(e.start.dateTime.value))
       })
       eventos.reuniones.forEach(r => {
        if (r.fechaInicio)
          bookedDates.push(new Date(r.fechaInicio))
       })
       setBookedDates([...bookedDates])
    }
  }, [eventos]);

  
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
                    booked: bookedDates
                }}
                onDayClick={(date, modifiers, event) => {
                    event.preventDefault()
                    event.stopPropagation()
                    if (modifiers.booked) {
                        const selectedEvs = bookedEvents?.filter(
                            (event : any) => {
                                if (event.start?.dateTime)
                                    return new Date(event.start.dateTime.value).toDateString() === date.toDateString()
                            }
                        );
                        const selectedRns = bookedReunions?.filter(
                            (reunion : Reunion) => {
                                return new Date(reunion.fechaInicio).toDateString() === date.toDateString()
                            }
                        );
                        setSelectedEvents([...selectedEvs]);
                        setSelectedReunions([...selectedRns]);
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
                    Detalles de eventos para este día
                </DialogTitle>
                <div>
                    <Accordion collapsible type="single">
                      {
                        selectedReunions?.map((e : Reunion, index) => {
                          return (
                            <AccordionItem value={e.idReunion.toString()} key={index}>
                              <AccordionTrigger>
                                {e.titulo}
                              </AccordionTrigger>
                              <AccordionContent>
                                {JSON.stringify(e.fechaInicio)}
                              </AccordionContent>
                            </AccordionItem>
                          )
                        })
                      }
                      {
                        selectedEvents?.map((e : Event, index) => {
                          return (
                            <AccordionItem value={e.id ? e.id : crypto.randomUUID()} key={index}>
                              <AccordionTrigger>
                                {e.summary}
                              </AccordionTrigger>
                              <AccordionContent>
                                {e.description}
                              </AccordionContent>
                            </AccordionItem>
                          )
                        })
                      }
                    </Accordion>
                </div>
            </DialogContent>
        </Dialog>
    </div>
  );
};