import { useEffect, useRef } from "react";
import { UIMessage } from "ai";

type UseResponseDurationsProps = {
  messages: UIMessage[];
  status: "submitted" | "streaming" | "ready" | "error";
  durations: Record<string, number>;
  setDurations: React.Dispatch<React.SetStateAction<Record<string, number>>>;
};

export function useResponseDurations({
  messages,
  status,
  durations,
  setDurations,
}: UseResponseDurationsProps) {
  const startTimes = useRef<Record<string, number>>({});

  const lastMessage = messages[messages.length - 1];

  useEffect(() => {
    if (status !== "submitted") return;
    if (!lastMessage) return;

    if (lastMessage.role === "user") {
      startTimes.current[lastMessage.id] = Date.now();
    }
  }, [status, lastMessage]);

  useEffect(() => {
    if (status !== "ready") return;
    if (!lastMessage) return;
    if (lastMessage.role !== "assistant") return;

    if (durations[lastMessage.id] !== undefined) return;

    const assistantIndex = messages.findIndex((m) => m.id === lastMessage.id);

    if (assistantIndex <= 0) return;

    const previousUserMessage = [...messages]
      .slice(0, assistantIndex)
      .reverse()
      .find((m) => m.role === "user");

    if (!previousUserMessage) return;

    const startedAt = startTimes.current[previousUserMessage.id];

    if (!startedAt) return;

    const duration = Math.floor((Date.now() - startedAt) / 1000);

    setDurations((prev) => ({
      ...prev,
      [lastMessage.id]: duration,
    }));

    delete startTimes.current[previousUserMessage.id];
  }, [status, lastMessage, messages, durations, setDurations]);
}
