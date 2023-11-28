import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// import { authOptions } from "@/server/auth";
const prisma = new PrismaClient();
const handler = NextAuth({
    providers: [
      
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,

      }),
    ],
    adapter: PrismaAdapter(prisma),
  });

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export { handler as GET, handler as POST };
