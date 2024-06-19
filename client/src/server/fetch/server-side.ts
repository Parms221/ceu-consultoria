"use server";
import { cookies } from "next/headers";
import { ACCESS_TOKEN_COOKIE } from "@/server/auth/options";

export async function fetcher(urlAPI: string, init?: RequestInit) {
  const token = cookies().get(ACCESS_TOKEN_COOKIE);

  return fetch(`${process.env.BACK_URI}${urlAPI}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
      Authorization: `Bearer ${token?.value}`,
    },
  });
}
