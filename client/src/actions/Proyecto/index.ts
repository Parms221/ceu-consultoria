import { fetcher } from "@/server/fetch/server-side"
import { Proyecto } from "@/types/proyecto"

export async function getProyectos(): Promise<Proyecto[] | undefined> {
    try {
      const response = await fetcher ("/proyectos", {
        method: "GET",
      }) 
      let data
      if (response.ok){
        data = await response.json()
        return data as Proyecto[]
      }else {
        console.error("Error: ", response)
      }
    }catch(error) {
        console.error(error);
    }
  }