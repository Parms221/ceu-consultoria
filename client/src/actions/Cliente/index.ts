"use server";

import config from "@/config";
import { Cliente } from "@/types/cliente";
import { revalidatePath, revalidateTag } from "next/cache";

export async function createClienteJuridico(
  data: any,
): Promise<{ status: string; message: string }> {
  try {
    const response = await fetch(
      config.back_uri + "/clientes/juridico/create",
      {
        method: "POST",
        headers: {
          // "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiIxIiwibm9tYnJlIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGV4YW1wbGUub3JnIiwiaWF0IjoxNzE4ODA5NzM0LCJleHAiOjIwMjk4NDk3MzQsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCJ9._Xm5xkAaxggMsRp21B9gQk370juWgSyeff6axlM9yG-CD1llQFO7usXgwdVbRbGz",
        },
        body: JSON.stringify(data),
      },
    );
    if (response.ok) {
      revalidateTag("clientes");
      console.log(response.json());
      return {
        status: "success",
        message: "Cliente creado exitosamente",
      };
    }
    return {
      status: "error",
      message: "Error al crear cliente",
    };
  } catch (e) {
    console.log(e);
    return {
      status: "error",
      message: "Error al crear cliente",
    };
  }
}
export async function createClienteNatural(
  data: any,
): Promise<{ status: string; message: string }> {
  try {
    const response = await fetch(
      config.back_uri + "/clientes/naturales/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiIxIiwibm9tYnJlIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGV4YW1wbGUub3JnIiwiaWF0IjoxNzE4ODA5NzM0LCJleHAiOjIwMjk4NDk3MzQsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCJ9._Xm5xkAaxggMsRp21B9gQk370juWgSyeff6axlM9yG-CD1llQFO7usXgwdVbRbGz",
        },
        body: JSON.stringify(data),
      },
    );
    if (response.ok) {
      revalidateTag("clientes");
      console.log(response.json());
      return {
        status: "success",
        message: "Cliente creado exitosamente",
      };
    }
    return {
      status: "error",
      message: "Error al crear cliente",
    };
  } catch (e) {
    console.log(e);
    return {
      status: "error",
      message: "Error al crear cliente",
    };
  }
}
