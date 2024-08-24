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
import { professors } from "./professors";

export const reviews = pgTable("reviews", {
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  title: text("title").notNull(),
  content: text("content").notNull(),
  rating: integer("rating").notNull(),
  professor_id: varchar("professor_id", { length: 191 }).references(
    () => professors.id,
    {
      onDelete: "cascade",
    }
  ),
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for reviews - used to validate API requests
export const insertReviewSchema = createSelectSchema(reviews).extend({}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
