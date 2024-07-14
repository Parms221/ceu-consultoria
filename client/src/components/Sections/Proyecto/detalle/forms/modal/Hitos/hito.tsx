import { PlusIcon, ChevronsRightIcon } from "lucide-react";

import { Drawer, DrawerClose, DrawerContent,  DrawerHeader, DrawerTrigger } from "@/components/ui/drawer";
import HitoForm from "./form";

export default function NewHitoModal() {
  return (
    <Drawer direction="right">
      <DrawerTrigger
         className="flex items-center gap-2 rounded-md bg-ceu-celeste px-2 py-1.5 text-sm text-white"
        type="button"
      >
          <PlusIcon />
          Añadir hito
      </DrawerTrigger>
      <DrawerContent className="py-0 h-[calc(100vh-80px)] bottom-0 right-0 left-auto mt-0 w-full lg:max-w-[60%] rounded-none
        overflow-hidden overflow-y-auto
      "
      style={
        {scrollbarWidth: 'thin'}
      }
      >
        <div>
          <DrawerHeader className="px-2 py-1.5">
              <DrawerClose>
                <ChevronsRightIcon size={18} />
                <span className="sr-only">
                    Cerrar formulario de hitos
                </span>
              </DrawerClose>
          </DrawerHeader>
          <div className="px-4 py-2">
            <HitoForm />
          </div>
         
        </div>
      </DrawerContent>
    </Drawer>
  );
}
