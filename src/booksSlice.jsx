// src/features/books/booksSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  books: [],
  status: "idle",
  error: null,
  offset: 0,
};

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async ({ offset, token }) => {
    const response = await axios.get(
      `https://railway.bookreview.techtrain.dev/books?offset=${offset}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const fetchPublicBooks = createAsyncThunk(
  "books/fetchPublicBooks",
  async ({ offset }) => {
    const response = await axios.get(
      `https://railway.bookreview.techtrain.dev/public/books?offset=${offset}`
    );
    return response.data;
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    incrementOffset: (state) => {
      state.offset += 10;
    },
    decrementOffset: (state) => {
      state.offset = Math.max(0, state.offset - 10);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchPublicBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPublicBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.books = action.payload;
      })
      .addCase(fetchPublicBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { incrementOffset, decrementOffset } = booksSlice.actions;
export default booksSlice.reducer;
