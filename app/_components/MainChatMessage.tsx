import AssistantMessageBubble from "./AssistantMessageBubble";
import UserMessageBubble from "./UserMessageBubble";
import { isGenerateComponentPart } from "../_lib/utils";
import { UIMessage } from "ai";

interface MainChatMessageProps {
  message: UIMessage;
  isLatest: boolean;
  durations: Record<string, number>;
}

type ChatPart = {
  key: string;
  text: string;
  isCode: boolean;
  explanation?: string;
};

export default function MainChatMessage({
  message,
  isLatest,
  durations,
}: MainChatMessageProps) {
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
    <div className="flex flex-col gap-6">
      <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
        {parts.map((part) =>
          isUser ? (
            <UserMessageBubble key={part.key} text={part.text} />
          ) : (
            <AssistantMessageBubble
              key={part.key}
              text={part.text}
              duration={durations[message.id] ?? 0}
              isCode={part.isCode}
              isLatest={isLatest}
            />
          ),
        )}
      </div>
    </div>
  );
}
