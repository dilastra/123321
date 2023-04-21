import { useEffect, useState } from "react";
import styles from "./Message.module.scss";
import classNames from "classnames";
import { useInterval } from "ahooks";

interface MessageProps {
  children?: string;
  align?: "right" | "left";
  user?: string;
  isPlaceholder: boolean;
}

export const Message = ({
  align = "left",
  children = "",
  user = "",
  isPlaceholder = false,
}: MessageProps) => {
  const [dots, setDots] = useState<string>("");
  const [intervalTime, setIntervalTime] = useState<number | undefined>(500);

  useInterval(() => {
    if (dots.length === 3) {
      setDots("");
      return;
    }

    setDots((prev) => `${prev}.`);
  }, intervalTime);

  useEffect(() => {
    if (isPlaceholder) {
      setIntervalTime(300);
      return;
    }

    setIntervalTime(undefined);
  }, [isPlaceholder]);

  return (
    <div
      className={classNames(styles["message-container"], {
        [styles["message-container_right-message"]]: align === "right",
      })}
    >
      <div
        className={classNames(styles.message, {
          [styles["right-message"]]: align === "right",
        })}
      >
        <p className={styles.author}>{user}</p>
        <p
          className={classNames(styles.text, {
            [styles["placeholder-text"]]: isPlaceholder,
          })}
        >
          {children}
          <span className={styles["dots"]}>{dots}</span>
        </p>
      </div>
    </div>
  );
};
