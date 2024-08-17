"use client";
import { AllEventsResponse } from "@/types/calendar/dto";
import { EventContentArg, EventSourceInput } from "@fullcalendar/core/index.js";
import { useQuery } from "@tanstack/react-query";
import { useContext, createContext, useState, useEffect } from "react";

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
            id: crypto.randomUUID(),
            title,
            start: selectInfo.startStr,
            end: selectInfo.endStr,
            allDay: selectInfo.allDay,
          });
        }
      }

    return (
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
    )
}

export function useCalendar(){
    const context = useContext(CalendarContext);
    if (!context) {
        throw new Error("useCalendar debe estar dentro de un CalendarContext");
    }
    return context;
}