import {
  Button,
  Footer,
  Header,
  InterlocutorCard,
  Chat,
} from "../../components";
import styles from "./Trainer.module.scss";

const Trainer = () => (
  <div className={styles.container}>
    <Header className={styles.header} />
    <main className={styles.main}>
      <div className={styles.content}>
        <InterlocutorCard className={styles["interlocutor-card"]} />
        <div className={styles["chat-container"]}>
          <Chat />
        </div>
      </div>
    </main>
    <Footer className={styles.footer}>
      <Button className={styles["end-button"]}>Завершить</Button>
    </Footer>
  </div>
);

export default Trainer;
