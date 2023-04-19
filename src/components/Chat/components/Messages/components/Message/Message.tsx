import styles from "./Message.module.scss";
import classNames from "classnames";

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
        </p>
      </div>
    </div>
  );
};
