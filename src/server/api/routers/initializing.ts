import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../trpc";


export const userExperience = createTRPCRouter({
  hello:protectedProcedure
  .input(z.object({
    name: z.string(),
  }))
  .query(({ ctx,input }) => {
  return {greeting:`Hi there, ${input.name}!`
  }}),

  setUp: protectedProcedure
    .input(z.object({
      industries,
      userSkill,
      positions,
      }))
    .mutation( async ({ ctx, input }) => {
      const { id } = ctx.session.user;
      const { industries, userSkills, positions } = input;

      await ctx.db.userExperience.create({
        data: {
          industries,
          userSkill,
          positions,
          userId: id,
        },
      });
    }),

});


    // getLatest: protectedProcedure.query(({ ctx }) => {
    //   return ctx.db.post.findFirst({
    //     orderBy: { createdAt: "desc" },
    //     where: { createdBy: { id: ctx.session.user.id } },
    //   });
    // }),