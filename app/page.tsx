"use client";

import { useChat } from "@ai-sdk/react";
import { useState, useRef, useEffect } from "react";
import UserPromptInput from "./components/UserPromptInput";
import MessageBubble from "./components/MessageBubble";

export default function Chat() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat();

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 flex flex-col w-full max-w-3xl py-8 pb-40 mx-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} whitespace-pre-wrap`}
          >
            {message.parts.map((part, index) => {
              switch (part.type) {
                case "text":
                  return (
                    <MessageBubble
                      key={`${message.id}-${index}`}
                      role={message.role}
                      text={part.text}
                    />
                  );
              }
            })}
          </div>
        ))}
        <div ref={bottomRef} />
        {status === "submitted" && <p>Thinking...</p>}
        {status === "streaming" && <p>Generating response...</p>}
      </div>
      <UserPromptInput
        input={input}
        setInput={setInput}
        sendMessage={sendMessage}
        messages={messages}
      />
    </div>
  );
}
