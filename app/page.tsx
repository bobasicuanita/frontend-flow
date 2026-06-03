"use client";
import { useState } from "react";
import ChatBot from "./_components/ChatBot";
import { ChatContext } from "./_context/ChatContext";
import { useChat } from "@ai-sdk/react";

export default function App() {
  const chat = useChat();
  const [input, setInput] = useState<string>("");
  const [durations, setDurations] = useState<Record<string, number>>({});
  const [isSideChatLogOpen, setIsSideChatLogOpen] = useState<boolean>(false);

  return (
    <ChatContext.Provider
      value={{
        sendMessage: chat.sendMessage,
        messages: chat.messages,
        status: chat.status,
        input,
        setInput,
        durations,
        setDurations,
        isSideChatLogOpen,
        setIsSideChatLogOpen,
      }}
    >
      <ChatBot />
    </ChatContext.Provider>
  );
}
