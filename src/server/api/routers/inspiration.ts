import OpenAI from "openai";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { env } from "~/env";
import { z } from "zod";
import { db } from "~/server/db";

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

  saveInspiration: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        position: z.string(),
        topic: z.string(),
        technology: z.string(),
        inspiration: z.string(),
      }),
    )
    .mutation(
      async (opts: {
        input: {
          userId: string;
          position: string;
          topic: string;
          technology: string;
          inspiration: string;
        };
      }) => {
        const user = await db.user.findUnique({
          where: {
            id: opts.input.userId,
          },
        });

        if (user === null) {
          return "User could not be found!";
        }

        const possibleInspiration = await db.inspiration.findFirst({
          where: {
            savedInspiration: opts.input.inspiration,
          },
        });

        if (possibleInspiration !== null) {
          return "Inspiration already saved!";
        }

        const inspiration = await db.inspiration.create({
          data: {
            user: {
              connect: { id: user.id },
            },
            position: opts.input.position,
            topic: opts.input.topic,
            technology: opts.input.technology,
            savedInspiration: opts.input.inspiration,
          },
        });

        return inspiration.id;
      },
    ),

  deleteInspiration: protectedProcedure
    .input(z.object({ inspirationId: z.string() }))
    .mutation(
      async (opts: {
        input: {
          inspirationId: string;
        };
      }) => {
        await db.inspiration.delete({
          where: {
            id: opts.input.inspirationId,
          },
        });
      },
    ),

  getInspirations: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async (opts: { input: { userId: string } }) => {
      const userId = opts.input.userId;

      const inspirations = await db.inspiration.findMany({
        where: { userId },
      });

      return inspirations;
    }),
});
