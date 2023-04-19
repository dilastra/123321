import { useEffect } from "react";
import { WomanAvatar } from "../Avatars";
import styles from "./Header.module.scss";
import classNames from "classnames";
import {
  getPersonalityThunkAction,
  personalitySelector,
  useAppDispatch,
} from "../../redux";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export const Header = ({ className = "" }: { className?: string }) => {
  const dispatch = useAppDispatch();
  const personality = useSelector(personalitySelector);
  const search = useLocation().search;
  const personalityFromUrl =
    new URLSearchParams(search).get("personality") ?? "";
  useEffect(() => {
    dispatch(getPersonalityThunkAction({ personality: personalityFromUrl }));
  }, [dispatch, personalityFromUrl]);

  return (
    <header className={classNames(styles.header, className)}>
      <div>
        <h1 className={styles.title}>Тренажер «Говорун»</h1>
        <h2 className={styles.subtitle}>{personality?.label}</h2>
      </div>
      <div className={styles["right-block"]}>
        <p className={styles["account-name"]}>Гостевая учетная запись</p>
        <WomanAvatar />
      </div>
    </header>
  );
};
