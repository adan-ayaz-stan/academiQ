import { sql } from "drizzle-orm";
import {
  text,
  varchar,
  timestamp,
  pgTable,
  numeric,
} from "drizzle-orm/pg-core";
import { z } from "zod";
import { nanoid } from "@/lib/utils";
import { createSelectSchema } from "drizzle-zod";

export const colleges = pgTable("colleges", {
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: text("name").notNull(),
  image: text("image").default(""),
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for colleges - used to validate API requests
export const insertCollegeSchema = createSelectSchema(colleges)
  .extend({})
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });
