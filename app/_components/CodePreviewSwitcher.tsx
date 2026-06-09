import { useState } from "react";
import { Eye, Code2 } from "lucide-react";
import CodeBlock from "./CodeBlock";
import Preview from "./Preview";

interface CodePreviewSwitcherProps {
  code: string;
}

export default function CodePreviewSwitcher({
  code,
}: CodePreviewSwitcherProps) {
  const [view, setView] = useState<"preview" | "code">("code");

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-50 px-4 py-3">
        <div className="flex gap-2">
          {/* <div className="h-3 w-3 rounded-full bg-red-400" />
          <div className="h-3 w-3 rounded-full bg-yellow-400" />
          <div className="h-3 w-3 rounded-full bg-green-400" /> */}
        </div>

        <div className="flex rounded-lg bg-zinc-100 p-1">
          <button
            onClick={() => setView("preview")}
            className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition cursor-pointer ${
              view === "preview"
                ? "bg-white shadow-sm text-black"
                : "text-zinc-500"
            }`}
          >
            <Eye size={16} />
          </button>

          <button
            onClick={() => setView("code")}
            className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition cursor-pointer ${
              view === "code"
                ? "bg-white shadow-sm text-black"
                : "text-zinc-500"
            }`}
          >
            <Code2 size={16} />
          </button>
        </div>
      </div>
      <div className="w-full">
        {view === "preview" ? (
          <Preview code={code} />
        ) : (
          <CodeBlock code={code} lang="tsx" />
        )}
      </div>
    </div>
  );
}
