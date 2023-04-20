import { useLocation } from "react-router-dom";
import {
  Button,
  Footer,
  Header,
  InterlocutorCard,
  Chat,
} from "../../components";
import {
  botMessagePlaceholder,
  dialogIsCompleteSelector,
  getFeedbackThunkAction,
  isLoadingMessagesSelector,
  messagesSelector,
  setDialogIsComplete,
  setDialogStart,
  useAppDispatch,
} from "../../redux";
import styles from "./Trainer.module.scss";
import { useSelector } from "react-redux";

const Trainer = () => {
  const dispatch = useAppDispatch();
  const dialogIsComplete = useSelector(dialogIsCompleteSelector);
  const isLoadingMessages = useSelector(isLoadingMessagesSelector);
  const messages = useSelector(messagesSelector);
  const search = useLocation().search;
  const personalityFromUrl =
    new URLSearchParams(search).get("personality") ?? "";

  const startDialog = () => {
    dispatch(setDialogStart());
  };

  const onFinishDialog = () => {
    if (messages.length > 0) {
      dispatch(botMessagePlaceholder());
      dispatch(getFeedbackThunkAction({ personality: personalityFromUrl }));
    }
    dispatch(setDialogIsComplete());
  };

  return (
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
        <Button
          className={styles["end-button"]}
          onClick={() => (dialogIsComplete ? startDialog() : onFinishDialog())}
          disabled={isLoadingMessages}
        >
          {dialogIsComplete ? "Начать" : "Завершить"}
        </Button>
      </Footer>
    </div>
  );
};

export default Trainer;
