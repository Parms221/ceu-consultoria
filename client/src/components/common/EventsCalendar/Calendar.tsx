"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';
import Loader from "@/components/common/Loader";
import { CalendarOptions } from "@fullcalendar/core/index.js";
import { useCalendar } from "./context/calendar.context";
import { Fragment } from "react";

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


export default function CalendarEvents() {
  const { calendarEvents, handleDateSelect, query, eventContent} = useCalendar();
  const {isLoading, data: eventos} = query;
  return (
    <Fragment>
        {isLoading && <Loader />}

        {eventos && (
          <FullCalendar
            {...CalendarInit}
            height={"100%"}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            events={calendarEvents ? calendarEvents : []}
            initialView="dayGridMonth"
            // weekends={weekendsVisible}
            select={handleDateSelect}
            eventContent={eventContent} // custom render function
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
    </Fragment>
  );
};