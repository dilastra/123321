import { WomanAvatar } from "../Avatars";
import styles from "./Header.module.scss";

export const Header = () => (
  <header className={styles.header}>
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
