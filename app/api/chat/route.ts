import { streamText, generateText, UIMessage, convertToModelMessages } from 'ai';
import { openai } from "@ai-sdk/openai";
import { categorizationPrompt } from './constants';

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const lastMessage = messages[messages.length - 1];

  const userPrompt = lastMessage.parts.filter(part => part.type === "text").map(part => part.text).join(" ");

  const categorization = await generateText({
    model: openai("gpt-4.1-mini"),
    prompt: categorizationPrompt(userPrompt),
  })

  // const reasoning = await generateText({
  //   model: openai("gpt-4.1-mini"),
  //   prompt: `
  //   Return a small explanation of your thought process for the user's prompt

  //   Use up to 2 sentences.
  //   `
  // })

  // return Response.json({
  //   reasoning: reasoning.text,
  // });

  const result = streamText({
    model: openai("gpt-5.4-mini"),
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}