import ECommerce from "@/components/Dashboard/E-commerce";
import { useSession } from "next-auth/react";

export default function Home() {
  return (
    <>
        <ECommerce />
    </>
  );
}
