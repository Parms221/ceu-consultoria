"use client";
import ProjectDetails from "@/app/(protected)/(admin)/proyectos/[id]/partials/ProjectDetails";


export default function ProjectDetail({ params }: { params: { id: number } }) {
  const { id } = params;

  return (
      <ProjectDetails id={id}/>
  );
}
