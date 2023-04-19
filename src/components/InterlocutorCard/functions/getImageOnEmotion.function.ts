import {
  AngryWoman,
  HappyWoman,
  NervousWoman,
  NeutralWoman,
  SatisfiedWoman,
} from "../../../assets/images";

export const getImageOnEmotion = (emotion: string | null) => {
  switch (emotion) {
    case "angry":
      return AngryWoman;
    case "nervous":
      return NervousWoman;
    case "neutral":
      return NeutralWoman;
    case "satisfied":
      return SatisfiedWoman;
    case "happy":
      return HappyWoman;
    default:
      return NeutralWoman;
  }
};
