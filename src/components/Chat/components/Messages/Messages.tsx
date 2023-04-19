import { generateUid } from "../../../../tools";
import styles from "./Messages.module.scss";
import { Message } from "./components";

interface ChatProps {
  messages?: { align: "left" | "right"; message: string; user: string }[];
}

export const Messages = ({ messages = [] }: ChatProps) => (
  <div className={styles["messages-container"]}>
    {messages.map((message: any) => (
      <Message key={generateUid()} align={message.align} user={message.user}>
        {message.message}
      </Message>
    ))}
  </div>
);
