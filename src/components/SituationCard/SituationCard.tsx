import styles from "./SituationCard.module.scss";

export const SituationCard = ({
  onClickButton,
  children,
}: {
  onClickButton?: () => void;
  children: string;
}) => (
  <div className={styles["container"]}>
    <p className={styles["description"]}>{children}</p>
    <button className={styles["button"]} onClick={onClickButton}>
      Демо
    </button>
  </div>
);
