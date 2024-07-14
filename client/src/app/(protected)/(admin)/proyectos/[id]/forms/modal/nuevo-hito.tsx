import { Plus, PlusIcon } from "lucide-react";

import { Proyecto } from "@/types/proyecto";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

type Props = {
  proyecto : Proyecto
};

export default function NuevoHitoForm({ proyecto }: Props) {
  return (
    <Drawer direction="right">
      <DrawerTrigger
         className="flex items-center gap-2 rounded-md bg-ceu-celeste px-2 py-1.5 text-sm text-white"
        type="button"
      >
          <PlusIcon />
          Añadir hito
      </DrawerTrigger>
      <DrawerContent className="h-[calc(100vh-80px)] bottom-0 right-0 left-auto mt-0 w-full lg:w-[50%] rounded-none">
        <div className="w-full">
          <DrawerHeader>
            <DrawerTitle>Nuevo hito</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <Plus size={24} />
              <h3 className="text-lg font-semibold">Aquí va un formulario de un nuevo hito</h3>
            </div>
          </div>
          <DrawerFooter>
            <Button>Guardar</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
