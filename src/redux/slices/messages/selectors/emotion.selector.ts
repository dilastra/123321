import { RootState } from "../../../store";

export const emotionSelector = (state: RootState) => state.messages.botEmotion;
