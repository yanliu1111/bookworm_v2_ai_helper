import { cn } from "@/lib/utils";
import { FC, HTMLAttributes } from "react";
import TextareaAtutosize from "react-textarea-autosize";

interface ChatInputProps extends HTMLAttributes<HTMLDivElement> {}

const ChatInput: FC<ChatInputProps> = ({ className, ...props }) => {
  return (
    <div {...props} className={cn("border-t border-zinc-300", className)}>
      <div className="relative mt-4 flex-1 overflow-hidden rounded-lg border-none outline-none">
        <TextareaAtutosize />
      </div>
    </div>
  );
};

export default ChatInput;
