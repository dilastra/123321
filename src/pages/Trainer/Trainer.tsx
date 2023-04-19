import { useState } from "react";
import {
  Button,
  Footer,
  Header,
  InterlocutorCard,
  Chat,
} from "../../components";
import styles from "./Trainer.module.scss";

const Trainer = () => {
  const [messages, setMessages] = useState<
    { align: "left" | "right"; message: string; user: string }[]
  >([]);

  console.log(messages);

  return (
    <div className={styles.container}>
      <Header className={styles.header} />
      <main className={styles.main}>
        <div className={styles.content}>
          <InterlocutorCard className={styles["interlocutor-card"]} />
          <div className={styles["chat-container"]}>
            <Chat
              messages={messages}
              onSendMessage={(message) =>
                setMessages((prev: any[]) => [
                  ...prev,
                  { align: "right", message, user: "Гостевая учетная запись" },
                ])
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

export default Trainer;
