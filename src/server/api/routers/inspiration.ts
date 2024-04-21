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
          {
            role: "system",
            content: `You are providing project ideas to people learning about or trying to 
              get a job related to software. Output your response in JSON. 
              There should be a project_idea key, a description key, a key_features key with a 
              list of at least 5-10 features, and optional_features key with a list of 1-3 features.`,
          },
          {
            role: "user",
            content: `As an ${opts.input.position} with an interest in ${opts.input.topic}, 
            come up with a project idea where I can learn how to use ${opts.input.technology}.`,
          },
        ],
        model: "gpt-3.5-turbo",
        response_format: { type: "json_object" },
      });

      return {
        message: gptResponse.choices[0],
      };
    }),
});
