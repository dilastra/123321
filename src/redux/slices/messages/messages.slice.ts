import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { sendMessageThunkAction } from "./thunks-actions";

export interface MessagesState {
  list: {
    align: "right" | "left";
    message: string;
    user: string;
    isPlaceholder?: boolean;
  }[];
  botEmotion: string | null;
  isLoading: boolean;
}

const initialState: MessagesState = {
  list: [],
  botEmotion: null,
  isLoading: false,
};

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addUserMessage: (
      state,
      action: PayloadAction<{
        align: "right" | "left";
        message: string;
        user: string;
      }>
    ) => {
      state.list = [...state.list, action.payload];
    },
    botMessagePlaceholder: (state) => {
      state.list = [
        ...state.list,
        {
          align: "left",
          message: "печатает...",
          user: "Кристина Владимировна",
          isPlaceholder: true,
        },
      ];
    },
  },
  extraReducers(builder) {
    builder.addCase(sendMessageThunkAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(sendMessageThunkAction.fulfilled, (state, action) => {
      state.botEmotion = action.payload.emotion;
      const copyList = [...state.list];
      const lastMessage = copyList.at(-1);
      if (lastMessage) {
        copyList.splice(-1, 1);
        const { isPlaceholder, ...otherLastMessageParams } = lastMessage;
        state.list = [
          ...copyList,
          { ...otherLastMessageParams, message: action.payload.answer },
        ];
      }
      state.isLoading = false;
    });
  },
});

export const { addUserMessage, botMessagePlaceholder } = messagesSlice.actions;

export default messagesSlice.reducer;
