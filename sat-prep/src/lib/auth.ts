import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcryptjs";

import prisma from "@/lib/prisma";

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const googleProviderEnabled = Boolean(googleClientId && googleClientSecret);

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    ...(googleProviderEnabled
      ? [
          GoogleProvider({
            clientId: googleClientId!,
            clientSecret: googleClientSecret!,
          }),
        ]
      : []),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;
        if (!email || !password) return null;

        const user = await prisma.user.findUnique({ where: { email } });
        // Only allow credentials login if user has a password (not for Google-only accounts)
        if (!user || !user.password) return null;

        const passwordMatches = await compare(password, user.password);
        if (!passwordMatches) return null;

        return { 
          id: user.id, 
          email: user.email,
          name: user.name,
          image: user.image 
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider === "google") {
          if (!user.email) return false;

          // Ensure the JWT carries our database user id, not the OAuth provider id.
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email },
          });

          const dbUser = existingUser
            ? await prisma.user.update({
                where: { email: user.email },
                data: {
                  name: user.name,
                  image: user.image,
                },
              })
            : await prisma.user.create({
                data: {
                  email: user.email,
                  name: user.name,
                  image: user.image,
                  // password stays null for Google users
                },
              });

          (user as typeof user & { id?: string }).id = dbUser.id;
          user.email = dbUser.email;
          user.name = dbUser.name ?? user.name;
          user.image = dbUser.image ?? user.image;
        }
        return true;
      } catch (err) {
        console.error("SignIn callback error:", err);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.email = user.email ?? undefined;
        token.name = user.name ?? undefined;
        token.picture = user.image ?? undefined;
      }

      if (token.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email },
          select: { id: true },
        });

        if (dbUser) {
          token.id = dbUser.id;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        session.user.email = token.email || "";
        session.user.name = token.name || "";
        session.user.image = token.picture || "";
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET,
};
