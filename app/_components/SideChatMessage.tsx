import { UIMessage } from "ai";
import AssistantSideMessageBubble from "./AssistantSideMessageBubble";
import UserMessageBubble from "./UserMessageBubble";
import { isGenerateComponentPart } from "../_lib/utils";

interface SideChatMessageProps {
  message: UIMessage;
  isLatest: boolean;
  durations: Record<string, number>;
  loadingMessage: string;
}

type ChatPart = {
  key: string;
  text: string;
  isCode: boolean;
  explanation?: string;
};

export default function SideChatMessage({
  message,
  isLatest,
  durations,
  loadingMessage,
}: SideChatMessageProps) {
  const parts: ChatPart[] = [];

  message.parts.forEach((part, index) => {
    if (!part) return;

    const key = `${message.id}-${index}`;

    if (part.type === "text" && part.text) {
      parts.push({
        key,
        text: part.text,
        isCode: false,
      });
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

  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      {parts.map((part) =>
        isUser ? (
          <UserMessageBubble key={part.key} text={part.text} />
        ) : (
          <AssistantSideMessageBubble
            key={part.key}
            text={part.text}
            explanation={part.explanation}
            isCode={part.isCode}
            isLatest={isLatest}
            duration={durations[message.id] ?? 0}
            loadingMessage={loadingMessage}
          />
        ),
      )}
    </div>
  );
}
