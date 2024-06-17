import { Navigation } from "@/types/shared/navigation"
import { Blocks, CalendarDaysIcon, FolderOpen, Users2 } from "lucide-react"

export const MENU : Navigation[] = [
    {  
        href: "/proyectos",
        icon: Blocks,
        label: "Mis proyectos",
    },
    {
        href: "/calendario",
        icon: CalendarDaysIcon,
        label: "Calendario"
    },
    {  
        href: "/clientes",
        icon: Users2,
        label: "Mis clientes",
    },
    {  
        href: "/archivos",
        icon: FolderOpen,
        label: "Archivos",
    },
]