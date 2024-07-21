"use client"
import { Hito } from "@/types/proyecto/Hito";
import { Tarea } from "@/types/proyecto/Tarea";
import DeleteDialog from "@/components/ui/dialogs/delete-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { useProjectDetail } from "../../../contexto/proyecto-detail.context";
import useHito from "@/hooks/Hito/useHito";

export default function DeleteTask(
    { task } : { task : Hito | Tarea }
) {

    const { deleteHito } = useHito()

    const { projectId } = useProjectDetail()
    const queryClient = useQueryClient()
    async function deleteTask (task: Hito | Tarea){
        // check if task is a Hito type or Tarea
        const parseTask = task as Hito
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
                `Está seguro que quiere eliminar la tarea {<span className="font-bold">{task.titulo}</span>}`
            </>}
            onDelete={() => deleteTask(task)}
       />
    );
}