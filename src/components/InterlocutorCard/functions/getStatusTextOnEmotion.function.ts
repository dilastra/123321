export const getStatusTextOnEmotion = (emotion: string | null) => {
  switch (emotion) {
    case "angry":
      return "Вы потеряли расположение собеседника";
    case "sad":
      return "Вы теряете расположение собеседника";
    case "calm":
      return "Собеседник к вам нейтрален, попробуйте расположить его к себе.";
    case "happy":
      return "Вы заинтересовали собеседника";
    case "excited":
      return "Собеседник к вам расположен";
    default:
      return "Собеседник к вам нейтрален, попробуйте расположить его к себе.";
  }
};
