import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  getPersonalitiesThunkAction,
  getPersonalityThunkAction,
} from "./thunks-actions";

export interface PersonalitiesState {
  list: string[];
  botPerson: {
    name: string;
    sex: "woman" | "man" | undefined;
    post: string;
  };
  personality: {
    name: string;
    label: string;
  } | null;
}

const initialState: PersonalitiesState = {
  list: [],
  botPerson: {
    name: "",
    sex: undefined,
    post: "",
  },
  personality: null,
};

export const personalitiesSlice = createSlice({
  name: "personalities",
  initialState,
  reducers: {
    setBotPerson: (
      state,
      action: PayloadAction<{
        name: string;
        sex: "woman" | "man" | undefined;
        post: string;
      }>
    ) => {
      state.botPerson = action.payload;
    },
  },
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
export const { setBotPerson } = personalitiesSlice.actions;
export default personalitiesSlice.reducer;
