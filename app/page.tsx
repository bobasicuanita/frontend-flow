"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";

import ChatMessages from "./components/ChatMessages";
import EmptyState from "./components/EmptyState";
import UserPromptInput from "./components/UserPromptInput";
import ChatLog from "./components/ChatLog";

export default function Chat() {
  const [input, setInput] = useState<string>("");
  const [isComponentMode, setIsComponentMode] = useState<boolean>(false);
  const [isThinking, setIsThinking] = useState(false);

  const { messages, sendMessage, status } = useChat();

  const bottomRef = useRef<HTMLDivElement>(null);

  const isEmpty = messages.length === 0;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const showThinking =
    isThinking && status !== "streaming" && status !== "ready";

  return (
    <main className="min-h-screen flex bg-white text-black">
      {!isEmpty && isComponentMode && (
        <ChatLog
          messages={messages}
          isComponentMode={isComponentMode}
          setIsComponentMode={setIsComponentMode}
          isChatLog={true}
          status={status}
        />
      )}

      <div className="flex-1 flex flex-col">
        <div
          className={`
            flex-1 w-full max-w-3xl mx-auto px-4
            ${isEmpty ? "flex flex-col justify-center" : "py-8 pb-40"}
          `}
        >
          {isEmpty ? (
            <EmptyState
              input={input}
              setInput={setInput}
              sendMessage={sendMessage}
              messages={messages}
              setIsThinking={setIsThinking}
            />
          ) : (
            <>
              <ChatMessages
                messages={messages}
                isComponentMode={isComponentMode}
                setIsComponentMode={setIsComponentMode}
                status={status}
                isThinking={showThinking}
              />

              <div ref={bottomRef} />
            </>
          )}
        </div>

        {!isEmpty && (
          <UserPromptInput
            input={input}
            setInput={setInput}
            sendMessage={sendMessage}
            messages={messages}
            setIsThinking={setIsThinking}
          />
        )}
      </div>
    </main>
  );
}
