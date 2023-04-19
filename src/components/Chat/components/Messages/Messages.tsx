import { generateUid } from "../../../../tools";
import styles from "./Messages.module.scss";
import { Message } from "./components";

interface ChatProps {
  messages?: any;
}

export const Messages = ({ messages = [] }: ChatProps) => {
  const getMessageWithoutEmotions = (message: string) => {
    return message.replace(/{[а-яА-Я0-9_]+}/, "");
  };

  return (
    <div className={styles["messages-container"]}>
      {messages.map((message: any, index: number) => (
        <Message
          key={generateUid()}
          align={message?.role === "user" ? "right" : "left"}
        >
          {getMessageWithoutEmotions(`${message?.content}${index}` ?? "")}
        </Message>
      ))}
    </div>
  );
};
