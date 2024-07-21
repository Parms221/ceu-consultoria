"use client";
import { createContext, useContext, useState } from "react";
import { Proyecto } from "@/types/proyecto";
import { Hito } from "@/types/proyecto/Hito";
import { ParticipanteDTO, Tarea, TareaDTO } from "@/types/proyecto/Tarea";
import { FieldArrayWithId, useFieldArray, UseFieldArrayAppend, UseFieldArrayRemove, useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { hitoSchema, tareaSchema } from "@/app/(protected)/(admin)/proyectos/[id]/partials/forms/schemas";


interface IProjectDetailContext {
    // proyecto: Proyecto,
    selectedHito: Hito | null,
    selectedTask: Tarea | null,
    projectId: number,
    // setProyecto: (proyecto: Proyecto) => void
    setSelectedHito: (hito: Hito | null) => void
    setSelectedTask: (task: Tarea | null) => void 
    hitoForm : UseFormReturn<z.infer<typeof hitoSchema>, any, undefined>;
    tareaForm: UseFormReturn<z.infer<typeof tareaSchema>, any, undefined>;
    resetForms: () => void;

    subtareasFields: FieldArrayWithId<TareaDTO, "subtareas", "id">[];
    appendSubtarea: UseFieldArrayAppend<TareaDTO, "subtareas">;
    removeSubtarea: UseFieldArrayRemove;
}

export const ProjectDetailContext = createContext<IProjectDetailContext>(
  {} as IProjectDetailContext,
);

export default function ProjectDetailProvider({
  children, 
  // selectedProject
  projectId
}: {
  children: React.ReactNode,
  // selectedProject : Proyecto
  projectId : number
}) {

  // const [proyecto, setProyecto] = useState<Proyecto>(selectedProject);
  const [selectedHito, setSelectedHito] = useState<Hito | null>(null);
  const [selectedTask, setSelectedTask] = useState<Tarea | null>(null);

  // FORM SCHEMAS
  const tareaForm = useForm<z.infer<typeof tareaSchema>>({
    resolver: zodResolver(tareaSchema),
    defaultValues: {
        titulo: selectedTask ? selectedTask.titulo : "Nueva tarea",
        fechaFin: selectedTask ? new Date(selectedTask.fechaFin) : new Date(),
        fechaInicio: selectedTask ? new Date(selectedTask.fechaInicio) : new Date(),
        descripcion: selectedTask ? selectedTask.descripcion : "",
        estado: selectedTask ? selectedTask.estado.idEstado : 0,
        participantesAsignados: selectedTask ? 
          selectedTask.participantesAsignados.map(p => {
            return {idConsultor: p.consultorParticipante.idConsultor}}
          ) : [] as ParticipanteDTO[],
        subtareas: selectedTask ? selectedTask.subTareas : []
      }
  })
  
  const hitoForm = useForm<z.infer<typeof hitoSchema>>({
    resolver: zodResolver(hitoSchema),
    defaultValues: {
        titulo: selectedHito ? selectedHito.titulo : "Nueva tarea",
        fechaFinalizacion: selectedHito ? new Date(selectedHito.fechaFinalizacion) : new Date(),
        fechaInicio: selectedHito ? new Date(selectedHito.fechaInicio) : new Date(),
      }
  })
  
    const {
      fields: subtareasFields,
      append: appendSubtarea,
      remove: removeSubtarea,
    } = useFieldArray({
      control: tareaForm.control,
      name: "subtareas",
      rules: {
        required: true,
        minLength: 1,
      },
    });

    function resetForms(){
      tareaForm.reset()
      hitoForm.reset()
    }


  return (
    <ProjectDetailContext.Provider value={{ 
        // proyecto,
        // setProyecto,
        projectId,
        selectedHito,
        setSelectedHito,
        selectedTask,
        setSelectedTask,
        
        hitoForm,
        tareaForm,
        resetForms,

        appendSubtarea,
        removeSubtarea,
        subtareasFields
    }}>
        {children}
    </ProjectDetailContext.Provider>
  );
}

export function useProjectDetail() {
  const context = useContext(ProjectDetailContext);

  if (!context) {
    throw new Error(
      "useProjectForm debe estar dentro de un ProjectContext",
    );
  }

  return context;
}
