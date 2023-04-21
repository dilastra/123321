import {
  ChangeEventHandler,
  KeyboardEventHandler,
  useRef,
  useState,
} from "react";
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
  const [isHover, setIsHover] = useState<boolean>(false);
  const ref = useRef<HTMLTextAreaElement>(null);

  return (
    <div
      className={classNames(styles["textarea-wrapper"], {
        [styles["textarea-wrapper_hover"]]: isHover,
      })}
    >
      <textarea
        placeholder="Напишите сообщение..."
        onChange={onChange}
        onKeyDown={onKeyDown}
        onFocus={() => setIsHover(true)}
        onBlur={() => setIsHover(false)}
        value={value}
        className={classNames(styles.textarea, className)}
        disabled={disabled}
        ref={ref}
      ></textarea>
    </div>
  );
};
