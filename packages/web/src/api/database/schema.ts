import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
export const inquiries = sqliteTable("inquiries", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  phone: text("phone"),
  service: text("service").notNull(),
  message: text("message").notNull(),
  read: integer("read", { mode: "boolean" }).notNull().default(false),
  archived: integer("archived", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export * from "./auth-schema";
export const caseStudies = sqliteTable("case_studies", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  type: text("type").notNull(),
  image: text("image").notNull(),
  imageAlt: text("image_alt").notNull().default(""),
  client: text("client").notNull(),
  kind: text("kind").notNull().default("Project"),
  brief: text("brief").notNull(),
  approach: text("approach").notNull(),
  deliverables: text("deliverables", { mode: "json" }).$type<string[]>().notNull(),
  gallery: text("gallery", { mode: "json" }).$type<string[]>().notNull().default([]),
  outcome: text("outcome").notNull(),
  sample: integer("sample", { mode: "boolean" }).notNull().default(false),
  status: text("status").notNull().default("draft"),
  featured: integer("featured", { mode: "boolean" }).notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});
