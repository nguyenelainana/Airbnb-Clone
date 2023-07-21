import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";

//nextauth config file
export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma), //open object and gave it an adapter. Adapter needs to accept prisma clients
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text " },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        //async function, pass credentials to us. throw error if no emails or password is inputted
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }
        const user = await prisma.user.findUnique({
          //user using our credentials email. We pushed user onto database so prisma offers type safety
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user?.hashedPassword) {
          // check if user exist, if we don't have user or if user don't have correct hashedpassword, new error
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          //check if password entered is correct using compare
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials"); //error for incorrect passwords
        }
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/", //error happen or weird callback. Will redirect to main page since we don't have alt page.
  },
  debug: process.env.NODE_ENV == "development", //enabled in development to help debug
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions); //pass in object which is authOptions that we have created
