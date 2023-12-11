// 2.step
// backend of the application
// router for defining custom api endpoints
import { publicProcedure, router } from "./trpc"

export const appRouter = router({
    anyApiRoute: publicProcedure.query(() => {
        return "hello"
    })
})
export type AppRouter = typeof appRouter;