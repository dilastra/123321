import { RootState } from "../../../store";

export const personalitySelector = (state: RootState) =>
  state.personalities.personality;
