import { memo, useRef, useEffect } from "react";
import Markdown from "react-markdown";
import CodeBlock from "./CodeBlock";
import remarkGfm from "remark-gfm";

interface MessageBubbleProps {
  text: string;
  role: string;
}

function MessageBubble({ role, text }: MessageBubbleProps) {
  function checkCodeblockFinished(text: string) {
    const matches = text.match(/```/g);

    return matches && matches.length % 2 !== 0;
  }

  const shouldRenderMarkdown = !checkCodeblockFinished(text);

  return (
    <div>
      {role === "user" && (
        <div
          className={`${role === "user" && "bg-taupe-200 rounded-xl my-4 p-2  px-4 py-1"} w-fit text-sm`}
        >
          {text}
        </div>
      )}
      {role === "assistant" && shouldRenderMarkdown && (
        <Markdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ children, className }) {
              const lang = className?.replace("language-", "") || "txt";
              if (!className) {
                return (
                  <code className="bg-zinc-800 px-1 py-0.5 rounded w-full">
                    {children}
                  </code>
                );
              }

              return <CodeBlock code={String(children).trim()} lang={lang} />;
            },
          }}
        >
          {text}
        </Markdown>
      )}
    </div>
  );
}

export default memo(MessageBubble);
