"use client";

import { Button } from "@/components/ui/button";
import { Message, useChat } from "ai/react";
import { createContext, SVGProps, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  input: z.string().min(2).max(500),
});

export const MessagesContext = createContext<Message[]>([]);

export default function ChatForm({ children }: { children?: React.ReactNode }) {
  const [isCreatingDatasets, setCreatingDatasets] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: "",
    },
  });

  const { isLoading, setInput, input, handleSubmit, messages } = useChat({
    api: "/api/mistral/orchestration",
    maxToolRoundtrips: 2,
    onResponse() {
      // Scroll the document to the end
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    },
    onFinish() {
      setInput("");
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    },
  });

  return (
    <MessagesContext.Provider value={messages}>
      {children}
      <div className="w-full max-w-xl mx-auto">
        <Form {...form}>
          <form
            id="ai-chat-form"
            onSubmit={(e) => handleSubmit(e)}
            className="fixed max-lg:left-1/2 max-lg:-translate-x-1/2 max-lg:bottom-0 bottom-12 w-full max-w-xl bg-primary shadow-2xl shadow-davy p-4 rounded-xl"
          >
            <div className="relative flex flex-row gap-1 items-end p-4 rounded-xl">
              <textarea
                name="input"
                rows={2}
                value={input}
                placeholder="I'm looking for a professor that..."
                onChange={(e) => setInput(e.target.value)}
                className="w-full text-white bg-primary resize-y min-h-12 max-h-40 focus-visible:outline-none scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white placeholder:text-gray-300"
              ></textarea>

              <Button
                className={cn("p-2 h-fit w-fit", isLoading && "animate-pulse")}
                size={"icon"}
                variant={"secondary"}
                type="submit"
                disabled={isLoading}
              >
                <MaterialSymbolsSendOutline className="w-5 h-5" />
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </MessagesContext.Provider>
  );
}

export function MaterialSymbolsSendOutline(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M3 20V4l19 8zm2-3l11.85-5L5 7v3.5l6 1.5l-6 1.5zm0 0V7z"
      ></path>
    </svg>
  );
}
