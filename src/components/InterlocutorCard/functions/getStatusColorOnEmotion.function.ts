export const getStatusColorOnEmotion = (emotion: string | null) => {
  switch (emotion) {
    case "angry":
    case "sad":
      return "negative-status";
    case "excited":
    case "happy":
      return "positive-status";
    case "calm":
    default:
      return "";
  }
};
