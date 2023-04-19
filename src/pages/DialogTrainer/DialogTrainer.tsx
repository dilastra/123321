import { useState } from "react";
import {
  Button,
  Footer,
  Header,
  InterlocutorCard,
  Chat,
} from "../../components";
import styles from "./DialogTrainer.module.scss";

const DialogTrainer = ({ currentPrompt }: { currentPrompt: string }) => {
  const [messages, setMessages] = useState<any>([]);

  return (
    <div className={styles.container}>
      <Header className={styles.header} />
      <main className={styles.main}>
        <div className={styles.content}>
          <InterlocutorCard className={styles["interlocutor-card"]} />
          <div className={styles["chat-container"]}>
            <Chat
              messages={messages}
              onNewMessage={(message) =>
                setMessages((prev: any[]) => [message, ...prev])
              }
            />
          </div>
        </div>
      </main>
      <Footer className={styles.footer}>
        <Button className={styles["end-button"]}>Завершить</Button>
      </Footer>
    </div>
  );
};

export default DialogTrainer;
