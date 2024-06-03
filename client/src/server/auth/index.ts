import NextAuth from "next-auth";
import { authOptions } from "@/server/auth/options";

export const nextAuth = NextAuth(authOptions);
