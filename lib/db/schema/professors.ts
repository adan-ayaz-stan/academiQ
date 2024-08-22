import { sql } from "drizzle-orm";
import { text, varchar, timestamp, pgTable } from "drizzle-orm/pg-core";
import { z } from "zod";
import { nanoid } from "@/lib/utils";
import { createSelectSchema } from "drizzle-zod";

export const professors = pgTable("professors", {
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: text("name").notNull(),
  //   professor's subject
  subjects: text("subjects").array().notNull(),
  // professor's college
  college: text("college").notNull(),
  // professor's department
  department: text("department").notNull(),
  // professor's tags
  tags: text("tags").array().notNull(),
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

export const insertProfessorSchema = createSelectSchema(professors)
  .extend({})
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });

export type NewProfessorParams = z.infer<typeof insertProfessorSchema>;
