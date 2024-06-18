import { Plus } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import NewUserForm from "./form";

export default function NewUserDialog() {
  return (
    <Dialog>
        <DialogTrigger className="flex items-center gap-2 bg-ceu-celeste text-white px-2 py-1.5 rounded-md text-sm" type="button">
                <Plus size={16} />
                Añadir usuario
        </DialogTrigger>
        <DialogContent>
            <DialogTitle className="text-ceu-celeste">Nuevo usuario</DialogTitle>
            <DialogDescription>
                <NewUserForm  />
            </DialogDescription>
        </DialogContent>
    </Dialog>
  );
}
