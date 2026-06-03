import { memo } from "react";
import SamplePromptPills from "./SamplePromptPills";
import { samplePrompts } from "../api/chat/constants";
import { useChatContext } from "../_context/ChatContext";
import CodePreviewSwitcher from "./CodePreviewSwitcher";
import { useRandomLoadingMessage } from "../_hooks/useLoadingMessage";

interface AssistantMessageBubbleProps {
  text: string;
  duration: number;
  isLatest: boolean;
  isCode: boolean;
}

function AssistantMessageBubble({
  text,
  duration,
  isLatest,
  isCode,
}: AssistantMessageBubbleProps) {
  const loadingMessage = useRandomLoadingMessage();
  const { status, isSideChatLogOpen } = useChatContext();

  const loadingStatus =
    status === "streaming" && isLatest
      ? loadingMessage
      : duration !== undefined
        ? `Thought for ${duration}s`
        : "";

  const showPills = status === "ready" && isLatest && !isCode;

  return (
    <div className="w-full">
      {!isSideChatLogOpen && (
        <div className="text-sm text-zinc-500 min-h-[20px]">
          {loadingStatus}
        </div>
      )}

      {!isCode && (
        <div>
          <div className="text-sm whitespace-pre-line mb-4">{text}</div>
          {showPills && (
            <div className="flex flex-wrap gap-2">
              {samplePrompts &&
                samplePrompts.map((prompt, index) => (
                  <SamplePromptPills key={index} prompt={prompt} />
                ))}
            </div>
          )}
        </div>
      )}
      {isCode && <CodePreviewSwitcher code={text} />}
    </div>
  );
}

export default memo(AssistantMessageBubble);
