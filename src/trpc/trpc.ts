//1.step router for index.ts (for backend)

import { User } from '@/payload-types'
import { ExpressContext } from '@/server'
import { TRPCError, initTRPC } from '@trpc/server'
import { PayloadRequest } from 'payload/types'

const t = initTRPC.context<ExpressContext>().create()

const middleware = t.middleware

//context and next step funct as parameters
const isAuth = middleware(async ({ ctx, next }) => {
  
  const req = ctx.req as PayloadRequest
  //destructure user from payload
  // { user } === req.user

  const { user } = req as { user: User | null }

  if (!user || !user.id) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  //if logged in, add user to context
  return next({
    ctx: {
      user,
    },
  })
})

export const router = t.router
export const publicProcedure = t.procedure
export const privateProcedure = t.procedure.use(isAuth)