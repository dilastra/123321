import { useEffect, useRef, useState } from "react";
import styles from "./Chat.module.scss";
import { Messages } from "./components";
import { useOverlayScrollbars } from "overlayscrollbars-react";
import { useInViewport } from "ahooks";
import { OverlayScrollbars } from "overlayscrollbars";
import { Textarea } from "../Textarea";
import { MicrofoneIcon, ShareIcon } from "../Icons";
import { IconButton } from "../IconButton";

interface ChatProps {
  messages?: { align: "left" | "right"; message: string; user: string }[];
  onSendMessage?: (message: any) => void;
}

export const Chat = ({
  messages = [],
  onSendMessage = () => {},
}: ChatProps) => {
  const messagesContainer = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const autoScrollref = useRef<HTMLDivElement>(null);
  const [inViewport] = useInViewport(autoScrollref);
  const [initialize, instance] = useOverlayScrollbars();
  const [message, setMessage] = useState<string>("");

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
        />
        <div className={styles["buttons"]}>
          <IconButton className={styles["microfone-button"]}>
            <MicrofoneIcon />
          </IconButton>
          <IconButton
            disabled={!message}
            onClick={() => {
              onSendMessage(message);
              setMessage("");
            }}
          >
            <ShareIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
};
