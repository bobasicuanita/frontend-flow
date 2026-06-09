import { memo } from "react";
import ReactMarkdown from "react-markdown";
import { useChatContext } from "../_context/ChatContext";
import CodePreviewSwitcher from "./CodePreviewSwitcher";
import SamplePrompts from "./SamplePrompts";
import { Loader2 } from "lucide-react";
import { useCopyText } from "../_hooks/useCopyText";
import AssistantBubbleFooter from "./AssistantBubbleFooter";
import { TypingDots } from "./TypingDots";
import { motion, AnimatePresence } from "framer-motion";

export type ChatVariant = "main" | "side";

interface AssistantBubbleProps {
  variant: ChatVariant;
  text: string;
  duration: number;
  isLatest: boolean;
  isCode: boolean;
  explanation: string | undefined;
  loadingMessage: string;
  createdAt?: number;
}

function AssistantBubble({
  variant,
  text,
  duration,
  isLatest,
  isCode,
  explanation,
  loadingMessage,
  createdAt,
}: AssistantBubbleProps) {
  const { status, isSideChatLogOpen } = useChatContext();
  const { copied, handleCopy } = useCopyText(text);

  const isSide = variant === "side";

  const loading = status === "streaming" && isLatest;

  const statusLine = loading
    ? loadingMessage
    : duration !== undefined
      ? `Thought for ${duration}s`
      : "";

  const showStatusLine = isSide || !isSideChatLogOpen;
  const showPills = status === "ready" && isLatest && !isCode;
  const showCopy = !isSide && (!isLatest || status === "ready");

  const formattedTime = createdAt
    ? new Date(createdAt).toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      })
    : "";

  return (
    <div className={isSide ? undefined : "w-full"}>
      {showStatusLine && (
        <div className="text-xs text-zinc-500 min-h-[20px] flex items-center gap-2 font-[nasalization]">
          {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
          <span className="flex items-center gap-1">
            <span>{statusLine}</span>

            {loading && (
              <span className="flex items-center">
                <TypingDots />
              </span>
            )}
          </span>
        </div>
      )}

      {!isCode && (
        <div>
          <div className="text-sm whitespace-pre-line mb-4">{text}</div>

          {showPills && <SamplePrompts />}

          {showCopy && (
            <AssistantBubbleFooter
              createdAt={createdAt}
              copied={copied}
              handleCopy={handleCopy}
              formattedTime={formattedTime}
            />
          )}
        </div>
      )}
      {isCode && !isSide && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
          >
            <CodePreviewSwitcher code={text} />
          </motion.div>
        </AnimatePresence>
      )}
      {isSide && (
        <>
          <div className="text-sm whitespace-pre-line mb-2">
            <ReactMarkdown>{explanation}</ReactMarkdown>
          </div>

          <AssistantBubbleFooter
            createdAt={createdAt}
            copied={copied}
            handleCopy={handleCopy}
            formattedTime={formattedTime}
          />
        </>
      )}
    </div>
  );
}

export default memo(AssistantBubble);
