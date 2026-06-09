"use client";

import { useEffect, useState, memo, useRef } from "react";
import { codeToHtml } from "shiki";
import DOMPurify from "dompurify";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Copy, Check } from "lucide-react";
import { useCopyText } from "../_hooks/useCopyText";

function CodeBlock({ code, lang }: { code: string; lang: string }) {
  const [html, setHtml] = useState("");
  const [height, setHeight] = useState(0);
  const [hasVerticalScrollbar, setHasVerticalScrollbar] = useState(false);

  const { copied, handleCopy } = useCopyText(code);

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    codeToHtml(code, {
      lang,
      theme: "night-owl-light",
    }).then(setHtml);
  }, [code, lang]);

  const safeHtml = DOMPurify.sanitize(html);

  useEffect(() => {
    if (!contentRef.current) return;

    const contentHeight = contentRef.current.scrollHeight;
    const maxHeight = 700;

    setHeight(Math.min(contentHeight, maxHeight));
    setHasVerticalScrollbar(contentHeight > maxHeight);
  }, [safeHtml]);

  return (
    <div className="relative overflow-hidden text-xs group">
      <button
        onClick={handleCopy}
        className={`absolute top-4 z-10 rounded-md bg-zinc-900/80 text-white cursor-pointer p-2.5 hover:bg-zinc-800 transition backdrop-blur ${
          hasVerticalScrollbar ? "right-8" : "right-4"
        }`}
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
      <div
        ref={contentRef}
        className="absolute invisible pointer-events-none w-full"
        dangerouslySetInnerHTML={{ __html: safeHtml }}
      />

      <Scrollbars
        style={{ height }}
        renderThumbVertical={(props) => (
          <div {...props} className="bg-zinc-400 rounded-full" />
        )}
      >
        <div
          className="codeblock
            [&_pre]:p-4
            [&_pre]:overflow-x-auto
            [&_pre]:whitespace-pre-wrap
            [&_pre]:wrap-break-word
            [&_code]:wrap-break-word"
          dangerouslySetInnerHTML={{ __html: safeHtml }}
        />
      </Scrollbars>
    </div>
  );
}

export default memo(CodeBlock);
