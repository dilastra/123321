import styles from "./Button.module.scss";

export const Button = ({
  children = "",
  onClick = () => {},
  className = "",
  disabled = false,
}: {
  children?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}) => (
  <button
    className={`${styles.button} ${className}`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);
