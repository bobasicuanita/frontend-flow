import { useEffect, useRef } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useChatContext } from "../_context/ChatContext";
import ChatMessage from "./ChatMessage";
import ChatStatusIndicator from "./ChatStatusIndicator";
import UserPromptInput from "./UserPromptInput";
import { useMessageTimes } from "../_hooks/useMessagetimes";
import { useChatIndicator } from "../_hooks/useChatIndicator";

interface SideChatLogProps {
  isThinking: boolean;
}

export default function SideChatLog({ isThinking }: SideChatLogProps) {
  const { messages, durations, status, setIsSideChatLogOpen } =
    useChatContext();

  const messageTimes = useMessageTimes(messages);

  const lastMessage = messages[messages.length - 1];
  const scrollbarRef = useRef<Scrollbars>(null);

  useEffect(() => {
    setIsSideChatLogOpen(true);
  }, [setIsSideChatLogOpen]);

  const isGenerating = status === "streaming";

  const { label, loadingMessage } = useChatIndicator(isThinking);

  useEffect(() => {
    scrollbarRef.current?.scrollToBottom();
  }, [messages, status]);

  return (
    <div className="w-full md:w-xs border-r border-zinc-300 min-h-screen flex flex-col bg-zinc-50">
      <div className="flex-1 min-h-0">
        <Scrollbars
          ref={scrollbarRef}
          style={{ width: "100%", height: "100%" }}
        >
          <div className="p-6">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                variant="side"
                message={message}
                isLatest={message.id === lastMessage?.id}
                durations={durations}
                loadingMessage={loadingMessage}
                createdAt={messageTimes[message.id]}
              />
            ))}

            <ChatStatusIndicator
              label={label}
              isThinking={isThinking}
              isGenerating={isGenerating}
            />
          </div>
        </Scrollbars>
      </div>

      <div className="px-3">
        <UserPromptInput />
      </div>
    </div>
  );
}
