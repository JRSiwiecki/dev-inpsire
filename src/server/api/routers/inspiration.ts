import OpenAI from "openai";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { env } from "~/env";
import { z } from "zod";

export const inspirationRouter = createTRPCRouter({
  generateInspiration: publicProcedure
    .input(
      z.object({
        position: z.string(),
        topic: z.string(),
        technology: z.string(),
      }),
    )
    .query(async (opts) => {
      const openai = new OpenAI({
        apiKey: env.OPENAI_API_KEY,
      });

      const gptResponse = await openai.chat.completions.create({
        messages: [
          { role: "system", content: "You are a helpful assistant." },
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
    }),
});
