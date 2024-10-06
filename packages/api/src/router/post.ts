import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { CreatePostSchema } from "@acme/validators";

import { protectedProcedure, publicProcedure } from "../trpc";

export const postRouter = {
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db
      .selectFrom("Post")
      .selectAll()
      .orderBy("id", "desc")
      .limit(10)
      .execute();
  }),

  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db
        .selectFrom("Post")
        .selectAll()
        .where("id", "=", input.id)
        .executeTakeFirst();
    }),

  create: protectedProcedure
    .input(CreatePostSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .insertInto("Post")
        .values({
          title: input.title,
          content: input.content,
          // Omit id, createdAt, and updatedAt to use database defaults
        })
        .returningAll()
        .executeTakeFirst();
    }),

  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.db.deleteFrom("Post").where("id", "=", input).executeTakeFirst();
  }),
} satisfies TRPCRouterRecord;
