"use client";
import TareaFormProvider from "@/hooks/Tarea/useTareaForm.context";
import { AllEventsResponse } from "@/types/calendar/dto";
import { EventContentArg, EventSourceInput } from "@fullcalendar/core/index.js";
import { useQuery } from "@tanstack/react-query";
import { useContext, createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

interface ICalendarContext {
    query : ReturnType<typeof useQuery<AllEventsResponse>>
    calendarEvents : EventSourceInput
    handleDateSelect? : (selectInfo: any) => void
    eventContent : (e: EventContentArg) => React.ReactNode
}

interface CalendarProviderProps extends ICalendarContext {
    children: React.ReactNode;
}

export const CalendarContext = createContext<ICalendarContext>(
    {} as ICalendarContext,
  );

export default function CalendarProvider(
    {children, query, calendarEvents, eventContent} : CalendarProviderProps
){
      function handleDateSelect(selectInfo: any) {
        console.log("selectInfo", selectInfo);
        let title = prompt("Please enter a new title for your event");
        let calendarApi = selectInfo.view.calendar;
    
        calendarApi.unselect(); // clear date selection
    
        if (title) {
          calendarApi.addEvent({
            id: uuidv4(),
            title,
            start: selectInfo.startStr,
            end: selectInfo.endStr,
            allDay: selectInfo.allDay,
          });
        }
      }

    return (
        // Para el manejo de estados de formulario de tarea en el calendario de eventos
        <TareaFormProvider>
            <CalendarContext.Provider
                value={{
                    query,
                    calendarEvents,
                    eventContent,
                    handleDateSelect
                }}
            >
                {children}
            </CalendarContext.Provider>
        </TareaFormProvider>
    )
}

export function useCalendar(){
    const context = useContext(CalendarContext);
    if (!context) {
        throw new Error("useCalendar debe estar dentro de un CalendarContext");
    }
    return context;
}