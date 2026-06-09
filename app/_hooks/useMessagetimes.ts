import { useEffect, useState } from "react";
import { UIMessage } from "ai";

export function useMessageTimes(messages: UIMessage[]) {
  const [messageTimes, setMessageTimes] = useState<Record<string, number>>(
    {},
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMessageTimes((prev) => {
      let changed = false;
      const next = { ...prev };

      for (const message of messages) {
        if (!next[message.id]) {
          next[message.id] = Date.now();
          changed = true;
        }
      }

      return changed ? next : prev;
    });
  }, [messages]);

  return messageTimes;
}