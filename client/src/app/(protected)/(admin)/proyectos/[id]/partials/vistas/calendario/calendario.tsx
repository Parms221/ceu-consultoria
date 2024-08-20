"use client";

import CalendarEvents from "@/components/common/EventsCalendar/Calendar";
import CalendarProvider from "@/components/common/EventsCalendar/context/calendar.context";
import { AllEventsResponse } from "@/types/calendar/dto";
import { useQuery } from "@tanstack/react-query";
import { useProjectDetail } from "../../contexto/proyecto-detail.context";
import { fetcherLocal } from "@/server/fetch/client-side";
import { useEffect, useState } from "react";
import { EventSourceInput } from "@fullcalendar/core/index.js";
import { setCalendarDataFromAllEventsResponse } from "@/lib/calendar";
import EventContent from "@/app/(protected)/(consultor)/my/calendario/partials/event-content";

export default function VistaCalendario() {
    const { projectId } = useProjectDetail();
    const [events, setEvents] = useState<EventSourceInput>([]);
    const query = useQuery<AllEventsResponse>({
        queryKey: ["calendario", projectId],
        queryFn: async () => {
            const response = await fetcherLocal(`/calendars/events/${projectId}`);
            return response.json();
        },
    });

    useEffect(()=>{
        if(query.data){
            const { eventosData, reunionesData, tareasData } = setCalendarDataFromAllEventsResponse(query.data);
            setEvents([...reunionesData, ...tareasData]);
        }
    }, [query.data])

    return (
        <section className="h-[calc(100vh-150px)]">
            <CalendarProvider 
                calendarEvents={events}
                eventContent={(e) => <EventContent e={e}/>}
                query={query}
            >
                <CalendarEvents />
            </CalendarProvider>
        </section>
    )
}