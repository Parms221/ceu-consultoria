"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Proyecto } from "@/types/proyecto";
import Image from "next/image";
import { ListChecks, Kanban, GanttChart, InfoIcon } from 'lucide-react'
import { VistaResumen, VistaGantt, VistaKanban, VistaLista } from "./vistas";
import { useQuery } from "@tanstack/react-query";
import { getProyecto } from "./contexto/data";
import ProjectDetailProvider from "./contexto/proyecto-detail.context";

 
export const PROJECT_VIEWS = [
    {
        id: "resumen",
        label: "Resumen",
        icon: <InfoIcon />,
        content: VistaResumen
    },
    {
        id: "lista",
        label: "Lista",
        icon : <ListChecks />,
        content: VistaLista
    },
    {
        id: "kanban",
        label: "Tablero",
        icon: <Kanban />,
        content: VistaKanban
    },
    {
        id: "gantt",
        label: "Diagrama de Gantt",
        icon: <GanttChart />,
        content: VistaGantt
    }
]


export default function ProjectDetail({ params } : { params: { id: number } }) {
  const {id} = params

  const { data : proyecto, isLoading, isError} = useQuery<Proyecto>({
    queryKey: ["proyecto", id],
    queryFn: async () => getProyecto(id),
    enabled: !!id,
  });


  if (isLoading){
    return <div>Cargando ... </div>
  }

  if(isError || !proyecto){
    return <div>Proyecto no encontrado</div>
  }

    return (
    <ProjectDetailProvider selectedProject={proyecto}>
        <section className="mx-auto space-y-1.5">
            <header className="flex">
                <div className="flex items-center gap-2">
                    <Image 
                        className="rounded-md w-[50px] h-[50px]"
                        src={"/images/cover/cover-01.png"}
                        alt="Project illustration"
                        width={50}
                        height={50}
                    />
                    <h1 className="font-bold text-2xl tracking-tighter">{proyecto.titulo}</h1>
                </div>
            </header>
            {/* Tabs de navegación */}
            <Tabs defaultValue={PROJECT_VIEWS[0].id} className="p-0 space-y-1.5">
                <TabsList>
                    {
                        PROJECT_VIEWS.map((view) => {
                            return (
                                <TabsTrigger key={view.id} value={view.id} className="flex items-center gap-2">
                                    {view.icon}   
                                    <span>
                                        {view.label}
                                    </span>
                                </TabsTrigger>
                            )
                        })
                    }
                </TabsList>
                <div className="area p-8">
                    {
                        PROJECT_VIEWS.map((view) => {
                            const View = view.content
                            return (
                                <TabsContent key={view.id} value={view.id}>
                                    <View />
                                </TabsContent> 
                            )
                        })
                    }
                </div>
            </Tabs>

        </section>
      </ProjectDetailProvider>
    );
}