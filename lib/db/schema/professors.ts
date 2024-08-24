import { sql } from "drizzle-orm";
import {
  text,
  varchar,
  timestamp,
  pgTable,
  integer,
} from "drizzle-orm/pg-core";
import { z } from "zod";
import { nanoid } from "@/lib/utils";
import { createSelectSchema } from "drizzle-zod";
import { colleges } from "./colleges";

export const professors = pgTable("professors", {
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: text("name").notNull(),
  //   professor's subject
  subjects: text("subjects").array().notNull(),
  // professor's college
  college: text("college").notNull(),

  //
  college_id: varchar("college_id", { length: 191 }).references(
    () => colleges.id
  ),
  // professor's department
  department: text("department").notNull(),
  // professor's tags
  tags: text("tags").array().notNull(),
  rating: integer("rating").notNull(),
  totalReviews: integer("total_reviews").notNull(),
  image: text("image").default(""),
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

export type TProfessor = z.infer<typeof insertProfessorSchema>;
