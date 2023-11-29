import { z } from "zod";
import { db } from "@/server/db";
import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
  } from "../trpc";

const matchIndustry=db.jobIndustry.findMany()
const matchSkills=db.jobSkill.findMany({
  where: {
    id: {
      in: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],}}}
    )


export const matchRouter = createTRPCRouter({
    skillToPosition: protectedProcedure.mutation(({ ctx }) => {
        const { id } = ctx.session.user;
        
        return ctx.db.userExperience.findMany({
            where: {userIndustry: {in: jobsOnIndustry.name} }
        orderBy: { createdAt: "desc" },
        where: { createdBy: { id: id } },
        });
        return ctx.db.job.findFirst({
        orderBy: { createdAt: "desc" },
        where: { createdBy: { id: ctx.session.user.id } },
        });
    }),
    fetchhResults: protectedProcedure.mutation(({ ctx }) => {
        const { id } = ctx.session.user;
        const { jobsOnSkills } = db.skill.findMany()
        return ctx.db.userExperience.findMany({
            where: {userSkill: {in: jobsOnSkills.name} }
        orderBy: { createdAt: "desc" },
        where: { createdBy: { id: id } },
        });
        return ctx.db.job.findFirst({
        orderBy: { createdAt: "desc" },
        where: { createdBy: { id: ctx.session.user.id } },
        });
    }),

    // const tmp= ctx.userExperience.userSkill where:{
// userSkill:{ in db.Skill.name}
    } 