import { ChangeEventHandler } from "react";
import styles from "./Textarea.module.scss";
import classNames from "classnames";

interface TextareaProps {
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  value?: string;
  className?: string;
}

export const Textarea = ({
  onChange,
  value,
  className = "",
}: TextareaProps) => (
  <textarea
    placeholder="Напишите сообщение..."
    onChange={onChange}
    value={value}
    className={classNames(styles.textarea, className)}
  ></textarea>
);
