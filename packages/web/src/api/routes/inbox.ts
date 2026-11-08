import { z } from "zod";
import { desc, eq } from "drizzle-orm";
import { ORPCError } from "@orpc/server";
import { admin } from "../middleware/admin";
import { db } from "../database";
import { inquiries } from "../database/schema";
export const inbox = {
  list: admin.handler(() =>
    db.select().from(inquiries).orderBy(desc(inquiries.createdAt), desc(inquiries.id)),
  ),
  update: admin
    .input(
      z.object({
        id: z.number().int(),
        read: z.boolean().optional(),
        archived: z.boolean().optional(),
      }),
    )
    .handler(async ({ input }) => {
      const { id, ...data } = input;
      const [item] = await db.update(inquiries).set(data).where(eq(inquiries.id, id)).returning();
      if (!item) throw new ORPCError("NOT_FOUND");
      return item;
    }),
};
