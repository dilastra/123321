import styles from "./Message.module.scss";
import classNames from "classnames";

interface MessageProps {
  avatar?: string;
  children?: string;
  align?: "right" | "left";
}

export const Message = ({ align = "left", children = "" }: MessageProps) => {
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
        <p className={styles.author}>Кристина Владимировна</p>
        <p className={styles.text}>{children}</p>
      </div>
    </div>
  );
};
