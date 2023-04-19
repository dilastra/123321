import styles from "./IconButton.module.scss";
import classNames from "classnames";

interface IconButtonProps {
  children?: JSX.Element | JSX.Element[];
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const IconButton = ({
  children,
  className,
  onClick,
  disabled = false,
}: IconButtonProps) => (
  <button
    onClick={onClick}
    className={classNames(styles["icon-button"], className)}
    type="button"
    disabled={disabled}
  >
    {children}
  </button>
);
