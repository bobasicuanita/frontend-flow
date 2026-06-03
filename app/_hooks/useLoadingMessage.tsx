import { useState } from "react";
import { loadingMessages } from "../api/chat/constants";

export function useRandomLoadingMessage() {
  const [loadingMessage] = useState(
    () => loadingMessages[Math.floor(Math.random() * loadingMessages.length)],
  );

  return loadingMessage;
}
