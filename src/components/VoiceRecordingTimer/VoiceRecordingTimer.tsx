import styles from "./VoiceRecordingTimer.module.scss";
import classNames from "classnames";

interface VoiceRecordingTimerProps {
  className?: string;
  totalTime?: number;
  remainingTime?: number;
}

export const VoiceRecordingTimer = ({
  className = "",
  remainingTime = 0,
  totalTime = 0,
}: VoiceRecordingTimerProps) => (
  <p className={classNames(styles["text"], className)}>
    Осталось {remainingTime} секунд записи из {totalTime} доступных
  </p>
);
