import { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
        // TODO implement authorize

        if (
          credentials?.email == "admin@gmail.com" &&
          credentials?.password == "admin123456"
        ) {
          return {
            id: "admin",
            name: "Admin",
            email: "admin@gmail.com",
            image: "https://www.gravatar.com/avatar/",
          } as User;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    newUser: undefined,
  },
};
