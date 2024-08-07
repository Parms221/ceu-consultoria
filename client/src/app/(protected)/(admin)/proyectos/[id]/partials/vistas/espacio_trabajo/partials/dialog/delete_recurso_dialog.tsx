import { deleteUsuario } from "@/actions/Usuario";
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
import { Recurso } from "@/types/proyecto/Recurso";
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";

export default function DeleteRecursoDialog(
    { recurso }: { recurso: Recurso }
) {
    async function deleteRecurso(id: number, name: string) {
        // try {
        //     const response = await deleteUsuario(id)
        //     if (response.status === "success") {
        //         toast.success(`Usuario ${name} eliminado exitosamente`)
        //     } else {
        //         toast.error(response.message)
        //     }

        // } catch (e) {
        //     console.log(e)
        // }
    }

    return (
        <Dialog>
            <DialogTrigger className="py-1.5 h-fit">
                <Trash2Icon size={16} />
            </DialogTrigger>
            <DialogContent>
                <DialogTitle className="text-ceu-celeste">Eliminar recurso</DialogTitle>
                <DialogDescription>
                    ¿Estás seguro de que deseas eliminar el recurso <strong>{recurso.titulo}</strong>?
                </DialogDescription>
                <DialogFooter >
                    <DialogClose
                        className={buttonVariants({ variant: "destructive", size: "default" })}
                        onClick={() => deleteRecurso(recurso.idRecurso!, recurso.titulo)}>
                        Eliminar
                    </DialogClose>
                    <DialogClose className="h-full border rounded-md px-4 hover:bg-neutral-300">Cancelar</DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}