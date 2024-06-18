import { Button } from "@/components/ui/button";
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

export default function DeleteUserDialog(
    { user } : { user: Usuario}
) {
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
                    <Button type="submit" variant={"destructive"}>Eliminar</Button>
                    <DialogClose className="h-full border rounded-md px-4 hover:bg-neutral-300">Cancelar</DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}