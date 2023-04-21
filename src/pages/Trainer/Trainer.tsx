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
  botPersonSelector,
  clearMessagesThunkAction,
  dialogIsCompleteSelector,
  getFeedbackThunkAction,
  isLoadingMessagesSelector,
  messagesSelector,
  setDialogIsComplete,
  useAppDispatch,
} from "../../redux";
import styles from "./Trainer.module.scss";
import { useSelector } from "react-redux";
import { InfoIcon } from "../../assets/icons";
import { setBotPerson } from "../../redux";
import { useEffect } from "react";
import { getPersonForPersonality } from "../../functions";

const Trainer = () => {
  const dispatch = useAppDispatch();
  const dialogIsComplete = useSelector(dialogIsCompleteSelector);
  const isLoadingMessages = useSelector(isLoadingMessagesSelector);
  const messages = useSelector(messagesSelector);
  const search = useLocation().search;
  const { name } = useSelector(botPersonSelector);
  const personalityFromUrl =
    new URLSearchParams(search).get("personality") ?? "";

  useEffect(() => {
    dispatch(setBotPerson(getPersonForPersonality(personalityFromUrl)));
  }, [dispatch, personalityFromUrl]);

  const startDialog = () => {
    dispatch(clearMessagesThunkAction({ personality: personalityFromUrl }));
  };

  const onFinishDialog = () => {
    if (messages.length > 0) {
      dispatch(botMessagePlaceholder({ userName: name }));
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
        <div className={styles["footer-content"]}>
          <div className={styles["hint"]}>
            <InfoIcon className={styles["hint-icon"]} />
            <p className={styles["hint-text"]}>
              Чтобы получить фидбек по диалогу, нажмите кнопку «Завершить»
            </p>
          </div>
          <Button
            className={styles["end-button"]}
            onClick={() =>
              dialogIsComplete ? startDialog() : onFinishDialog()
            }
            disabled={isLoadingMessages}
          >
            {dialogIsComplete ? "Начать" : "Завершить"}
          </Button>
        </div>
      </Footer>
    </div>
  );
};

export default Trainer;
