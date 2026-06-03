import { useChatContext } from "../_context/ChatContext";

interface SamplePromptPills {
  prompt: string;
}

export default function SamplePromptPills({ prompt }: SamplePromptPills) {
  const { sendMessage } = useChatContext();
  return (
    <button
      key={prompt}
      onClick={() => sendMessage({ text: prompt })}
      className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm text-zinc-700 transition hover:bg-zinc-100 hover:border-zinc-300 cursor-pointer"
    >
      {prompt}
    </button>
  );
}
