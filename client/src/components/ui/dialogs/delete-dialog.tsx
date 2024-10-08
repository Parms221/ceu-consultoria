import { buttonVariants } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
    DialogFooter
  } from "@/components/ui/dialog"
import { Trash2Icon } from "lucide-react";
import { cn } from "@/lib/utils";

interface IProps {
    onDelete :  () => void
    title: string
    description: React.ReactNode
    className?: string
    asChild?: boolean
    customTrigger?: React.ReactNode
}

export default function DeleteDialog(
    {  title, description, onDelete, className, asChild = false, customTrigger} : IProps
) {

    return (
        <Dialog>
            <DialogTrigger className={cn(
                buttonVariants({variant: "destructive", size: "sm"}),
                "py-1.5",
                className
            )}
            asChild={asChild}
        >
                {
                    customTrigger ?? <Trash2Icon size={16}/>
                }
            </DialogTrigger>
            <DialogContent>
                <DialogTitle className="text-ceu-celeste">{title}</DialogTitle>
                <DialogDescription slot="descripcion">
                    {description}
                </DialogDescription>
                <DialogFooter className="gap-y-2">
                    <DialogClose
                        className={buttonVariants({variant: "destructive", size: "default"})}
                        onClick={onDelete}>
                        Eliminar
                    </DialogClose>
                    <DialogClose className="h-full border rounded-md px-4 hover:bg-neutral-300">
                        Cancelar
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}