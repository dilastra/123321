import styles from "./InterlocutorCard.module.scss";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { emotionSelector } from "../../redux";
import {
  getImageOnEmotion,
  getStatusColorOnEmotion,
  getStatusTextOnEmotion,
} from "./functions";

export const InterlocutorCard = ({
  className = "",
}: {
  className?: string;
}) => {
  const emotion = useSelector(emotionSelector);
  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles["avatar-container"]}>
        <img src={getImageOnEmotion(emotion)} alt="avatar" />
      </div>
      <p className={styles.name}>Кристина Владимировна</p>
      <p className={styles.post}>Менеджер по управлению персоналом</p>

      <div
        className={classNames(
          styles["status-container"],
          styles[getStatusColorOnEmotion(emotion)]
        )}
      >
        <p className={styles["status"]}>{getStatusTextOnEmotion(emotion)}</p>
      </div>
    </div>
  );
};
