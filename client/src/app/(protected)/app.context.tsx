"use client"
import { fetcherLocal } from '@/server/fetch/client-side'
import { Estado } from '@/types/estado'
import { Rol } from '@/types/rol'
import { useQuery } from '@tanstack/react-query'
import { createContext, useContext, useEffect, useState } from 'react'

interface AppProviderProps {
    roles: Rol[],
    estados: Estado[]
}

const AppContext = createContext<AppProviderProps>({} as AppProviderProps)

export function AppProvider(
    {children} : { children: React.ReactNode }
){
    const dataQuery = useQuery<AppProviderProps>({
        queryKey: ["index"],
        queryFn: async () => {
          const response = await fetcherLocal("/index");
    
          if (!response.ok) {
            throw new Error("Error fetching data");
          }
    
          return response.json();
        },
      });

    return (
        <AppContext.Provider
            value={{
                roles: dataQuery.data?.roles || [],
                estados: dataQuery.data?.estados || []
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