"use client"
import { Calendar } from "@/components/ui/calendar";
import { Card} from "@/components/ui/card";
import { fetcherLocal } from "@/server/fetch/client-side";
import { useQuery } from "@tanstack/react-query";
import { es } from "date-fns/locale/es";
import { useState } from "react";
import { toast } from "sonner";

const CalendarEvents = () => {
  const [selectedEvents, setSelectedEvents] = useState<any[] | null>(null);

  const { data : eventos, isLoading, isError} = useQuery({
    queryKey: ["eventos"],
    queryFn: async () => {
     try{
      const response = await fetcherLocal("/calendars/events")
      if (!response.ok){
        if(response.status === 401){
          toast.error("No ha autorizado el acceso a su calendario de eventos en Google Calendar")
        }
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
       <Card >
        <Calendar 
          mode="single"
          captionLayout="dropdown-buttons"
          fromDate={new Date(2021, 1)}
          toDate={new Date(new Date(2034, 11))}
          locale={es}
          modifiers={{
            booked: eventos?.map((event : any) => new Date(event.start.dateTime.value))
          }}
          onDayClick={(date, modifiers) => {
            if (modifiers.booked) {
              const newEvents = eventos.filter(
                (event : any) => new Date(event.start.dateTime.value).toDateString() !== date.toDateString()
              );
              setSelectedEvents([...newEvents]);
            }
          }}
          modifiersClassNames={{
            booked: "bg-red text-white hover:bg-red/50"
          }}
        />
        <pre>
          {selectedEvents && JSON.stringify(selectedEvents)}
        </pre>
       </Card>
  );
};

export default CalendarEvents;
