import OpenAI from "openai";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { env } from "~/env";
import { z } from "zod";

export const inspirationRouter = createTRPCRouter({
  generateInspiration: protectedProcedure
    .input(
      z.object({
        position: z.string(),
        topic: z.string(),
        technology: z.string(),
      }),
    )
    .mutation(
      async (opts: {
        input: { position: string; topic: string; technology: string };
      }) => {
        const openai = new OpenAI({
          apiKey: env.OPENAI_API_KEY,
        });

        const gptResponse = await openai.chat.completions.create({
          messages: [
            {
              role: "system",
              content: `You are providing project ideas to people learning about or trying to 
              get a job related to software.
              There should be a project idea, a description, a key features  with a 
              list of at least 5-10 features, and optional features with a list of 1-3 features.`,
            },
            {
              role: "user",
              content: `As an ${opts.input.position} with an interest in ${opts.input.topic}, 
            come up with a project idea where I can learn how to use ${opts.input.technology}.`,
            },
          ],
          model: "gpt-3.5-turbo",
        });

        return {
          message: gptResponse.choices[0],
        };
      },
    ),
});
