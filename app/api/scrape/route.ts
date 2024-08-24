import { formatString } from "@/lib/utils";
import { mistral } from "@ai-sdk/mistral";
import { auth } from "@clerk/nextjs/server";
import { generateObject } from "ai";
import * as cheerio from "cheerio";
import ky from "ky";
import { NextResponse } from "next/server";
import { z } from "zod";

export const maxDuration = 60;

const modelSchema = z.object({
  name: z.string(),
  college: z.string(),
  department: z.string(),
  subjects: z.array(z.string()),
});

export async function POST(req: Request) {
  const { userId } = auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { url } = await req.json();

  if (!url) {
    return new Response("No URL provided", { status: 400 });
  }

  const page = await ky.get(url).text();

  if (!page) {
    return new Response("Page not found", { status: 404 });
  }

  const $ = cheerio.load(page);

  $("script").remove();
  $("style").remove();

  // Get text content between body tags
  const bodyText = formatString($("body").text());

  //   Take first 200 words
  const summary = bodyText.split(" ").slice(0, 500).join(" ");

  //   Send summary to AI to generate Object

  const result = await generateObject({
    model: mistral("mistral-small-latest"),
    schema: modelSchema,
    system: `You are a content extractor. You will be provided a summary from which you have to extract an educator who may be a professor or a teacher. Extract the name, college, department, and subjects of the educator. Don't add any additional text. If any information is not included in the provided content, please provide 'N/A' or [] empty array in case of subjects.`,
    prompt: `Here's the content from which you need to generate an object from: ${summary}`,
  });

  const model = result.object;

  return NextResponse.json({
    ...model,
  });
}
