import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFeedback } from "../../../../api";

export const getFeedbackThunkAction = createAsyncThunk<
  any,
  { personality: string }
>(
  "messages/getFeedback",
  async ({ personality }) => await getFeedback({ personality })
);
