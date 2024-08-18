import { Hito } from "@/types/proyecto/Hito";
import { HitoDTO } from "@/types/proyecto/Hito/dto/HitoDTO";
import { Tarea, TareaDTO } from "@/types/proyecto/Tarea";

export function convertFromTareaToDTO(tarea : Tarea) : TareaDTO {
  return {
    ...tarea,
    idTarea : tarea.idTarea?.toString(),
    estado : tarea.estado?.idEstado,
    fechaInicio : new Date(tarea.fechaInicio),
    fechaFin : new Date(tarea.fechaFin),
    tareaAnterior : undefined, // Por el momento no se usa la tarea anterior
    participantesAsignados: tarea.participantesAsignados ?
      tarea.participantesAsignados.map(p => p.idParticipante) : undefined,
    subtareas: tarea.subTareas ? tarea.subTareas.map(t => ({
      descripcion: t.descripcion,
      completado: t.completado,
    })) : [],
  }
}

export function convertFromHitoToDTO(hito: Hito): HitoDTO {
    return {
        ...hito,
        tareas: hito.tareasDelHito.map(t => convertFromTareaToDTO(t)),
        fechaFinalizacion: new Date(hito.fechaFinalizacion),
        fechaInicio: new Date(hito.fechaInicio),
    }
}