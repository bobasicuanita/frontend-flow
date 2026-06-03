"use client";

import { useEffect, useRef, useState } from "react";
import MainChatMessage from "./MainChatMessage";
import EmptyState from "./EmptyState";
import UserPromptInput from "./UserPromptInput";
import SideChatLog from "./SideChatLog";
import { useChatContext } from "../_context/ChatContext";
import { UIMessage } from "ai";
import { useResponseDurations } from "../_hooks/useResponseDurations";
import { useRandomLoadingMessage } from "../_hooks/useLoadingMessage";
import ChatStatusIndicator from "./ChatStatusIndicator";
import { isGenerateComponentPart } from "../_lib/utils";

export default function ChatBot() {
  const { messages, status, durations, setDurations } = useChatContext();

  const bottomRef = useRef<HTMLDivElement>(null);

  const isEmpty = messages.length === 0;

  const [lockedMessage, setLockedMessage] = useState<UIMessage | null>(null);

  const lastToolMessageIdRef = useRef<string | null>(null);

  const lastToolMessage = messages.findLast((m) =>
    m.parts.some((p) => p.type === "tool-generateComponent"),
  );

  useEffect(() => {
    if (!lastToolMessage) return;

    if (lastToolMessageIdRef.current === lastToolMessage.id) return;

    lastToolMessageIdRef.current = lastToolMessage.id;
    setLockedMessage(lastToolMessage);
  }, [lastToolMessage]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const lastMessage = messages[messages.length - 1];

  const lastAssistantHasContent =
    lastMessage?.role === "assistant" &&
    lastMessage.parts.some((part) => {
      if (part.type === "text") return !!part.text;
      if (isGenerateComponentPart(part)) return !!part.output?.code;
      return false;
    });

  const showThinking = status !== "streaming" && status !== "ready";

  const isComponentMode = lockedMessage !== null;

  useResponseDurations({
    messages,
    status,
    durations,
    setDurations,
  });

  const loadingMessage = useRandomLoadingMessage();

  const showLoadingMessage =
    !showThinking && status === "streaming" && !lastAssistantHasContent;

  const indicatorLabel = showThinking
    ? "Thinking..."
    : showLoadingMessage
      ? loadingMessage
      : null;

  return (
    <main className="h-screen flex bg-white text-black">
      {!isEmpty && isComponentMode && <SideChatLog isThinking={showThinking} />}
      <div className="flex-1 flex flex-col">
        <div
          className={`
            flex-1 w-full max-w-3xl mx-auto px-4
            ${isEmpty ? "flex flex-col justify-center" : "py-8 pb-40"}
          `}
        >
          {isEmpty ? (
            <EmptyState />
          ) : !isComponentMode ? (
            <>
              {messages.map((message) => (
                <MainChatMessage
                  key={message.id}
                  message={message}
                  isLatest={message.id === lastMessage?.id}
                  durations={durations}
                />
              ))}
              <div ref={bottomRef} />
            </>
          ) : (
            <MainChatMessage
              key={lastMessage.id}
              message={lastMessage}
              isLatest={true}
              durations={durations}
            />
          )}
          {!isComponentMode && <ChatStatusIndicator label={indicatorLabel} />}
        </div>

        {!isEmpty && !isComponentMode && <UserPromptInput />}
      </div>
    </main>
  );
}
