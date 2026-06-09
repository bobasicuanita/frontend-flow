import { useState } from "react";

export const useCopyText = (text: string) => {
    const [copied, setCopied] = useState(false);
    const handleCopy = async () => {
    await navigator.clipboard.writeText(text);

    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return { copied, handleCopy }
}