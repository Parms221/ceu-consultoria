import { Edit, Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ServicioForm from "../Form/ServicioForm";
import { Servicio } from "@/types/servicio";
import { cn } from "@/lib/utils";

type Props = {
  servicio?: Servicio;
};
export default function AddEditServicioDialog({ servicio = undefined }: Props) {
  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          servicio
            ? "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-ceu-celeste"
            : "flex items-center gap-2 rounded-md bg-ceu-celeste px-2 py-1.5 text-sm text-white",
        )}
        type="button"
      >
        {servicio ? <Edit size={16} /> : <Plus size={16} />}
        {!servicio && "Nuevo servicio"}
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-ceu-celeste">
          {servicio ? "Editar servicio" : "Nuevo servicio"}
        </DialogTitle>
        <DialogDescription>
          <ServicioForm servicio={servicio} />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
