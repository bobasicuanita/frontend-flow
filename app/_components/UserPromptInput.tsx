import { useRef, useEffect } from "react";
import type { SyntheticEvent } from "react";
import { useChatContext } from "../_context/ChatContext";

export default function UserPromptInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { input, setInput, sendMessage, messages, status } = useChatContext();

  useEffect(() => {
    if (status === "ready") {
      inputRef.current?.focus();
    }
  }, [status]);

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input.trim()) return;

    sendMessage({ text: input });
    setInput("");
  };

  const isInputdisabled = status !== "ready";

  return (
    <div className="sticky bottom-0 w-full backdrop-blur pb-8">
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              messages.length > 0
                ? "Ask a follow-up question..."
                : "Generate a button..."
            }
            disabled={isInputdisabled}
            className={`w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 shadow-sm outline-none transition focus:ring-black focus:outline-none focus:ring-0 focus:border-zinc-300 ${isInputdisabled ? "disabled:bg-gray-100" : ""}`}
          />
        </form>
      </div>
    </div>
  );
}
