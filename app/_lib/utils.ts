type GenerateComponentPart = {
  type: "tool-generateComponent";
  output: {
    code: string;
    explanation: string;
  };
};

export function isGenerateComponentPart(part: unknown): part is GenerateComponentPart {
  return (
    typeof part === "object" &&
    part !== null &&
    "type" in part &&
    (part as { type?: string }).type === "tool-generateComponent"
  );
}