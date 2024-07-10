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
import { Usuario } from "@/types/usuario";
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";

export default function DeleteUserDialog(
    { user } : { user: Usuario}
) {
    async function deleteUser(id: number, name: string){
        try {
            const response = await deleteUsuario(id)
            if(response.status === "success"){
                toast.success(`Usuario ${name} eliminado exitosamente`)
            }else {
                toast.error(response.message)
            }
        
        }catch(e){
            console.log(e)
        }
    }

    return (
        <Dialog>
            <DialogTrigger className="py-1.5 h-fit">
                <Trash2Icon size={16}/>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle className="text-ceu-celeste">Eliminar usuario</DialogTitle>
                <DialogDescription>
                    ¿Estás seguro de que deseas eliminar el usuario <strong>{user.name}</strong>?
                </DialogDescription>
                <DialogFooter >
                    <DialogClose
                        className={buttonVariants({variant: "destructive", size: "default"})}
                        onClick={() => deleteUser(user.id, user.name)}>
                        Eliminar
                    </DialogClose>
                    <DialogClose className="h-full border rounded-md px-4 hover:bg-neutral-300">Cancelar</DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}