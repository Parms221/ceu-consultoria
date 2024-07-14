"use client"
import Image from "next/image";
import ProjectDetailProvider, { useProjectDetail } from "./contexto/proyecto-detail.context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PROJECT_VIEWS } from "./vistas";
import { useQuery } from "@tanstack/react-query";
import { Proyecto } from "@/types/proyecto";
import { getProyecto } from "./contexto/data";
import { usePathname, useRouter, useSearchParams } from "next/navigation";


export default function ProjectDetails(
    { id }: { id: number }
) {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()
    const currentView = searchParams.get("view")

    let view
    if (currentView && PROJECT_VIEWS.some(view => view.id === currentView)) {
        view = currentView
    } else {
        view = PROJECT_VIEWS[0].id
        updateSearchParams("view", view)
      } 

    function updateSearchParams(
        key: string,
        value: string
    ){
      router.push(pathname + '?' + `${key}=${value}`)
    }

    const {
        data: proyecto,
        isLoading,
        isError,
      } = useQuery<Proyecto>({
        queryKey: ["proyecto", id],
        queryFn: async () => getProyecto(id),
        enabled: !!id,
      });
    
      if (isLoading) {
        return <div>Cargando ... </div>;
      }
    
      if (isError || !proyecto) {
        return <div>Proyecto no encontrado</div>;
      }

    return (
    <ProjectDetailProvider selectedProject={proyecto}>
        <section className="mx-auto space-y-1.5">
            <header className="flex">
            <div className="flex items-center gap-2">
                <Image
                className="h-[50px] w-[50px] rounded-md"
                src={"/images/cover/cover-01.png"}
                alt="Project illustration"
                width={50}
                height={50}
                />
                <h1 className="text-2xl font-bold tracking-tighter">
                {proyecto.titulo}
                </h1>
            </div>
            </header>
         {/* Tabs de navegación */}
            <Tabs defaultValue={view} className="space-y-1.5 p-0">
            <TabsList>
                {PROJECT_VIEWS.map((view) => {
                return (
                    <TabsTrigger
                      key={view.id}
                      value={view.id}
                      className="flex items-center gap-2"
                      onClick={() => updateSearchParams("view", view.id)}
                    >
                      {view.icon}
                      <span>{view.label}</span>
                    </TabsTrigger>
                );
                })}
            </TabsList>
            <div className="area p-8">
                {PROJECT_VIEWS.map((view) => {
                const View = view.content;
                return (
                    <TabsContent key={view.id} value={view.id}>
                    <View />
                    </TabsContent>
                );
                })}
            </div>
            </Tabs>
      </section>
    </ProjectDetailProvider>

    );
}