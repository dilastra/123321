import styles from "./Footer.module.scss";

export const Footer = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => <footer className={styles.footer}>{children}</footer>;
