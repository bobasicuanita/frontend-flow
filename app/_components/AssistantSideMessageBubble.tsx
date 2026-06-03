import { memo } from "react";
import SamplePromptPills from "./SamplePromptPills";
import { samplePrompts } from "../api/chat/constants";
import { useChatContext } from "../_context/ChatContext";

interface AssistantSideMessageBubbleProps {
  text: string;
  duration: number;
  isLatest: boolean;
  isCode: boolean;
  explanation: string | undefined;
  loadingMessage: string;
}

function AssistantSideMessageBubble({
  text,
  duration,
  isLatest,
  isCode,
  explanation,
  loadingMessage,
}: AssistantSideMessageBubbleProps) {
  const { status } = useChatContext();

  const loadingStatus =
    status === "streaming" && isLatest
      ? loadingMessage
      : duration !== undefined
        ? `Thought for ${duration}s`
        : "";

  const showPills = status === "ready" && isLatest && !isCode;

  return (
    <div>
      <div className="text-sm text-zinc-500 min-h-[20px]">{loadingStatus}</div>
      {!isCode && (
        <div>
          <div className="text-sm whitespace-pre-line mb-4">{text}</div>
          {showPills && (
            <div className="flex flex-wrap gap-2">
              {samplePrompts?.map((prompt, index) => (
                <SamplePromptPills key={index} prompt={prompt} />
              ))}
            </div>
          )}
        </div>
      )}
      <div className="text-sm whitespace-pre-line mb-4">{explanation}</div>
    </div>
  );
}

export default memo(AssistantSideMessageBubble);
