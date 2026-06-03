import { createContext, useContext, Dispatch, SetStateAction } from "react";
import { UIMessage } from "ai";

type ChatContextType = {
  sendMessage: (message: { text: string }) => void;
  messages: UIMessage[];
  input: string;
  setInput: (value: string) => void;
  status: "submitted" | "streaming" | "ready" | "error";
  durations: Record<string, number>;
  setDurations: Dispatch<SetStateAction<Record<string, number>>>;
  isSideChatLogOpen: boolean;
  setIsSideChatLogOpen: (value: boolean) => void;
};

export const ChatContext = createContext<ChatContextType | null>(null);

export const useChatContext = () => {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error("useChatContext must be used within ChatContext");
  }

  return context;
};
