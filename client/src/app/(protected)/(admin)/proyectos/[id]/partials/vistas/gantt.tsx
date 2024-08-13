import React, { useEffect, useRef } from 'react';
import Gantt from 'frappe-gantt';
import 'frappe-gantt/dist/frappe-gantt.css';
import { useProjectDetail } from "../contexto/proyecto-detail.context";
import useHito from "@/hooks/Hito/useHito";
import { TAREA_ESTADOS } from "@/constants/proyectos/estados";

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
  const { projectId } = useProjectDetail(); // Obtener el projectId
  const { getHitosQuery } = useHito(); 
  const { data: hitos, isLoading, isError } = getHitosQuery(projectId);

  useEffect(() => {
    if (ganttRef.current && hitos) {
      // Mapeo de hitos y tareas del hito a las tareas del Gantt
      const tareas = hitos.flatMap(hito => [
        {
          id: hito.titulo,
          name: hito.titulo,
          start: hito.fechaInicio,
          end: hito.fechaFinalizacion,
          progress: 0,
          dependencies: '', 
        },
        ...hito.tareasDelHito.map(tarea => ({
          id: tarea.titulo,
          name: tarea.titulo,
          start: tarea.fechaInicio,
          end: tarea.fechaFin,
          progress: getProgressFromEstado(tarea.estado.idEstado), 
          dependencies: hito.titulo,
        }))
      ]);

      const configuration = {
        header_height: 50,
        column_width: 30,
        step: 24,
        view_modes: ['Quarter Day', 'Half Day', 'Day', 'Week', 'Month'],
        bar_height: 20,
        bar_corner_radius: 3,
        arrow_curve: 5,
        padding: 18,
        view_mode: 'Day',
        date_format: 'YYYY-MM-DD',
        language: 'es'
      };

      const gantt = new Gantt(ganttRef.current, tareas, configuration);

      // Desactivar la edición y el movimiento de las barras del diagrama
      const ganttElement = ganttRef.current;
      if (ganttElement) {
        // Seleccionar todas las barras de tareas y desactivar los eventos
        const bars = ganttElement.querySelectorAll<HTMLElement>('.bar');
        bars.forEach(bar => {
          bar.style.pointerEvents = 'auto';
        });

        // Seleccionar todas las tareas y desactivar los eventos
        // const tasks = ganttElement.querySelectorAll<HTMLElement>('.task');
        // tasks.forEach(task => {
        //   task.style.pointerEvents = 'none';
        // });
      }
    }
  }, [hitos]);

  if (isLoading) {
    return <div>Cargando ...</div>;
  }

  if (isError || !hitos) {
    return <div>Error al cargar el cronograma</div>;
  }

  return (
    <div className="p-4">
      <div ref={ganttRef} className="gantt-chart"></div>
    </div>
  );
}

