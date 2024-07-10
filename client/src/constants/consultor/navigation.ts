import { Navigation } from "@/types/shared/navigation"
import { Blocks, CalendarDaysIcon, FolderOpen, Users2 } from "lucide-react"

export const MENU : Navigation[] = [
    {  
        href: "/my/proyectos",
        icon: Blocks,
        label: "Mis proyectos",
    },
    {
        href: "/my/calendario",
        icon: CalendarDaysIcon,
        label: "Calendario"
    },
    {  
        href: "/my/clientes",
        icon: Users2,
        label: "Mis clientes",
    },
    {  
        href: "/my/archivos",
        icon: FolderOpen,
        label: "Archivos",
    },
]