"use client";
import ProjectDetails from "@/components/Sections/Proyecto/detalle/ProjectDetails";


export default function ProjectDetail({ params }: { params: { id: number } }) {
  const { id } = params;

  return (
      <ProjectDetails id={id}/>
  );
}
