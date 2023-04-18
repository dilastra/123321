import styles from "./Chat.module.scss";
import { Message } from "./components";
import classNames from "classnames";
import { ChatCompletionResponseMessage } from "openai";

interface ChatProps {
  messages?: (ChatCompletionResponseMessage | undefined)[];
  className?: string;
}

export const generateUid = () =>
  Date.now().toString(36) + Math.random().toString(36).substring(2);

export const Chat = ({ messages = [], className = "" }: ChatProps) => {
  const getMessageWithoutEmotions = (message: string) => {
    return message.replace(/{[а-яА-Я0-9_]+}/, "");
  };
  return (
    <div className={classNames(styles["container"], className)}>
      {messages.map((message) => (
        <Message
          key={generateUid()}
          align={message?.role === "user" ? "right" : "left"}
        >
          {getMessageWithoutEmotions(message?.content ?? "")}
        </Message>
      ))}
    </div>
  );
};
