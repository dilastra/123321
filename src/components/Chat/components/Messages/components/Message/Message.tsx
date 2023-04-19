import styles from "./Message.module.scss";
import classNames from "classnames";

interface MessageProps {
  children?: string;
  align?: "right" | "left";
  user?: string;
}

export const Message = ({
  align = "left",
  children = "",
  user = "",
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
        <p className={styles.text}>{children}</p>
      </div>
    </div>
  );
};
