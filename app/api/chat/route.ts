import {
  streamText,
  UIMessage,
  convertToModelMessages,
} from "ai";
import { openai } from "@ai-sdk/openai";
import { setPrompt } from "./constants";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } =
    await req.json();

  const modelMessages = await convertToModelMessages(messages);

  const result = await streamText({
    model: openai("gpt-4.1-mini"),
    system: setPrompt(),
    messages: modelMessages,
  });

  return result.toUIMessageStreamResponse();
}