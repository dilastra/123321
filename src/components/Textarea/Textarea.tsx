import { ChangeEventHandler } from "react";
import styles from "./Textarea.module.scss";
import classNames from "classnames";

interface TextareaProps {
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  value?: string;
  className?: string;
  disabled: boolean;
}

export const Textarea = ({
  onChange,
  value,
  className = "",
  disabled = false,
}: TextareaProps) => (
  <textarea
    placeholder="Напишите сообщение..."
    onChange={onChange}
    value={value}
    className={classNames(styles.textarea, className)}
    disabled={disabled}
  ></textarea>
);
