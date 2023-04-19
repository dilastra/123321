import { WomanAvatar } from "../Avatars";
import styles from "./Header.module.scss";
import classNames from "classnames";

export const Header = ({ className = "" }: { className?: string }) => (
  <header className={classNames(styles.header, className)}>
    <div>
      <h1 className={styles.title}>Тренажер «Говорун»</h1>
      <h2 className={styles.subtitle}>
        Прохождение интервью на менеджера по продажам
      </h2>
    </div>
    <div className={styles["right-block"]}>
      <p className={styles["account-name"]}>Гостевая учетная запись</p>
      <WomanAvatar />
    </div>
  </header>
);
