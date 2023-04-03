import styles from "./Chat.module.scss";
import { Message } from "./components";
import RobotAvatar from "../../assets/images/RobotAvatar.svg";
import ManAvatar from "../../assets/images/ManAvatar.svg";
import { ChatCompletionResponseMessage } from "openai";

interface ChatProps {
  messages?: (ChatCompletionResponseMessage | undefined)[];
}

export const generateUid = () =>
  Date.now().toString(36) + Math.random().toString(36).substring(2);

export const Chat = ({ messages = [] }: ChatProps) => {
  const getMessageWithoutEmotions = (message: string) => {
    return message.replace(/{[а-яА-Я0-9_]+}/, "");
  };
  return (
    <div className={styles["container"]}>
      {messages.map((message) => (
        <Message
          key={generateUid()}
          avatar={message?.role === "assistant" ? RobotAvatar : ManAvatar}
          align={message?.role === "user" ? "right" : "left"}
        >
          {getMessageWithoutEmotions(message?.content ?? "")}
        </Message>
      ))}
    </div>
  );
};
