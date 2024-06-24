import { Edit, Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ClienteForm from "../Form/ClienteForm";
import { Cliente } from "@/types/cliente";
import { cn } from "@/lib/utils";

type Props = {
  cliente?: Cliente;
};
export default function AddEditClienteDialog({ cliente = undefined }: Props) {
  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          cliente
            ? "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-ceu-celeste"
            : "flex items-center gap-2 rounded-md bg-ceu-celeste px-2 py-1.5 text-sm text-white",
        )}
        type="button"
      >
        {cliente ? <Edit size={16} /> : <Plus size={16} />}
        {!cliente && "Nuevo cliente"}
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-ceu-celeste">
          {cliente ? "Editar cliente" : "Nuevo cliente"}
        </DialogTitle>
        <DialogDescription>
          <ClienteForm cliente={cliente} />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
