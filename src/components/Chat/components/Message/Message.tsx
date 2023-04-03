import { Avatar, Card } from "antd";
import styles from "./Message.module.scss";
import Paragraph from "antd/es/typography/Paragraph";
import classNames from "classnames";

interface MessageProps {
  avatar?: string;
  children?: string;
  align?: "right" | "left";
}

export const Message = ({
  align = "left",
  children = "",
  avatar = undefined,
}: MessageProps) => {
  return (
    <div
      className={classNames(styles["container"], {
        [styles["right-align-message"]]: align === "right",
      })}
    >
      {avatar && (
        <Avatar
          className={styles["avatar"]}
          size={64}
          icon={<img src={avatar} alt="avatar" />}
          style={{ minWidth: "64px" }}
        />
      )}
      <Card style={{ minWidth: 300, maxWidth: "50%", padding: "8px" }}>
        <Paragraph style={{ margin: 0 }}>{children}</Paragraph>
      </Card>
    </div>
  );
};
