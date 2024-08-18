import {  Pen, PenBox, PlusCircle, SendHorizonal } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useProjectDetail } from '@/app/(protected)/(admin)/proyectos/[id]/partials/contexto/proyecto-detail.context';
import TareaForm from "./form";
import { Tarea, TareaDTO } from "@/types/proyecto/Tarea";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";
import useTarea from "@/hooks/Tarea/useTarea";
import { useTareaForm } from "@/hooks/Tarea/useTareaForm.context";

interface IProps {
  asEdit? : boolean
  task? : TareaDTO
}

const NewTaskModal = forwardRef<DialogRef, IProps>(
  ({ asEdit, task } : IProps, ref) => {
  
  const { setSelectedTask, selectedTask, tareaForm } = useTareaForm()
  const dialogRef = useRef<HTMLButtonElement>(null)

  useImperativeHandle(ref, () => ({
    openDialog: () => {
      if (dialogRef.current) {
        dialogRef.current.click();
      }
    },
  }));

  return (
    <Dialog 
      onOpenChange={(isOpen) => {
        if(!isOpen && selectedTask){
          // Reinicia los valores del formulario
          setSelectedTask(null)
          tareaForm.reset({
            titulo: "Nueva tarea",
            fechaFin: new Date(),
            fechaInicio: new Date(),
            descripcion: "",
            estado: 0,
            participantesAsignados: [],
            subtareas: []
          })
        }
      }}
    >
        <DialogTrigger
          asChild
          ref={dialogRef}
        >
          {
            !asEdit ? (
              <Button className="bg-ceu-celeste text-white self-end mb-4" size={"sm"}>
                  <PlusCircle /> Añadir Tarea
              </Button>
            ) : (
              <Button
                size={"sm"}
                className="py-1.5 bg-ceu-azul"
                onClick={() => {
                  if(task){
                    setSelectedTask(task)
                  }
                }}
              >
                <PenBox size={16}/>
                <span className="sr-only">
                  Editar tarea
                </span>
              </Button>
            )
          }
        
        </DialogTrigger>
      <DialogContent className="max-w-[800px] max-h-[550px] overflow-hidden overflow-y-auto" 
        style={
          {scrollbarWidth: 'thin'}
        }
      >
        <DialogTitle className="text-ceu-celeste">
            {
                task ? `Editar tarea ${task.titulo}` : `Nueva tarea` 
            }
        </DialogTitle>
       <TareaForm />
      </DialogContent>
    </Dialog>
  );
})

export default NewTaskModal;