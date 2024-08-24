import { Hono } from "hono";
import { handle } from "hono/vercel";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import ky from "ky";
import { formatString, stringToChunks } from "@/lib/utils";
const cheerio = require("cheerio"); // 1

export const runtime = "edge";

const app = new Hono().basePath("/api");

app.get("/hello", (c) => {
  return c.json({
    message: "Hello from Professor RAG!",
  });
});

// Need route for
/**
 * 1. Web Scrapping Professor's Page
 * 2. Generating Professor's Information from Web Scraping
 * 3. Updating Professor's Information to Database
 * 4. Updating Professor's Information in Database as Embedding
 */

app.post(
  "/scrape",
  zValidator(
    "json",
    z.object({
      url: z.string().url(),
    })
  ),
  async (c) => {
    const { url } = await c.req.json<{ url: string }>();

    console.log("Recieved URL: ", url);

    const page = await ky.get(url).text();

    if (!page) {
      return c.json({ status: 404 });
    }

    const $ = cheerio.load(page);

    $("script").remove();
    $("style").remove();

    const pageTitle = $("title").text();
    const pageDescription = $("meta[name=description]").attr("content");

    // Get text content between body tags
    const bodyText = formatString($("body").text());

    // Extract all links on the same domain
    const links = $("a")
      .toArray()
      .map((a: any) => {
        const href = $(a).attr("href");
        if (href && href.startsWith("/")) {
          return new URL(href, url).href;
        }
      })
      .filter(Boolean);

    const chunks = stringToChunks(bodyText);

    console.log(
      `Generated ${chunks.length} chunks for a total of ${bodyText.length} characters`
    );

    return c.json({
      title: pageTitle,
      description: pageDescription,
      body: bodyText,
      chunks,
      links,
    });
  }
);

export const GET = handle(app);
export const POST = handle(app);
