"use client";

import { useChat } from "@ai-sdk/react";
import { useState } from "react";

export default function Chat() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat();
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map((message) => (
        <div key={message.id} className="whitespace-pre-wrap">
          {message.parts.map((part, i) => {
            switch (part.type) {
              case "text":
                return (
                  <div
                    className={`${message.role === "user" ? "text-right" : "text-left"}`}
                    key={`${message.id}-${i}`}
                  >
                    {part.text}
                  </div>
                );
            }
          })}
        </div>
      ))}

      {status === "submitted" && <p>Thinking...</p>}
      {status === "streaming" && <p>Generating response...</p>}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage({ text: input });
          setInput("");
        }}
      >
        <input
          className="fixed dark:bg-zinc-900 bottom-0 w-full max-w-md p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
          value={input}
          placeholder="Build me a button.."
          onChange={(e) => setInput(e.currentTarget.value)}
        />
      </form>
    </div>
  );
}
