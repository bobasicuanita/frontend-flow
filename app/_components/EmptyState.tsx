import UserPromptInput from "./UserPromptInput";
import SamplePromptPills from "./SamplePromptPills";
import { samplePrompts } from "../api/chat/constants";
import { useChatContext } from "../_context/ChatContext";

export default function EmptyState() {
  const { status } = useChatContext();
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-semibold text-center">
        What do you want to build today?
      </h1>
      <p className="text-zinc-500 text-center">
        Generate React components in React-Typescript and Tailwind, discuss
        engineering, or ask general questions.
      </p>
      {status === "ready" && (
        <div className="flex flex-wrap gap-2">
          {samplePrompts &&
            samplePrompts.map((prompt, index) => (
              <SamplePromptPills key={index} prompt={prompt} />
            ))}
        </div>
      )}
      <UserPromptInput />
    </div>
  );
}
