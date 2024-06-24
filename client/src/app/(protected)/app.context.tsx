"use client"
import { Rol } from '@/types/rol'
import { createContext, useContext, useEffect, useState } from 'react'

interface AppProviderProps {
    roles: Rol[]
}

const AppContext = createContext<AppProviderProps>({} as AppProviderProps)

export function AppProvider(
    {children} : { children: React.ReactNode }
){
    const [roles, setRoles ] = useState<Rol[]>([])
    
    useEffect(() => {
        /*
            Por el momento se simula el fetch de los roles, aquí deberían cargarse
            los datos de la aplicación que se usen después 
            incluyendo los roles 
        */
        const roles: Rol[] = [
            {
                idRol: 1,
                rol: "ROLE_ADMIN"
            },
            {
                idRol: 2,
                rol: "ROLE_CONSULTOR"
            },
            {
                idRol: 3,
                rol: "ROLE_CLIENTE"
            }
        ]
        setRoles(roles)
    }, [])


    return (
        <AppContext.Provider
            value={{
                roles
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext(){
    const context = useContext(AppContext)
    if(!context){
        throw new Error('useAppContext must be used within an AppProvider')
    }
    return context
}