"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { Hito } from "@/types/proyecto/Hito";
import {
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  hitoSchema,
} from "@/app/(protected)/(admin)/proyectos/[id]/partials/forms/schemas";
import { useQueryClient } from "@tanstack/react-query";
import { projectCompleteSchema } from "../../../nuevo/partials/schemas/project.schema";
import { useTareaForm } from "@/hooks/Tarea/useTareaForm.context";
import { HitoDTO } from "@/types/proyecto/Hito/dto/HitoDTO";

interface IProjectDetailContext {
  selectedHito: HitoDTO | null;
  projectId: number;
  setSelectedHito: (hito: HitoDTO | null) => void;
  hitoForm: UseFormReturn<z.infer<typeof hitoSchema>, any, undefined>;
  resetForms: () => void;

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
  const { tareaForm, tareasDefaultValues } = useTareaForm()
  const [selectedHito, setSelectedHito] = useState<HitoDTO | null>(null);
  // Guardar hitos propuestos por la IA en memoria para poder editarlos
  const [gptHitos, setGptHitos] = useState<Hito[] | null>(null);

  // Query client to invalidate queries
  const queryClient = useQueryClient();

  // FORM SCHEMAS
  const hitosDefaultValues = {
    titulo: "Nueva tarea",
    fechas: {
      from: new Date(),
      to: new Date(),
    },
    tareas: [],
  };

  // Forms
  const projectDetailForm = useForm<z.infer<typeof projectCompleteSchema>>({
    resolver: zodResolver(projectCompleteSchema),
    defaultValues: {},
  });

  const hitoForm = useForm<z.infer<typeof hitoSchema>>({
    resolver: zodResolver(hitoSchema),
    defaultValues: hitosDefaultValues,
  });

  function resetForms() {
    tareaForm.reset(tareasDefaultValues);
    hitoForm.reset(hitosDefaultValues);
  }

  useEffect(() => {
    if (!selectedHito) return;
    hitoForm.reset({
      titulo: selectedHito.titulo,
      fechas: {
        from: new Date(selectedHito.fechaInicio),
        to: new Date(selectedHito.fechaFinalizacion),
      },
      tareas: selectedHito.tareas // Solo editar detalles del hito
    });
  }, [selectedHito]);

  return (
    <ProjectDetailContext.Provider
      value={{
        projectId,
        selectedHito,
        setSelectedHito,

        hitoForm,
        resetForms,

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
