import { UIMessage } from "ai";

interface UserPromptInput {
  input: string;
  setInput: (e: string) => void;
  sendMessage: (message: { text: string }) => void;
  messages: UIMessage[];
}

export default function UserPromptInput({
  setInput,
  sendMessage,
  input,
  messages,
}: UserPromptInput) {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-md mt-16 mb-8 mx-auto bg-white">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage({ text: input });
          setInput("");
        }}
        className="flex justify-center"
      >
        <input
          className="dark:bg-zinc-900 bottom-0 w-full max-w-md p-2 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
          value={input}
          placeholder={`${messages.length > 1 ? "Ask a follow-up question..." : "Generate a button.."} `}
          onChange={(e) => setInput(e.currentTarget.value)}
        />
      </form>
    </div>
  );
}
