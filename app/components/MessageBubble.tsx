import { memo, useMemo } from "react";
import CodeBlock from "./CodeBlock";
import Preview from "./Preview";

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
}

function safeParse(data: string): AIResponse | null {
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

function MessageBubble({ role, data, durations, id }: MessageBubbleProps) {
  const parsed = useMemo(() => safeParse(data), [data]);

  if (role === "user") {
    return (
      <div className="bg-taupe-200 rounded-xl my-4 p-2 px-4 py-1 w-fit text-sm">
        {data}
      </div>
    );
  }

  return (
    <div>
      {durations[id] !== undefined && (
        <p className="mt-4 text-sm text-zinc-500">
          Thought for {durations[id]}s
        </p>
      )}

      {!parsed && <div className="text-sm">{data}</div>}

      {parsed && (
        <>
          <div className="text-sm">{parsed.explanation}</div>

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
