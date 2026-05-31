import { memo, useMemo, useState } from "react";
import CodeBlock from "./CodeBlock";
import Preview from "./Preview";
import { loadingMessages } from "../api/chat/constants";

export type AIResponse = {
  type: "chat" | "component";
  reasoning: string;
  explanation?: string;
  code?: string;
};

interface MessageBubbleProps {
  role: string;
  data: string;
  durations: Record<string, number>;
  id: string;
  status: string;
  isLatest: boolean;
}

function safeParse(data: string): AIResponse | null {
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

function MessageBubble({
  role,
  data,
  durations,
  id,
  status,
  isLatest,
}: MessageBubbleProps) {
  const isStreaming = isLatest && status === "streaming";
  const parsed = useMemo(() => {
    if (isStreaming) return null;
    return safeParse(data);
  }, [data, isStreaming]);

  const [loadingMessage] = useState(
    () => loadingMessages[Math.floor(Math.random() * loadingMessages.length)],
  );

  if (role === "user") {
    return (
      <div className="bg-taupe-200 rounded-xl my-4 p-2 px-4 py-1 w-fit text-sm">
        {data}
      </div>
    );
  }

  const duration = durations[id];

  return (
    <div>
      <div className="text-sm text-zinc-500 min-h-[20px]">
        {status === "streaming" && isLatest
          ? loadingMessage
          : duration !== undefined
            ? `Thought for ${duration}s`
            : " "}
      </div>

      {!parsed && <div className="text-sm whitespace-pre-line">{data}</div>}

      {parsed && (
        <>
          <div className="text-sm whitespace-pre-line">
            {parsed.explanation}
          </div>

          {parsed.type === "component" && parsed.code && (
            <>
              <CodeBlock code={parsed.code} lang="tsx" />

              <div className="mt-6">
                <Preview code={parsed.code} />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default memo(MessageBubble);
