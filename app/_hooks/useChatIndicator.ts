import { useChatContext } from "../_context/ChatContext";
import { useRandomLoadingMessage } from "./useLoadingMessage";
import { isGenerateComponentPart } from "../_lib/utils";

export function useChatIndicator(isThinking: boolean) {
  const { messages, status } = useChatContext();
  const loadingMessage = useRandomLoadingMessage();

  const lastMessage = messages[messages.length - 1];

  const lastAssistantHasContent =
    lastMessage?.role === "assistant" &&
    lastMessage.parts.some((part) => {
      if (!part) return false;
      if (part.type === "text") return !!part.text;
      if (isGenerateComponentPart(part)) return !!part.output?.code;
      return false;
    });

  const showLoadingMessage =
    !isThinking && status === "streaming" && !lastAssistantHasContent;

  const label = isThinking
    ? "Thinking"
    : showLoadingMessage
      ? loadingMessage
      : null;

  return { label, loadingMessage };
}
