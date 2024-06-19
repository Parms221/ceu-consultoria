"use client";
import { Button } from "@/components/ui/button";
import { fetcherLocal } from "@/server/fetch/client-side";

export default function ExampleClient() {
  return (
    <Button
      onClick={async () => {
        const response = await fetcherLocal("/index");
        const data = await response.text();
        console.log(data);
      }}
    >
      Request
    </Button>
  );
}
