import { authCredentials } from "../lib/validators/account-validator";

import { publicProcedure, router } from "./trpc";
import { getPayloadClient } from "../get-payload";

import { TRPCError } from "@trpc/server";

export const authRouter = router({
    createPayloadUser: publicProcedure
    .input(authCredentials)
    .mutation( async ({ input }) => {
            const { email, password }  = input

            const payload = await getPayloadClient()
            // if user exists
            const { docs: users } = await payload.find({
                collection: "users",
                where: {
                    email: {
                        equals: email
                    }
                }
            })
            if(users.length !== 0){
                throw new  TRPCError({code: "CONFLICT", message:"User already exists"})
            }
            await payload.create({
                collection: "users",
                data: {
            
                }
            })

}),
})