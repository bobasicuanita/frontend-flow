import SamplePromptPills from "./SamplePromptPills";
import { samplePrompts } from "../api/chat/constants";

export default function SamplePrompts() {
  if (!samplePrompts) return null;

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {samplePrompts.map((prompt, index) => (
        <SamplePromptPills key={index} prompt={prompt} />
      ))}
    </div>
  );
}
