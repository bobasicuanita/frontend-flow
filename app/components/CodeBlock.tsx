"use client";

import { useEffect, useState, memo } from "react";
import { codeToHtml } from "shiki";
import DOMPurify from "dompurify";

function CodeBlock({ code, lang }: { code: string; lang: string }) {
  const [html, setHtml] = useState("");

  useEffect(() => {
    codeToHtml(code, {
      lang,
      theme: "slack-dark",
    }).then(setHtml);
  }, [code, lang]);

  const safeHtml = DOMPurify.sanitize(html);

  return (
    <div className="rounded-xl overflow-hidden text-xs">
      <div
        className="
        codeblock
        overflow-x-auto
        [&_pre]:p-4
        [&_pre]:overflow-x-auto
        [&_pre]:whitespace-pre-wrap
        [&_pre]:wrap-break-word
        [&_code]:wrap-break-word
      "
        dangerouslySetInnerHTML={{ __html: safeHtml }}
      />
    </div>
  );
}

export default memo(CodeBlock);
