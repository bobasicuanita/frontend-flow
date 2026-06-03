import { useRef, useEffect } from "react";
import { useChatContext } from "../_context/ChatContext";

export default function UserPromptInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { input, setInput, sendMessage, messages } = useChatContext();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="sticky bottom-0 w-full bg-white/80 backdrop-blur">
      <div className="max-w-3xl mx-auto p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (!input.trim()) return;

            sendMessage({
              text: input,
            });

            setInput("");
          }}
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              messages.length > 0
                ? "Ask a follow-up question..."
                : "Generate a button..."
            }
            className="
              w-full rounded-xl border border-zinc-300
              bg-white px-4 py-3 shadow-sm
              outline-none transition
            focus:ring-black focus:outline-none
              focus:ring-0 focus:border-zinc-300
            "
          />
        </form>
      </div>
    </div>
  );
}
