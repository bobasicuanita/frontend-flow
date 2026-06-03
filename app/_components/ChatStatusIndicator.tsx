interface ChatStatusIndicatorProps {
  label: string | null;
}

export default function ChatStatusIndicator({
  label,
}: ChatStatusIndicatorProps) {
  return (
    <div className="flex justify-start">
      {label ? <p className="text-sm text-zinc-500">{label}</p> : null}
    </div>
  );
}
