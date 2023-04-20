import { RootState } from "../../../store";

export const dialogIsCompleteSelector = (state: RootState) =>
  state.messages.dialogIsComplete;
