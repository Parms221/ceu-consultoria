import { Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateUserForm from "../Form/CreateUserForm";

export default function AddUserDialog() {
  return (
    <Dialog>
      <DialogTrigger
        className="flex items-center gap-2 rounded-md bg-ceu-celeste px-2 py-1.5 text-sm text-white"
        type="button"
      >
        <Plus size={16} />
        Añadir usuario
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-ceu-celeste">Nuevo usuario</DialogTitle>
        <CreateUserForm />
      </DialogContent>
    </Dialog>
  );
}
