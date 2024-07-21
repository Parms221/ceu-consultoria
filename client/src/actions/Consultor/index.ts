"use server";
import { fetcher } from "@/server/fetch/server-side";
import { Consultor } from "@/types/consultor";

export async function getConsultores(): Promise<Consultor[]> {
  try {
    console.log("getConsultores");
    const response = await fetcher("/consultores", {
      method: "GET",
    });
    let data;
    if (response.ok) {
      data = await response.json();
      return data as Consultor[];
    } else {
      console.error("Error: ", response);
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}
