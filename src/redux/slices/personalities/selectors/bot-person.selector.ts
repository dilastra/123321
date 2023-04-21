import { RootState } from "../../../store";

export const botPersonSelector = (state: RootState) =>
  state.personalities.botPerson;
