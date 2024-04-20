import { createTRPCRouter, publicProcedure } from "../trpc";

export const inspirationRouter = createTRPCRouter({
  generateInspiration: publicProcedure.query(() => {
    return {
      message: "take this",
    };
  }),
});
