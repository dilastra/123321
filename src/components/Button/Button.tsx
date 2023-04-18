import styles from "./Button.module.scss";

export const Button = ({
  children = "",
  onClick = () => {},
  className = "",
}: {
  children?: string;
  onClick?: () => void;
  className?: string;
}) => (
  <button className={`${styles.button} ${className}`} onClick={onClick}>
    {children}
  </button>
);
