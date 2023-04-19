import { createSlice } from "@reduxjs/toolkit";
import { sendMessageThunkAction } from "./thunks-actions";

export interface MessagesState {
  list: string[];
}

const initialState: MessagesState = {
  list: [],
};

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(sendMessageThunkAction.fulfilled, (state, action) => {
      state.list = [...state.list, action.payload];
    });
  },
});

export default messagesSlice.reducer;
