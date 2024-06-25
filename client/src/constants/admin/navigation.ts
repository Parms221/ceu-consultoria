import { Navigation } from "@/types/shared/navigation"
import { PieChart, Blocks, SquareStack, Users2Icon, List, SquareUser, Folder, UserCircle2Icon,} from "lucide-react"

export const MENU : Navigation[] = [
    {  
        href: "/",
        icon: PieChart,
        label: "Dashboard",
    },
    {
        href: "/usuarios",
        icon: UserCircle2Icon,
        label: "Usuarios"
    },
    {
        href: "/proyectos",
        icon: SquareStack,
        label: "Proyectos"
    }, {
        href: "/servicios",
        icon: List,
        label: "Servicios"
    
    },
    {  
        href: "/consultorias",
        icon: SquareUser,
        label: "Consultorías",
        children: [{
            href: "/consultorias/espacios-de-trabajo",
            icon: Folder,
            label: "Espacios de trabajo"
        }, {
            href: "/consultorias/clientes",
            icon: Users2Icon,
            label: "Clientes"
        
        }]
    },
]