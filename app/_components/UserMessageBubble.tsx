interface UserMessageBubbleProps {
  text: string;
}

export default function UserMessageBubble({ text }: UserMessageBubbleProps) {
  return (
    <div className="bg-taupe-200 rounded-xl my-4 p-2 px-4 py-1 w-fit text-sm">
      {text}
    </div>
  );
}
