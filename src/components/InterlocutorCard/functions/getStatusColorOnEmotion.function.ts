export const getStatusColorOnEmotion = (emotion: string | null) => {
  switch (emotion) {
    case "angry":
    case "nervous":
      return "negative-status";
    case "satisfied":
    case "happy":
      return "positive-status";
    case "neutral":
    default:
      return "";
  }
};
