"use server";
import { fetcher } from "@/server/fetch/server-side";
import { Proyecto } from "@/types/proyecto";

export async function getProyecto(id: number): Promise<Proyecto> {
  console.log("fetching project", id);
  const response = await fetcher(`/proyectos/getProyecto/${id}`);

  if (!response.ok) {
    throw new Error("Error fetching project");
  }

  const data = await response.json();

  return data as Proyecto;
}
