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
    case "nervous":
      return sex === "man" ? NervousMan : NervousWoman;
    case "neutral":
      return sex === "man" ? NeutralMan : NeutralWoman;
    case "satisfied":
      return sex === "man" ? SatisfiedMan : SatisfiedWoman;
    case "happy":
      return sex === "man" ? HappyMan : HappyWoman;
    default:
      return sex === "man" ? NeutralMan : NeutralWoman;
  }
};
