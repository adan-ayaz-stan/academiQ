"use server";

import { db } from "@/lib/db";
import { professors } from "@/lib/db/schema/professors";
import { reviews } from "@/lib/db/schema/reviews";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { createResource } from "./resources";

type NewReview = typeof reviews.$inferInsert;

export async function createReview(professor_id: string, review: NewReview) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  //   Check if professor exists
  const results = await db
    .select()
    .from(professors)
    .where(eq(professors.id, professor_id))
    .limit(1);

  const professor = results[0];

  //   Insert Review Here
  await db.insert(reviews).values({ professor_id, ...review });

  //   Calculate rating
  const newRating = Math.floor(
    (professor.rating * professor.totalReviews + review.rating) /
      (professor.totalReviews + 1)
  );

  console.log(newRating);

  //   Increment reviews on professor's profile
  await db
    .update(professors)
    .set({
      totalReviews: professor.totalReviews + 1,
      rating: newRating,
    })
    .where(eq(professors.id, professor_id));

  // Create Embedding here
  await createResource({
    content: `${professor.name} is an educator at ${professor.college} in ${
      professor.department
    }. ${professor.name} has ${
      professor.subjects.length
    } subjects. They teach ${professor.subjects.join(
      ", "
    )}. Here's a review submitted by one of the students: ${
      review.content
    }. This student has rated them ${review.rating} stars.`,
  });

  return review;
}

export async function getProfessorReviews(professor_id: string) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const results = await db
    .select()
    .from(reviews)
    .where(eq(reviews.professor_id, professor_id))
    .orderBy(reviews.createdAt);

  return results;
}
