import { createAsyncThunk } from "@reduxjs/toolkit";
import { getPersonality } from "../../../../api";

export const getPersonalityThunkAction = createAsyncThunk<
  any,
  { personality: string }
>(
  "personalities/getPersonality",
  async ({ personality }) => await getPersonality({ personality })
);
