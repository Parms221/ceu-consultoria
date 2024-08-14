import {  PenBox } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useProjectDetail } from '@/app/(protected)/(admin)/proyectos/[id]/partials/contexto/proyecto-detail.context';
import { forwardRef, useImperativeHandle, useRef } from "react";
import { Hito } from "@/types/proyecto/Hito";
import HitoForm from "../../../forms/Hitos/form";

interface IProps {
  hito? : Hito
}

const EditHitoModal = forwardRef<DialogRef, IProps>(
  ({ hito } : IProps, ref) => {
  
  const { selectedHito, setSelectedHito, hitoForm } = useProjectDetail()
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
        if(!isOpen && selectedHito){
          // Reinicia los valores del formulario
          setSelectedHito(null)
          hitoForm.reset({
            titulo: "Nueva tarea",
            fechas: {
              from: new Date(),
              to: new Date(),
            },
            tareas: []
          })
        }
      }}
    >
        <DialogTrigger
          asChild
          ref={dialogRef}
        >
          {
           
              <Button
                size={"sm"}
                className="py-1.5 bg-ceu-azul"
                onClick={() => {
                  if(hito){
                    setSelectedHito(hito)
                  }
                }}
              >
                <PenBox size={16}/>
                <span className="sr-only">
                  Editar hito
                </span>
              </Button>
          }
        
        </DialogTrigger>
      <DialogContent className="max-w-[800px] max-h-[550px] overflow-hidden overflow-y-auto" 
        style={
          {scrollbarWidth: 'thin'}
        }
      >
        <DialogTitle className="text-ceu-celeste">
            {
                hito && `Editar hito ${hito.titulo}`
            }
        </DialogTitle>
        <HitoForm />
      </DialogContent>
    </Dialog>
  );
})

export default EditHitoModal;