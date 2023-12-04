import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../trpc";


export const ProfileRouter = createTRPCRouter({
    setup:protectedProcedure
    .input(z.object({
        role: z.enum(["FREELANCER", "CLIENT"]),
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

// .input(z.object({
//   name: z.string(),
// }))
// .query(({ ctx,input }) => {
// return {greeting:`Hi there, ${input.name}!`
// }}),

//     // getLatest: protectedProcedure.query(({ ctx }) => {
//     //   return ctx.db.post.findFirst({
//     //     orderBy: { createdAt: "desc" },
//     //     where: { createdBy: { id: ctx.session.user.id } },
//     //   });
//     // }),