import { Brain, Loader2 } from "lucide-react";
import { TypingDots } from "./TypingDots";
interface ChatStatusIndicatorProps {
  label: string | null;
  isThinking?: boolean;
  isGenerating?: boolean;
}

export default function ChatStatusIndicator({
  label,
  isThinking,
  isGenerating,
}: ChatStatusIndicatorProps) {
  return (
    <div className="flex justify-start">
      {label ? (
        <div className="flex items-center gap-2 text-xs text-zinc-500 font-[nasalization]">
          {isThinking && <Brain className="w-4 h-4" />}
          {isGenerating && <Loader2 className="w-4 h-4 animate-spin" />}
          <p>
            {label}
            {(isThinking || isGenerating) && <TypingDots />}
          </p>
        </div>
      ) : null}
    </div>
  );
}
