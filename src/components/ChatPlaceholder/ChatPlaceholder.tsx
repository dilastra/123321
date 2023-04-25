import { useMemo } from "react";
import { ChatIcon } from "../Icons";
import styles from "./ChatPlaceholder.module.scss";
import classNames from "classnames";
import { useLocation } from "react-router-dom";
import { getTextPlacheloderByPersonality } from "./functions";

interface ChatPlaceholderProps {
  className?: string;
}

export const ChatPlaceholder = ({ className = "" }: ChatPlaceholderProps) => {
  const search = useLocation().search;
  const personalityFromUrl =
    new URLSearchParams(search).get("personality") ?? "";

  const { text, title } = useMemo(
    () => getTextPlacheloderByPersonality({ personality: personalityFromUrl }),
    [personalityFromUrl]
  );
  return (
    <div className={classNames(className)}>
      <div className={styles["placeholder-icon"]}>
        <ChatIcon />
      </div>
      <h2 className={styles["placeholder-title"]}>{title}</h2>
      <p className={styles["placeholder-text"]}>{text}</p>
    </div>
  );
};
