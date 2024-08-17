import TareaForm from "@/app/(protected)/(admin)/proyectos/[id]/partials/forms/Tareas/form";
import { Tarea } from "@/types/proyecto/Tarea";

export default function CalendarDetalleTarea(
    { tarea }: { tarea : Tarea}
){
    return (
        <TareaForm />
    )
}