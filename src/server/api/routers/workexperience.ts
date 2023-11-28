import { z } from "zod";
import { getSession } from 'next-auth/react';
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../trpc";




export const workExperienceRouter = createTRPCRouter({
  // post: publicProcedure
  //   .input(z.object({ text: z.string() }))
  //   .query(({ input }) => {
  //     return {
  //       greeting: `Hello ${input.text}`,
  //     };
  //   }),
    

  create: protectedProcedure
    .input(z.object({ input: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const workExperience = await ctx.db.userExperience.create({
        data: {
          userId: input.userId,
          fieldsInterest: input,
          userSkill: input

      }
    })


