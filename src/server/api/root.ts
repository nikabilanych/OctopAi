import { workExperienceRouter } from "@/server/api/routers/workexperience";
import { createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  work_experience: workExperienceRouter,

});

// export type definition of API
export type AppRouter = typeof appRouter;
