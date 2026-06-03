"use client";

import { useEffect, useState, memo, useRef } from "react";
import { codeToHtml } from "shiki";
import DOMPurify from "dompurify";
import { Copy, Check } from "lucide-react";

function CodeBlock({ code, lang }: { code: string; lang: string }) {
  const [html, setHtml] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    codeToHtml(code, {
      lang,
      theme: "slack-dark",
    }).then(setHtml);
  }, [code, lang]);

  const [hasVerticalScrollbar, setHasVerticalScrollbar] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    setHasVerticalScrollbar(el.scrollHeight > el.clientHeight);
  }, [html]);

  const safeHtml = DOMPurify.sanitize(html);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);

    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative overflow-hidden text-xs border border-zinc-800 group">
      <button
        onClick={handleCopy}
        className={`absolute top-4 z-10 rounded-md bg-zinc-900/80 text-white cursor-pointer p-2.5 hover:bg-zinc-800 transition backdrop-blur ${
          hasVerticalScrollbar ? "right-8" : "right-4"
        }`}
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
      <div
        ref={containerRef}
        className="codeblock max-h-[500px] overflow-x-auto overflow-y-auto [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:whitespace-pre-wrap [&_pre]:wrap-break-word [&_code]:wrap-break-word"
        dangerouslySetInnerHTML={{ __html: safeHtml }}
      />
    </div>
  );
}

export default memo(CodeBlock);
