import { AllEventsResponse } from "@/types/calendar/dto";
import { EventSourceInput } from "@fullcalendar/core/index.js";

interface Colors {
    colors?: {
        tareaColor: string
        reunionColor: string
        eventoColor: string
    }
}

export function setCalendarDataFromAllEventsResponse({ events, reuniones, tareas, colors } : AllEventsResponse & Colors){
    let reunionesData : EventSourceInput = []
    let eventosData : EventSourceInput = []
    let tareasData : EventSourceInput = []

    reunionesData = reuniones?.map((r) => ({
        id: r.idReunion.toString(),
        title: r.titulo,
        start: r.fechaInicio,
        end: r.fechaFin,
        color: colors?.reunionColor ??  "#34A853",
        extendedProps: {
          ...r,
          type: "reunion"
        }
    }));
    eventosData = events.map((e) => ({
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
       color: colors?.eventoColor ?? "#CDD6FD",
    }));

    tareasData = tareas?.map((t) => ({
      id: t.idTarea?.toString(),
      title: t.titulo,
      start: t.fechaInicio,
      end: t.fechaFin,
      color: colors?.tareaColor ?? "#0035B9",
      extendedProps: {
        ...t,
        type: "tarea"
      }
    }));

    return { reunionesData, eventosData, tareasData }
}