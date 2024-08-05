"use client"
import { buttonVariants } from "@/components/ui/button";
// import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
    DialogFooter
  } from "@/components/ui/dialog"
import useProyecto from "@/hooks/Proyecto/useProyecto";
import { Proyecto } from "@/types/proyecto";
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";

export default function DeleteProjectDialog(
    { proyecto } : { proyecto: Proyecto}
) {
    const { deleteProyecto } = useProyecto()
    return (
        <Dialog>
            <DialogTrigger className="py-1.5 h-fit">
                <Trash2Icon size={16}/>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle className="text-ceu-celeste">Eliminar proyecto</DialogTitle>
                <DialogDescription>
                    ¿Estás seguro de que deseas eliminar el proyecto <strong>{proyecto.descripcion}</strong>?
                </DialogDescription>
                <DialogFooter >
                    <DialogClose
                        className={buttonVariants({variant: "destructive", size: "default"})}
                        onClick={() => deleteProyecto(proyecto.idProyecto)}>
                        Eliminar
                    </DialogClose>
                    <DialogClose className="h-full border rounded-md px-4 hover:bg-neutral-300">Cancelar</DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}