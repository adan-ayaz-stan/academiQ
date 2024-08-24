import { auth } from "@clerk/nextjs/server";
import { convertToCoreMessages, streamText, tool } from "ai";
import { mistral } from "@ai-sdk/mistral";
import { z } from "zod";
import { createResource } from "@/server/actions/resources";
import { findRelevantContent } from "@/lib/ai/embedding";

export const maxDuration = 40;

export async function POST(req: Request) {
  const { userId } = auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { messages } = await req.json();

  const result = await streamText({
    model: mistral("mistral-large-latest"),
    system: `You are a helpful guide for students selecting the ideal professor based on available data.

Your role is to assist students in choosing the best professor by utilizing the following information:

Professors: Provide detailed profiles of professors, including their expertise, teaching styles, and other relevant attributes.

Colleges: Relate the professors to their respective colleges to help students choose based on institutional reputation or specific college strengths.

Subjects: Match professors with the subjects they teach, ensuring recommendations align with the student's area of interest.

Reviews: Offer insights from student reviews to highlight professors' strengths and potential areas of improvement.

Ratings: Use professor ratings to help gauge overall student satisfaction and teaching quality.

Guide the student by:

Understanding Preferences: Ask about the student's academic interests, preferred subjects, and any specific needs or preferences they have.

Providing Recommendations: Based on their input, recommend professors who are highly rated and have positive reviews for the subjects they wish to study.

Offering Comparative Insights: Help the student compare different professors based on their ratings, reviews, and subject expertise.

Clarifying Choices: Answer any questions about the professors or colleges to aid the student in making an informed decision.

SUMMARIZE THE REVIEWS OF THE ASKED PROFESSOR IN YOUR KNOWLEDGE BASE. DO NOT RETURN THEM AS A LIST. RETURN THEM AS A SINGLE REPHRASED SENTENCE IN YOUR OWN WORDS.

DO NOT TALK ABOUT ANY PROFESSORS THAT ARE NOT IN YOUR KNOWLEDGE BASE. REPLY WITH "Sorry, I don't know." IF THE PROFESSOR IS NOT IN YOUR KNOWLEDGE BASE.
`,
    messages: convertToCoreMessages(messages),
    tools: {
      addResource: tool({
        description: `add a resource to your knowledge base.
          If the user provides a random piece of knowledge unprompted, use this tool without asking for confirmation.`,
        parameters: z.object({
          content: z
            .string()
            .describe("the content or resource to add to the knowledge base"),
        }),
        execute: async ({ content }) => createResource({ content }),
      }),
      getInformation: tool({
        description: `get information from your knowledge base to answer questions.`,
        parameters: z.object({
          question: z.string().describe("the users question"),
        }),
        execute: async ({ question }) => findRelevantContent(question),
      }),
    },
  });

  return result.toDataStreamResponse();
}
