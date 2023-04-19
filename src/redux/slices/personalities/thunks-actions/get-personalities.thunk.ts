import { createAsyncThunk } from "@reduxjs/toolkit";
import { getPersonalities } from "../../../../api";

export const getPersonalitiesThunkAction = createAsyncThunk(
  "personalities/getPersonalities",
  async () => await getPersonalities()
);
