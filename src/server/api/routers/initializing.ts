import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../trpc";




export const workExperienceRouter = createTRPCRouter({
  helloInit:protectedProcedure.query(({ ctx }) => {
    return ctx.db.user.findFirst({
      where: { id: ctx.session.user.id },
    });
  }),
  //const say hi=api.initializing.helloInit.query()
  //hi.name

  setUp: protectedProcedure
    .input(z.object({
      fieldsInterest: z.string(),
      positionsInterest: z.string(),
      userSkill: z.string(),
      }))
    .mutation(async ({ ctx, input }) => {
      const { id } = ctx.session.user;
      const { fieldsInterest, positionsInterest, userSkill } = input;

      await ctx.db.userExperience.create({
        data: {
          fieldsInterest,
          positionsInterest,
          userSkill,
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