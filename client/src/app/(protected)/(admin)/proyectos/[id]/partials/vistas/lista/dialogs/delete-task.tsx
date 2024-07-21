"use client"
import { Hito } from "@/types/proyecto/Hito";
import { Tarea } from "@/types/proyecto/Tarea";
import DeleteDialog from "@/components/ui/dialogs/delete-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { useProjectDetail } from "../../../contexto/proyecto-detail.context";
import useHito from "@/hooks/Hito/useHito";

export default function DeleteTask(
    { tarea } : { tarea : Hito | Tarea }
) {

    const { deleteHito } = useHito()

    const { projectId } = useProjectDetail()
    const queryClient = useQueryClient()
    async function deleteTask (tarea: Hito | Tarea){
        // check if tarea is a Hito type or Tarea
        const parseTask = tarea as Hito
        if(parseTask.idHito){
            await deleteHito(parseTask.idHito)
        } else {
            console.log("remove tarea")
        }
        console.log("invalidando query")
        queryClient.invalidateQueries({queryKey: [projectId, "hitos"]})
    }

    return (
       <DeleteDialog 
            title="Eliminar tarea"
            description={<>
                `Está seguro que quiere eliminar la tarea {<span className="font-bold">{tarea.titulo}</span>}`
            </>}
            onDelete={() => deleteTask(tarea)}
       />
    );
}