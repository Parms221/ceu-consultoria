import ProjectCard from "./project-card";

export default function Projects() {
  return (
    <div className="flex flex-wrap">
      <ProjectCard 
        title="Proyecto 1"
        description="Descripción del proyecto 1"
        progress={50}
      />
    </div>
  );
}
