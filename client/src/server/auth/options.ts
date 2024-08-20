import { Rol } from "@/types/rol";
import { Usuario } from "@/types/usuario";
import { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";

interface LoginResponse {
  token: string;
}

export interface PayloadResponse {
  sub: string;
  roles: Rol[];
  nombre: string;
  email: string;
  iat: number;
  exp: number;
  iss: string;
}

export const ACCESS_TOKEN_COOKIE = "ceu_token";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Username",
          type: "email",
          placeholder: "admin@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        const response = await fetch(`${process.env.BACK_URI}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        if (!response.ok) {
          console.log("Error bad credentials");
          return null;
        }

        const data: LoginResponse = await response.json();

        const payloadString = atob(data.token.split(".")[1]);

        console.log(process.env.DOMAIN);

        cookies().set(ACCESS_TOKEN_COOKIE, data.token, {
          secure: true,
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
          domain: process.env.DOMAIN,
          httpOnly: true,
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        });

        const payload: PayloadResponse = JSON.parse(payloadString);

        return {
          id: payload.sub,
          name: payload.nombre,
          email: payload.email,
          roles: payload.roles,
          image: "https://cdn-icons-png.flaticon.com/512/3135/3135768.png",
        };
      },
    }),
  ],
  // Estas partes (jwt y session) están para que el token solo dure 6 horas y asi no haya conflictos
  // Ya que puede ocurrir el caso de que el token de next-auth dure más que el de la api
  session: {
    strategy: "jwt",
    maxAge: 21600, // 6 hours
  },
  jwt: {
    maxAge: 21600, // 6 hours
  },
  pages: {
    signIn: "/auth/login",
    newUser: undefined,
  },
  events: {
    signIn: async ({ user, isNewUser }) => {
      console.log("User signed in: ", user);
    },
  },
  callbacks: {
    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          roles: token.roles,
          id: token.sub,
        },
      };
    },
    jwt: async ({token, user }) => {
      if(user){
        const u = user as unknown as Usuario
        return {
          ...token,
          id: u.id,
          roles: u.roles,
        };
      }
      return token;
    },
  },
};
