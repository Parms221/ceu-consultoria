"use client";
export async function fetcherMultiPartLocal(urlAPI: string, init?: RequestInit) {
  return fetch(`${process.env.BACK_URI}${urlAPI}`, {
    ...init,
    headers: {
      ...init?.headers,
    },
    credentials: "include",
  });
}
