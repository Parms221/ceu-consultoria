import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Cliente } from "@/types/cliente";
import { Trash2Icon } from "lucide-react";

export default function DeleteClientDialog({ cliente }: { cliente: Cliente }) {
  return (
    <Dialog>
      <DialogTrigger className="h-fit py-1.5">
        <Trash2Icon size={16} />
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-ceu-celeste">Eliminar cliente</DialogTitle>
        <DialogDescription>
          ¿Estás seguro de que deseas eliminar el cliente{" "}
          <strong>
            {cliente.tipo === "NATURAL" ? cliente.nombre : cliente.razonSocial}
          </strong>
          ?
        </DialogDescription>
        <DialogFooter>
          <Button type="submit" variant={"destructive"}>
            Eliminar
          </Button>
          <DialogClose className="h-full rounded-md border px-4 hover:bg-neutral-300">
            Cancelar
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
