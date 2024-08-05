"use client"
import { Proyecto } from "@/types/proyecto";
import ProjectCard from "./project-card";

interface IProjects {
  proyectos: Proyecto[]
}
export default function Projects(
  { proyectos } : IProjects
) {
  return (
    <div className="flex flex-wrap gap-8">
      {
        proyectos.map((proyecto) =>{
          return (
            <ProjectCard 
              key={proyecto.idProyecto}
              id={proyecto.idProyecto}
              title={proyecto.titulo}
              description={proyecto.descripcion}
              progress={80}
            />
          )
        })
      }
    </div>
  );
}
