"use client"
import { Video } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { useProjectDetail } from '@/app/(protected)/(admin)/proyectos/[id]/partials/contexto/proyecto-detail.context';
import { Tarea } from "@/types/proyecto/Tarea";
import { useRef } from "react";
import NewReunionForm from "./form";
import { Reunion } from "@/types/proyecto/Reunion";

interface IProps {
  reunion? : Reunion
}

export default function AddReunionDialog(
  { reunion } : IProps
) {
  const dialogRef = useRef(null)
  
  return (
    <Dialog 
      onOpenChange={(isOpen) => {
        if(!isOpen){
          // Reinicia los valores del formulario
         
        }
      }}
    >
      <DialogTrigger
        asChild
        ref={dialogRef}
      >
         <Button className="flex items-center gap-2" variant={"default"} size={"sm"}>
          <Video size={20} />
          <span>Crear reunión</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px]">
        <DialogTitle className="text-ceu-celeste">
            {
                reunion ? `Editar reunión ${reunion.titulo}` : `Nueva reunión` 
            }
        </DialogTitle>
        <NewReunionForm />
      </DialogContent>
    </Dialog>
  );
}
