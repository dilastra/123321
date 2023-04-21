import { ChangeEventHandler, KeyboardEventHandler } from "react";
import styles from "./Textarea.module.scss";
import classNames from "classnames";

interface TextareaProps {
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement>;
  value?: string;
  className?: string;
  disabled: boolean;
}

export const Textarea = ({
  onChange = () => {},
  onKeyDown = () => {},
  value = "",
  className = "",
  disabled = false,
}: TextareaProps) => {
  return (
    <textarea
      placeholder="Напишите сообщение..."
      onChange={onChange}
      onKeyDown={onKeyDown}
      value={value}
      className={classNames(styles.textarea, className)}
      disabled={disabled}
    ></textarea>
  );
};
