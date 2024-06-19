import { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";

interface LoginResponse {
  token: string;
}

export interface PayloadResponse {
  sub: string;
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

        cookies().set(ACCESS_TOKEN_COOKIE, data.token, {
          secure: true,
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
          httpOnly: true,
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        });

        const payload: PayloadResponse = JSON.parse(payloadString);

        return {
          id: payload.sub,
          name: payload.nombre,
          email: payload.email,
          image: "https://cdn-icons-png.flaticon.com/512/3135/3135768.png",
        } as User;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    newUser: undefined,
  },
};
