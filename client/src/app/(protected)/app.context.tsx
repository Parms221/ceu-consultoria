"use client"
import { fetcherLocal } from '@/server/fetch/client-side'
import { Estado } from '@/types/estado'
import { Rol } from '@/types/rol'
import { GUserinfoResponse } from '@/types/usuario/GUserinfo'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { createContext, useContext, useEffect, useState } from 'react'

interface AppProviderProps {
    roles: Rol[],
    estados: Estado[],
    googleAccountQuery : UseQueryResult<GUserinfoResponse | null, unknown>
    isGoogleAuthorized: boolean
}

const AppContext = createContext<AppProviderProps>({} as AppProviderProps)

export function AppProvider(
    {children} : { children: React.ReactNode }
){
    const [isGoogleAuthorized, setIsGoogleAuthorized] = useState<boolean>(false)

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

      const  googleAccountQuery = useQuery({
        queryKey: ["google-auth", "verify"],
        queryFn: async () => {
          const response = await fetcherLocal("/authorize/verify")
          if (response.ok){
            const data = await response.json();
            return data;
          }
          return null
        },
      })

      useEffect(() => {
        if(googleAccountQuery.data?.status === "Authorized"){
          setIsGoogleAuthorized(true)
        }else{
          setIsGoogleAuthorized(false)
        }
      }, [googleAccountQuery.data])

    return (
        <AppContext.Provider
            value={{
                roles: dataQuery.data?.roles || [],
                estados: dataQuery.data?.estados || [],
                googleAccountQuery: googleAccountQuery,
                isGoogleAuthorized: isGoogleAuthorized
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