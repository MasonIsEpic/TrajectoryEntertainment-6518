import { z } from "zod";
import { ORPCError } from "@orpc/server";
import { base } from "../__core/app";
import { db } from "../database";
import { inquiries as table } from "../database/schema";
export const inquiries = {
  create: base
    .input(
      z.object({
        name: z.string().trim().min(2).max(120),
        email: z.email().max(254),
        company: z.string().trim().max(200).optional(),
        phone: z.string().trim().max(50).optional(),
        service: z.enum([
          "Live events & broadcast",
          "Post-production",
          "AVL installations",
          "IT & UniFi systems",
          "Multiple services / not sure",
        ]),
        message: z.string().trim().min(10).max(5000),
        website: z.string().max(0).optional(),
      }),
    )
    .handler(async ({ input }) => {
      try {
        const { website: _website, ...data } = input;
        const [saved] = await db.insert(table).values(data).returning({ id: table.id });
        return { id: saved.id, received: true };
      } catch {
        throw new ORPCError("INTERNAL_SERVER_ERROR", {
          message: "Unable to save your inquiry. Please try again or email us directly.",
        });
      }
    }),
};
