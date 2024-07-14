"use client";
import { deleteServicio } from "@/actions/Consultor";
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
import { Servicio } from "@/types/servicio";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function DeleteServicioDialog({
  servicio,
}: {
  servicio: Servicio;
}) {
  const [openDialog, setOpenDialog] = useState(false);

  async function dropServicio(id: number, name: string) {
    try {
      const response = await deleteServicio(id);
      if (response.status === "success") {
        toast.success(`Servicio ${name} eliminado exitosamente`);
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
        <DialogTitle className="text-ceu-celeste">
          Eliminar servicio
        </DialogTitle>
        <DialogDescription>
          ¿Estás seguro de que deseas eliminar el servicio{" "}
          <strong>
            {servicio.tipo_documento === "DNI"
              ? servicio.nombre
              : servicio.razonSocial}
          </strong>
          ?
        </DialogDescription>
        <DialogFooter>
          <Button
            onClick={() =>
              dropServicio(
                servicio.idServicio,
                servicio.tipo_documento == "DNI"
                  ? servicio.nombre
                  : servicio.razonSocial,
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
