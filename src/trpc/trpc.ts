//1.step router for index.ts (for backend)

import { initTRPC } from "@trpc/server";

export const t=initTRPC.context().create();

export const router = t.router;

export const publicProcedure = t.procedure;

export const middleware = t.middleware;

 
