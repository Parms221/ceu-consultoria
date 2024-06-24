"use client";
import { deleteCliente } from "@/actions/Cliente";
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
import { useState } from "react";
import { toast } from "sonner";

export default function DeleteClientDialog({ cliente }: { cliente: Cliente }) {
  const [openDialog, setOpenDialog] = useState(false);

  async function dropCliente(id: number, name: string) {
    try {
      const response = await deleteCliente(id);
      if (response.status === "success") {
        toast.success(`Cliente ${name} eliminado exitosamente`);
        setOpenDialog(false);
      } else {
        toast.error(response.message);
      }
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger className="h-fit py-1.5">
        <Trash2Icon size={16} />
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-ceu-celeste">Eliminar cliente</DialogTitle>
        <DialogDescription>
          ¿Estás seguro de que deseas eliminar el cliente{" "}
          <strong>
            {cliente.tipo_documento === "DNI"
              ? cliente.nombre
              : cliente.razonSocial}
          </strong>
          ?
        </DialogDescription>
        <DialogFooter>
          <Button
            onClick={() =>
              dropCliente(
                cliente.idCliente,
                cliente.tipo_documento == "DNI"
                  ? cliente.nombre
                  : cliente.razonSocial,
              )
            }
            variant={"destructive"}
          >
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
