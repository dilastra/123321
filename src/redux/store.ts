import { configureStore } from "@reduxjs/toolkit";
import { messagesReducer, personalitiesReducer } from "./slices";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    personalities: personalitiesReducer,
    messages: messagesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
