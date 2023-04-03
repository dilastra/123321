import BitterEmotion from "../../assets/images/bitter-emotion.jpg";
import SatisfiedEmotion from "../../assets/images/satisfied-emotion.jpg";
import PleasedEmotion from "../../assets/images/pleased-emotion.jpg";
import styles from "./Emotions.module.scss";
import { Card } from "antd";

export const Emotions = ({ currentEmotion }: { currentEmotion: string }) => {
  const getImageForEmotion = (emotion: string) => {
    switch (emotion) {
      case "огорчен":
        return BitterEmotion;
      case "удовлетворен":
      case "нейтрально":
        return SatisfiedEmotion;
      case "удивлен":
      case "доволен":
        return PleasedEmotion;
      default:
        return undefined;
    }
  };

  return (
    <div className={styles["emotions-container"]}>
      <div className={styles["emotion-image-container"]}>
        <img
          className={styles["image"]}
          src={getImageForEmotion(currentEmotion)}
          alt="emotion"
        />
      </div>
    </div>
  );
};
