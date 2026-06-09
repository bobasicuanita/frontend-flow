import { DependencyList, useEffect, useRef } from "react";

export function useAutoScroll<T extends HTMLElement>(deps: DependencyList) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      element.scrollTo({ top: element.scrollHeight, behavior: "smooth" });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
