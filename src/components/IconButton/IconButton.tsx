import styles from "./IconButton.module.scss";
import classNames from "classnames";

interface IconButtonProps {
  children?: JSX.Element | JSX.Element[];
  className?: string;
  onClick?: () => void;
  onMouseDown?: () => void;
  onMouseLeave?: () => void;
  onMouseUp?: () => void;
  disabled?: boolean;
}

export const IconButton = ({
  children,
  className = "",
  onClick = () => {},
  onMouseDown = () => {},
  onMouseLeave = () => {},
  onMouseUp = () => {},
  disabled = false,
}: IconButtonProps) => (
  <button
    onClick={onClick}
    onMouseDown={onMouseDown}
    onMouseLeave={onMouseLeave}
    onMouseUp={onMouseUp}
    className={classNames(styles["icon-button"], className)}
    type="button"
    disabled={disabled}
  >
    {children}
  </button>
);
