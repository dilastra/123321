import styles from "./InputMessage.module.scss";
import TextArea from "antd/es/input/TextArea";

export const InputMessage = () => (
  <TextArea style={{ resize: "none", height: 70 }} />
);
