"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { Hito } from "@/types/proyecto/Hito";
import { Tarea, TareaDTO } from "@/types/proyecto/Tarea";
import {
  FieldArrayWithId,
  useFieldArray,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  hitoSchema,
  tareaSchema,
} from "@/app/(protected)/(admin)/proyectos/[id]/partials/forms/schemas";
import { useQueryClient } from "@tanstack/react-query";
import { projectCompleteSchema } from "../../../nuevo/partials/schemas/project.schema";
import { temporalCronogramaSchema } from "../forms/schemas/temporal-cronograma.schema";

interface IProjectDetailContext {
  selectedHito: Hito | null;
  selectedTask: Tarea | null;
  projectId: number;
  feedbackClient: boolean | null;
  setFeedbackClient: (value: boolean | null) => void; 
  setSelectedHito: (hito: Hito | null) => void;
  setSelectedTask: (task: Tarea | null) => void;
  hitoForm: UseFormReturn<z.infer<typeof hitoSchema>, any, undefined>;
  tareaForm: UseFormReturn<z.infer<typeof tareaSchema>, any, undefined>;
  resetForms: () => void;

  subtareasFields: FieldArrayWithId<TareaDTO, "subtareas", "id">[];
  appendSubtarea: UseFieldArrayAppend<TareaDTO, "subtareas">;
  removeSubtarea: UseFieldArrayRemove;

  queryClient: ReturnType<typeof useQueryClient>;

  projectDetailForm: UseFormReturn<
    z.infer<typeof projectCompleteSchema>,
    any,
    undefined
  >;

  setGptHitos: (hitos: Hito[] | null) => void;
  gptHitos: Hito[] | null;
}

export const ProjectDetailContext = createContext<IProjectDetailContext>(
  {} as IProjectDetailContext,
);

export default function ProjectDetailProvider({
  children,
  projectId,
}: {
  children: React.ReactNode;
  projectId: number;
}) {
  const [selectedHito, setSelectedHito] = useState<Hito | null>(null);
  const [selectedTask, setSelectedTask] = useState<Tarea | null>(null);
  // Guardar hitos propuestos por la IA en memoria para poder editarlos
  const [gptHitos, setGptHitos] = useState<Hito[] | null>(null);
  const [feedbackClient, setFeedbackClient] = useState<boolean | null>(false);

  // Query client to invalidate queries
  const queryClient = useQueryClient();

  // FORM SCHEMAS
  const hitosDefaultValues = {
    titulo: selectedHito ? selectedHito.titulo : "Nueva tarea",
    fechas: {
      from: selectedHito ? new Date(selectedHito.fechaInicio) : new Date(),
      to: selectedHito ? new Date(selectedHito.fechaFinalizacion) : new Date(),
    },
    tareas: [],
  };

  const tareasDefaultValues = {
    titulo: "Nueva tarea",
    fechaFin: new Date(),
    fechaInicio: new Date(),
    descripcion: "",
    estado: undefined,
    participantesAsignados: [],
    subtareas: [],
  };

  // Forms
  const projectDetailForm = useForm<z.infer<typeof projectCompleteSchema>>({
    resolver: zodResolver(projectCompleteSchema),
    defaultValues: {},
  });

  const tareaForm = useForm<z.infer<typeof tareaSchema>>({
    resolver: zodResolver(tareaSchema),
    defaultValues: tareasDefaultValues,
  });

  const hitoForm = useForm<z.infer<typeof hitoSchema>>({
    resolver: zodResolver(hitoSchema),
    defaultValues: hitosDefaultValues,
  });

  // Array de subtareas
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

  function resetForms() {
    tareaForm.reset(tareasDefaultValues);
    hitoForm.reset(hitosDefaultValues);
  }

  // capturar el cambio de selected task para actualizar el formulario (Edit)

  useEffect(() => {
    if (!selectedTask) return;

    tareaForm.reset({
      titulo: selectedTask.titulo,
      fechaFin: new Date(selectedTask.fechaFin),
      fechaInicio: new Date(selectedTask.fechaInicio),
      descripcion: selectedTask.descripcion,
      estado: selectedTask.estado?.idEstado,
      participantesAsignados: selectedTask.participantesAsignados.map(
        (p) => p.idParticipante,
      ),
      subtareas: selectedTask.subTareas ? selectedTask.subTareas : [],
    });
  }, [selectedTask]);

  useEffect(() => {
    if (!selectedHito) return;
    hitoForm.reset({
      titulo: selectedHito.titulo,
      fechas: {
        from: new Date(selectedHito.fechaInicio),
        to: new Date(selectedHito.fechaFinalizacion),
      },
      tareas:
        selectedHito.tareasDelHito.map((t) => {
          return {
            ...t,
            idTarea: t.idTarea?.toString(),
            fechaFin: new Date(t.fechaFin),
            fechaInicio: new Date(t.fechaInicio),
            estado: t.estado?.idEstado,
            participantesAsignados: t.participantesAsignados.map(
              (p) => p.idParticipante,
            ),
          };
        }) ?? [],
    });
  }, [selectedHito]);

  return (
    <ProjectDetailContext.Provider
      value={{
        projectId,
        feedbackClient,
        setFeedbackClient,
        selectedHito,
        setSelectedHito,
        selectedTask,
        setSelectedTask,

        hitoForm,
        tareaForm,
        resetForms,

        appendSubtarea,
        removeSubtarea,
        subtareasFields,

        projectDetailForm,
        queryClient,

        setGptHitos,
        gptHitos,
      }}
    >
      {children}
    </ProjectDetailContext.Provider>
  );
}

export function useProjectDetail() {
  const context = useContext(ProjectDetailContext);

  if (!context) {
    throw new Error("useProjectForm debe estar dentro de un ProjectContext");
  }

  return context;
}
