// 2.step
// backend of the application
// router for defining custom api endpoints
import { router } from "./trpc"
import { authRouter } from "./auth-router"
import { productRouter } from "./product-router"

export const appRouter = router({
    auth: authRouter,
    products: productRouter,

})
export type AppRouter = typeof appRouter;