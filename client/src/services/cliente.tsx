"use client"
import { CreateClienteJuridicoDto, CreateClienteNaturalDto } from "@/types/cliente/ClienteDto";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { fetcherLocal } from "@/server/fetch/client-side";
import HandleServerResponse from "@/lib/handle-response";

export async function createClienteNatural(data: CreateClienteNaturalDto, form?: UseFormReturn<any, any, undefined>, toastId?: string | number) {
  try {
    const response = await fetcherLocal("/clientes/naturales/create", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const ok = await HandleServerResponse(response, form, toastId)

    if (ok) {
      toast.success("Cliente creado correctamente", {id: toastId, position: "top-center"})
    }
    return ok;

  } catch (err) {
    toast.error("Ha ocurrido un error inesperado", {id: toastId, position: "top-center"})
    return false
  }
}

export async function createClienteJuridico(data: CreateClienteJuridicoDto, form?: UseFormReturn<any, any, undefined>, toastId?: string | number) {
  try {
    const response = await fetcherLocal("/clientes/juridicos/create", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const ok = await HandleServerResponse(response, form, toastId)

    if (ok) {
      toast.success("Cliente creado correctamente", {id: toastId, position: "top-center"})
    }
    return ok;

  } catch (err) {
    toast.error("Ha ocurrido un error inesperado", {id: toastId, position: "top-center"})
    return false
  }
}