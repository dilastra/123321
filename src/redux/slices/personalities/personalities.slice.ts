import { createSlice } from "@reduxjs/toolkit";
import { getPersonalitiesThunkAction } from "./thunks-actions";

export interface PersonalitiesState {
  list: string[];
}

const initialState: PersonalitiesState = {
  list: [],
};

export const personalitiesSlice = createSlice({
  name: "personalities",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getPersonalitiesThunkAction.fulfilled, (state, action) => {
      state.list = action.payload.personalities;
    });
  },
});

// Action creators are generated for each case reducer function
export default personalitiesSlice.reducer;
