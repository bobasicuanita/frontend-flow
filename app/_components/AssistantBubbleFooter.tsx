import { Check, Copy, Clock3 } from "lucide-react";

interface AssistantBubbleFooterProps {
  createdAt?: number;
  copied: boolean;
  handleCopy: () => void;
  formattedTime: string;
}

export default function AssistantBubbleFooter({
  createdAt,
  copied,
  handleCopy,
  formattedTime,
}: AssistantBubbleFooterProps) {
  return (
    <div className="flex items-center justify-end gap-3 mb-4 text-xs text-zinc-500 mt-2">
      {createdAt && (
        <div className="flex items-center gap-1">
          <Clock3 size={12} />
          <span>{formattedTime}</span>
        </div>
      )}
      <button
        onClick={handleCopy}
        className="flex items-center gap-1 cursor-pointer text-zinc-500 hover:text-zinc-800"
        aria-label="Copy response"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
    </div>
  );
}
