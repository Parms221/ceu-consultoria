"use client";
import { createContext, useContext, useState } from "react";
import { Proyecto } from "@/types/proyecto";
import { Hito } from "@/types/proyecto/Hito";
// import { zodResolver } from "@hookform/resolvers/zod";


interface IProjectDetailContext {
    proyecto: Proyecto,
    selectedHito: Hito | null,
    setProyecto: (proyecto: Proyecto) => void
    setSelectedHito: (hito: Hito | null) => void
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

  return (
    <ProjectDetailContext.Provider value={{ 
        proyecto,
        setProyecto,
        selectedHito,
        setSelectedHito
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
