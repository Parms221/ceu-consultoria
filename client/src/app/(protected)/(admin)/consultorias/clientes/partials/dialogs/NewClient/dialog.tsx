import { Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import NewClienteForm from "./form";

export default function NewClienteDialog() {
  return (
    <Dialog>
      <DialogTrigger
        className="flex items-center gap-2 rounded-md bg-ceu-celeste px-2 py-1.5 text-sm text-white"
        type="button"
      >
        <Plus size={16} />
        Añadir cliente
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-ceu-celeste">Nuevo cliente</DialogTitle>
        <DialogDescription>
          <NewClienteForm />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
