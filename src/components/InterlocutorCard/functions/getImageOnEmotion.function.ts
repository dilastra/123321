import {
  AngryMan,
  AngryWoman,
  HappyMan,
  HappyWoman,
  NervousMan,
  NervousWoman,
  NeutralMan,
  NeutralWoman,
  SatisfiedMan,
  SatisfiedWoman,
} from "../../../assets/images";

export const getImageOnEmotion = (
  emotion: string | null,
  sex?: "woman" | "man"
) => {
  switch (emotion) {
    case "angry":
      return sex === "man" ? AngryMan : AngryWoman;
    case "sad":
      return sex === "man" ? NervousMan : NervousWoman;
    case "calm":
      return sex === "man" ? NeutralMan : NeutralWoman;
    case "happy":
      return sex === "man" ? SatisfiedMan : SatisfiedWoman;
    case "excited":
      return sex === "man" ? HappyMan : HappyWoman;
    default:
      return sex === "man" ? NeutralMan : NeutralWoman;
  }
};
