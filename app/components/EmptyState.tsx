import type { UIMessage } from "ai";
import UserPromptInput from "./UserPromptInput";

interface UserPromptInputProps {
  input: string;
  setInput: (value: string) => void;
  sendMessage: (message: { text: string }) => void;
  messages: UIMessage[];
  setIsThinking: (value: boolean) => void;
}

export default function EmptyState({
  input,
  setInput,
  sendMessage,
  messages,
  setIsThinking,
}: UserPromptInputProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-semibold text-center">
        What do you want to build today?
      </h1>

      <p className="text-zinc-500 text-center">
        Generate React components in React and Tailwind, discuss engineering, or
        ask general questions.
      </p>
      <UserPromptInput
        input={input}
        setInput={setInput}
        sendMessage={sendMessage}
        messages={messages}
        setIsThinking={setIsThinking}
      />
    </div>
  );
}
