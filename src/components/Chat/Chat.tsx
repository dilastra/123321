import { useCallback, useEffect, useRef, useState, KeyboardEvent } from "react";
import styles from "./Chat.module.scss";
import classNames from "classnames";
import { Messages } from "./components";
import { useOverlayScrollbars } from "overlayscrollbars-react";
import {
  useAsyncEffect,
  useDebounceFn,
  useInViewport,
  useTimeout,
} from "ahooks";
import { OverlayScrollbars } from "overlayscrollbars";
import { Textarea } from "../Textarea";
import { MicrofoneIcon, ShareIcon } from "../Icons";
import { IconButton } from "../IconButton";
import {
  addUserMessage,
  botMessagePlaceholder,
  botPersonSelector,
  dialogIsCompleteSelector,
  isLoadingMessagesSelector,
  messagesSelector,
  sendMessageThunkAction,
  useAppDispatch,
} from "../../redux";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useAudioRecorder } from "../../hooks";
import { getTextFromSound } from "../../api";
import { LoaderIcon } from "../../Icons";

export const Chat = () => {
  const { startRecord, stopRecord, result } = useAudioRecorder();
  const dispatch = useAppDispatch();
  const messagesContainer = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const autoScrollref = useRef<HTMLDivElement>(null);
  const [inViewport] = useInViewport(autoScrollref);
  const [loadingMessageFromSound, setLoadingMessageFromSound] =
    useState<boolean>(false);
  const [initialize, instance] = useOverlayScrollbars({
    options: {
      scrollbars: {
        autoHide: "leave",
        autoHideDelay: 300,
      },
    },
  });
  const [timeoutStopRecord, setTimeoutStopRecord] = useState<
    number | undefined
  >();
  const [message, setMessage] = useState<string>("");
  const [recordIsStarting, setRecordIsStarting] = useState<boolean>(false);
  const messages = useSelector(messagesSelector);
  const isLoadingMessages = useSelector(isLoadingMessagesSelector);
  const dialogIsComplete = useSelector(dialogIsCompleteSelector);
  const { name } = useSelector(botPersonSelector);
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

  useAsyncEffect(async () => {
    if (result) {
      setLoadingMessageFromSound(true);
      const formData = new FormData();
      const oggFile = new File([result], "input.ogg");
      formData.append("input", oggFile);
      const { result: decodeAudio } = await getTextFromSound(formData);
      setMessage(decodeAudio);
      setLoadingMessageFromSound(false);
    }
  }, [result]);

  const { run: sendMessageWithDebounce } = useDebounceFn(
    (message: string) => {
      dispatch(botMessagePlaceholder({ userName: name }));
      dispatch(
        sendMessageThunkAction({ message, personality: personalityFromUrl })
      );
    },
    { wait: 500 }
  );

  const onSendMessage = () => {
    dispatch(
      addUserMessage({
        align: "right",
        message,
        user: "Гостевая учетная запись",
      })
    );
    sendMessageWithDebounce(message);
    setMessage("");
    changeScrollViewport();
  };

  const onKeyDownInTextArea = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.code.toLowerCase() === "enter" && !event.shiftKey) {
      if (message.length > 0) {
        onSendMessage();
      }

      event.preventDefault();
      return;
    }
  };

  const onStartRecord = () => {
    setTimeoutStopRecord(30000);
    startRecord();
    setRecordIsStarting(true);
  };

  const onEndRecord = () => {
    setTimeoutStopRecord(undefined);
    stopRecord();
    setRecordIsStarting(false);
  };

  useTimeout(() => {
    onEndRecord();
  }, timeoutStopRecord);

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
      <div className={styles["chat-controls-container"]}>
        <div className={styles["textarea-container"]}>
          <Textarea
            className={styles["textarea"]}
            value={message}
            onKeyDown={onKeyDownInTextArea}
            onChange={(e) => setMessage(e.currentTarget.value)}
            disabled={isLoadingMessages || dialogIsComplete}
          />
          <p className={styles["textarea-hint"]}>
            Отправить - Enter; Перенос строки - Shift+Enter
          </p>
        </div>
        <div className={styles["buttons"]}>
          <IconButton
            disabled={isLoadingMessages || dialogIsComplete}
            className={classNames(styles["microfone-button"], {
              [styles["active-microfone"]]: recordIsStarting,
              [styles["rotate-loader"]]: loadingMessageFromSound,
            })}
            onMouseDown={onStartRecord}
            onMouseLeave={onEndRecord}
            onMouseUp={onEndRecord}
          >
            {loadingMessageFromSound ? <LoaderIcon /> : <MicrofoneIcon />}
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
