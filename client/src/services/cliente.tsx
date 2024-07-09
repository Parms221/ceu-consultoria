"use client";
import { CreateClienteJuridicoDto, CreateClienteNaturalDto } from "@/types/cliente/ClienteDto";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { fetcherLocal } from "@/server/fetch/client-side";
import HandleServerResponse from "@/lib/handle-response";
import { Cliente } from "@/types/cliente";

export async function createClienteNatural(data: CreateClienteNaturalDto, form?: UseFormReturn<any, any, undefined>, toastId?: string | number) {
  try {
    const response = await fetcherLocal("/clientes/naturales/create", {
      method: "POST",
      body: JSON.stringify(data)
    });

    const ok = await HandleServerResponse(response, form, toastId);

    if (ok) {
      const json: Cliente = await response.json();
      toast.success("Cliente creado correctamente", { id: toastId, position: "top-center" });
      return json;
    }
    return null;

  } catch (err) {
    toast.error("Ha ocurrido un error inesperado", { id: toastId, position: "top-center" });
    return null;
  }
}

export async function createClienteJuridico(data: CreateClienteJuridicoDto, form?: UseFormReturn<any, any, undefined>, toastId?: string | number) {
  try {
    const response = await fetcherLocal("/clientes/juridicos/create", {
      method: "POST",
      body: JSON.stringify(data)
    });

    const ok = await HandleServerResponse(response, form, toastId);

    if (ok) {
      const json: Cliente = await response.json();
      toast.success("Cliente creado correctamente", { id: toastId, position: "top-center" });
      return json;
    }

    return null;

  } catch (err) {
    toast.error("Ha ocurrido un error inesperado", { id: toastId, position: "top-center" });
    return null;
  }
}