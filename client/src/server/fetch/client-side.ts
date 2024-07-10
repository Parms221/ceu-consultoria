"use client";
export async function fetcherLocal(urlAPI: string, init?: RequestInit) {
  return fetch(`${process.env.BACK_URI}${urlAPI}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    credentials: "include",
  });
}
