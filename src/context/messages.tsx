import { Message } from "@/lib/validators/message";
import { nanoid } from "nanoid";
import { createContext, useState } from "react";

export const MessagesContext = createContext<{
  messages: Message[];
  isMessageUpdating: boolean;
  addMessage: (messages: Message) => void;
  removeMessage: (id: string) => void;
  updateMessage: (id: string, updateFn: (prevText: string) => string) => void;
  setIsMessageUpdating: (isMessageUpdating: boolean) => void;
}>({
  messages: [],
  isMessageUpdating: false,
  addMessage: () => {},
  removeMessage: () => {},
  updateMessage: () => {},
  setIsMessageUpdating: () => {},
});

export function MessageProvider({ children }: { children: ReactNode }) {
  const [isMessageUpdating, setIsMessageUpdating] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: nanoid(),
      text: "Hello, I'm Bookworm BOT. How can I help you?",
      isUserMessage: false,
    },
  ]);
  const addMessage = (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };
  const removeMessage = (id: string) => {
    setMessages((prevMessages) =>
      prevMessages.filter((message) => message.id !== id)
    );
  };
  //callbakc function that will send back old messgae, push the answer with the new text
  const updateMessage = (
    id: string,
    updateFn: (prevText: string) => string
  ) => {
    setMessages((prevMessages) =>
      prevMessages.map((message) => {
        if (message.id === id) {
          return {
            ...message,
            text: updateFn(message.text),
          };
        }
        return message;
      })
    );
  };
  return (
    <MessagesContext.Provider
      value={{
        messages,
        addMessage,
        removeMessage,
        updateMessage,
        isMessageUpdating,
        setIsMessageUpdating,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
}
