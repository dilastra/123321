import { RootState } from "../../../store";

export const isLoadingMessagesSelector = (state: RootState) =>
  state.messages.isLoading;
