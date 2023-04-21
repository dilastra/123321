export const getPersonForPersonality = (
  personality: string | null
): {
  sex: "woman" | "man";
  name: string;
  post: string;
} => {
  switch (personality) {
    case "hr":
      return {
        sex: "woman",
        name: "Кристина Владимировна",
        post: "HR-менеджер",
      };
    case "buyer":
      return {
        sex: "woman",
        name: "Кристина Владимировна",
        post: "Покупатель магазина re:Store",
      };
    case "angry":
      return {
        sex: "man",
        name: "Федор Константинович",
        post: "Посетитель МФЦ",
      };
    default:
      return {
        sex: "woman",
        name: "Кристина Владимировна",
        post: "HR-менеджер",
      };
  }
};
