import React, { useEffect, useRef } from 'react';
import 'frappe-gantt/dist/frappe-gantt.css';
import { useProjectDetail } from "../contexto/proyecto-detail.context";
import useHito from "@/hooks/Hito/useHito";
import { TAREA_ESTADOS } from "@/constants/proyectos/estados";
import NewTaskModal from '../forms/Tareas';
import { VistaCronogramaActions } from './lista/lista';
import Gantt from 'frappe-gantt';
import useTarea from '@/hooks/Tarea/useTarea';
import EditHitoModal from './lista/dialogs/edit-hito';
import { useTareaForm } from '@/hooks/Tarea/useTareaForm.context';

type EstadoId = number;

const getProgressFromEstado = (estadoId: EstadoId): number => {
  switch (estadoId) {
    case TAREA_ESTADOS.por_hacer:
      return 0;
    case TAREA_ESTADOS.en_progreso:
      return 50;
    case TAREA_ESTADOS.hecho:
      return 100;
    default:
      return 0;
  }
};

export default function VistaGantt() {
  const ganttRef = useRef<HTMLDivElement>(null);
  const ganttInstanceRef = useRef<Gantt | null>(null);
  const newTaskDialogRef = useRef<DialogRef>(null)
  const newHitoDialogRef = useRef<DialogRef>(null)

  const { projectId, setSelectedHito, gptHitos } = useProjectDetail(); // Obtener el projectId
  const { setSelectedTask } = useTareaForm()
  
  const { getHitosQuery } = useHito(); 
  const { data: hitos, isLoading, isError } = getHitosQuery(projectId);
  const { convertFromTareaToDTO } = useTarea()

  const handleOpenTaskDialog = () => {
    if (newTaskDialogRef.current) {
      newTaskDialogRef.current.openDialog();
    }
  };

  const handleOpenHitoDialog = () => {
    if (newHitoDialogRef.current) {
      newHitoDialogRef.current.openDialog();
    }
  };

  useEffect(() => {
    if (ganttRef.current && hitos) {
      // Mapeo de hitos y tareas del hito a las tareas del Gantt
      const data = gptHitos ? gptHitos : hitos
      const tareas = data.flatMap(hito => [
        {
          type: "hito",
          id: hito.idHito.toString(),
          name: hito.titulo,
          start: hito.fechaInicio,
          end: hito.fechaFinalizacion,
          progress: 0,
          dependencies: '', 
          hito_obj: hito,
        },
        ...hito.tareasDelHito.map(tarea => ({
          type: "tarea",
          id: tarea.idTarea!.toString(),
          name: tarea.titulo,
          start: tarea.fechaInicio,
          end: tarea.fechaFin,
          progress: tarea.estado && getProgressFromEstado(tarea.estado.idEstado), 
          dependencies: hito.idHito.toString(),
          tarea_obj: tarea
        }))
      ]);

      const configuration : Gantt.Options = {
        header_height: 50,
        column_width: 30,
        step: 24,
        view_modes: ['Quarter Day', 'Half Day', 'Day', 'Week', 'Month'],
        bar_height: 20,
        bar_corner_radius: 3,
        arrow_curve: 5,
        padding: 18,
        view_mode: 'Day',
        date_format: 'YYYY-MM-DD hh:mm a',
        language: 'es',
      };

      

      if(!ganttInstanceRef.current){
        ganttInstanceRef.current = new Gantt(ganttRef.current, tareas, {
          ...configuration,
          on_click: function (task : any) {
            if(task.type === "tarea"){
              setSelectedTask(convertFromTareaToDTO(task.tarea_obj))
              handleOpenTaskDialog(); 
            } else {
              setSelectedHito(task.hito_obj)
              handleOpenHitoDialog();
            }
            console.log(task);
          },
          on_date_change: function(task: any, start: any, end: any) {
            console.log(task, start, end);
          },
        });
      }else {
        // ganttRef.current.remove()
        console.log("refresh")
        ganttInstanceRef.current.refresh(tareas)
      }

      // Desactivar la edición y el movimiento de las barras del diagrama
      const ganttElement = ganttRef.current;
      if (ganttElement) {
        // Seleccionar todas las barras de tareas y desactivar los eventos
        const bars = ganttElement.querySelectorAll<HTMLElement>('.bar');
        bars.forEach(bar => {
          bar.style.pointerEvents = 'auto';
        });
     
      }
    }
  }, [hitos, gptHitos]);

  if (isLoading) {
    return <div>Cargando ...</div>;
  }

  if (isError || !hitos) {
    return <div>Error al cargar el cronograma</div>;
  }

  return (
    <div className="p-4 relative">
      <div className='hidden'>
        <NewTaskModal ref={newTaskDialogRef}/>
        <EditHitoModal ref={newHitoDialogRef}/>
      </div>
      <VistaCronogramaActions />
      <div ref={ganttRef} className="gantt-chart"></div>
    </div>
  );
}

