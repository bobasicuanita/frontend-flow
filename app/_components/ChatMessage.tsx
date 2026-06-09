import { memo } from "react";
import { UIMessage } from "ai";
import { isGenerateComponentPart } from "../_lib/utils";
import AssistantBubble, { ChatVariant } from "./AssistantBubble";
import UserMessageBubble from "./UserMessageBubble";

type MessagePart = UIMessage["parts"][number];

type ChatPart = {
  key: string;
  text: string;
  explanation?: string;
  isCode: boolean;
};

interface ChatMessageProps {
  message: UIMessage;
  isLatest: boolean;
  durations: Record<string, number>;
  loadingMessage: string;
  variant: ChatVariant;
  createdAt?: number;
}

function ChatMessage({
  message,
  isLatest,
  durations,
  loadingMessage,
  variant,
  createdAt,
}: ChatMessageProps) {
  const parts: ChatPart[] = [];

  message.parts.forEach((part: MessagePart, index: number) => {
    if (!part) return;

    const key = `${message.id}-${index}`;

    if (part.type === "text" && part.text) {
      parts.push({ key, text: part.text, isCode: false });
      return;
    }

    if (isGenerateComponentPart(part) && part.output?.code) {
      parts.push({
        key,
        text: part.output.code,
        explanation: part.output.explanation,
        isCode: true,
      });
    }
  });

  if (parts.length === 0) return null;

  const isUser = message.role === "user";

  const row = (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      {parts.map((part) =>
        isUser ? (
          <UserMessageBubble key={part.key} text={part.text} />
        ) : (
          <AssistantBubble
            key={part.key}
            variant={variant}
            text={part.text}
            explanation={part.explanation}
            isCode={part.isCode}
            isLatest={isLatest}
            duration={durations[message.id] ?? 0}
            loadingMessage={loadingMessage}
            createdAt={createdAt}
          />
        ),
      )}
    </div>
  );

  if (variant === "main") {
    return <div className="flex flex-col gap-6">{row}</div>;
  }

  return row;
}

export default memo(ChatMessage);
