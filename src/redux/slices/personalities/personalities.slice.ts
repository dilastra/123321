import { createSlice } from "@reduxjs/toolkit";
import {
  getPersonalitiesThunkAction,
  getPersonalityThunkAction,
} from "./thunks-actions";

export interface PersonalitiesState {
  list: string[];
  personality: {
    name: string;
    label: string;
  } | null;
}

const initialState: PersonalitiesState = {
  list: [],
  personality: null,
};

export const personalitiesSlice = createSlice({
  name: "personalities",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getPersonalitiesThunkAction.fulfilled, (state, action) => {
      state.list = action.payload.personalities;
    });

    builder.addCase(getPersonalityThunkAction.fulfilled, (state, action) => {
      state.personality = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export default personalitiesSlice.reducer;
