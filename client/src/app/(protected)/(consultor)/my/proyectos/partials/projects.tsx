"use client"
import { Proyecto } from "@/types/proyecto";
import ProjectCard from "./project-card";
import useProyecto from "@/hooks/Proyecto/useProyecto";
import { CheckCheck } from "lucide-react";

interface IProjects {
  proyectos: Proyecto[]
}
export default function Projects(
  { proyectos } : IProjects
) {
  const { calculateProgress} = useProyecto();
  return (
    <div className="flex flex-wrap gap-8 min-h-[calc(80vh-200px)]">
      {
        proyectos.length > 0 ? proyectos.map((proyecto) => {
          return (
            <ProjectCard 
              key={proyecto.idProyecto}
              id={proyecto.idProyecto}
              title={proyecto.titulo}
              description={proyecto.descripcion}
              progress={calculateProgress(proyecto)}
            />
          )
        }) : <div className="grid w-full place-content-center">
          <CheckCheck className="mx-auto" size={50} />
          <p>No hay proyectos para mostrar</p>
        </div>
      }
    </div>
  );
}
