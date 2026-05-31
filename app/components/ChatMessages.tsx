import { useState, useEffect, useMemo, useRef } from "react";
import { UIMessage } from "ai";
import MessageBubble from "./MessageBubble";
import type { AIResponse } from "./MessageBubble";

interface ChatMessagesProps {
  messages: UIMessage[];
  isComponentMode: boolean;
  setIsComponentMode: (value: boolean) => void;
  status: string;
  isThinking: boolean;
}

function safeParse(data: string): AIResponse | null {
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export default function ChatMessages({
  messages,
  isComponentMode,
  setIsComponentMode,
  status,
  isThinking,
}: ChatMessagesProps) {
  const [durations, setDurations] = useState<Record<string, number>>({});
  const startTimes = useRef<Record<string, number>>({});

  const lastMessage = messages[messages.length - 1];

  const parsed = useMemo(() => {
    if (!lastMessage) return null;

    const textPart = lastMessage.parts.find((p) => p.type === "text");

    if (!textPart || textPart.type !== "text") return null;

    return safeParse(textPart.text);
  }, [lastMessage]);

  useEffect(() => {
    if (parsed?.type === "component") {
      setIsComponentMode(true);
    }
  }, [parsed, setIsComponentMode]);

  useEffect(() => {
    if (status !== "submitted") return;
    if (!lastMessage) return;

    if (lastMessage.role === "user") {
      startTimes.current[lastMessage.id] = Date.now();
    }
  }, [status, lastMessage]);

  useEffect(() => {
    if (status !== "ready") return;
    if (!lastMessage) return;
    if (lastMessage.role !== "assistant") return;

    if (durations[lastMessage.id] !== undefined) return;

    const assistantIndex = messages.findIndex((m) => m.id === lastMessage.id);

    if (assistantIndex <= 0) return;

    const precedingUserMessage = [...messages]
      .slice(0, assistantIndex)
      .reverse()
      .find((m) => m.role === "user");

    if (!precedingUserMessage) return;

    const startedAt = startTimes.current[precedingUserMessage.id];

    if (!startedAt) return;

    const duration = Math.floor((Date.now() - startedAt) / 1000);

    setDurations((prev) => ({
      ...prev,
      [lastMessage.id]: duration,
    }));

    delete startTimes.current[precedingUserMessage.id];
  }, [status, lastMessage, messages, durations]);

  const visibleMessages =
    isComponentMode && status === "ready"
      ? messages.filter((m) => m.id !== lastMessage?.id)
      : messages;

  return (
    <div className="flex flex-col gap-6">
      {isComponentMode && status === "ready" && lastMessage && (
        <div
          key={lastMessage.id}
          className={`flex ${
            lastMessage.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          {lastMessage.parts.map((part, index) => {
            if (part.type !== "text") return null;

            return (
              <MessageBubble
                key={`${lastMessage.id}-${index}`}
                role={lastMessage.role}
                data={part.text}
                durations={durations}
                id={lastMessage.id}
              />
            );
          })}
        </div>
      )}

      {!isComponentMode &&
        visibleMessages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {message.parts.map((part, index) => {
              if (part.type !== "text") return null;

              return (
                <MessageBubble
                  key={`${message.id}-${index}`}
                  role={message.role}
                  data={part.text}
                  durations={durations}
                  id={message.id}
                />
              );
            })}
          </div>
        ))}

      {isThinking && (
        <div className="flex justify-start">
          <p className="text-sm text-zinc-500">Thinking...</p>
        </div>
      )}
      {status === "streaming" && isComponentMode && (
        <div className="flex justify-start">
          <p className="text-sm text-zinc-500">Generating response...</p>
        </div>
      )}
    </div>
  );
}
