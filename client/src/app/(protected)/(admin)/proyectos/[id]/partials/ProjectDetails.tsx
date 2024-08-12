"use client"
import Image from "next/image";
import ProjectDetailProvider from "./contexto/proyecto-detail.context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PROJECT_VIEWS } from "./vistas";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useProyecto from "@/hooks/Proyecto/useProyecto";
import EventsCalendar from "./calendar/calendar";


export default function ProjectDetails(
    { id }: { id: number }
) {
    const { getProyectoByIdQuery } = useProyecto()
    // Usando search params para mantener la vista al recargar la página
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()
    const currentView = searchParams.get("view")
    // Validar el valor del param
    const view = currentView && PROJECT_VIEWS.find(v => v.id === currentView) ? currentView : PROJECT_VIEWS[0].id

    function updateSearchParams(
        key: string,
        value: string
    ){
      router.push(pathname + '?' + `${key}=${value}`)
    }

    const { data : proyecto, isLoading, isError } = getProyectoByIdQuery(id)
    
      // if (isLoading) {
      //   return <div>Cargando ... </div>;
      // }
    
      // if (isError || !proyecto) {
      //   return <div>Proyecto no encontrado</div>;
      // }

    return (
    <ProjectDetailProvider projectId={id}>
        <section className="mx-auto space-y-1.5">
            <header className="flex justify-between">
              <div className="flex items-center gap-2">
                  <Image
                  className="h-[50px] w-[50px] rounded-md"
                  src={"/images/cover/cover-01.png"}
                  alt="Project illustration"
                  width={50}
                  height={50}
                  />
                  <h1 className="text-2xl font-bold tracking-tighter">
                  {proyecto && proyecto.titulo}
                  </h1>
              </div>
              <EventsCalendar />
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