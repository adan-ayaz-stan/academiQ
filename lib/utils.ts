import { type ClassValue, clsx } from "clsx";
import { customAlphabet } from "nanoid";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789");

export function formatString(str: string) {
  return str
    .replace(/\s+/g, " ")
    .replace(/(\n\s*\n)+/g, "\n\n")
    .trim()
    .replace(/\n{3,}/g, "\n\n");
}

export function stringToChunks(input: string, overlap: number = 100): string[] {
  const chunks: string[] = [];
  let start = 0;
  while (start < input.length) {
    const end = start + overlap;
    chunks.push(input.slice(start, end));
    start += overlap - 100;
  }
  return chunks;
}
