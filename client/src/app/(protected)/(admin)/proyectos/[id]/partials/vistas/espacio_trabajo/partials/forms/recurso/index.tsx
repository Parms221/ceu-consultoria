import { PlusIcon, ChevronsRightIcon, PenBox } from "lucide-react";

import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTrigger } from "@/components/ui/drawer";
import { Hito } from "@/types/proyecto/Hito";
import { Button } from "@/components/ui/button";
import {useProjectDetail} from "../../../../../contexto/proyecto-detail.context";
import { Recurso } from "@/types/proyecto/Recurso";
import RecursoForm from "./form";

interface IProps {
    asEdit?: boolean,
    task?: Recurso
    refetch: Function
}

export default function NewRecursoModal(
    { asEdit, task, refetch }: IProps
) {
    const { resetForms} = useProjectDetail()
    return (
        <Drawer direction="right"
            onClose={() => {
                // setSelectedHito(null)
                refetch();
                resetForms()
            }}
        >
            <DrawerTrigger
                asChild
            >

                {
                    !asEdit ? (
                        <Button className="bg-ceu-celeste text-white self-end mb-4" size={"sm"}>
                            <PlusIcon />
                            Añadir Recurso
                        </Button>
                    ) : (
                        <Button
                            size={"sm"}
                            className="py-1.5 bg-ceu-azul"
                            onClick={() => {
                                if (task) {
                                    // setSelectedHito(task)
                                }
                            }}
                        >
                            <PenBox size={16} />
                            <span className="sr-only">
                                Editar Recurso
                            </span>
                        </Button>
                    )
                }

            </DrawerTrigger>
            <DrawerContent
                className="py-0 h-[calc(100vh-80px)] bottom-0 right-0 left-auto mt-0 w-full lg:max-w-[60%] rounded-none
        overflow-hidden overflow-y-auto
      "
                style={
                    { scrollbarWidth: 'thin' }
                }
            >
                <div data-vaul-no-drag>
                    <DrawerHeader className="px-2 py-1.5">
                        <DrawerClose id="closeDrawer">
                            <ChevronsRightIcon size={18} />
                            <span className="sr-only">
                                Cerrar formulario de recursos
                            </span>
                        </DrawerClose>
                    </DrawerHeader>
                    <div className="px-4 py-2">
                        {/* <HitoForm /> */}
                        <RecursoForm/>
                    </div>

                </div>
            </DrawerContent>
        </Drawer>
    );
}
