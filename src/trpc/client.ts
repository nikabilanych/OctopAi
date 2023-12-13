//client 3.step
import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from './'

export const trpc = createTRPCReact<AppRouter>({})