export const getStatusTextOnEmotion = (emotion: string | null) => {
  switch (emotion) {
    case "angry":
      return "Вы потеряли расположение собеседника";
    case "nervous":
      return "Вы теряете расположение собеседника";
    case "neutral":
      return "Собеседник к вам нейтрален, попробуйте расположить его к себе.";
    case "satisfied":
      return "Вы заинтересовали собеседника";
    case "happy":
      return "Вы заинтересовали собеседника";
    default:
      return "Собеседник к вам нейтрален, попробуйте расположить его к себе.";
  }
};
