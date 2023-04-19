import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendMessageToPesonality } from "../../../../api";

export const sendMessageThunkAction = createAsyncThunk<
  any,
  { message: string; personality: string }
>(
  "messages/sendMessage",
  async ({ message, personality }) =>
    await sendMessageToPesonality({ message, personality })
);
