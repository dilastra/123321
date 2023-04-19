import { useEffect, useState } from "react";
import {
  Button,
  Footer,
  Header,
  InterlocutorCard,
  Chat,
} from "../../components";
import styles from "./Trainer.module.scss";
import { useSelector } from "react-redux";
import {
  getPersonalitiesThunkAction,
  personalitiesSelector,
  useAppDispatch,
} from "../../redux";

const Trainer = () => {
  const [messages, setMessages] = useState<any>([]);
  const dispatch = useAppDispatch();
  const personalities = useSelector(personalitiesSelector);

  useEffect(() => {
    dispatch(getPersonalitiesThunkAction());
  }, [dispatch]);

  console.log(personalities);

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

export default Trainer;
