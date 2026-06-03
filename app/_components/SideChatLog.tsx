import { useRef, useEffect } from "react";
import { useChatContext } from "../_context/ChatContext";
import UserPromptInput from "./UserPromptInput";
import { isGenerateComponentPart } from "../_lib/utils";
import SideChatMessage from "./SideChatMessage";
import { useRandomLoadingMessage } from "../_hooks/useLoadingMessage";
import ChatStatusIndicator from "./ChatStatusIndicator";

interface SideChatLogProps {
  isThinking: boolean;
}

export default function SideChatLog({ isThinking }: SideChatLogProps) {
  const { messages, durations, status, setIsSideChatLogOpen } =
    useChatContext();

  const lastMessage = messages[messages.length - 1];
  const loadingMessage = useRandomLoadingMessage();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;

    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, status]);

  useEffect(() => {
    setIsSideChatLogOpen(true);
  }, [setIsSideChatLogOpen]);

  const lastAssistantHasContent =
    lastMessage?.role === "assistant" &&
    lastMessage.parts.some((part) => {
      if (part.type === "text") return !!part.text;
      if (isGenerateComponentPart(part)) return !!part.output?.code;
      return false;
    });

  const showThinking = isThinking || status === "submitted";

  const showLoadingMessage =
    !showThinking && status === "streaming" && !lastAssistantHasContent;

  const indicatorLabel = showThinking
    ? "Thinking..."
    : showLoadingMessage
      ? loadingMessage
      : null;

  return (
    <div
      ref={scrollContainerRef}
      className="w-xs border-r-2 p-4 h-screen overflow-y-auto"
    >
      {messages.map((message) => (
        <SideChatMessage
          key={message.id}
          message={message}
          isLatest={message.id === lastMessage?.id}
          durations={durations}
          loadingMessage={loadingMessage}
        />
      ))}

      <ChatStatusIndicator label={indicatorLabel} />
      <UserPromptInput />
    </div>
  );
}
