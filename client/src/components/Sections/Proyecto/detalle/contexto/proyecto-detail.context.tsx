"use client";
import { createContext, useContext, useState } from "react";
import { Proyecto } from "@/types/proyecto";
import { Hito } from "@/types/proyecto/Hito";
import { Tarea } from "@/types/proyecto/Tarea";
// import { zodResolver } from "@hookform/resolvers/zod";


interface IProjectDetailContext {
    proyecto: Proyecto,
    selectedHito: Hito | null,
    selectedTask: Tarea | null,
    setProyecto: (proyecto: Proyecto) => void
    setSelectedHito: (hito: Hito | null) => void
    setSelectedTask: (task: Tarea | null) => void 
}

export const ProjectDetailContext = createContext<IProjectDetailContext>(
  {} as IProjectDetailContext,
);

export default function ProjectDetailProvider({
  children, selectedProject
}: {
  children: React.ReactNode,
  selectedProject : Proyecto
}) {

  const [proyecto, setProyecto] = useState<Proyecto>(selectedProject);
  const [selectedHito, setSelectedHito] = useState<Hito | null>(null);
  const [selectedTask, setSelectedTask] = useState<Tarea | null>(null);

  return (
    <ProjectDetailContext.Provider value={{ 
        proyecto,
        setProyecto,
        selectedHito,
        setSelectedHito,
        selectedTask,
        setSelectedTask
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
