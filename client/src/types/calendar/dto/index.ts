import { Reunion } from "@/types/proyecto/Reunion"
import { Event } from ".."
import { Tarea } from "@/types/proyecto/Tarea"

export interface AllEventsResponse {
    reuniones : Reunion[]
    events : Event[]
    tareas : Tarea[]
  } 
  