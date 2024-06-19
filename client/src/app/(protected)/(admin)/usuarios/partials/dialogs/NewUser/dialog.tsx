"use client"
import { Plus } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import NewUserForm from "./form";
import { useState } from "react";

export default function NewUserDialog() {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open}>
        <DialogTrigger 
          className="flex items-center gap-2 bg-ceu-celeste text-white px-2 py-1.5 rounded-md text-sm" 
          type="button"
          onClick={() => setOpen(true)}  
        >
                <Plus size={16} />
                Añadir usuario
        </DialogTrigger>
        <DialogContent>
            <DialogTitle className="text-ceu-celeste">Nuevo usuario</DialogTitle>
            <NewUserForm  setDialogOpen={setOpen}/>
        </DialogContent>
    </Dialog>
  );
}
