import { RootState } from "../../../store";

export const personalitiesSelector = (state: RootState) =>
  state.personalities.list;
