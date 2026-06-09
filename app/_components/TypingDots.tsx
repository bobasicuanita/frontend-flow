"use client";

import { TypeAnimation } from "react-type-animation";

export function TypingDots() {
  return (
    <TypeAnimation
      sequence={[".", 300, "..", 300, "...", 300]}
      wrapper="span"
      speed={50}
      repeat={Infinity}
      className="inline-block"
    />
  );
}
