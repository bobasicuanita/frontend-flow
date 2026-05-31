import { UIMessage } from "ai";
import ChatMessages from "./ChatMessages";

interface ChatLogProps {
  messages: UIMessage[];
  isComponentMode: boolean;
  setIsComponentMode: (value: boolean) => void;
  isChatLog?: boolean | undefined;
  status: string;
}

export default function ChatLog({
  messages,
  isComponentMode,
  setIsComponentMode,
  isChatLog,
  status,
}: ChatLogProps) {
  return (
    <div className="w-xs border-r-2 p-4">
      <ChatMessages
        status={status}
        messages={messages}
        isComponentMode={isComponentMode}
        setIsComponentMode={setIsComponentMode}
        isChatLog={isChatLog}
      />
    </div>
  );
}
