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

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Event } from "@/types/calendar";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Loader from "@/components/common/Loader";
import { CalendarOptions, EventSourceInput } from "@fullcalendar/core/index.js";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Reunion } from "@/types/proyecto/Reunion";
import CalendarDetalleReunion from "./partials/detalle-reunion";
import CalendarDetalleEvento from "./partials/detalle-evento";
import { AllEventsResponse } from "@/types/calendar/dto";

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
  const [calendarEvents, setCalendarEvents] = useState<EventSourceInput>([]);

  const {
    data: eventos,
    isLoading,
    isError,
  } = useQuery<AllEventsResponse>({
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
    if(eventos){
      let reuniones : EventSourceInput = []
      let gCalendarEventos : EventSourceInput = []
      reuniones = eventos.reuniones?.map((r) => ({
        id: r.idReunion.toString(),
        title: r.titulo,
        start: r.fechaInicio,
        end: r.fechaFin,
        color: "#0035B9",
        extendedProps: {
          ...r,
          type: "reunion"
        }
      }));
      gCalendarEventos = eventos.events?.map((e) => ({
        id: e.id?.toString(),
        title: e.summary,
        start: e.start?.dateTime
          ? e.start.dateTime.value
          : new Date(),
        end: e.end?.dateTime
          ? e.end.dateTime.value
          : new Date(),
         extendedProps: {
          ...e,
          type: "g-evento"
         },
         color: "#34A853",
      }));
      setCalendarEvents([...reuniones, ...gCalendarEventos]);
    }
  }, [eventos]);



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
            events={calendarEvents ? calendarEvents : []}
           
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
                    className="z-99999 w-[400px] px-2 py-0"
                  >
                    {
                      e.event.extendedProps.type === "reunion" ? (
                        <CalendarDetalleReunion reunion={e.event.extendedProps as Reunion} />
                      ) : (
                        <CalendarDetalleEvento event={e.event.extendedProps as Event} />
                      )
                    }
                  </PopoverContent>
                </Popover>
              )
            }} // custom render function
            // eventClick={handleEventClick}
            // eventsSet={handleEvents} // called after events are initialized/added/changed/removed
            // /* you can update a remote database when these fire:
            // eventAdd={function(e){
            //   console.log("eventAdd", e)
            // }}
            // eventChange={function(){}}
            // eventRemove={function(){}}
          />
        )}
      </Card>
    </section>
  );
};

export default CalendarEvents;
