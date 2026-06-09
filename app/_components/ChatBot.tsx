"use client";

import { useEffect, useRef, useState } from "react";
import { UIMessage } from "ai";
import { useChatContext } from "../_context/ChatContext";
import { useResponseDurations } from "../_hooks/useResponseDurations";
import { useChatIndicator } from "../_hooks/useChatIndicator";
import { useMessageTimes } from "../_hooks/useMessagetimes";
import { AILoader } from "./AILoader";
import ChatMessage from "./ChatMessage";
import ChatStatusIndicator from "./ChatStatusIndicator";
import EmptyState from "./EmptyState";
import UserPromptInput from "./UserPromptInput";
import SideChatLog from "./SideChatLog";

export default function ChatBot() {
  const { messages, status, durations, setDurations } = useChatContext();
  const [mobileView, setMobileView] = useState<"history" | "preview">(
    "preview",
  );
  const bottomRef = useRef<HTMLDivElement>(null);
  const lastToolMessageIdRef = useRef<string | null>(null);

  const [lockedMessage, setLockedMessage] = useState<UIMessage | null>(null);

  const messageTimes = useMessageTimes(messages);

  const isEmpty = messages.length === 0;
  const lastMessage = messages[messages.length - 1];
  const isComponentMode = lockedMessage !== null;

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

  useResponseDurations({ messages, status, durations, setDurations });

  const isThinking = status === "submitted";
  const isGenerating = status === "streaming";
  const { label: indicatorLabel, loadingMessage } =
    useChatIndicator(isThinking);

  return (
    <main className="min-h-screen flex bg-zinc-50 text-black">
      {isComponentMode && (
        <div className="fixed top-0 left-0 right-0 z-50 md:hidden bg-zinc-50 border-b border-zinc-200 p-3">
          <div className="flex rounded-lg bg-zinc-100 p-1">
            <button
              onClick={() => setMobileView("history")}
              className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition ${
                mobileView === "history"
                  ? "bg-white shadow text-black"
                  : "text-zinc-500"
              }`}
            >
              History
            </button>

            <button
              onClick={() => setMobileView("preview")}
              className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition ${
                mobileView === "preview"
                  ? "bg-white shadow text-black"
                  : "text-zinc-500"
              }`}
            >
              Preview
            </button>
          </div>
        </div>
      )}
      {!isEmpty && isComponentMode && (
        <div className="hidden md:flex">
          <SideChatLog isThinking={isThinking} />
        </div>
      )}
      {!isEmpty && isComponentMode && mobileView === "history" && (
        <div className="flex md:hidden flex-1 w-full pt-16">
          <SideChatLog isThinking={isThinking} />
        </div>
      )}
      <div
        className={`
        flex-1 flex flex-col
        ${
          isComponentMode && mobileView === "history"
            ? "hidden md:flex"
            : "flex"
        }
      `}
      >
        <div
          className={`
          flex-1 flex flex-col w-full xl:max-w-7xl max-w-4xl mx-auto px-4 md:px-12 bg-zinc-50
          ${isEmpty ? "justify-center" : "py-8 md:px-16"}
          ${isComponentMode ? "pt-16 md:pt-8" : ""}
        `}
        >
          {isEmpty ? (
            <EmptyState />
          ) : lockedMessage === null ? (
            <>
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  variant="main"
                  message={message}
                  isLatest={message.id === lastMessage?.id}
                  durations={durations}
                  loadingMessage={loadingMessage}
                  createdAt={messageTimes[message.id]}
                />
              ))}

              <div ref={bottomRef} />
            </>
          ) : (
            <ChatMessage
              key={lockedMessage.id}
              variant="main"
              message={lockedMessage}
              isLatest={true}
              durations={durations}
              loadingMessage={loadingMessage}
              createdAt={messageTimes[lockedMessage.id]}
            />
          )}

          {!isComponentMode && (
            <ChatStatusIndicator
              label={indicatorLabel}
              isThinking={isThinking}
              isGenerating={isGenerating}
            />
          )}

          {isComponentMode && isGenerating && (
            <div className="flex-1 flex items-center justify-center py-4 text-zinc-500">
              <AILoader />
            </div>
          )}
        </div>

        {!isEmpty && !isComponentMode && <UserPromptInput />}
      </div>
    </main>
  );
}
