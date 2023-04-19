import { useEffect, useRef } from "react";
import styles from "./Chat.module.scss";
import { Messages } from "./components";
import { useOverlayScrollbars } from "overlayscrollbars-react";
import { useInViewport } from "ahooks";
import { OverlayScrollbars } from "overlayscrollbars";
import { Textarea } from "../Textarea";
import { MicrofoneIcon, ShareIcon } from "../Icons";
import { IconButton } from "../IconButton";

interface ChatProps {
  messages?: any[];
  onNewMessage?: (message: any) => void;
}

export const Chat = ({ messages = [], onNewMessage = () => {} }: ChatProps) => {
  const messagesContainer = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [initialize, instance] = useOverlayScrollbars();

  const autoScrollref = useRef<HTMLDivElement>(null);
  const [inViewport] = useInViewport(autoScrollref);

  useEffect(() => {
    if (ref.current) {
      initialize(ref.current);
    }
  }, [initialize]);

  useEffect(() => {
    if (messagesContainer.current) {
      const { elements } = instance() as OverlayScrollbars;
      const { viewport } = elements();
      if (inViewport) {
        viewport.scrollTo({ top: messagesContainer.current.scrollHeight });
      }
    }
  }, [inViewport, instance, messages]);

  return (
    <>
      <div className={styles["messages-container"]}>
        <div className={styles["scrollbar-container"]} ref={ref}>
          <div ref={messagesContainer} className={styles["messages"]}>
            <Messages
              messages={messages.filter(({ role }: any) => role !== "system")}
            />
            <div ref={autoScrollref} />
          </div>
        </div>
      </div>
      <div className={styles["divider"]}></div>
      <div className={styles["textarea-container"]}>
        <Textarea className={styles["textarea"]} />
        <div className={styles["buttons"]}>
          <IconButton
            className={styles["microfone-button"]}
            onClick={() =>
              onNewMessage({
                role: "asistant",
                content: "Здравствуйте. Чем я могу вам помочь?",
              })
            }
          >
            <MicrofoneIcon />
          </IconButton>
          <IconButton
            onClick={() =>
              onNewMessage({
                role: "asistant",
                content: "Здравствуйте. Чем я могу вам помочь?",
              })
            }
          >
            <ShareIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
};
