import styles from "./InterlocutorCard.module.scss";
import classNames from "classnames";
import Woman from "../../assets/images/rapture-woman.png";

export const InterlocutorCard = ({
  className = "",
}: {
  className?: string;
}) => (
  <div className={classNames(styles.container, className)}>
    <div className={styles["avatar-container"]}>
      <img src={Woman} alt="avatar" />
    </div>
    <p className={styles.name}>Кристина Владимировна</p>
    <p className={styles.post}>Менеджер по управлению персоналом</p>
    <div
      className={classNames(
        styles["status-container"],
        styles["positive-status"]
      )}
    >
      <p className={styles["status"]}>Собеседник к вам расположен</p>
    </div>
  </div>
);
