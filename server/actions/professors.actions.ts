"use server";

import { db } from "@/lib/db";
import { professors, TProfessor } from "@/lib/db/schema/professors";
import { auth } from "@clerk/nextjs/server";
import { desc, eq, gt, ilike, like } from "drizzle-orm";
import { createResource } from "./resources";

export async function getProfessorByName(name: string) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const results = await db
    .select()
    .from(professors)
    .where(ilike(professors.name, `%${name}%`));

  return results;
}

type NewProfessor = typeof professors.$inferInsert;

export async function createProfessor(data: NewProfessor) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }
  //   Insert in DB
  const prof = await db.insert(professors).values(data).returning();

  //   Insert and make an embedding
  await createResource({
    content: `${data.name} is an educator at ${data.college} in ${
      data.department
    }. He/she is teaching ${data.subjects.join(", ")}.`,
  });

  return prof[0];
}

export async function getProfessors(
  rating: number | null = 1,
  order: "asc" | "desc" | null = "desc"
) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const results = await db
    .select()
    .from(professors)
    .where(gt(professors.rating, rating ? rating * 10 : 0))
    .orderBy(
      order
        ? order == "desc"
          ? desc(professors.rating)
          : professors.rating
        : professors.name
    );

  return results;
}
