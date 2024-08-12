"use client";
import { Card } from "@/components/ui/card";
import { fetcherLocal } from "@/server/fetch/client-side";
import { useQuery } from "@tanstack/react-query";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';

import { useState } from "react";
import { toast } from "sonner";
import { Event } from "@/types/calendar";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Loader from "@/components/common/Loader";
import { CalendarOptions } from "@fullcalendar/core/index.js";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const CalendarInit: CalendarOptions = {
  locale: esLocale,
  buttonText: {
    today: "Hoy",
    month: "Mes",
    week: "Semana",
    day: "Día",
    list: "Lista",
  },
  headerToolbar : {
    left: "title",
    right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek prev,next,today",
  },
  editable: true,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  nowIndicator: true,
};

const CalendarEvents = () => {
  const [selectedEvents, setSelectedEvents] = useState<any[] | null>(null);

  const {
    data: eventos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["eventos"],
    queryFn: async () => {
      try {
        const response = await fetcherLocal("/calendars/events");
        if (!response.ok) {
          if (response.status === 401) {
            toast.error(
              "No ha autorizado el acceso a su calendario de eventos en Google Calendar",
            );
          }
          return null;
        }
        const data = await response.json();
        return data as Event[];
      } catch (e) {
        toast.error("Error al obtener eventos" + e);
        return null;
      }
    },
  });

  function handleDateSelect(selectInfo: any) {
    console.log("selectInfo", selectInfo);
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: crypto.randomUUID(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  }

  return (
    <section>
      <Breadcrumb pageName="Calendario de eventos" slug="" />
      <Card className="h-[calc(100vh-100px)] overflow-auto">
        {isLoading && <Loader />}

        {eventos && (
          <FullCalendar
            height={"100%"}
            {...CalendarInit}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            events={eventos.map((evento: Event) => ({
              id: evento.id,
              title: evento.summary,
              start: evento.start?.dateTime
                ? evento.start.dateTime.value
                : new Date(),
              end: evento.end?.dateTime
                ? evento.end.dateTime.value
                : new Date(),
               extendedProps: {
                hola: "hola",
               },
               color: evento.colorId,
            }))}
           
            initialView="timeGridWeek"
            // weekends={weekendsVisible}
            select={handleDateSelect}
            eventContent={(e)=> {
              return (
                <Popover>
                  <PopoverTrigger className="w-full h-full">
                    {e.event.title}
                  </PopoverTrigger>
                  <PopoverContent
                    align="start" side="left"
                    className="w-120"
                  >
                    hola detalle evento :v
                    {e.event.start?.toLocaleString()} - {e.event.end?.toLocaleString()}
                    {JSON.stringify(e.event.extendedProps)}
                  </PopoverContent>
                </Popover>
              )
            }} // custom render function
            // eventClick={handleEventClick}
            // eventsSet={handleEvents} // called after events are initialized/added/changed/removed
            // /* you can update a remote database when these fire:
            eventAdd={function(e){
              console.log("eventAdd", e)
            }}
            eventChange={function(){}}
            eventRemove={function(){}}
            // */
          />
        )}
      </Card>
    </section>
  );
};

export default CalendarEvents;
