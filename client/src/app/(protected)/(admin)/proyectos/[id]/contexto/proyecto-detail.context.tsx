"use client";

import { z } from "zod";
import { createContext, useContext, useState } from "react";
import { Proyecto } from "@/types/proyecto";
// import { zodResolver } from "@hookform/resolvers/zod";


interface IProjectDetailContext {
    proyecto: Proyecto
    setProyecto: (proyecto: Proyecto) => void
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


  return (
    <ProjectDetailContext.Provider value={{ 
        proyecto,
        setProyecto
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
