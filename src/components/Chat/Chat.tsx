import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Chat.module.scss";
import { Messages } from "./components";
import { useOverlayScrollbars } from "overlayscrollbars-react";
import { useInViewport } from "ahooks";
import { OverlayScrollbars } from "overlayscrollbars";
import { Textarea } from "../Textarea";
import { MicrofoneIcon, ShareIcon } from "../Icons";
import { IconButton } from "../IconButton";
import {
  addUserMessage,
  botMessagePlaceholder,
  dialogIsCompleteSelector,
  isLoadingMessagesSelector,
  messagesSelector,
  sendMessageThunkAction,
  useAppDispatch,
} from "../../redux";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export const Chat = () => {
  const dispatch = useAppDispatch();
  const messagesContainer = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const autoScrollref = useRef<HTMLDivElement>(null);
  const [inViewport] = useInViewport(autoScrollref);
  const [initialize, instance] = useOverlayScrollbars({
    options: {
      scrollbars: {
        autoHide: "leave",
        autoHideDelay: 300,
      },
    },
  });
  const [message, setMessage] = useState<string>("");
  const messages = useSelector(messagesSelector);
  const isLoadingMessages = useSelector(isLoadingMessagesSelector);
  const dialogIsComplete = useSelector(dialogIsCompleteSelector);
  const search = useLocation().search;
  const personalityFromUrl =
    new URLSearchParams(search).get("personality") ?? "";

  useEffect(() => {
    if (ref.current) {
      initialize(ref.current);
    }
  }, [initialize]);

  const changeScrollViewport = useCallback(() => {
    if (messagesContainer.current) {
      const { elements } = instance() as OverlayScrollbars;
      const { viewport } = elements();
      if (inViewport) {
        viewport.scrollTo({ top: messagesContainer.current.scrollHeight });
      }
    }
  }, [instance, inViewport]);

  useEffect(() => {
    if (dialogIsComplete) {
      setMessage("");
    }
  }, [dialogIsComplete]);

  useEffect(() => {
    changeScrollViewport();
  }, [changeScrollViewport, messages]);

  const onSendMessage = () => {
    dispatch(
      addUserMessage({
        align: "right",
        message,
        user: "Гостевая учетная запись",
      })
    );
    dispatch(botMessagePlaceholder());
    dispatch(
      sendMessageThunkAction({ message, personality: personalityFromUrl })
    );
    setMessage("");
    changeScrollViewport();
  };

  return (
    <>
      <div className={styles["messages-container"]}>
        <div className={styles["scrollbar-container"]} ref={ref}>
          <div ref={messagesContainer} className={styles["messages"]}>
            <Messages messages={messages} />
            <div ref={autoScrollref} />
          </div>
        </div>
      </div>
      <div className={styles["divider"]}></div>
      <div className={styles["textarea-container"]}>
        <Textarea
          className={styles["textarea"]}
          value={message}
          onChange={(e) => setMessage(e.currentTarget.value)}
          disabled={isLoadingMessages || dialogIsComplete}
        />
        <div className={styles["buttons"]}>
          <IconButton className={styles["microfone-button"]}>
            <MicrofoneIcon />
          </IconButton>
          <IconButton
            disabled={!message || isLoadingMessages || dialogIsComplete}
            onClick={onSendMessage}
          >
            <ShareIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
};
