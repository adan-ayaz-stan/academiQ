import { auth } from "@clerk/nextjs/server";
import { mistral } from "@ai-sdk/mistral";
import { streamObject, generateObject } from "ai";
import { convertToCoreMessages, streamText, tool } from "ai";
import { createResource } from "@/server/actions/resources";
import { findRelevantContent } from "@/lib/ai/embedding";
import { z } from "zod";

const modelSchema = z.object({
  model: z.enum(["SMALL", "MEDIUM", "LARGE"]),
});

// Allow streaming responses up to 60 seconds
export const maxDuration = 60;

export async function POST(req: Request) {
  const { userId } = auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const { messages } = await req.json();

    console.info("Messages sent to relay.");

    const result = await generateObject({
      model: mistral("mistral-small-latest"),
      schema: modelSchema,
      prompt: `You are the relay center model, an LLM Orchestration Bot. Your job is to select one model from the provided options to respond to the user based on the user's latest query or message and the required answer. \n Messages: ${
        messages[messages.length - 1].content
      }`,
    });

    const model = result.object;

    console.info("Model selected for response: ", model);
    // Need to return a streaming response
    switch (model.model) {
      case "SMALL":
        // Respond with small model
        const resultSm = await streamText({
          model: mistral("mistral-small-latest"),
          system: `You are the Headstarter Babysitter, a helpful assistant. Check your knowledge base before answering any questions.
          Respond to questions using information from tool calls and your own knowledge. If some relevant information is found in the tool calls, use it. If no relevant information is found in the tool calls, respond, "Sorry, I don't know."`,
          messages: convertToCoreMessages(messages),
          tools: {
            addResource: tool({
              description: `add a resource to your knowledge base.
                If the user provides a random piece of knowledge unprompted, use this tool without asking for confirmation.`,
              parameters: z.object({
                content: z
                  .string()
                  .describe(
                    "the content or resource to add to the knowledge base"
                  ),
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

        return resultSm.toDataStreamResponse();
      case "MEDIUM":
        // Respond with medium model
        const resultMd = await streamText({
          model: mistral("open-mistral-nemo"),
          system: `You are the Headstarter Babysitter, a helpful assistant. Check your knowledge base before answering any questions.
          Respond to questions using information from tool calls and your own knowledge. If some relevant information is found in the tool calls, use it. If no relevant information is found in the tool calls, respond with your own information and ignore the tool calls.`,
          messages: convertToCoreMessages(messages),
          tools: {
            addResource: tool({
              description: `add a resource to your knowledge base.
                If the user provides a random piece of knowledge unprompted, use this tool without asking for confirmation.`,
              parameters: z.object({
                content: z
                  .string()
                  .describe(
                    "the content or resource to add to the knowledge base"
                  ),
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

        return resultMd.toDataStreamResponse();
      case "LARGE":
        // Respond with large model
        const resultLg = await streamText({
          model: mistral("mistral-large-latest"),
          system: `You are the Headstarter Babysitter, a helpful assistant. Check your knowledge base before answering any questions.
          Respond to questions using information from tool calls and your own knowledge. If some relevant information is found in the tool calls, use it. If no relevant information is found in the tool calls, respond with your own information and ignore the tool calls. If the question is about code, respond with step by step instructions.`,
          messages: convertToCoreMessages(messages),
          tools: {
            addResource: tool({
              description: `add a resource to your knowledge base.
                If the user provides a random piece of knowledge unprompted, use this tool without asking for confirmation.`,
              parameters: z.object({
                content: z
                  .string()
                  .describe(
                    "the content or resource to add to the knowledge base"
                  ),
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

        return resultLg.toDataStreamResponse();
      default:
        // Respond with small model
        const resultSmDef = await streamText({
          model: mistral("mistral-small-latest"),
          system: `You are the Headstarter Babysitter, a helpful assistant. Check your knowledge base before answering any questions.
          Respond to questions using information from tool calls and your own knowledge. If some relevant information is found in the tool calls, use it. If no relevant information is found in the tool calls, respond, "Sorry, I don't know."`,
          messages: convertToCoreMessages(messages),
          tools: {
            addResource: tool({
              description: `add a resource to your knowledge base.
                If the user provides a random piece of knowledge unprompted, use this tool without asking for confirmation.`,
              parameters: z.object({
                content: z
                  .string()
                  .describe(
                    "the content or resource to add to the knowledge base"
                  ),
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

        return resultSmDef.toDataStreamResponse();
    }
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify(err), { status: 500 });
  }
}
