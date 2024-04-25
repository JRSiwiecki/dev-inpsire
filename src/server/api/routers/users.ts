import { db } from "~/server/db";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getUsers: protectedProcedure.query(async () => {
    const users = await db.user.findMany();

    return users;
  }),
});
