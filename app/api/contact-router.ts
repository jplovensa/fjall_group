import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { contactInquiries } from "@db/schema";

export const contactRouter = createRouter({
  create: publicQuery
    .input(
      z.object({
        fullName: z.string().min(1),
        email: z.string().email(),
        company: z.string().optional(),
        interest: z.string().optional(),
        message: z.string().optional(),
        userId: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(contactInquiries).values({
        userId: input.userId ?? null,
        fullName: input.fullName,
        email: input.email,
        company: input.company ?? null,
        interest: input.interest ?? null,
        message: input.message ?? null,
      });
      return { id: Number(result[0].insertId), success: true };
    }),
});
