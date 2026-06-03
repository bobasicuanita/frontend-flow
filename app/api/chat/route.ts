import {
  streamText,
  UIMessage,
  convertToModelMessages,
  tool,
} from "ai";
import { z } from "zod";
import { openai } from "@ai-sdk/openai";
import { setPrompt, generateComponentPrompt } from "./constants";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } =
    await req.json();

  const modelMessages = await convertToModelMessages(messages);

  const result = await streamText({
    model: openai("gpt-4.1-mini"),
    system: setPrompt(),
    messages: modelMessages,
    tools: {
      generateComponent: tool({
        description: "Generate a React component",
        inputSchema: z.object({
          prompt: z.string(),
        }),

        execute: async ({ prompt }) => {
          const res = await streamText({
            model: openai("gpt-4.1-mini"),
            system: generateComponentPrompt(),
            prompt,
          });

        const text = await res.text;

        const parsed = JSON.parse(text);

        return {
          code: parsed.code,
          explanation: parsed.explanation,
        };
        },
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}