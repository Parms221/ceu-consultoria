"use client";
import { Card } from "@/components/ui/card";
import { fetcherLocal } from "@/server/fetch/client-side";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { AllEventsResponse } from "@/types/calendar/dto";
import CalendarProvider from "@/components/common/EventsCalendar/context/calendar.context";
import CalendarEvents from "@/components/common/EventsCalendar/Calendar";
import { EventSourceInput } from "@fullcalendar/core/index.js";
import { setCalendarDataFromAllEventsResponse } from "@/lib/calendar";
import EventContent from "./partials/event-content";

const Calendar = () => {
  const [calendarEvents, setCalendarEvents] = useState<EventSourceInput>([]);

  const query = useQuery<AllEventsResponse>({
    queryKey: ["eventos"],
    queryFn: async () => {
      try {
        const response = await fetcherLocal("/calendars/events/all");
        if (!response.ok) {
          if (response.status === 401) {
            toast.error(
              "No ha autorizado el acceso a su calendario de eventos en Google Calendar",
            );
          }
          return null;
        }
        const data = await response.json();
        return data;
      } catch (e) {
        toast.error("Error al obtener eventos" + e);
        return null;
      }
    },
  });

  useEffect(() => {
    if(query.data){
      const { eventosData, reunionesData, tareasData} = setCalendarDataFromAllEventsResponse(query.data) 
      setCalendarEvents([...reunionesData, ...eventosData, ...tareasData]);
    }
  }, [query.data]);

 
  return (
    <section>
        <Breadcrumb pageName="Calendario de eventos" slug="" />
        <Card className="h-[calc(100vh-100px)] overflow-auto">
          <CalendarProvider
            query={query}
            calendarEvents={calendarEvents}
            eventContent={(e) => <EventContent e={e}/>}
          >
            <CalendarEvents />
          </CalendarProvider>
        </Card>
    </section>
  );
};

export default Calendar;
