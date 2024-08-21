"use client"
import { HitosTable } from "./DataTable/data-table";
import { hitosColumns } from "./DataTable/columns";
import { useProjectDetail } from "../../contexto/proyecto-detail.context";
import NewHitoModal from "../../forms/Hitos";
import useHito from "@/hooks/Hito/useHito";
import { Button } from "@/components/ui/button";
import { CheckCheckIcon, RefreshCw, Sparkles, X } from "lucide-react";
import useGPT from "@/hooks/Gpt/useGPT";
import BouncingDotsLoader from "@/components/common/Loader/loading-dots";
import { useEffect, useState } from "react";
import { HitoDTO } from "@/types/proyecto/Hito/dto/HitoDTO";
import { TAREA_ESTADOS } from "@/constants/proyectos/estados";


export default function VistaLista() {
    const { projectId, gptHitos } = useProjectDetail()

    const { getHitosQuery } = useHito()
    const { data : hitos, isLoading, isError } = getHitosQuery(projectId)   

    
    if (isLoading) {
      return <div>Cargando ... </div>;
    }
  
    if (isError || !hitos) {
      return <div>Error al cargar la lista de hitos</div>;
    }

    return (
      <article>
        <VistaCronogramaActions />
        <HitosTable
            columns={hitosColumns}
            data={gptHitos ? gptHitos : hitos}
            subRowsField="tareasDelHito"
        />
      </article>
    );
}


export function VistaCronogramaActions (){
    const { projectId, gptHitos, setGptHitos } = useProjectDetail()
    const { getHitosQuery, updateAllHitosByProject } = useHito()
    const { refetch: refetchHitos } = getHitosQuery(projectId)   
  
    const [visibleOptions, setVisibleOptions] = useState(false)
    const { isPending: updatingHitos, mutate: updateHitos, isSuccess : updatedHitos } = updateAllHitosByProject()
   
    const { gptHitosMutation } = useGPT()    
    const { data: gptData, isPending, mutate: gptMutation, reset, isSuccess } = gptHitosMutation
    
    function acceptSuggestions(){
      if(!gptHitos) return 
      const newCronograma : HitoDTO[] = gptHitos.map(hito => {
        return {
          titulo : hito.titulo,
          fechaInicio: new Date(hito.fechaInicio),
          fechaFinalizacion: new Date(hito.fechaFinalizacion),
          tareas: hito.tareasDelHito.map(t => {
            return{
              titulo: t.titulo,
              fechaInicio: new Date(t.fechaInicio),
              fechaFin: new Date(t.fechaFin),
              descripcion: t.descripcion,
              estado: TAREA_ESTADOS.por_hacer,
              participantesAsignados: t.participantesAsignados.map(p  => p.idParticipante),
              subtareas : t.subTareas.map(st =>{
                return {
                  descripcion : st.descripcion,
                  completado : false,
                }
              })
            }
          })
        }
      })
      
      updateHitos({
        projectId: projectId,
        hitos: newCronograma
      })
    }

    async function resetState(){
      setGptHitos(null)
      setVisibleOptions(false)
      reset()
    }

    // Verificar si hay actualizaciones de gpt en el fetching para mostrar las opciones y actualizar el cronograma en memoria
    useEffect(() => {
      if (isSuccess && gptData) {
        setGptHitos(gptData.hitos)
        setVisibleOptions(true)
      }
    }, [gptData, isSuccess])

    // Escuchar al evento aceptar actualización de cronograma 
    useEffect(() => {
      const resetStateAndInvalidate = async() => {
        if(updatedHitos){
          await resetState()
          await refetchHitos()
        }
      }
      resetStateAndInvalidate()
    }, [updatedHitos])

    return (
    <div className="flex justify-between">
          <h2 className="text-title-md2 font-semibold text-black dark:text-white">
            Lista de tareas
          </h2>
          <div className="space-x-2 flex items-center [&>div>button]:mb-4">
            {
              gptData && 
                (
                  <div className="space-x-1 transition-transform duration-500 ease-in-out transform translate-x-full opacity-0 animate-slide-in"
                    style={{
                      transform: visibleOptions ? "translateX(0)" : "translateX(100%)",
                      opacity: visibleOptions ? "1" : "0",
                    }}
                  >
                    <Button
                      size={"sm"}
                      onClick={() => acceptSuggestions()}
                    >
                      <CheckCheckIcon size={20} />
                      <span className="sr-only">Aceptar cronograma propuesto por IA</span>
                    </Button>
                    {/* Descartar cronograma propuesto por IA */}
                    <Button
                      size={"sm"}
                      onClick={() => {
                        resetState()
                      }}
                      disabled={updatingHitos}
                    >
                      <X size={20} />
                      <span className="sr-only">Descartar cronograma propuesto por IA</span>
                    </Button>

                    {/* Cambia vista sin reiniciar el estado de la sugerencia de cronograma */}
                    <Button
                      variant={"outline"}
                      onClick={() => {
                        gptHitos === null ? setGptHitos(gptData.hitos) : setGptHitos(null)
                      }}
                      size={"sm"}
                    >
                      <RefreshCw size={20} />
                      <span className="sr-only">Cambiar cronograma a sugerido por IA</span>
                    </Button>
                  </div>
                )
            }
            <Button
              variant={"outline"}
              size={"sm"}
              className="mb-4"
              onClick={() =>
                gptMutation(projectId)
              }
              disabled={updatingHitos}
            >
                {
                    isPending ? <BouncingDotsLoader className="[&>div]:h-2 [&>div]:w-2 [&>div]:mx-0"/>  : <Sparkles />
                }
              <span className="sr-only">Generar cronograma con IA</span>
            </Button>
            <NewHitoModal />
          </div>
        </div>
  )
}