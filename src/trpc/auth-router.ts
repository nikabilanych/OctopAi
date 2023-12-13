import { authCredentials } from "../lib/validators/account-validator";

import { publicProcedure, router } from "./trpc";
import { getPayloadClient } from "../get-payload";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const authRouter = router({
    createPayloadUser: publicProcedure
    .input(authCredentials)
    .mutation(async ({ input }) => {
            const { email, password }  = input

            const payload = await getPayloadClient()
            // if user exists
            const {docs: users} = await payload.find({
                collection: 'users',
                where: {
                    email: {
                        equals: email 
                    },
                },
            })
            if(users.length !== 0)
                throw new  TRPCError({code: "CONFLICT"})
            

            await payload.create({
                collection: 'users',
                data: {
                    email,
                    password,
                    role: 'user',
                }
            })
            return {success: true, sentToEmail: email}
        }),
        verifyEmail: publicProcedure
        .input(z.object({token: z.string()}))
        .query( async ({ input }) => {
            const { token }  = input
            const payload = await getPayloadClient()

            const isVerified = await payload.verifyEmail({
                collection: 'users', 
                token,
            })
            if(isVerified){
                return {success: true}
            }
            throw new TRPCError({code: "NOT_FOUND"})
})

})