import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { db } from "~/server/db";

export const userRouter = createTRPCRouter({
  getUserName: protectedProcedure
    .input(
      z.object({
        inputId: z.string(),
      }),
    )
    .mutation(async (opts: { input: { inputId: string } }) => {
      const user = await db.user.findUnique({
        where: {
          id: opts.input.inputId,
        },
      });

      return user?.name;
    }),
});
