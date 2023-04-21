import styles from "./InterlocutorCard.module.scss";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { emotionSelector } from "../../redux";
import {
  getImageOnEmotion,
  getPersonForPersonality,
  getStatusColorOnEmotion,
  getStatusTextOnEmotion,
} from "./functions";
import { useLocation } from "react-router-dom";

export const InterlocutorCard = ({
  className = "",
}: {
  className?: string;
}) => {
  const emotion = useSelector(emotionSelector);
  const search = useLocation().search;
  const personalityFromUrl =
    new URLSearchParams(search).get("personality") ?? "hr";
  const { name, post, sex } = getPersonForPersonality(personalityFromUrl);

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles["avatar-container"]}>
        <img src={getImageOnEmotion(emotion, sex)} alt="avatar" />
      </div>
      <p className={styles.name}>{name}</p>
      <p className={styles.post}>{post}</p>

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
