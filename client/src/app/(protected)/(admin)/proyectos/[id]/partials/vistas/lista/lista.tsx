"use client"
import { HitosTable } from "./DataTable/data-table";
import { hitosColumns } from "./DataTable/columns";
import { useProjectDetail } from "../../contexto/proyecto-detail.context";
import NewHitoModal from "../../forms/Hitos";
import useHito from "@/hooks/Hito/useHito";
import { Button } from "@/components/ui/button";
import { LoaderIcon, Sparkles } from "lucide-react";
import useGPT from "@/hooks/Gpt/useGPT";
import BouncingDotsLoader from "@/components/common/Loader/loading-dots";


export default function VistaLista() {

    const { projectId } = useProjectDetail()
    const { getHitosQuery } = useHito()
    const { data : hitos, isLoading, isError } = getHitosQuery(projectId)   
    const { testIaMutation } = useGPT()    
    const { data: gptData, isPending, isError : isErrorGPT, mutate: testIa } = testIaMutation()

    if (isLoading) {
      return <div>Cargando ... </div>;
    }
  
    if (isError || !hitos) {
      return <div>Error al cargar la lista de hitos</div>;
    }
    
    return (
      <article>
        <div className="flex items-center justify-between">
          <h2 className="text-title-md2 font-semibold text-black dark:text-white">
            Lista de tareas
          </h2>
          <div className="space-x-2 flex items-center">
            <Button
              variant={"outline"}
              size={"sm"}
              className="mb-4"
              onClick={() =>
                testIa({
                    tituloProyecto: "Proyecto de prueba",
                    fechaInicio: new Date().toDateString(),
                    fechaFin: new Date().toDateString(),
                })
              }
            >
                {
                    isPending ? <BouncingDotsLoader className="[&>div]:h-2 [&>div]:w-2 [&>div]:mx-0"/>  : <Sparkles />
                }
              <span className="sr-only">Generar cronograma con IA</span>
            </Button>
            <NewHitoModal />
          </div>
        </div>
        {
            gptData ? <pre>GPT: {JSON.stringify(gptData, null, 2)}</pre> : null
        }
        <HitosTable
          columns={hitosColumns}
          data={hitos}
          subRowsField="tareasDelHito"
        />
      </article>
    );
}