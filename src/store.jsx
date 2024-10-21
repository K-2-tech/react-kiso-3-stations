import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import booksReducer from "./booksSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    books: booksReducer,
  },
});
