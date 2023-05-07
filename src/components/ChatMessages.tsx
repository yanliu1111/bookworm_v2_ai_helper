"use client";
import { MessagesContext } from "@/context/messages";
import { cn } from "@/lib/utils";
import { FC, HTMLAttributes, useContext } from "react";

interface ChatMessagesProps extends HTMLAttributes<HTMLDivElement> {}

const ChatMessages: FC<ChatMessagesProps> = ({ className, ...props }) => {
  const { messages } = useContext(MessagesContext);
  const inverseMessages = [...messages].reverse();
  return (
    <div
      {...props}
      className={cn(
        "flex flex-col-reverse gap-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch",
        className
      )}
    >
      <div className="flex-1 flex-grow" />
      {inverseMessages.map((message) => (
        <div key={message.id} className="chat-message">
          <div
            className={cn("flex items-end", {
              "justify-end": message.isUserMessage, //bot message is left, user message is right
            })}
          >
            {/* overflow-x-hidden: the reason for the overflow accident is because sometimes when we have links inside of our chat, the chat bot tends to write past the scope of the chat. Becasue we used some markdown which is not problem after done. But during the writing it might look weird and force weird scrollbar. For stop this, we can put this overflow-x-hidden */}
            <div
              className={cn(
                "flex flex-col space-y-2 text-sm max-w-xs mx-2 overflow-x-hidden",
                {
                  "bg-blue-600 text-white": message.isUserMessage,
                  "bg-gray-200 text-gray-900": !message.isUserMessage,
                }
              )}
            >
              {/* <MarkdownLite text={message.text} /> */}
              {message.text}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
