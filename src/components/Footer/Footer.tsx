import styles from "./Footer.module.scss";
import classNames from "classnames";
export const Footer = ({
  children,
  className,
}: {
  children?: JSX.Element | JSX.Element[];
  className?: string;
}) => (
  <footer className={classNames(styles.footer, className)}>{children}</footer>
);
