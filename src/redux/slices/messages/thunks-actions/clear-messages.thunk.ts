import { createAsyncThunk } from "@reduxjs/toolkit";
import { clearMessages } from "../../../../api";

export const clearMessagesThunkAction = createAsyncThunk<
  any,
  { personality: string }
>(
  "messages/clearMessages",
  async ({ personality }) => await clearMessages({ personality })
);
