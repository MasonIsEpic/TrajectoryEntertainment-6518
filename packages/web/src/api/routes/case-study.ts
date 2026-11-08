import { z } from "zod";
import { and, asc, eq } from "drizzle-orm";
import { ORPCError } from "@orpc/server";
import { db } from "../database";
import { caseStudies } from "../database/schema";
import { base } from "../__core/app";
import { admin } from "../middleware/admin";
const imageUrl = z
  .string()
  .max(2000)
  .refine(
    (value) => /^\/images\/[a-zA-Z0-9_.-]+$/.test(value) || value.startsWith("https://"),
    "Choose an uploaded image or an HTTPS image URL.",
  );
const fields = z.object({
  slug: z
    .string()
    .trim()
    .min(2)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens."),
  title: z.string().trim().min(2).max(180),
  category: z.enum(["Live events", "Post-production", "AVL installations", "IT & UniFi systems"]),
  type: z.string().trim().min(2).max(180),
  image: imageUrl,
  imageAlt: z.string().trim().max(300),
  client: z.string().trim().min(2).max(180),
  kind: z.enum(["Project", "Client partnership"]),
  brief: z.string().trim().min(10).max(12000),
  approach: z.string().trim().min(10).max(12000),
  deliverables: z.array(z.string().trim().min(1).max(500)).min(1).max(30),
  gallery: z.array(imageUrl).max(12),
  outcome: z.string().trim().min(10).max(12000),
  sample: z.boolean(),
  status: z.enum(["draft", "published"]),
  featured: z.boolean(),
  sortOrder: z.number().int().min(0).max(9999),
});
export const caseStudy = {
  list: base.handler(() =>
    db
      .select()
      .from(caseStudies)
      .where(eq(caseStudies.status, "published"))
      .orderBy(asc(caseStudies.sortOrder), asc(caseStudies.id)),
  ),
  get: base.input(z.object({ slug: z.string().max(120) })).handler(async ({ input }) => {
    const [item] = await db
      .select()
      .from(caseStudies)
      .where(and(eq(caseStudies.slug, input.slug), eq(caseStudies.status, "published")));
    return item ?? null;
  }),
  adminList: admin.handler(() =>
    db.select().from(caseStudies).orderBy(asc(caseStudies.sortOrder), asc(caseStudies.id)),
  ),
  preview: admin.input(z.object({ id: z.number().int() })).handler(async ({ input }) => {
    const [item] = await db.select().from(caseStudies).where(eq(caseStudies.id, input.id));
    return item ?? null;
  }),
  save: admin
    .input(fields.extend({ id: z.number().int().optional() }))
    .handler(async ({ input }) => {
      const { id, ...data } = input;
      const [duplicate] = await db
        .select({ id: caseStudies.id })
        .from(caseStudies)
        .where(eq(caseStudies.slug, data.slug));
      if (duplicate && duplicate.id !== id)
        throw new ORPCError("CONFLICT", {
          message: "That URL slug is already used by another case study.",
        });
      if (id) {
        const [updated] = await db
          .update(caseStudies)
          .set({ ...data, updatedAt: new Date() })
          .where(eq(caseStudies.id, id))
          .returning();
        if (!updated) throw new ORPCError("NOT_FOUND");
        return updated;
      }
      const [created] = await db.insert(caseStudies).values(data).returning();
      return created;
    }),
};
